const express = require('express');
const dotenv = require('dotenv');
const router = express.Router();
const { Pool } = require('pg');
const cors = require('cors')
const bcrypt = require('bcryptjs');
const session = require('express-session');
const PgSession = require('connect-pg-simple')(session);




// Load environment variables
dotenv.config();

// Initialize Express
const app = express();


// PostgreSQL connection pool
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false, // Adjust based on security requirements
  },
});

app.use(cors({
  origin:  'http://localhost:5173', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // If you need to include cookies
}));



// Middleware to parse JSON
app.use(express.json());

// Middleware for session handling
app.use(
  session({
    store: new PgSession({
      pool: pool, // PostgreSQL connection pool
      tableName: 'session', // Default table for session storage
    }),
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }, // 1 day
  })
);

// Mount routes after session middleware
app.use('/api', router);


// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected to the database');
  release();
});



// Sample route
app.get('/', (req, res) => {
  res.send('API is working!');
});

// Add a new user
router.post('/users', async (req, res) => {

  console.log('POST /api/users hit');
  console.log('Request body:', req.body);
  const { first_name, last_name, email, password, phone_number, role = 'customer' } = req.body; // Default role to 'customer'

  // Validate required fields
  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ message: 'All required fields must be provided' });
  }

  try {
    // Hash the password
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    // Insert user into the database
    const result = await pool.query(
      `INSERT INTO users (first_name, last_name, email, password_hash, role, phone_number)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING user_id, first_name, last_name, email, role, phone_number, created_at`,
      [first_name, last_name, email, password_hash, role, phone_number]
    );

    res.status(201).json({
      message: 'User created successfully',
      user: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    // Handle unique constraint violation for email
    if (error.code === '23505') {
      return res.status(400).json({ message: 'Email already exists' });
    }

    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get User Profile
router.get('/users/me', async (req, res) => {
  // Check if userId exists in the session
  const userId = req.session.userId;
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized: Please log in' });
  }

  try {
    const result = await pool.query(
      `SELECT user_id, first_name, last_name, email, role, phone_number, created_at, updated_at 
       FROM users 
       WHERE user_id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

  

// user login 
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // Compare the hashed password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Store userId in the session
    req.session.userId = user.user_id;

    res.json({ message: 'Login successful', user: { user_id: user.user_id, email: user.email } });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Logout endpoint
router.post('/logout', (req, res) => {
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      console.error('Error during logout:', err);
      return res.status(500).json({ message: 'Logout failed' });
    }

    // Clear the session cookie
    res.clearCookie('connect.sid');
    res.json({ message: 'Logout successful' });
  });
});

// first part business profile 
router.post('/businesses/profile', async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    confirm_password,
    business_name,
    phone_number,
    address,
    city,
    postal_code,
    app_suite
  } = req.body;

  // Validate mandatory fields for both cases
  if (!business_name || !phone_number || !address || !city || !postal_code) {
    return res.status(400).json({ message: 'Business name, phone number, address, city, and postal code are required' });
  }

  // Check if passwords match
  if (password && password !== confirm_password) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    let userId;

    if (req.session.userId) {
      // For existing users
      userId = req.session.userId;

      // Retrieve user details
      const userResult = await pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);
      if (userResult.rows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      const user = userResult.rows[0];

      // Validate password confirmation for existing users
      const isValidPassword = await bcrypt.compare(password, user.password_hash);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid password confirmation' });
      }

      // Update user role to 'business_owner' if not already set
      if (user.role !== 'business_owner') {
        await pool.query('UPDATE users SET role = $1 WHERE user_id = $2', ['business_owner', userId]);
      }
    } else {
      // For new users
      if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({ message: 'First name, last name, email, and password are required for signup' });
      }

      // Check if email already exists
      const emailCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      if (emailCheck.rows.length > 0) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      // Hash the password
      const saltRounds = 10;
      const password_hash = await bcrypt.hash(password, saltRounds);

      // Create new user as 'business_owner'
      const userResult = await pool.query(
        `INSERT INTO users (first_name, last_name, email, password_hash, role) 
         VALUES ($1, $2, $3, $4, $5) 
         RETURNING user_id`,
        [first_name, last_name, email, password_hash, 'business_owner']
      );
      userId = userResult.rows[0].user_id;
    }

    // Insert business profile
    const businessResult = await pool.query(
      `INSERT INTO businesses (
         owner_id, 
         business_name, 
         phone_number, 
         address, 
         city, 
         postal_code, 
         app_suite
       ) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING business_id, business_name, phone_number, address, city, postal_code, app_suite`,
      [userId, business_name, phone_number, address, city, postal_code, app_suite]
    );

    res.status(201).json({
      message: 'Business profile created successfully',
      business: businessResult.rows[0],
    });
  } catch (error) {
    console.error('Error creating business profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Define the server port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
