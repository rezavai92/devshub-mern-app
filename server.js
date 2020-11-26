const express = require('express')
const mongodb = require('./config/db')

const path = require('path')
const app = express()
const port = process.env.PORT ||5000;
app.use(express.json({extended:false}))
app.use('/api/users',require('./routes/api/users'));
app.use('/api/posts',require('./routes/api/posts'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/profile',require('./routes/api/profile'));

if(process.env.NODE_ENV==="production"){


    app.use(express.static('client/build'));

    app.get("*",(req,res)=>{

        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    } )
}




app.listen(port,()=>{

console.log('server is listening to port ',port)
})

