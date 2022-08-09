const http = require("http");
const { io } = require("socket.io-client");

const {
    host,
    balancer: port,
    getServerPort,
    servers: ports,
} = require("./config");

const balancer = http.createServer();
const ioServer = require("socket.io")(balancer);

balancer.listen(port, host, () => {
    console.log(`Load balancer rodando na porta ${port}`);

    ioServer.on("connection", (socket) => {
        const currentPort = getServerPort();

        const socketClient = io(`http://localhost:${currentPort}`, {
            withCredentials: true,
            transports: ["websocket"],
        });

        socketClient.on("connect", () => {
            console.log("Conexão iniciada na porta: " + currentPort);
        });

        socketClient.on("channel", (message) => {
            console.log(message)
            ioServer.emit("webchat", message)
        })

        socket.on("webchat", (message) => {
            socketClient.emit("channel", message);
        });

        socket.on("disconnect", () => {
            console.log("[SOCKET] Um cliente foi desconectado");
        });
    });
});