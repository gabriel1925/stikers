const productos = {}
// const sequelize = require('../sequelize')
// const alumno = require('../models/productosOrder.models')
const busqueda = require('../helpers/busqueda')

productos.busquedasku = async (req,res)=>{
    let sku = await  busqueda.sku(req.body.sku)
    // console.log(sku)

    res.send(sku)
}
productos.busquedasnombre = async (req,res)=>{
    let nombre = await  busqueda.nombre(req.body.sku)
    // console.log(nombre)
    res.send(nombre)
}


module.exports = productos