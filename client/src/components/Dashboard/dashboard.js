import React , {useState,useContext,useEffect} from 'react'
import {context} from '../../contexts/context'
import AddEducation from './AddEducation/addEducation'
import AddExperience from './AddExperience/addExperience'
import Education from './Education/education'
//import Index from '../Index/index'
import Experience from './Experience/experience'
import './dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEdit ,faUserCircle, faLink,faUser,faUserMd ,faGraduationCap,faBriefcase} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { Form,Button,Spinner } from 'react-bootstrap'
import { set } from 'js-cookie'
import { Redirect } from 'react-router-dom'
//import experience from 'e:/[freecoursesite.com] udemy -mern stack front to back full stack react, redux & node.js/5. post api routes/devconnector_s5/validation/experience'
const Dashboard = ()=>{

    
    const [img,setImg] = useState("")
    const [saving,setSaving] = useState(false)
    const {loginToken,setLoggedInUserId,setLoginToken} = useContext(context)
    const [detectAccountDeletion,setDetectAccountDeletion] = useState(false)
    const[deletionCheck,setDelectionCheck]=useState(false)
    const[educationDeletionCheck,setEducationDeletionCheck]=useState(false)
    const[education,setEducation] = useState("")
    const[photo,setPhoto] = useState("")
    const [experience,setExperience]=useState("")
    const[existingExperiences,setExistingExperiences] = useState([])
    const[existingEducation,setExistingEducation] = useState([])
    const[ username,setUsername ] = useState("")
    const[email ,setEmail ] = useState("")
    const[status ,setStatus ] = useState("")
    const[skill,setSkill ] = useState([])
    const[company ,setCompany ] = useState("")
    const[facebook , setFacebook ] = useState("")
    const[twitter,setTwitter ] = useState("")
    const[instagram ,setInstagram ] = useState("")
    const[github ,setGithub ] = useState("")
    const[ linkedin, setLinkedin ] = useState("")
    const[youtube,setYoutube ] = useState("")
    const[bio,setBio ] = useState("")
    const[ location,setLocation ] = useState("")
    const[ website, setWebsite] = useState("")
   // const[handle,setHandle ] = useState("")
    //const[ githubUsername,setGithubUsername ] = useState("")
    //const[saved,setSaved] = useState(false)
    const usernameChangeHandler = (e)=>{
        setUsername(e.target.value)
    }
    
    const statusChangeHandler = (e)=>{
        setStatus(e.target.value)
    }
    const skillChangeHandler = (e)=>{
        setSkill(e.target.value)
    }
    const githubChangeHandler  = (e)=>{
        setGithub(e.target.value)
    }
    const companyChangeHandler  = (e)=>{
        setCompany(e.target.value)
    }
    const facebookChangeHandler = (e)=>{
        setFacebook(e.target.value)
    }
    const instagramChangleHandler = (e)=>{
        setInstagram(e.target.value)
    }
    const twitterChangleHandler = (e)=>{
        setTwitter(e.target.value)
    }
    const youtubeChangeHandler = (e)=>{
        setYoutube(e.target.value)
    }
    const linkedinChangeHandler  = (e)=>{
        setLinkedin(e.target.value)
    }
    const bioChangleHandler = (e)=>{
        setBio(e.target.value)
    }
    const locationChangeHandler  = (e)=>{
        setLocation(e.target.value)
    }
    const websiteChangeHandler = (e)=>{
        setWebsite(e.target.value)
    }
    




    
useEffect(()=>{

  //  console.log("from useeffect of dashboard.js")
    async function fetchData (){

        try{
            const userInfo = await axios.get("/api/auth",{headers:{
                xAuthToken : loginToken
            }})  
            setUsername(userInfo.data.user.name)
           setEmail(userInfo.data.user.email)
           const myProfile= await axios.get("/api/profile/me",{
                headers:{
                    xAuthToken:loginToken
                }
            })

       







        console.log("user info ",myProfile)
          
        //    console.log("from dashboard.js ",myProfile);
            const {
                status,
                skills,
                company,
                bio,
                website,
                social,
                photo,
                experience,
                education,
                
                location,
            } = myProfile.data.profile
           // console.log("experience ae",experience)
           console.log(photo)
           if(photo){
            let base64Flag = 'data:image/jpeg;base64,';
            let imageStr =arrayBufferToBase64(photo.data.data);

            setImg(base64Flag + imageStr)
           }
           console.log("BAAAL")
            setBio(bio);
            
            setCompany(company);
            setStatus(status);
            setSkill([...skills]);
            setPhoto(photo)
            setWebsite(website);
           
            setLocation(location);
            console.log("BAAAL")
            if(social){
                const {facebook,twitter,github,instagram,youtube,linkedin} =social;
           // console.log("existing experience form use effect of dashboard ")
            setFacebook(facebook);
            setTwitter(twitter);
            setInstagram(instagram);
            setYoutube(youtube);
            setLinkedin(linkedin);
            setGithub(github);
            }
           
            const newExperiences=[...experience]
            const newEducation =[...education]
          // console.log("new ex are")
            setExistingEducation([...newEducation])
            setExistingExperiences([...newExperiences]);
            
        
           
        }
        catch(err){

            
        }
    }

    if(loginToken){
    
    fetchData()
    }

},[loginToken,experience,education,deletionCheck,educationDeletionCheck])

const detectEducationDeletion = ()=>{
    setEducationDeletionCheck(!educationDeletionCheck)
}
const detectDeletion =()=>{
setDelectionCheck(!deletionCheck)
    
}


const arrayBufferToBase64=(buffer)=> {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
}



//deactivate account
const deactivateHandler = ()=>{


    async function deleteUser (){

        try{

            await axios.delete('/api/profile',{headers:{

                xAuthToken:loginToken
            }})
          
            setLoggedInUserId("")
            setLoginToken("")
        }
        catch(error){

            console.log(error)
        }
    }

    deleteUser()
    setDetectAccountDeletion(true)
  
}


//save profile
const saveBasicProfileHandler = (e)=>{
    e.preventDefault();

    const data = new FormData();
            data.append("status",status);
            data.append("skills",skill);
            data.append("company",company);
            data.append("facebook",facebook);
            data.append("twitter",twitter);
            data.append("instagram",instagram);
            data.append("github",github);
            data.append("linkedin",linkedin);
            data.append("youtube",youtube);
            data.append("bio",bio);
            data.append("photo",photo);
            data.append("location",location);
            data.append("website",website);
           
    async function postData (){

        try{

            
            await axios.post("/api/profile",
            data,{
                headers:{
                    xAuthToken : loginToken,
                    
                }
            })
            
            
                setSaving(false)
    
            //alert("profile saved")
        }
        catch(err){


        }


    }

    postData()
    setSaving(true)
}

//education submit

const onEducationSubmit=(e)=>{

    setEducation("");
}
//experience submit
const onExperienceSubmit =(e)=>{
    //console.log("from reset experience")
    setExperience("");
    

}

//add Education

const addEducationHandler = ()=>{

 
    setEducation(<AddEducation resetEducation={onEducationSubmit} />);
  }

//add Experience
const addExperienceHandler = ()=>{

 
  setExperience(<AddExperience resetExperience={onExperienceSubmit} />);
}




//console.log("mapped existing experience ",mappedExistingExperiences)

return(<div className="container">

    {loginToken?
    <div>
       
    <h1 style={{textAlign:"center"}}>
        Dashboard
    </h1>
<hr></hr>
    <div className="form-data-basic" >

    <Form enctype="multipart/form-data" onSubmit= {(e)=>{saveBasicProfileHandler(e)} }>

        <div className="userinfo" >
            <img src={img} alt="user photo"/>
        <h2>
        <FontAwesomeIcon icon={faUserCircle} /> 
            {" " + "User"}</h2>
        <Form.Control type="text" value={username} disabled="true" onChange={(e)=>{usernameChangeHandler(e)}}  placeholder="Username" />
        <Form.Control type="text" value={email} disabled="true" placeholder="Email" />
        </div>

        <div> 
                        <label for="image">Upload Image</label> 
                        <input type="file" id="photo" 
                            name="photo" 
                            onChange={(e)=>{console.log(e.target.files[0]);
                            setPhoto(e.target.files[0])}} /> 
                            
            </div> 

<div class="status" >
<h2> 
<FontAwesomeIcon icon={faUserMd} /> 
{" "+"Employment" }</h2>
<Form.Control type="text" required={true} value={status} onChange={(e)=>{statusChangeHandler(e)}} placeholder="status" />
<Form.Control type="text" required={true} value={skill} onChange={(e)=>{skillChangeHandler(e)}} placeholder="skills" />

<Form.Control type="text"  value={company} onChange={(e)=>{companyChangeHandler(e)}} placeholder="company" />

</div>


<div className="social-link">
<h2> <FontAwesomeIcon icon={faLink} /> 
 {" "+"Social Link" }</h2>
<Form.Control type="text" value={facebook} onChange={(e)=>{facebookChangeHandler(e)}} placeholder="facebook profile" />
<Form.Control type="text" value={twitter} onChange={(e)=>{twitterChangleHandler(e)}} placeholder="twitter profile" />
<Form.Control type="text" value={linkedin} onChange={(e)=>{linkedinChangeHandler(e)}}  placeholder="linkedin profile" />
<Form.Control type="text" value={instagram} onChange={(e)=>{instagramChangleHandler(e)}}  placeholder="Instagram" />
<Form.Control type="text" value={youtube} onChange={(e)=>{youtubeChangeHandler(e)}}  placeholder="Youtube" />
<Form.Control type="text" value={github} onChange={(e)=>{githubChangeHandler(e)}}  placeholder="Github" />

</div>

<div className="about">
<h2>   <FontAwesomeIcon icon={faUser} /> {" "+"About"}  </h2>
<Form.Control type="text" value={bio} onChange={(e)=>{bioChangleHandler(e)}}  placeholder="bio" />  
<Form.Control type="text" value={website} onChange={(e)=>{websiteChangeHandler(e)}} placeholder="Website" />
<Form.Control type="text" value={location} onChange={(e)=>{locationChangeHandler(e)}} placeholder="location" />

</div>


<div className="save-profile-button" >
<Button  type="submit" >
Save Profile
</Button>

{saving?
    <div className="d-flex justify-content-center" >
       
        <Spinner 
        style= {{width: "3rem", height: "3rem"}} 
        size="lg" animation="border" role="status">
        <span style={{color:"black"}} className="sr-only">saving...</span>
        
    </Spinner> 
    
    </div>  : null }

</div>


</Form>

    </div>

  <div className="experience" >
    <div className="add-experience-header"> 
        <div>
                <h2>
            <FontAwesomeIcon icon={faBriefcase}  />
        {" Experience" }
            </h2>
        </div>
        <div className="addExperienceHandler" onClick={addExperienceHandler} >
            <h2><FontAwesomeIcon  icon={faEdit}   /></h2>
        </div>

    </div>

   {experience}
   {
        existingExperiences.map((e)=>{
            return (
                <Experience  
             key ={e._id}   
             id={e._id} 
             title={e.title} 
             company ={e.company}
             location ={e.location}
             from={e.from}
             to= {e.to}
             current ={e.current}
             description ={e.description}
             onDeletion={detectDeletion}
             >
         
             </Experience>
         
             )
         })
    } 

  </div>
 

  <div> 

  <div className="add-education-header add-experience-header"> 
        <div>
                <h2>
            <FontAwesomeIcon icon={faGraduationCap}  />
        {" "+"Education" }
            </h2>
        </div>
        <div className="addExperienceHandler" onClick={addEducationHandler} >
            <h2><FontAwesomeIcon  icon={faEdit}   /></h2>
        </div>

        
</div>

 
{education}
{existingEducation.map((edu)=>{


return(<Education

key={edu._id}
id={edu._id}
school={edu.school}
degree ={edu.degree}
fieldOfStudy={edu.fieldofstudy}
from={edu.from}
to={edu.to}
current={edu.current}
description={edu.description}
onDeletion={detectEducationDeletion}
>


</Education>)
})}
<div style={{marginTop:"2%", textAlign:"center"}} >
    <Button className="deactivate" variant="danger"
    
    onClick ={deactivateHandler} >

    Delete Account
    </Button>
</div>

</div>


      
     </div>
    : <Redirect to="/" /> }
 
 
</div>)

    
}

export default Dashboard