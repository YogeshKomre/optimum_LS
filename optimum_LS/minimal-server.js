const express = require('express');
const app = express();
const PORT = 3004;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Simple route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
