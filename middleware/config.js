const config = {
    host: 'localhost',
    balancer: 8000,
    servers: [
        8001,
        8002,
        8003,
    ],

    getServerPort() {
        console.log('oi')
        // verificamos se é possível incrementar + 1
        // no índice das portas em `server`
        console.log(config.currentServerPort)
        console.log(config.servers.length - 1)
        const canIncreaseServerPort = config.currentServerPort < config.servers.length - 1;
        console.log(canIncreaseServerPort)
        // se possível, incrementamos + 1, caso contrário, voltamos à porta inicial
        const nextPort = canIncreaseServerPort ? config.currentServerPort + 1 : 0;
        console.log(nextPort)
        // armazenamos essa configuração na variável config.currentServerPort
        config.currentServerPort = nextPort;

        // retornamos a porta correta através de config.servers
        console.log(config.servers[nextPort])
        return config.servers[nextPort];
    }
};

module.exports = config;