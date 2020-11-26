import React,{useState,useContext,useEffect} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import './home.css'
import {Form,Button} from 'react-bootstrap'
import {context} from '../../contexts/context';
import Post from './post'

const Home = ()=>{

    const [posts,setPosts]=useState([]);
    const [toShow,setToShow]=useState(null)
    const [error,setError] = useState(false)
    const[postChange,setPostChange] =useState("")
    const [postText,setPostText] = useState("")
    
    const {loginToken,confirmLogout} = useContext(context)
   // console.log(loginToken)
    useEffect( ()=>{

           async function fetchData (){
            
            try{
                //console.log(loginToken)
                

                const posts = await axios.get('/api/posts/',{headers:{
                    xAuthToken : String(loginToken)
                }}  )

                setPosts(posts.data.msg);
             //   console.log("fetched posts ",posts)
                setError(false)
               

               
               }  
            catch(err){
                console.log(err);
                const status = err.toString()
            
               const a=status.split("code")  
             //  console.log(a[1])
               if(a[1]==="401"){
                   confirmLogout()
               }          
                setError(true)

               }
           }
          if(loginToken){
            fetchData()
           // setToShow("hello")

          }
        
    },[loginToken,postChange])

    const postTextChangeHandler=(e)=>{
        setPostText(e.target.value)

    }

    const postSubmitHandler =(e)=>{

        e.preventDefault();
       
        async function fetchData (){

            try{

                await  axios.post('api/posts',{
                    text :postText
        
                },{headers:{xAuthToken:loginToken}})

                if(postChange===""){
                    setPostChange("unchanged")
                }
                else if(postChange==="unchanged"){
                    setPostChange("changed")
                }
               else if(postChange==="changed"){
                    setPostChange("unchanged")
                }
                setPostText("")


            }

            catch(err){
               
            }
        }
        fetchData()
    }
    const mappedPost = posts.map((post)=>{

        return(<div className="posts" key={post._id}>
            <Post text={post.text} id={post._id} name={post.name} 
            
            userId = {post.user}
            date={post.date} >

</Post>
        </div>)
    })

    return(<div className="container home">


     {loginToken?<div className="create-post" > 
    <Form onSubmit={(e)=>{postSubmitHandler(e)}} >
    <Form.Group controlId="exampleForm.ControlTextarea1">
    
    <Form.Control as="textarea" cols={3} rows={3} value={postText} placeholder="What's on your mind ?" onChange={postTextChangeHandler} />
  </Form.Group>
  <Button className="postButton" variant="primary" type="submit">
    Post
  </Button>
    </Form>
     </div> :<Redirect to="/" />}   
    {mappedPost}
    
    </div>
        )

}

export default Home