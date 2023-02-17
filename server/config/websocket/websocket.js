const WebSocket = require('ws')

const server = new WebSocket.Server({ port: 8080 })

function WebSocketServer() {
    server.on('connection', ws => {
        ws.on('message', message => {
            console.log(`Received message => ${message}`)
        })
        ws.send('Hello! Message From Server!!')
    })
}

module.exports = WebSocketServer