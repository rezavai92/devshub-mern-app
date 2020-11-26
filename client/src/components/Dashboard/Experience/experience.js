import React ,{useState,useContext,useEffect} from 'react'
import axios from 'axios'
import { Form,Button,Spinner } from 'react-bootstrap'
import {context} from '../../../contexts/context'

import './experience.css'
const Experience = (props)=>{
    const {loginToken} = useContext(context)
    const [title,setTitle] = useState("");
    const[company,setCompany] = useState("");
    const [location,setLocation] = useState("");
    const[deleting,setDeleting] =  useState(false);
    const[updating,setUpdating] = useState(false);
    const[from,setFrom] = useState("");
    const[to,setTo] = useState("");
    const[current,setCurrent] = useState("");
    const[description,setDescription] = useState();

   // console.log("from experience.js ", props)
    useEffect(()=>{
   // console.log("from use effect of add experience")

    const makeDate = (date)=>{

        if(date){
         let newDate = new Date(date.toString());
         const returnableDate=(newDate.getMonth()+1)+"-"+newDate.getDate()+"-"+newDate.getFullYear()
        // console.log("returnable Date",typeof(returnableDate))
        return returnableDate
        }
        return ""
     }    
    setTitle(props.title);
    setCompany(props.company);
    setLocation(props.location);
    setFrom( makeDate(props.from));
    setTo(makeDate(props.to));
    setCurrent(props.current);
    setDescription(props.description);    
    },[loginToken])
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

    //delete Experience
    const deleteExperienceHandler=()=>{
        
        async function deleteData (){

       // console.log("from delete experience",props.id)    
            try{
              await  axios.delete(`api/profile/experience/${props.id}`,{headers:{
                    xAuthToken:loginToken
                }})

                props.onDeletion()
              //  console.log("after props.ondeletion")
                setTimeout(()=>{setDeleting(false)},2500)
        
            }
            catch(error){

                console.log(error)

            }
        }

        deleteData()

        setDeleting(true)

    }


    //save experience
    const saveExperienceHandler = (e)=>{
    e.preventDefault();

    const findCurrent = (val)=>{

        if(val==="true"){
            return true
        }
        else if (val==="false"){
            return false
        }
        return false
    }

    async function putData (){
    try{
        await axios.put(`api/profile/experience/${props.id}`,{
    
            title,
            company,
            location,
            from,
            to,
            current:findCurrent(current),
            description
        
        },{
            headers:{
                xAuthToken :loginToken
            }
        })

       
           setUpdating(false)
    }
    
    catch(error){
        console.log(error)
    }
    
    }
    
    putData()
    setUpdating(true)
    }



return(<div className="experience" >
    
    <Form onSubmit ={(e)=>{saveExperienceHandler(e);  }} >

    
    <Form.Control type="text"onChange={ (e)=>{ titleChangeHandler(e)} }  value={title}  required="true" placeholder="title" />
    <Form.Control type="text" onChange={ (e)=>{companyChangeHandler(e)} } value={company} placeholder="company" />
    <Form.Control type="text" onChange={ (e)=>{locationChangeHandler(e)} } value={location}  placeholder="location" />
    <Form.Control type="text" onFocus={(e)=>{e.target.type="date"}} onChange={ (e)=>{fromChangeHandler(e)} } value={from} required="true" placeholder="from" />
    <Form.Control type="text" onFocus={(e)=>{e.target.type="date"}} onChange={ (e)=>{{toChangeHandler(e) }} } value= {to} placeholder="to" />
    <Form.Control type="text" onChange={ (e)=>{currentChangeHandler(e)} } value={current} placeholder="current" />
    <Form.Control type="text" onChange={ (e)=>{descriptionChangeHandler(e)} } value={description} placeholder="description" />

    <div style={{marginTop:"1%"}} >
    <Button variant="success" type="submit" >update</Button>
    <Button variant="warning" onClick={()=>{deleteExperienceHandler() }  }  >Delete </Button>
    
    </div>
    </Form>

    {updating?
    <div className="d-flex justify-content-center" >
       
        <Spinner 
        style= {{width: "3rem", height: "3rem"}} 
        size="lg" animation="border" role="status">
        <span style={{color:"black"}} className="sr-only">saving...</span>
        
    </Spinner> 
    
    </div>  : null }
    {deleting?
    <div className="d-flex justify-content-center" >
       
        <Spinner 
        style= {{width: "3rem", height: "3rem"}} 
        size="lg" animation="border" role="status">
        <span style={{color:"black"}} className="sr-only">saving...</span>
        
    </Spinner> 
    
    </div>  : null }
   
    </div>)


}

export default Experience