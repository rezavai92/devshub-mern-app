import React , {useState,useContext,useEffect} from 'react'

import axios from 'axios'
import { Form,Button,Spinner } from 'react-bootstrap'
import {context} from '../../../contexts/context'
import './addExperience.css'

const AddExperience = (props)=>{
const [title,setTitle] = useState("");
const[company,setCompany] = useState("");
const [location,setLocation] = useState("");
const[from,setFrom] = useState("");
const [saving,setSaving] = useState(false)
const[to,setTo] = useState("");
const[current,setCurrent] = useState();
const[description,setDescription] = useState();

const {loginToken} = useContext(context)

useEffect(()=>{

    
},[])
const titleChangeHandler=(e)=>{
    setTitle(e.target.value)
}
const companyChangeHandler = (e)=>{
    setCompany(e.target.value)
}
const locationChangeHandler=(e)=>{
    setLocation(e.target.value)
}
const fromChangeHandler = (e)=>{
    setFrom(e.target.value)
}
const toChangeHandler=(e)=>{
    setTo(e.target.value)
}
const currentChangeHandler = (e)=>{
    setCurrent(e.target.value)
}

const descriptionChangeHandler = (e)=>{
    setDescription(e.target.value)
}

const saveExperienceHandler = (e)=>{
e.preventDefault();
async function putData (){
try{
    await axios.put("api/profile/experience",{

        title,
        company,
        location,
        from,
        to,
        current,
        description
    
    },{
        headers:{
            xAuthToken :loginToken
        }
    })
    //setWillSpin(false)
    props.resetExperience()
    setSaving(false)
   // setTimeout(()=>{setSaving(false)},2500)
}
catch(error){
    console.log(error)
    setSaving(false)
    window.alert("Please Complete basic profile before adding experience")
}

}

putData();
setSaving(true)

}
return(<div className="addExperience" >
    
    <Form onSubmit ={(e)=>{saveExperienceHandler(e);  }} >

    <Form.Control type="text"onChange={ (e)=>{ titleChangeHandler(e)} }  value={title}  required="true" placeholder="title" />
    <Form.Control type="text" onChange={ (e)=>{companyChangeHandler(e)} } value={company} placeholder="company" />
    <Form.Control type="text" onChange={ (e)=>{locationChangeHandler(e)} } value={location}  placeholder="location" />
    <Form.Control type="date" onChange={ (e)=>{fromChangeHandler(e)} } value={from} required="true" placeholder="from" />
    <Form.Control type="date" onChange={ (e)=>{toChangeHandler(e)} } value={to} placeholder="to" />
    <Form.Control type="text" onChange={ (e)=>{currentChangeHandler(e)} } value={current} placeholder="current" />
    <Form.Control type="text" onChange={ (e)=>{descriptionChangeHandler(e)} } value={description} placeholder="description" />
    
    <Button className="addButton" variant="info" type="submit" >Add</Button>
    </Form>
    {saving?
    <div className="spinner d-flex justify-content-center" >
       
        <Spinner 
        style= {{width: "3rem", height: "3rem"}} 
        size="lg" animation="border" role="status">
        <span className="sr-only">saving...</span>
        
    </Spinner> 
    
    </div>  : null }
    </div>)

}

export default AddExperience