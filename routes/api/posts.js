const express =require('express')
const Post = require('../../model/Post')
const User = require('../../model/user')
const auth = require('../../middlewares/auth')
const {body,validationResult} = require('express-validator')
const router = express.Router();


router.post('/',[auth,[body("text","text is required").not().isEmpty()]],async(req,res)=>{


    const errors = validationResult(req);
    if(!errors.isEmpty()){

    return    res.status(400).json({msg:errors.array()})
    }

    
   
    try{


        const  user = await User.findById(req.user.id).select("-password")

    const newPost = {
        name : user.name,
        text : req.body.text,
        date : req.body.date,
        user : user.id
    }
        const post = new Post(newPost);

     await post.save();

     res.json({post })


    }
    catch(err){
        res.status(500).json({msg:"internal server error"})
    }

})

//get all post
//private
//login required

router.get('/',[auth],async (req,res)=>{


    try{
      const posts=await  Post.find().sort({date:-1});
      if(!posts){

        res.json({msg:"there is no post yet by any user"})
      }
      res.json({msg:posts})
    }
    

    catch(err){
        res.status(500).json({msg:"internal server error"})

    }
    
})
// get post by user id 
//  api/posts/user_id
router.get('/all/:user_id',[auth],async (req,res)=>{


    try{
        
        const posts = await Post.find({user:req.params.user_id});

        if(!posts){

            res.json( {"msg" :"empty posts"})
        }
        res.json(posts)

    }

    catch(err){

        res.status(500).json({"msg":"internal server error"})


    }
} )


// get post by post id
//private

router.get('/:post_id',[auth],async (req,res)=>{


    try{
      const post=await  Post.findById(req.params.post_id)
      if(!post){

       return  res.status(200).json({msg:"there is no post"})
      }
      res.json({msg:post})
    }
    

    catch(err){

        if(err.kind==="ObjectId"){

            return res.status(404).json({msg: "there is no post"})
        }
        res.status(500).json({msg:"internal server error"})

    }
    
})

//delete post
//private

router.delete('/:post_id',[auth],async (req,res)=>{


    try{
      const post=await  Post.findById(req.params.post_id);

      if(!post){

        return  res.status(404).json({msg:"there is no post"})
       }
      if(post.user.toString()!==req.user.id){

        return res.status(401).json({msg:"you are unauthorized to perform a deletion on this post"});
      }

     

      await post.remove()
      res.json({msg:"post removed"})
      
    }
    

    catch(err){

        if(err.kind==="ObjectId"){

            return res.status(404).json({msg: "there is no post"})
        }
        res.status(500).json({msg:"internal server error"})

    }
    
})

// like a post

router.put('/like/:post_id',[auth],async (req,res)=>{

try{
    const post =await Post.findById({_id:req.params.post_id});

const likes=post.likes.filter((like)=>{return like.user.toString()===req.user.id})

if(likes.length>0){
res.status(400).json({msg:"post is already liked"})
}
else{
post.likes.unshift({user:req.user.id})
await post.save()    
res.json({postLikes: post.likes})
}
}
catch(err){
    res.status(500).json({msg:"internal server error"})
}
})
//unlike 
router.put('/unlike/:post_id',[auth],async (req,res)=>{

    try{
        const post =await Post.findById({_id:req.params.post_id});
    
    const likes=post.likes.filter((like)=>{return like.user.toString()===req.user.id})
    
    if(likes.length===0){
    res.status(400).json({msg:"post is not liked yet"})
    }
    else{

    const removeIndex = post.likes.map((like)=>{return like.user})    
    post.likes.splice(removeIndex.indexOf(req.user.id),1)
    await post.save()    
    res.json(post.likes)
    }
    }
    catch(err){
        res.status(500).json({msg:"internal server error"})
    }
    })
    

   //post comment

   router.post('/comment/:post_id',[auth,[body("text","text is required").not().isEmpty()]],async(req,res)=>{


    const errors = validationResult(req);
    if(!errors.isEmpty()){

    return    res.status(400).json({msg:errors.array()})
    }

    
   
    try{


        const  user = await User.findById(req.user.id).select("-password")

    const newComment = {
        name : user.name,
        text : req.body.text,
        date : req.body.date,
        user : user.id
    }
    

    const post = await Post.findById(req.params.post_id);
    post.comments.unshift(newComment);

     await post.save();
     //console.log(post)

     res.json({post })


    }
    catch(err){
        res.status(500).json({msg:"internal server error"})
    }

})





// delete comment

router.delete('/comment/:post_id/:comment_id',[auth],async (req,res)=>{


    try{
      const post=await  Post.findById(req.params.post_id);
     
      if(!post){
          return res.status(400).json({msg:"invalid post"})
      }
      
      let comment =null;

     post.comments.forEach(c => {
         if((c.user.toString()===req.user.id || req.user.id ===post.user.toString() ) && req.params.comment_id===c.id){
             return comment =c;
         }
     });
     
     if(!comment){
        return res.status(400).json({msg:"no such comment or you are unauthorized to perform deletion of this comment"})
     }

     const removeIndex = post.comments.map((c)=>c.id)

     const index = removeIndex.indexOf(req.params.comment_id)


     post.comments.splice(index,1)
     post.save()
     
     

      

      res.json({post})
      
    }
    

    catch(err){

        res.status(500).json({msg:"internal server error"})

    }
    
})


module.exports=router;

