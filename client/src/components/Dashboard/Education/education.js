import React , {useState,useContext,useEffect} from 'react'
import {context} from '../../../contexts/context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEdit ,faUserCircle, faLink,faUser,faUserMd ,faGraduationCap,faBriefcase} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { Form,Button ,Spinner} from 'react-bootstrap'
import './education.css'

const Education = (props)=>{

    const {loginToken} = useContext(context)
    const [school,setSchool] = useState("");
    const[degree,setDegree] = useState("");
    const [fieldOfStudy,setFeildOfStudy] = useState("");
    const[from,setFrom] = useState("");
    const[to,setTo] = useState("");
    const[current,setCurrent] = useState("");
    const[description,setDescription] = useState();
    const [deleting,setDeleting] = useState(false);
    const[updating,setUpdating] = useState(false)
    useEffect(()=>{

        const makeDate = (date)=>{

            if(date){
            
             const d = new Date(date);

             const newDate=(d.getMonth()+1)+"-"+d.getDate()+"-"+d.getFullYear()
            // console.log("new date",newDate);
             return newDate
             
        
            }
            return ""
         }       
    setSchool(props.school)
    setDegree(props.degree)
    setFeildOfStudy(props.fieldOfStudy)
    setFrom(makeDate(props.from))
    setTo(makeDate(props.to))
    setCurrent(props.current)
    setDescription(props.description)     
    },[])



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
    
    const updateEducationHandler = (e)=>{
        e.preventDefault()
        const findCurrent = (val)=>{

            if(val==="true"){
                return true
            }
            else if (val==="false"){
                return false
            }
            return false
        }
     const putData = async ()=>{

        try{
            await  axios.put(`/api/profile/education/${props.id}`,{
                school,
                degree,
                fieldofstudy:fieldOfStudy,
                from,
                to,
                current:findCurrent(current),
                description
    
    
            },{
    
                headers:{
                    xAuthToken : loginToken
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

    //delete education

    const deleteEducationeHandler = ()=>{

        async function deleteData(){

          try {await axios.delete(`/api/profile/education/${props.id}`,{
                headers: {
                    xAuthToken : loginToken
                }
            })

            props.onDeletion()
            setTimeout(() => {
                setDeleting(false)
            }, 2500);
        }

        catch(error){


        }
        }

        deleteData()
        setDeleting(true)

    }
    

    return(<div className="education" >
    
    <Form onSubmit ={(e)=>{updateEducationHandler(e);  }} >

    
    <Form.Control type="text"onChange={ (e)=>{ schoolChangeHandler(e)} }  value={school}  required={true} placeholder="school" />
    <Form.Control type="text" onChange={ (e)=>{degreeChangeHandler(e)} } value={degree} required={true} placeholder="degree" />
    <Form.Control type="text" onChange={ (e)=>{fieldOfStudyChangeHandler(e)} }  value={fieldOfStudy} required={true}  placeholder="field of study" />
    <Form.Control type="text" onFocus={(e)=>{e.target.type="date"}} onChange={ (e)=>{fromChangeHandler(e)} } value={from} required={true} placeholder="from" />
    <Form.Control type="text" onFocus={(e)=>{e.target.type="date"}} onChange={ (e)=>{toChangeHandler(e);  } } value={to}  placeholder="to" />
    <Form.Control type="text" onChange={ (e)=>{currentChangeHandler(e)} } value={current} placeholder="current" />
    <Form.Control type="text" onChange={ (e)=>{descriptionChangeHandler(e)} } value={description} placeholder="description" />

    <div style={{marginTop:"1%"}} >
    <Button variant="success" type="submit" >Add</Button>
    <Button variant="warning" onClick={()=>{deleteEducationeHandler() }  }  >Delete </Button>
    </div>
    </Form>
    {updating?
    <div className="spinner d-flex justify-content-center" >
       
        <Spinner 
        style= {{width: "3rem", height: "3rem"}} 
        size="lg" animation="border" role="status">
        <span style={{color:"black"}} className="sr-only">saving...</span>
        
    </Spinner> 
    
    </div>  : null }
    {deleting?
    <div className=" spinner d-flex justify-content-center" >
       
        <Spinner 
        style= {{width: "3rem", height: "3rem"}} 
        size="lg" animation="border" role="status">
        <span style={{color:"black"}} className="sr-only">saving...</span>
        
    </Spinner> 
    
    </div>  : null }
    </div>)


}

export default Education