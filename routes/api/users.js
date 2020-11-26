const express =require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
//const os = require('os')
const path = require('path')

//const modelPath=path.join(path.dirname(path.dirname (__dirname)),"model","users.js")

const User = require('../../model/user')
//const User = require(path.join(path.dirname(path.dirname (__dirname)),"model","users.js"))
const router = express.Router();


const { body, validationResult } = require('express-validator');


router.get('/:userid', async (req,res)=>{

  try{
  const user=  await User.findById(req.params.userid)

  if(!user){
    res.status(404).json({"msg":"not found"})
  }
  res.json({"username" : user.name})
  }
  catch(error){

    res.status(500).json({"msg" : "internal server error" })

  }

} )
router.post('/register', [

  
  // username must be an email
  body('email').isEmail(),
  // password must be at least 5 chars long
  body('password').isLength({ min: 5 })
], (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
    
  const {name,email,password} = req.body;


  const newUser = new User({

    name,
    email,
    password
  });

  let s="";


  let salt =bcrypt.genSaltSync(10);

  newUser.password = bcrypt.hashSync(password,salt);
  
  newUser.save().then((u)=>{


    const payload = {
        user :{

            id : u.id
        }
    }

    jwt.sign(payload,config.get("jwtSecret"),{expiresIn:"30d"},
        (err,token)=>{
            if(err){
                throw err;
            }
             res.json({"token":token})
        }
    )
    //return res.status(200).json({user:u})
  }).catch((e)=>{
      res.status(400).send("validation error!check your sent data if it misses any requirement");
  })



});
module.exports=router;