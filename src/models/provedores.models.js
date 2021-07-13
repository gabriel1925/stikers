const { Schema, model } = require('mongoose')

const provedorSchema = new Schema(
    {
        provedor: {type:String,required:true},
        CUIT:{type:Number},
        creador:{type:String, required:true},
        creadorid:{type:String, required:true}
    },{
    timestamps:true
    })
module.exports = model('Provedor',provedorSchema)