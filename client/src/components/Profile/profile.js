import React ,{useState,useEffect,useContext} from 'react'
import { Button } from 'react-bootstrap'
import "./profile.css";
import Post from '../Home/post'
import {context} from '../../contexts/context'
//import Comment from './comment'
//import './developers.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faGithub ,faFacebook,faTwitter,faInstagram,faYoutube,faLinkedin } from '@fortawesome/free-brands-svg-icons'

import {faBriefcase,faEye,faGraduationCap, faLink,faUser,faUserTie,faMapMarkerAlt,faBuilding, faFileImage} from '@fortawesome/free-solid-svg-icons'
import axios from  "axios"
import GetProfilePic from '../GetProfilePic/getProfilePic'
//import Experience from '../Dashboard/Experience/experience'
const Profile = ()=>{

    const path =window.location.pathname;
    const {loginToken} = useContext(context)
   // const [willShowDetail,setwillShowDetail] = useState(false)
    const[userName,setUserName] =useState("");
    const[status ,setStatus ] = useState("");
    const[image,setImage] = useState("");
    const[skills,setSkills ] = useState([])
    const[company ,setCompany ] = useState("")
    const[social,setSocial] = useState({})
    
    const[bio,setBio ] = useState("")
    const[ location,setLocation ] = useState("")
    const[ website, setWebsite] = useState("")
   // const[handle,setHandle ] = useState("")
    //const[ githubUsername,setGithubUsername ] = useState("")
    const[experience,setExperience] =useState([])
    const [education,setEducation] = useState([])
    const [posts,setPosts] = useState([])

    const[willShowAbout,setWillShowAbout] = useState(true);
    const[willShowPosts,setWillShowPosts] = useState(false);



    
   const pathsep= path.split("/");

   const id = pathsep[2] ;

  useEffect(()=>{

 async function fetchData(){

    try{

        const dev= await axios.get(`/api/profile/user/${id}`);

        const response= await axios.get(`/api/users/${dev.data.profile.user}`);
     //   console.log("from profile.js ",dev)

        setImage(dev.data.profile.photo)
        setUserName(response.data.username);
        setSkills(dev.data.profile.skills);
        setStatus(dev.data.profile.status);
        setCompany(dev.data.profile.company);
        setSocial(dev.data.profile.social);


        // setFacebook(dev.data.profile.social.facebook);
        // setTwitter(dev.data.profile.social.twitter);
        // setInstagram(dev.data.profile.social.instagram);
        // setLinkedin(dev.data.profile.social.linkedin);
        // setYoutube(dev.data.profile.social.youtube);
        setBio(dev.data.profile.bio);
        setLocation(dev.data.profile.location);
        setWebsite(dev.data.profile.website);
        //setGithubUsername(dev.data.profile.githubusername);
        //setHandle(dev.data.profile.handle);
        setExperience(dev.data.profile.experience);
        setEducation(dev.data.profile.education);

        
        
    }
    catch(error){

    }

    
 }
 fetchData()

  },[])


  const postHandler = ()=>{

    setWillShowPosts(true)
    setWillShowAbout(false)
    
    async function fetchData (){

        try{

          const response=  await axios.get(`/api/posts/all/${id}`,{

            headers:{

                xAuthToken:loginToken
            }
          });

          const users_Posts = response.data.reverse()
          setPosts(users_Posts)
        
       //   console.log("posts of this user ",posts)
        


        }

        catch(error){


            alert("Log in  required to see details about user's activities ")
        }
    }

    fetchData()

  }

const aboutHandler = ()=>{

    setWillShowAbout(true)
    setWillShowPosts(false)

    
}
 
    return(
    <div>
    <div className="container">

            <div className="top-profile" >

               <div className="name-photo">
                  {image?
                   <GetProfilePic  imgData={image} borderRadius="50%" border="2px solid silver"  height="250px" width="250px" />:null}
                   <h2>{userName}</h2>
               </div>
              <div className="whereabouts" >
              <p className="top-profile-text" >
                    <FontAwesomeIcon icon={faUserTie}  color="silver" />
                    { " "+ status}</p>
                <p  className="top-profile-text" >
                    <FontAwesomeIcon  icon={faBuilding} color="silver" />
                    {" "+company}</p>
                {location?  <p  className="top-profile-text"> 
                <FontAwesomeIcon  icon={faMapMarkerAlt} color="silver" />
                 { " from "+ location} </p>:null}
                {website?
                
                <p> 
                <FontAwesomeIcon icon={faLink}  color="silver" />
                    {" "} <a href={website}>{website} </a>
                    
                </p>
                :null}
              </div>
            </div>
            
            <div className="skills" >
                <h6>Top Skills :</h6>
                {skills.map((s)=>{return(<div className="skill" > 
                    {s}
                </div>)}) }
            </div>
           {social.github||social.facebook||social.instagram||social.twitter||social.youtube||social.linkedin?
           
           
           <div className="social-links" >
               <h6>Social Links : </h6>
               {social.facebook?
               <div>
               <a href={social.facebook}>
                   <FontAwesomeIcon icon ={faFacebook} />
               </a>
            </div>
               :null}
               {social.github?
               <div>
               <a href={social.github}>
                   <FontAwesomeIcon icon ={faGithub} color="black" />
               </a>
            </div>
               :null}

              {social.twitter? <div>
               <a href={social.twitter}>
                      <FontAwesomeIcon icon={faTwitter} color="blue" />
                  </a>
               </div>:null}
              {social.instagram? <div>
               <a href={social.instagram}>
                      <FontAwesomeIcon icon={faInstagram} color="orange" />
                  </a>
               </div>:null}
               
               {social.linkedin?<div>
               <a href={social.linkedin}>
                      <FontAwesomeIcon icon={faLinkedin} color="black" />
                  </a>
               </div>:null}

              {social.youtube? <div>
               <a href={social.youtube}>
                      <FontAwesomeIcon icon={faYoutube} color="red" />
                  </a>
               </div>:null}
           </div> : null
           

        }
        <hr style={{margin:"7px"}} />


        <div className="about-posts" >
            <div className="about">
              <Button variant="light" 
              
              onClick={aboutHandler}
              
              > <FontAwesomeIcon icon={faUser}  /> {" About"}</Button>
            </div>


            <div className="">
               <Button variant="light"
                onClick={postHandler}> 
                  <FontAwesomeIcon icon={faEye} />  
                 {" Timeline"}</Button>
            </div>

        </div>
        <hr style={{margin:"7px"}} />

        {willShowPosts && posts.length>0?   
        
  <div  className="pro-posts" > 

         {  posts.map((post)=>{ 
    return (<Post
    
       key={post._id} text={post.text}
        id={post._id}
        name={post.name}
         date={post.date}
         userId= {post.user}
    >

    </Post>)
    
} )}   

  </div>
    :null
    }
                        
{ willShowAbout?
    <div>
    <div className="pro-education">
        <h2>
            <FontAwesomeIcon icon={faGraduationCap} />
            {" Education"}</h2>
        <hr />

        <div className="educationFlex"> 

        {  education.map((edu,index)=>{
            return(<div className="mappedEducaionPro" key={edu._id} >

                <div>
                    <h3>  {index+1}.</h3>    
                </div>
                <div>
                   <p>{"School : "} <span style={{color:"blue"}} >
                        {edu.school}
                       </span>
                        </p>                    
                    </div>
                <div>

                    <p>
                    {"Degree : "} {edu.degree}
                    </p>
                </div>
                <div>
                    
                <p>{"Field Of Study : "} <span style={{color:"blue"}} >
                        {edu.fieldofstudy}
                       </span>
                       </p>
                
                </div>
                <div>
                     <p>
                    {"From : "}
                <span style={{color:"blue"}}>{edu.from} </span>
                </p>
                </div>
                
                
               
                <div>
                     <p>
                    {"To : "}
                <span style={{color:"blue"}}>{edu.from} </span>
                </p>
                </div>


                <div>  
                <p>{"Current : "+edu.current}</p>
                    
                    </div>
                <div>


                <p>{"Description : "+edu.description}</p>
                </div>
                </div>)
        })}


         </div>
        
    </div>
    <hr/>

    <div className="experience-pro">
        <h2>
            <FontAwesomeIcon icon={faBriefcase}/>
            {" Experience"}
        </h2>
        <hr/>

        {
            
            experience.map((ex,index)=>{
           
                
                return(<div className="mappedEducationPro">
                    <div>
                        <h3>  {index+1}.</h3>    
                    </div>
                    
                    <div>
                        <p>
                        {"Title : "+ex.title}       
                        </p>
                    </div>

                    <div>
                    <p>
                    {"Company : "+ex.company}        
                  </p>
                    </div>

                    <div>
                    <p>
                        {"Location : "+ex.location}         
                      </p>
                    </div> 
                    <div>
                    <p>
                    {"From : "+ex.from}               
                    </p>
                    </div>

                    <div>
                    <p>
                    {"To : "+ex.to}               
                      </p>
                    </div>
                    
                    <div>
                    <p>
                    {"Current : "+ex.current}          
                   </p>

                   <p>
                    {"Description : "+ex.description}          
                   </p>

                    </div>

              </div>)
            })
        }

    </div>
    {bio?<div className="bio" >
<hr/>
<h2> 
    <FontAwesomeIcon icon={faUser} />
     {" Bio"}</h2>
<hr/>
<p>
    {bio}
</p>
</div>:null
}

    </div> : null 
    
    
}






 </div>



</div>
    
    )

}

export default Profile