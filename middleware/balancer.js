const http = require('http');

const { host, balancer: port, getServerPort } = require('./config');

const balancer = http.createServer();
const io = require("socket.io")(balancer);

balancer.listen(port, host, () => {
    io.on("connection", (socket) => {
        console.log("Cliente conectado: " + socket.id);

        socket.on("webchat", (message) => {
            console.log("[SOCKET] Webchat:", message);
            io.emit("webchat", message);
        });

        socket.on("disconnect", () => {
            console.log("[SOCKET] Disconnect");
        });
    });
});


balancer.on('request', (req, res) => {
    const port = getServerPort();
    const request = {
        host,
        port,
        path: req.url,
        method: req.method,
        headers: req.headers
    };

    const connector = http.request(request, (resp) => resp.pipe(res));

    req.pipe(connector);
});