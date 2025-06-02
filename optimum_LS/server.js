const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const PORT = 3008;

try {
    console.log('Starting server...');
    console.log('Node.js version:', process.version);
    console.log('Current directory:', __dirname);

    // Middleware
    app.use(cors());
    app.use(express.static(__dirname));

    // Routes
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'index.html'));
    });

    // Socket.IO connection
    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });

        socket.on('send_message', (data) => {
            console.log('Received message:', data.message);
            
            // Process the message
            const response = processMessage(data.message, data.category);
            
            // Send response back
            socket.emit('receive_message', { 
                response,
                timestamp: new Date().toLocaleTimeString()
            });
        });
    });

    // Message processing
    function processMessage(message, category) {
        // Simple echo response for now
        return `Echo: ${message}`;
    }

    // Error handling
    app.use((err, req, res, next) => {
        console.error('Error:', err.stack);
        res.status(500).json({ error: 'Something went wrong!' });
    });

    // Start server on all network interfaces
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server is running on http://localhost:${PORT}`);
        console.log('Server started successfully');
    });
} catch (error) {
    console.error('Failed to start server:', error.stack);
    process.exit(1);
}
