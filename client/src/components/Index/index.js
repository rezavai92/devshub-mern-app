import React, { useState ,useContext, useEffect} from 'react'
import { Button } from 'react-bootstrap'
import { Redirect,Link } from 'react-router-dom'
import {context} from '../../contexts/context'

import './index.css'
const Index = ()=>{

     const {loginToken} = useContext(context)
    
    console.log('login token is',loginToken)
    return(<div>

       {loginToken? <Redirect to="/home" /> 
    :<>
     <div  className="cover"> 
      
      </div>
      <div className="overlay" >
      <div className="link-flex" >
            <div>
               <Link to="/login" style={{color:"black"}} >Log In</Link>
            </div>
            <div>
               <Link to="/signup" style={{color :"black"}} >Sign Up</Link>
            </div>
         </div>
      </div>

    </>
    }
    </div>)
}

export default Index