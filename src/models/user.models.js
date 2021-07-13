const mongose = require('mongoose')
const { Schema } = mongose
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    name:{type: String, required:true },
    email:{type: String, required:true},
    password:{type: String,required:true},
    date:{type:Date,default:Date.now}
})

userSchema.methods.encryptPassword = async (password)=>{
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password,salt)
    // console.log(hash)
    return hash

}

userSchema.methods.machPassword = async function(password){
    return await bcrypt.compare(password,this.password)
}

module.exports = mongose.model('User', userSchema)