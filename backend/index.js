const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
//app.use(express.static("frontend"));


// Database connection
const pool = mysql.createPool({
        host: 'sql5.freesqldatabase.com',
        user: 'sql5775566',
        password: 'RDxanvSZPt',
        database: 'sql5775566',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
});

// JWT secret key
const JWT_SECRET = 'your-secret-key';

// Hardcoded user credentials (for testing purposes)
const TEST_USER = {
  username: 'udaya', // Replace with your first name
  password: 'udaya'  // Replace with your first name
};


// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Routes
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (username === TEST_USER.username && password === TEST_USER.password) {
    const token = jwt.sign(
      { username: TEST_USER.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        username: TEST_USER.username
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid username or password'
    });
  }
});




app.get('/api/benefits', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT benefit_type, percentage FROM benefits'
    );
    res.json(rows);
  } catch (error) {
    console.error('Chart data error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/challenges',authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT challenges, percentage FROM challenges_faced'
    );

    res.json(rows);
  } catch (error) {
    console.error('Chart data error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to add a challenge to the challenges_faced table
app.post('/api/challenges', async (req, res) => {
  try {
    const { challenges, percentage } = req.body;
    
    if (!challenges || percentage === undefined) {
      return res.status(400).json({ error: 'Challenges and percentage are required' });
    }

    
    // Check if the table exists, if not create it
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS challenges_faced (
        id INT AUTO_INCREMENT PRIMARY KEY,
        challenges VARCHAR(100) NOT NULL,
        percentage DECIMAL(5,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Insert the new challenge
    const [result] = await pool.execute(
      'INSERT INTO challenges_faced (challenges, percentage) VALUES (?, ?)',
      [challenges, percentage]
    );
    
    res.status(201).json({
      success: true,
      message: 'Challenge added successfully',
      id: result.insertId
    });
  } catch (error) {
    console.error('Error adding challenge:', error);
    res.status(500).json({ error: 'Failed to add challenge' });
  }
});

// Endpoint to add a benefit to the benefits table
app.post('/api/benefits', async (req, res) => {
  try {
    const { benefit_type, percentage } = req.body;
    
    if (!benefit_type || percentage === undefined) {
      return res.status(400).json({ error: 'Benefit type and percentage are required' });
    }
    
    // Check if the table exists, if not create it
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS benefits (
        id INT AUTO_INCREMENT PRIMARY KEY,
        benefit_type VARCHAR(100) NOT NULL,
        percentage DECIMAL(5,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Insert the new benefit
    const [result] = await pool.execute(
      'INSERT INTO benefits (benefit_type, percentage) VALUES (?, ?)',
      [benefit_type, percentage]
    );
    
    res.status(201).json({
      success: true,
      message: 'Benefit added successfully',
      id: result.insertId
    });
  } catch (error) {
    console.error('Error adding benefit:', error);
    res.status(500).json({ error: 'Failed to add benefit' });
  }
});

// Test endpoint to fetch data
// app.get('/api/data', async (req, res) => {
//     try {
//         // Example query - replace with your actual table name
//         const data = await db.query('SELECT * FROM your_table_name');
//         res.json(data);
//     } catch (error) {
//         console.error('Database error:', error);
//         res.status(500).json({ error: 'Database error occurred' });
//     }
// });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
