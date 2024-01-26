const express=require('express');
const mysql = require('mysql2')

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'sandia123',
    database:"chat"
})

db.connect((err)=>{
    if (err) {
        console.error("error en la conexion de la base de datos")
    }else{
        console.log("conexion de la base de datos exitosa")
    }
})

module.exports= db