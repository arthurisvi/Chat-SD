const http = require("http");
const { io } = require("socket.io-client");

const {
    host,
    balancer: port,
    servers: ports,
} = require("./config");

const balancer = http.createServer();
const ioServer = require("socket.io")(balancer);

balancer.listen(port, host, () => {
    console.log(`Load balancer rodando na porta ${port}`);

    ioServer.on("connection", (socket) => {

        socket.on("webchat", (message) => {
            console.log("[SOCKET] Webchat:", message);
            ioServer.emit("webchat", message);

            ports.map((port) => {
                const socketClient = io(`http://localhost:${port}`, {
                    withCredentials: true,
                    transports: ["websocket"],
                });

                socketClient.on("connect", () =>
                    console.log("Conexão iniciada na porta: " + port)
                );
                socketClient.emit("channel", message);
            });
        });


        socket.on("disconnect", () => {
            console.log("[SOCKET] Disconnect");
        });

    });

});