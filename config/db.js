const mongoose = require('mongoose')
const config = require('config')
const dbString = config.get("mongoURL")


mongoose.connect( dbString,{useNewUrlParser:true,
    useFindAndModify : false,
    useCreateIndex:true,useUnifiedTopology:true}).then((res)=>{

console.log("mongo connection set up done ")

}).catch((e)=>{

    console.log(e)
})