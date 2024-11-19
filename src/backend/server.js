// Import required packages
const express = require('express');
const axios = require('axios');
require('dotenv').config(); // To load environment variables from .env

// Initialize Express app
const app = express();
const port = process.env.PORT || 3001;

// Route to handle keyword search
app.get('/search', async (req, res) => {
    const keyword = req.query.keyword || 'climate'; // Default keyword is 'climate'
    
    try {
        // Fetch data from Data.gov API
        const response = await axios.get(process.env.BASE_URL, {
            params: {
                q: keyword,    // Search query for the keyword
                rows: 10,      // Limit to 10 results (you can adjust this)
                start: 0       // Start from the first result
            }
        });

        // Extract the results
        const datasets = response.data.result.results.map(item => ({
            title: item.title,
            description: item.notes || 'No description available',
            url: item.url || '#', // Fallback to a placeholder if no URL is available
            agency: item.organization || 'Unknown Agency',
            publishedDate: item.metadata_created || 'Unknown Date'
        }));

        // Send the datasets as JSON response
        res.json({
            success: true,
            datasets: datasets
        });

    } catch (error) {
        console.error('Error fetching data from Data.gov:', error.message || error);
        res.status(500).json({ success: false, message: 'Error fetching data from Data.gov' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
