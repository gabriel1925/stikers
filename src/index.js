const express = require('express')
const config = require('./server/config')
// const sequelize =  require("sequelize")
require('./database')
const sequelize =require("./sequelize")
sequelize.sync()



const app = config(express()) //le pasamos express a config y la recibe como app


app.listen(app.get('port'),()=>{
    console.log('Server on port ',app.get('port'))
})




