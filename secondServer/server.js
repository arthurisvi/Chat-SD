const http = require("http");
const port = 8002;
const server = http.createServer();
const io = require("socket.io")(server);

server.listen(port, () => {
    console.log("Servidor subiu na porta " + port);
    io.on("connection", (socket) => {
        console.log("Cliente conectado: " + socket.id + "na porta " + port);

        socket.on("channel", (message) => {
            console.log("[SOCKET] Webchat no server2:", message);
            // io.emit("webchat", message);
        });

        socket.on("disconnect", () => {
            console.log("[SOCKET] Disconnect");
        });
    });
});

module.exports = io;