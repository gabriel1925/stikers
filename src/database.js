const mongose = require('mongoose')
const {database} = require('./keys')


mongose.connect(database.URI,{
    useNewUrlParser: true,
    useUnifiedTopology:true
})
.then(db=>{
    console.log('db is connect')
})
.catch(err=>console.log(err))