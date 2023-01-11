const mongoose = require('mongoose')

const DB = 'mongodb+srv://fk28:farhankhan123@cluster0.fq2ibrs.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true})
    .then(()=>{
        console.log("connection successful")
    }).catch((err)=>{
        console.log(err)
    })