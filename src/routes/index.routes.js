const express = require('express')
const index = require('../controllers/index.controller')
const { isAuthenticated } = require('../helpers/auth')
const router = express.Router()
router.get('/',isAuthenticated,index.init)
router.get('/cargarRemito', isAuthenticated,index.cargaremito)
router.get('/cargarProvedores',isAuthenticated,index.cargarprovedores)
router.post('/impresiones',isAuthenticated,index.imprimirstikers)
router.get('/impresiones/:remito',isAuthenticated,index.imprimirstikers)
router.get('/sinremito',isAuthenticated,index.imprimirSinremitos)
module.exports = router