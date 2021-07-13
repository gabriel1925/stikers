const express = require('express')
const remitos = require('../controllers/remitos.controllers')
const { isAuthenticated } = require('../helpers/auth')
const router = express.Router()

router.post('/cargarRemito',isAuthenticated, remitos.cargarRemito )
router.post('/busquedaStiker',remitos.busquedaImpresion )
router.get('/buscarRemitos',remitos.busquedaImpresiones)
router.get('/cargaelit',isAuthenticated,remitos.cargaelit)
module.exports=router 