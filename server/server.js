const http = require("http");
const port = 8001;

const server = http.createServer();
const io = require("socket.io")(server);

server.listen(port, () => {
    console.log("Servidor subiu na porta " + port)
    io.on("connection", (socket) => {
        console.log("Cliente conectado: " + socket.id + "na porta " + port);

        // socket.on("webchat", (message) => {
        //     console.log("[SOCKET] Webchat:", message);
        //     io.emit("webchat", message);
        // });

        // socket.on("disconnect", () => {
        //     console.log("[SOCKET] Disconnect");
        // });
    });
});

module.exports = io;