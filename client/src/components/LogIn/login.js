import React,{useState,useContext} from 'react'
import {Redirect} from 'react-router-dom'

import axios from 'axios'
import {Form,FormControl,Button} from 'react-bootstrap'
import {context} from '../../contexts/context'
import Error from'./error'
import './login.css'

const Login = ()=>{

    const [email,setEmail]=useState("");
    const[password,setrPassword] = useState("");
    const [redirectHome,setRedirectHome]=useState(false);
    const [redirectError,setRedirectError]=useState(false);
    const {confirmLogin} = useContext(context)

   // console.log("from log in")
    
    const render = ()=>{
        if(redirectHome)
       {
       return <Redirect to="home" /> 
    }
    else if (redirectError){
        return <Redirect to="login/error" />
    }
      }
      
    const emailChangeHandler = (e)=>{
        setEmail(e.target.value)
    }
    const passwordChangeHandler = (e)=>{

        setrPassword(e.target.value)
    }

    const formSubmitHandler = async (e)=>{
        e.preventDefault();

        try{
            const loginToken=await axios.post('api/auth',{email,password})

            console.log("logintoken from login.js",loginToken.data.token)

            const user = await axios.get('api/auth',{

                headers:{
                    xAuthToken:loginToken.data.token
                }
            })
            console.log("user is",user)

            confirmLogin(loginToken.data.token,user.data.user._id);
            setEmail("");
            setrPassword("");
            setRedirectHome(true);
            setRedirectError(false);
        }
        catch(err){
            console.log(err)
            setRedirectHome(false)
            setRedirectError(true)
            
        }

        
    }
    return(<div className="login">

      <h1>Login</h1>
<Form onSubmit={(e)=>{formSubmitHandler(e)}} >
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" value={email} required={true} onChange={(e)=>{emailChangeHandler(e)}} placeholder="Enter email" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" required={true} placeholder="Password" value={password} onChange ={(e)=>{passwordChangeHandler(e)}} />
  </Form.Group>
  <Form.Group controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Log In
  </Button>
</Form>
{render()}
    </div>)
}

export default Login