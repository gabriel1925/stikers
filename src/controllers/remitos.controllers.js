const remitos = {}
const busqueda = require('../helpers/busqueda')
const remitosdb = require('../models/remitos.models')

// aca se tratan todos los POST

remitos.cargarRemito = async (req,res)=>{
    let pedido = JSON.parse(req.body.pedido)
    let nfactura = req.body.nfactura
    let empresa = req.body.empresa
    let fcompra = req.body.fcompra
    let buscarFactura=  await remitosdb.find({"nfactura":nfactura})
    // let buscarRemito = await remitosdb.find({"nremito":nremito})
    // console.log((await remitosdb.find()).length)

    console.log('//////////////')
    console.log('aca va el valor')
    // console.log(await remitosdb.find({}).sort({$natural:-1}).limit(1))
    let ultimovalor = await remitosdb.find({}).sort({$natural:-1}).limit(1)
    // ternario
    ultimovalor[0]===undefined ? ultimovalor[0]={nremito: 0} : console.log('ok')
    console.log('//////////////')

    if(buscarFactura[0] == undefined){
        let dato = {
            nremito:ultimovalor[0].nremito +1 ,
            nfactura:nfactura,
            empresa:empresa,
            fcompra:fcompra,
            pedido:pedido, 
            creador:req.user.name,
            creadorid:req.user.id
        }
        const newRemito = new remitosdb(dato)
            // provedoresdb.
            await newRemito.save()
            console.log(newRemito)
            res.send(newRemito)

    }else{
        console.log("pase por aca")
        res.send("ya existe")
    }
    // console.log(dato)
    for (let index = 0; index < pedido.length; index++) {
        const element = pedido[index];
        // console.log(element.sku)
        // console.log(element.cantidad)
    }
}
remitos.busquedaImpresion = async function(req, res){
    const pedido = await busqueda.remito(req.body.id)
    //ordeno las etiquetas de mayor cantidad a menor cantidad 
    pedido.pedido = pedido.pedido.sort(function(a,b){
        return b.cantidad - a.cantidad
    })
    //console.log(pedido.pedido)
    res.json(pedido)
}

remitos.busquedaImpresiones = async function(req,res){
    let remitos  = await remitosdb.find().sort({'submittedDate': 'desc'})
    let tamano = remitos.length
    let remitosjson =[]
    remitos.map(e=>{
        remitosjson.unshift({  
            _id: e._id,
            nremito: e.nremito,
            nfactura: e.nfactura,
            empresa: e.empresa,
            fcompra: e.fcompra,
            pedido: e.pedido,
            creador: e.creador,
            creadorid: e.creadorid,
            createdAt: e.createdAt,
            updatedAt: e.updatedAt})
        console.log(e._id)
        console.log("jajaja")
    })


    // console.log(remitos)
    res.render('buscarRemitos',{remitosjson,tamano})
}

remitos.cargaelit = async function(req,res){
    res.render("cargaElit")
}

module.exports = remitos