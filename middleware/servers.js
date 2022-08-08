const http = require('http');
const { host, servers: ports } = require('./config');

const createListener = port => (req, res) => {
  res.end(`Respondido pelo servidor da porta ${port}`);
};

const servers = ports.map(port => ({
  listener: http.createServer(createListener(port)),
  port
}));

servers.forEach(server => {
  server.listener.listen(server.port, host, () => {
    console.log(`Servidor rodando na porta ${server.port}`);
  });
});