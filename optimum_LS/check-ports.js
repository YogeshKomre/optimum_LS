const net = require('net');
const ports = [3000, 3001, 3002, 3003, 3004];

ports.forEach(port => {
    const server = net.createServer().listen(port, () => {
        server.close();
        console.log(`Port ${port} is available`);
    }).on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`Port ${port} is in use`);
        }
    });
});
