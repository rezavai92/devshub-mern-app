import React , {useState,useContext,useEffect} from 'react'
import {context} from '../../../contexts/context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEdit ,faUserCircle, faLink,faUser,faUserMd ,faGraduationCap,faBriefcase} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { Form,Button,Spinner } from 'react-bootstrap'
import './addEducation.css'
const AddEducation = (props)=>{

    const {loginToken} = useContext(context)
    const [school,setSchool] = useState("");
    const[degree,setDegree] = useState("");
    const [fieldOfStudy,setFeildOfStudy] = useState("");
    const[from,setFrom] = useState("");
    const[to,setTo] = useState("");
    const[current,setCurrent] = useState("");
    const[description,setDescription] = useState("");
    const[saving,setSaving] = useState(false)



    const schoolChangeHandler=(e)=>{
        setSchool(e.target.value)
    }
    const degreeChangeHandler = (e)=>{
        setDegree(e.target.value)
    }
    const fieldOfStudyChangeHandler=(e)=>{
        setFeildOfStudy(e.target.value)
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
    
    const saveEducationHandler = (e)=>{

        e.preventDefault()
      
       async function putData (){

            try{
                await  axios.put("api/profile/education",{
                    school,
                    degree,
                    fieldofstudy:fieldOfStudy,
                    from,
                    to,
                    current,
                    description
        
        
                },{
        
                    headers:{
                        xAuthToken : loginToken
                    }
                })
                props.resetEducation()
                // setTimeout(()=>{setSaving(false)},2500)

            }


            catch(error){
                window.alert("Please complete basic profile before addin education")
                setSaving(false)
            }
        }

        putData();
        setSaving(true)

       
    }

  
    return(<div className="addEducation" >
    
    <Form onSubmit ={(e)=>{saveEducationHandler(e)  ;  }} >

    
    <Form.Control type="text"onChange={ (e)=>{ schoolChangeHandler(e)} }  value={school}  required={true} placeholder="school" />
    <Form.Control type="text" onChange={ (e)=>{degreeChangeHandler(e)} } value={degree} required={true} placeholder="degree" />
    <Form.Control type="text" onChange={ (e)=>{fieldOfStudyChangeHandler(e)} }  value={fieldOfStudy} required={true}  placeholder="field of study" />
    <Form.Control type="date" onChange={ (e)=>{fromChangeHandler(e)} } value={from} required={true} placeholder="from" />
    <Form.Control type="date" onChange={ (e)=>{{toChangeHandler(e) }} } value={to}  placeholder="to" />
    <Form.Control type="text" onChange={ (e)=>{currentChangeHandler(e)} } value={current} placeholder="current" />
    <Form.Control type="text" onChange={ (e)=>{descriptionChangeHandler(e)} } value={description} placeholder="description" />

    <Button variant="info" className="addButton" type="submit" >Add</Button>
   
    </Form>
    {saving?
    <div className="spinner d-flex justify-content-center" >
       
        <Spinner 
        style= {{width: "3rem", height: "3rem"}} 
        size="lg" animation="border" role="status">
        <span style={{color:"black"}} className="sr-only">saving...</span>
        
    </Spinner> 
    
    </div>  : null }
    </div>
    
    )

}

export default AddEducation