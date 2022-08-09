const httpServer = require("http").createServer();
const port = 8001;
// const options = {
//     /* ... */
// };
// const io = require("socket.io")(httpServer, options);
const io = require("socket.io")(httpServer);
io.set('transports', ['websocket'])

io.on("connection", (socket) => {
    // let address = socket.handshake.address;
    // let clientIp = socket.request.connection.remoteAddress;
    // console.log(`IP: ${clientIp}`)
    // console.log(`Cliente conectado: ${address.address}:${address.port}`)
    console.log("Cliente conectado: " + socket.id);

    socket.on('webchat', (message) => {
        console.log('[SOCKET] Webchat:', message)
        io.emit('webchat', message)
    })

    socket.on('disconnect', () => {
        console.log('[SOCKET] Disconnect')
    })
})

httpServer.listen(port);
module.exports = io;