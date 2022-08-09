const http = require("http");
const port = 8001;

const server = http.createServer();
const io = require("socket.io")(server);

server.listen(port, () => {
    console.log("Servidor subiu na porta " + port)
    io.on("connection", (socket) => {
        console.log("[8001] Cliente conectado: " + socket.id);

        socket.on("channel", (message) => {
            console.log("[8001] Webchat: ", message);
            socket.emit("channel", message)
        });

        socket.on("disconnect", () => {
            console.log(`[8001] Cliente ${socket.id} desconectado`);
        });
    });
});

module.exports = io;