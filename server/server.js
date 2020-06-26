const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const { addPlayer, getPlayer } = require('./players');

app.use((req, res, next) =>
{
    res.header("Access-Control-Allow-Origin", process.env.REACT_APP_HOST || "*");
    res.header("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", true);
    return next();
});

app.use(express.static(__dirname + "/../build"));

const port = process.env.PORT || 3001;
http.listen(port, function(){
    console.log('listening on :3001')
})

//everytime someone connects to the server
io.on('connection', socket => {
    console.log("New player connected!")
    socket.on('join', ({name, role, room}, cb) => {
        console.log(name, role, room);
        const {err, player} = addPlayer({id: socket.id, name, role, room})
        if(err) return cb({err})
        socket.emit('message', {player:'! ', text: `${player.name}, welcome to room ${player.room}`});
        socket.broadcast.to(player.room).emit('message', {player:'! ', text:`${player.name} has joined!`})
        socket.join(player.room)
    })
    socket.on('sendMessage', (message, callback) => {
        const player = getPlayer(socket.id);
    
        io.to(player.room).emit('message', { player: player.name, text: message });
    
        callback();
      });

    socket.on('disconnect', () =>{
        console.log('Player disconnected.')
    })

})
