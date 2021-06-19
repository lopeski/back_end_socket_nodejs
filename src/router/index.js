const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)
const router = express.Router()

router.get('/', (req, res) => {
  res.sendFile(__dirname + '/chatConsole.html')
})

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg)
  })
})

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

module.exports = (app) => app.use('/', router)
