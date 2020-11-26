const jwt = require('jsonwebtoken')
const config = require('config')


module.exports = async function (req,res,next){

const token =req.header('xAuthToken');

if(!token){

return    res.status(401).json({msg:"no token,authorization denied"})
}
try{
    const dcoded= await jwt.verify(token,config.get("jwtSecret"));
    req.user = dcoded.user;
    next();

}

catch(err){


    res.status(401).json({msg:"invalid token"})
}






}