import http from 'http';

console.log("Starting raw http server...");
const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Hello');
});

server.listen(5000, () => {
    console.log('Raw server listening on 5000');
});

process.on('exit', (code) => console.log('Exit:', code));
