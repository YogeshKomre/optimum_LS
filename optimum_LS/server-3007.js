const express = require('express');
const app = express();
const PORT = 3007;

// Serve static files
app.use(express.static(__dirname));

// Simple route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
