const http = require('http');

const { host, balancer: port, getServerPort } = require('./config');

const balancer = http.createServer();
balancer.listen(port, host, () => {
  console.log(`Load balancer rodando na porta ${port}`);
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