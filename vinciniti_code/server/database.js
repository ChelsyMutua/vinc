import { Pool } from 'pg';

// Configure the PostgreSQL connection
const pool = new Pool({
  user: 'postgres',      // Your PostgreSQL username
  host: '3000',         // Host (usually localhost)
  database: 'vinciniti',  // Name of your database
  password: '1628',  // Your PostgreSQL password
  port: 5432,                // Default PostgreSQL port
});

// Function to test the connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to PostgreSQL', err);
  } else {
    console.log('PostgreSQL connected:', res.rows);
  }
});

export default pool;  // Export the connection for use in other files
