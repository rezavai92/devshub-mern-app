import React ,{useState,useEffect,useContext} from 'react'
import GetProfilePic from '../GetProfilePic/getProfilePic'
import {context} from '../../contexts/context'
import axios from 'axios'
import CustomModal from '../Modal/modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEllipsisH,faTrashAlt ,faComment,faThumbsUp,faThumbsDown} from '@fortawesome/free-solid-svg-icons'

import './comment.css'
const Comment = (props)=>{

    const [deleted,setDeleted] = useState(false)
    const [image,setImage] = useState("");
    const [showDeleteCommentModal, setShowDeleteCommentModal] = useState(false)
    const {loggedInUserId,loginToken} = useContext(context)
    useEffect (()=>{

        async function fetchData (){

            try{
              const postCreatorProfile =await axios.get(`/api/profile/user/${props.userId}`);
        
              setImage(postCreatorProfile.data.profile.photo);
           //   console.log("post creator ",postCreatorProfile.data.profile.photo)
            }
            catch(error){
        
              
            }
        
          }
        
        
          
            fetchData()
    },[])
    const makeDate = (date)=>{

        if(date){
         let newDate = new Date(date.toString());
         const returnableDate=newDate.getFullYear()+"-"+(newDate.getMonth()+1)+"-"+newDate.getDate()
        // console.log("returnable Date",typeof(returnableDate))
        return returnableDate
        }
        return ""
     } 

     const deleteCommentHandler= ()=>{


        async function deleteComment (){

            try{
                await  axios.delete(`/api/posts/comment/${props.postId}/${props.commentId}`,
                {headers:{
                    xAuthToken:loginToken
                }}
                )
               
                setShowDeleteCommentModal(false);
                setDeleted(true)
                

            }
            catch(error){


            }
        }
        deleteComment()
     }



    return (

        <div> 
{deleted? null:    
<div className="comment">





<div className="photo-comment">

    <div>
    {image?
        <div className="comment-pro-pic">
            <GetProfilePic borderRadius="50%" imgData ={image}  height ="50px" width ="50px" />
        </div>:null}
    </div>

   <div className="date-name-flex">
        <div style={{width:"60%"}} >
                <h5>{props.name}</h5>
                {props.text}

         </div>
         <div className="date" >
            {makeDate(props.date)}

            {

                props.userId===loggedInUserId || props.postOwner===loggedInUserId?
                <div className="delete-modal" onClick={()=>{

                    setShowDeleteCommentModal(true) 
                }} 
                ><FontAwesomeIcon icon={faEllipsisH} size="0.1x" />
                </div>:null
                }
        </div>

           
        
   </div>

   {showDeleteCommentModal?
            <div className="customModalPosition">
                <CustomModal
            title="Deleting Comment"
            bodyText ="Are you sure you want to delete this comment?"
            saveHandler={deleteCommentHandler}
            closeHandler={()=>{setShowDeleteCommentModal(false)}}
            >

            </CustomModal> 
                </div>: null
        }

</div>
    
            
           
        


     
     
    </div> 
}

</div>
    )

}

export default Comment

