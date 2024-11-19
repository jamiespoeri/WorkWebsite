// Import dependencies
const express = require('express');
const axios = require('axios');
require('dotenv').config();

// Initialize the app
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Sample route to test if the server is working
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Example route to search federal agency projects by keyword
app.get('/search', async (req, res) => {
  const keyword = req.query.keyword;
  if (!keyword) {
    return res.status(400).send("Keyword is required");
  }

  try {
    // Logic to search for federal projects would go here
    // This is just a placeholder
    res.send(`Searching for projects with the keyword: ${keyword}`);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
