const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

//everytime someone connects to the server
io.on('connection', socket => {
    socket.on('message', ({name, message}) =>{
        io.emit('message', {name, message})
    })
})

http.listen(3001, function(){
    console.log('listening on :3001')
})
