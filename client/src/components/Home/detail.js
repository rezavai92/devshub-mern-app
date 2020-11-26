import React ,{useState,useEffect,useContext,createRef} from 'react'
import { Form,Button,Modal } from 'react-bootstrap'
import GetProfilePic from '../GetProfilePic/getProfilePic'
import {context} from '../../contexts/context'
import Comment from './comment'
import CustomModal from '../Modal/modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEllipsisH,faTrashAlt ,faComment,faThumbsUp,faThumbsDown} from '@fortawesome/free-solid-svg-icons'

import axios from 'axios'
import './detail.css'
const Detail = (props)=>{

    const myRef = createRef()
    const postRef = createRef()
    const [showDeleteModal,setShowDeleteModal] = useState(false)
    const [detail,setDetail] = useState({ user:"", name:"",date:"",text:"",likes:[],comments:[] })
    const[commentText,setCommentText] = useState("")
    const[commentChange,setCommentChange]= useState("")
    const [likeChange,setLikeChange] =useState("");
    const [likeButtonText,setLikeButtonText] =useState("")
    const [unlikeButtonText,setUnLikeButtonText] =useState("")
    const {loginToken,loggedInUserId} = useContext(context)
  //  console.log("beginning of detail.js",commentChange)
    useEffect(()=>{

     //   console.log("set comment change from useeffect",commentChange)
        async function fetchData (){
            
            try{
    
                
                const post = await axios.get(`/api/posts/${props.id}`,{
                    headers:{
                        xAuthToken : loginToken
                    }
                })
               // console.log(post)
                if(post.data.msg!="there is no post"){

                    setDetail(post.data.msg)

                }
                else{
                    setDetail (null)
                }
               const user = loggedInUserId;

            //    console.log("user is",user)

             let userLiked=false;
               post.data.msg.likes.forEach((u)=>{
                 
                
                if(u.user===user){
                    userLiked= true
                //    console.log("inside foreach",u.user)
                }
            }
                ) 

              //  console.log("userliked",userLiked)
             if(userLiked){

                setLikeButtonText("Unlike")
               // setUnLikeButtonText("unlike")
             }
             else{
                 setLikeButtonText("Like")
               //  setUnLikeButtonText("unliked")
             }
                
                
            }
            catch(error){
    
    
            }
        }
        if(loginToken){
            fetchData()
           
        }
        //setCommentChange("")

    },[likeChange,commentChange,showDeleteModal])

//delete post 

const deletePostHandler = ()=>{

    async function deletePost  (){


        try{

            await axios.delete(`/api/posts/${detail._id}`,{
                headers:{
                    xAuthToken:loginToken
                }
            });
            
          //  console.log("post ref",postRef.current)
          setShowDeleteModal(false)
            
        }

        catch(error){
       //  console.log("error ")  
       
        }
    }

    deletePost()

}


//commentTextChangeHandler

const commentTextChangeHandler=(e)=>{

    setCommentText(e.target.value)

}
//post comment handler
const postCommentHandler = (e)=>{

    e.preventDefault()
    async function fetchData(){

        try{
         await   axios.post(`/api/posts/comment/${props.id}`,
            {

                text:commentText
                

            },{

                headers:{
                    xAuthToken:loginToken
                }
            })
           // console.log("comment change",commentChange)
           if(commentChange==="submitted"){
               setCommentChange("unsubmitted")
           }
           else if (commentChange===""){
               setCommentChange("unsubmitted")
           }
           else if (commentChange==="unsubmitted"){
               setCommentChange("submitted");
           }
           // console.log("comment change",commentChange)
            setCommentText("")
        }

        catch(err){

            console.log(err)
        }
    }

    fetchData()
}

    const likePostHandler = ()=>{

        async function fetchData(){
            try{
                if(likeButtonText==="Like"){
                    await axios.put(`/api/posts/like/${props.id}`,{}
                    ,{headers:{
                           xAuthToken: String(loginToken)
                       }})
                       setLikeChange("liked")
                      // setLikeButtonText("Unlike")

                }
                else if (likeButtonText==="Unlike"){
                    await axios.put(`/api/posts/unlike/${props.id}`,{}
                    ,{headers:{
                           xAuthToken: String(loginToken)
                       }})
                      //setLikeButtonText("Like")
                       setLikeChange("unliked")

                }
                
             

            }

            
            catch(error){
                console.log(error)
            }

        }   
        
            fetchData()
    
    
    }

    // const unlikePostHandler = ()=>{

    //     async function fetchData(){
    //         try{

    //             console.log('seeing when it runs (1)')
             
    //             console.log('seeing when it runs')
    //             setLikeChange("unliked")
               

    //         }
    //         catch(error){
    //             console.log(error)
    //         }

    //     }   
        
    //         fetchData()
    
    
    // }

  //  console.log("detail.js",props.detail.comments)
  let mappedComments =""; 
  if(loginToken && detail ){
     mappedComments = detail.comments.map((c)=>{
        return (<div key={c._id} >
            <Comment  postOwner={detail.user} 
            userId={c.user}
             name={c.name}
             postId={detail._id}
              text={c.text}
              commentId={c._id} 
              date={c.date} >

            </Comment>
        </div>)
    })

  }
    return (<div ref={postRef} className="post-comment">

        {

            detail?
            <div className="post" >
           {props.image? <div>
                <GetProfilePic  imgData={props.image} height="50px" width ="50px" borderRadius ="50%" />
            </div>:null}
           {

               detail.user===loggedInUserId?
                <div className="delete-modal" onClick={()=>{

                   setShowDeleteModal(true) 
                }} style={{float:"right"}} 
                 ><FontAwesomeIcon icon={faEllipsisH} size="0.1x" /></div>:null
           }
        {
            showDeleteModal?<CustomModal
            title="Deleting Post"
            bodyText="Are you sure you want to delete the post"
            saveHandler={deletePostHandler}
            closeHandler={()=>{setShowDeleteModal(false)}}
            >

            </CustomModal> : null
        }

            <div>
               
                <h5>{detail.name}</h5>
                <p>{detail.date}</p>
            </div>
            <div>
            <p>
                {detail.text}
            </p>
            </div>
        
        <div>
            {detail.likes.length} <FontAwesomeIcon icon={faThumbsUp} color="blue" />
        </div>


        <hr style={{margin:"0.7% 0% "}} ></hr>


       <div className="like-comment-share" > 

       <div className="likeButton" >
            <Button variant="light" className="react"  onClick={()=>{likePostHandler()}} > 
            <FontAwesomeIcon
            icon={likeButtonText==="Like"?faThumbsUp :faThumbsDown } />
            {" "+likeButtonText}
            </Button>
        
        </div>

        <div className="commentButton"  onClick={()=>{myRef.current.focus()}} >
            <Button variant="light" className="react"  > 
            <FontAwesomeIcon icon ={faComment}
            />
              {" "+"Comment"}
            </Button>
        
        </div>

       </div>
        <hr style={{margin:"0.8% 0%"}} ></hr>
        
        {mappedComments}

        <div className="leaveComment">
        <Form onSubmit={(e)=>{postCommentHandler(e)}} >
            <Form.Group controlId="exampleForm.ControlTextarea1">
           
            <Form.Control as="textarea" ref={myRef}
            cols={3} rows={3} value={commentText}
             onChange={(e)=>{commentTextChangeHandler(e)}} 
             placeholder="Leave a Comment"
             />
        </Form.Group>
            <Button
            className="postButton"
            variant="primary"
            
            type="submit">
            Comment
            </Button>
    </Form>
      
        </div>
        </div>
            : null
        }
        
        
    </div>)
}

export default Detail