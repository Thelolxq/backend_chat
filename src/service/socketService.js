const express =require('express')
const routes = express.Router()
const http= require('http')
const app = express()
const server= http.createServer(app)
const io = require('socket.io')(server, {
    cors:{
        origin:'http://localhost:5173',
        credentials: true,
}
    
})

io.on('connection', (socket)=>{
    console.log("usuario conectado")

    io.emit('num_usuarios', io.engine.clientsCount);
    socket.broadcast.emit('chat_message',{
        usuario:'info',
        mensaje:'se ha conectado un nuevo usuario'
    })
    
    socket.on('chat_message', (data)=>{
        io.emit('chat_message', data)
    })
    
    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    
       
        io.emit('num_usuarios', io.engine.clientsCount);
      });
})



module.exports= {server, io, app, routes}