const WebSocket = require('ws')

const server = new WebSocket.Server({ port: 8080 })

function WebSocketServer() {
    server.on('connection', ws => {
        ws.on('message', message => {
            console.log(`Received message from webclient => ${message}`)
        })
        ws.send('Hello! Message From Server NodeJs!!')
    })
}

WebSocketServer()

module.exports = WebSocketServer