import React, { useState ,useContext, useEffect} from 'react'
import { Redirect } from 'react-router-dom'
import {context} from '../../contexts/context'
import Login from '../LogIn/login'

const Index = ()=>{

     const {loginToken} = useContext(context)
    
    console.log('login token is',loginToken)
    return(<div>

       {loginToken? <Redirect to="/home" /> 
    : <Login /> 
    }
    </div>)
}

export default Index