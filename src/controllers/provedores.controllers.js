const provedoresdb = require('../models/provedores.models')
const busqueda = require('../helpers/busqueda')
const provedores = {}

// req.body trae lo que colocamos en el formulario  
provedores.cargarProvedores = async (req,res)=>{
    console.log(req.body.cuitProvedor)
    await provedoresdb.findOne({"CUIT":req.body.cuitProvedor},async (err,doc)=>{
        console.log(err)
        console.log(doc)
        if (doc != null) {
            console.log('pase')
            req.flash("error","este provedor ya existe y es:"+doc.provedor)
            res.redirect('/cargarProvedores')
        }else{
            const newprovedor = new provedoresdb({provedor: req.body.nameProvedor,CUIT:req.body.cuitProvedor ,creador:req.user.name ,creadorid:req.user.id})
            // provedoresdb.
            await newprovedor.save()
            res.redirect('/cargarProvedores')
        }
    })
}
provedores.consulta = async (req,res)=>{
    const busq = await busqueda.provedor(req.body.provedor)
    // console.log(busq)
    res.send(busq)
}


module.exports = provedores