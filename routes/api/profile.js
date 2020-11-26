const express =require('express')
const auth = require('../../middlewares/auth')
const User = require('../../model/user')
const Profile = require('../../model/Profile')
const mongoose = require('mongoose')
const Post = require('../../model/Post')
const {body,validationResult} = require('express-validator')
const router = express.Router();
let fs = require('fs'); 
let path = require('path'); 
let multer = require('multer'); 
//var multer  = require('multer')
let upload = multer({ dest: 'uploads/' })

//create profile
router.post('/',[auth,upload.single('photo'), [

    body('skills',"skills is required").not().isEmpty(),
    body('status','status is required').not().isEmpty()
]],async(req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){

        res.status(400).json({"errors": errors.array()})
    }

    
    
      // console.log(req.file)
    let profileFields={}
   if(req.file){
     profileFields={photo :{data:null}}
   
    profileFields.photo.data = fs.readFileSync(req.file.path)   
  
   }
   
   
    
  //  console.log(profileFields.photo)
    profileFields.user = req.user.id;
     //profileFields.handle = req.body.handle;
     profileFields.company = req.body.company;
     profileFields.website = req.body.website;
     profileFields.location = req.body.location;
     profileFields.bio = req.body.bio;
     profileFields.status = req.body.status;
    
     // profileFields.githubusername = req.body.githubusername;
    // Skills - Spilt into array
    if (req.body.skills) {
      profileFields.skills = req.body.skills.split(',');
    }

    // Social
    profileFields.social = {};
     profileFields.social.youtube = req.body.youtube;
     profileFields.social.twitter = req.body.twitter;
     profileFields.social.facebook = req.body.facebook;
     profileFields.social.linkedin = req.body.linkedin;
     profileFields.social.instagram = req.body.instagram;
     profileFields.social.github = req.body.github;
    
    try{

       const  profile= await Profile.findOne({user:req.user.id});

       if(!profile){

          //create
          const newProfile = new Profile(profileFields);
          const newProfileToSend= await newProfile.save();

         return res.status(200).json({
              profile : newProfileToSend
          })

       }



       else{
           //update

        const updatedProfile=   await Profile.findOneAndUpdate({user:req.user.id},{
               $set : profileFields,
                new : true
           })


           res.json({
               updatedProfile
           })


       }
       



    }
    catch(err){

        console.log(err)
        res.status(400).json({
            msg : err
        })

    }
} )

//get particular profile

router.get('/user/:user_id',async (req,res)=>{
    console.log(req.params.user_id)
    try {
        const profile =await Profile.findOne({user:req.params.user_id});

    if(!profile){
        return    res.json({msg:"no profile found for this user"})
    }
    res.json({
        profile 
    })
}
catch(err){
    
    res.status(500).json({msg:err})
}

})



// router.get('/image/:userid',async (req,res)=>{

//     try {

//         const profile =await Profile.findOne({
//             user : req.params.userid
//         })

//         if(!profile){
       
//            return res.status(400).json({
//                msg :"invalid profile"
//            })
//         }
       
//         res.send(path.join(__dirname,"..","..",profile.photo) );
        
//        }
       
//        catch(err){
//        return res.status(500).json({
//            msg : "internal server error"
//        })
       
//        }

// })

//get specific users by name

router.get('/searched/:username',async(req,res)=>{

    try{
        let regexp = new RegExp(req.params.username,"i")
     const allProfiles=   await User.find({ name:regexp }, 'name').exec();

      const allIds=  allProfiles.map((u)=>{return u._id});
      const query = allIds.map((i)=>{return mongoose.Types.ObjectId(i) })  
     // console.log("all id are",query)

     const profiles= await Profile.find({
        'user': { $in: query }
    }
        
        )


    res.json({
        profiles
    })
    }
    
    catch(err){
        res.status(500).json({
            msg :err
        })
    }
    
    })
    

//get all profiles
router.get('/',async(req,res)=>{

try{
    const allProfiles =await Profile.find().populate('users',['name']);

if(!allProfiles){
   return res.status(400).json({msg :"no profiles in the database"})
}
res.json({
    allProfiles
})
}

catch(err){
    res.status(500).json({
        msg :err
    })
}

})

//get personal profile
//route : "api/profile/me"
router.get('/me',auth,async(req,res)=>{

try {

 const profile =await Profile.findOne({
     user : req.user.id
 }).populate('users',["name","email"]);

 if(!profile){

    return res.status(400).json({
        msg :"invalid profile"
    })
 }

 res.status(200).json({profile})
}

catch(err){
return res.status(500).json({
    msg : "internal server error"
})

}


})


//add education 

router.put('/education',[auth,[

    body("school","school is required").not().isEmpty(),
    body("degree","degree is required").not().isEmpty(),
    body("fieldofstudy","fieldofstudy is required").not().isEmpty(),
    body("from","from date is required").not().isEmpty(),
    
] ],async (req,res)=>{


   const errors = validationResult(req);
   if(!errors.isEmpty()){

    res.status(400).json({msg: errors.array()})
   } 


  try{
    const profile=  await Profile.findOne({user:req.user.id});

    const {school,degree,fieldofstudy,from,to,current,description} = req.body;
     const newEducation = {}
    if(to){newEducation.to=to}
    if(current){newEducation.current = current}
    if(description){newEducation.description=description}
    newEducation.school = school;
    newEducation.degree = degree;
    newEducation.fieldofstudy = fieldofstudy;
    newEducation.from = from;

    profile.education.unshift(newEducation);
    await profile.save();
    res.json({newEducation})
  }

  catch(e){

    res.status(500).json({msg:"internal server error"})
  }


})
//update particular education 
//if you don't put "return" in map function
//can you remember how you messed up with that :) 

router.put('/education/:edu_id',auth,async (req,res)=>{

    try{
    
        const targetProfile = await Profile.findOne({user:req.user.id});
    
      const indexes=  targetProfile.education.map((item)=>{
            return item.id
        })
    
       const removeIndex= indexes.indexOf(req.params.edu_id)
        
        targetProfile.education.splice(removeIndex,1,req.body);

      const updatedEducationProfile= await targetProfile.save();
        res.json({updatedEducationProfile})
    
    }
    
    catch(err){
    
        res.status(500).json({msg:"internal server error"})
    
    }
    
    
    
    
    })


//delete particular education

router.delete('/education/:edu_id',auth,async (req,res)=>{

    try{
    
        const targetProfile = await Profile.findOne({user:req.user.id});
    
      const indexes=  targetProfile.education.map((item)=>{
            return item.id
        })
    
       const removeIndex= indexes.indexOf(req.params.edu_id)
        
        targetProfile.education.splice(removeIndex,1);

        targetProfile.save();
        res.json({msg:"education deleted successfully"})
    
    }
    
    catch(err){
    
        res.status(500).json({msg:"internal server error"})
    
    }
    
    
    
    
    })

//delete particular experience
router.delete('/experience/:experience_id',auth,async (req,res)=>{

    console.log("from delete experience route ",req.params.experience_id);
try{

    const targetProfile = await Profile.findOne({user:req.user.id});

  const indexes=  targetProfile.experience.map((item)=>{
        return item._id
    })

   const removeIndex= indexes.indexOf(req.params.experience_id)
    
    targetProfile.experience.splice(removeIndex,1)
  const updatedProfile= await targetProfile.save()
    res.json(updatedProfile)
}

catch(err){

    res.status(500).json({msg:"internal server error"})

}




})

//update particular experience

router.put('/experience/:experience_id',auth,async (req,res)=>{

    try{
    
        const targetProfile = await Profile.findOne({user:req.user.id});
    
      const indexes=  targetProfile.experience.map((item)=>{
           return item.id
        })
    
       const removeIndex= indexes.indexOf(req.params.experience_id)
        
        targetProfile.experience.splice(removeIndex,1,req.body)
       const updatedExperiencedProfile= await targetProfile.save();
       res.json(updatedExperiencedProfile);
    
    }
    
    catch(err){
    
        res.status(500).json({msg:"internal server error"})
    
    }
    
    
    
    
    })



//add experience

router.put('/experience',[auth,[body('title','title required').not().isEmpty(),
body('company','company is required').not().isEmpty(),
body('from','from date is required').not().isEmpty()  

]], async(req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({msg :errors.array()})
    }




    const {title,company,location,from,to,current,description} = req.body;
    
    const experience ={}

    if(location){
        experience.location = location
    }
    if(to){
        experience.to=to;
    }
    if(current){
        experience.current=current;
    }
    if(description){
        experience.description= description;
    }
    experience.title = title;
    experience.company= company;
    experience.from= from;


    try{

        const profile= await Profile.findOne({user:req.user.id});

        profile.experience.unshift(experience);
        await profile.save()
        res.json({experience})
    }

    catch(err){
        res.status(500).json({msg:"internal server error"})

    }

})
//delete profile and user

router.delete('/',auth,async (req,res)=>{


    try{
       await
        Post.deleteMany({user:req.user.id})
        
       
       const profile = await Profile.findOne({user:req.user.id})
       const user = await User.findOne({_id:req.user.id})

       if(profile){
        await Profile.findOneAndRemove({user:req.user.id})
       }
       if(!user){
        return res.json({msg:"invalid user"})
     }
      //await deletedProfile.remove() 
      if(user){
        await User.findOneAndRemove({_id:req.user.id})
      }
      
        //await deletedUser.remove()
       // console.log(deletedProfile)
       
       res.clearCookie("user");
       res.clearCookie("token");
        res.json({msg:"profile and user has been deleted"})
    }
    catch(err){
        res.status(500).json({msg:"internal server error"})
    }

})

module.exports=router;