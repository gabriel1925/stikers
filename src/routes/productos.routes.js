const express = require('express')
const productos = require('../controllers/productos.controllers')
const { isAuthenticated } = require('../helpers/auth')
const router = express.Router()

router.post('/busquedasku',isAuthenticated,productos.busquedasku)
router.post('/busquedasnombre',isAuthenticated,productos.busquedasnombre)
router.get('/cosas',(req,res)=>{
    res.render("cosas")
})


module.exports = router