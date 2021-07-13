const express = require('express')
const provedores = require('../controllers/provedores.controllers')
const { isAuthenticated } = require('../helpers/auth')
const router = express.Router()

router.post("/busquedaProvedores",provedores.consulta)



module.exports = router