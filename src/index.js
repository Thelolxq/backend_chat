const express = require('express');
const routes =require('./v1/routes/routes.js')
const cors =require('cors')
const  {app} = require('./service/socketService.js');
const {server}=require('./service/socketService.js')


const PORT = process.env.PORT || 3000
app.use(cors())
app.use('/api/v1/chat', routes)


server.listen(PORT, ()=>{console.log(`escuchando en el puerto ${PORT}`)})

