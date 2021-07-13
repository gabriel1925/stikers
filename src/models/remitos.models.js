const {Schema,model}= require('mongoose')


const remitosSchema = new Schema({
    nremito:{type:Number,required:true,default:0},
    nfactura:{type:String,createIndexes: {unique: true, dropDups: true}},
    empresa:{type:String,required:true},
    fcompra:{type:String,required:true},
    pedido:{type:Object},
    creador:{type:String, required:true},
    creadorid:{type:String, required:true}
},{
    timestamps:true
})

module.exports = model('Remito',remitosSchema)