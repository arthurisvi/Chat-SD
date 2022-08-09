const http = require("http");
const { io } = require("socket.io-client");

const {
    host,
    balancer: port,
    servers: ports,
} = require("./config");

const balancer = http.createServer();

balancer.listen(port, host, () => {
    console.log(`Load balancer rodando na porta ${port}`);

    ports.map((port) => {
        const socket = io(`http://localhost:${port}`, {
            withCredentials: true,
            transports: ["websocket"],
        });

        socket.on("connect", () => console.log("Conexão iniciada na porta: " + port));
    });
});