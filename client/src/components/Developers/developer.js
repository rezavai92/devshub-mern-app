import React ,{useState,useEffect,useContext,createRef} from 'react'
import { Card,Button } from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import GetProfilePic from '../GetProfilePic/getProfilePic'
import {context} from '../../contexts/context'
import './developer.css'
//import Comment from './comment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserTie,faBuilding,faThumbsDown} from '@fortawesome/free-solid-svg-icons'

import axios from 'axios'

const Developer = (props)=>{
    const [all,setAll] =useState(true)
    
    const[userName,setUserName] =useState("");
   // const[id,setId] = useState(props.name)
    useEffect(()=>{

        async function fetchData (){

            try{

           const response= await axios.get(`/api/users/${props.profile.user}`);

           setUserName(response.data.username)
            }
            catch(error){

                console.log(error)
            }
        }

        fetchData()

    },[])

    const seeProfileHandler = ()=>{

        setAll(false)
    }

    return(<div className=" devCardBox" >
       {all ? <Card className="" >
  
  <Card.Body>
    
        
   
   {props.profile.photo?
   
<GetProfilePic
    
    height="50px" width="50px" borderRadius="50%" imgData={props.profile.photo } />
    : null
}
      <Card.Title>{userName}</Card.Title>
      <Card.Text>

          <FontAwesomeIcon  icon={faUserTie} />
          {" "} {props.profile.status}</Card.Text>
      <Card.Text>
      <FontAwesomeIcon  icon={faBuilding} />     
      {" "}  {props.profile.company}
      </Card.Text>

      <Button variant="info"  
      
      onClick ={seeProfileHandler}
      >See Full Profile </Button>
  </Card.Body>

  </Card> : 
  <Redirect to={`/developer/${props.profile.user}`} />
}


    </div>)
}

export default Developer