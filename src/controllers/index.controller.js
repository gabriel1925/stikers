const User = require('../models/user.models')
const Remitos = require("../models/remitos.models")
const index = {}


// consultas para ver el usuario console.log(req.isAuthenticated())
// consultas para ver el usuario console.log(req.user.password)
index.init = (req,res)=>{
    res.render('index')
}
index.cargaremito= (req,res)=>{

    res.render("cargarRemito")
}
index.cargarprovedores = (req,res)=>{
    res.render("cargarProvedores")
}
index.cargarproductos = (req,res)=>{
    res.render("buscarRemitos")
}

index.imprimirstikers = async (req,res)=>{
    console.log(req.params.remito)
    console.log(req.params.remito)
    console.log(req.params.remito)
    console.log(req.params.remito)
    console.log(req.params.remito)



    let pedido;
    if (req.body.factura){
        pedido = req.body.factura
    }else{
        pedido= req.params.remito
    }
    console.log("////")
    console.log("////")
    console.log("////")
    console.log("////")

    console.log(pedido)
    console.log("////")
    console.log("////")
    let buscaPedido = await Remitos.findOne({"nremito":pedido})
    console.log(buscaPedido)
    let cosa = buscaPedido
    
    res.render("printetiquetas", {"id":cosa._id,"nremito":cosa.nremito, "tamPedido": cosa.pedido.length  })


}
module.exports = index