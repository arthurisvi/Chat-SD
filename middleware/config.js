const config = {
    host: "localhost",
    balancer: 8000,
    servers: [8001, 8002],

    getServerPort() {
        // verificamos se é possível incrementar + 1
        // no índice das portas em `server`
        const canIncreaseServerPort =
            config.currentServerPort < config.servers.length - 1;
        // se possível, incrementamos + 1, caso contrário, voltamos à porta inicial
        const nextPort = canIncreaseServerPort ? config.currentServerPort + 1 : 0;
        // armazenamos essa configuração na variável config.currentServerPort
        config.currentServerPort = nextPort;

        // retornamos a porta correta através de config.servers
        console.log(config.servers[nextPort]);
        return config.servers[nextPort];
    },
};

module.exports = config;