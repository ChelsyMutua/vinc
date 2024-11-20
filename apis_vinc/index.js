const express = require('express');
const dotenv = require('dotenv');
const { Pool } = require('pg');
const cors = require('cors')


// Load environment variables
dotenv.config();

// Initialize Express
const app = express();



app.use(cors({
    origin: ['http://localhost:5173', 'https://statistics-production-032c.up.railway.app'], 
    methods: 'GET,POST', 
}));

// Middleware to parse JSON
app.use(express.json());

// Define the server port
const PORT = process.env.PORT || 3000;

// PostgreSQL connection pool
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false,  // Adjust based on security requirements
  },
});

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