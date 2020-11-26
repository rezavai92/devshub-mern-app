import { render } from '@testing-library/react'
import React,{useContext,useState,useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import {context} from '../../contexts/context'
import {Spinner} from 'react-bootstrap'

const Logout = ()=>{

    const {loginToken,confirmLogout} = useContext(context)
    //const [loggingOut,setLogginOut] = useState(false)
    const [redirect,setWillRedirect] = useState(false)
    function render(){


        return <Redirect to="/" />
    }
    useEffect(()=>{

        async function fetch (){

            try{
                axios.get('/api/auth/logout',{headers:{
                    xAuthToken : String(loginToken)
                }} )
            //    setTimeout(()=>{setLogginOut(false) },5000)
                confirmLogout()
                setWillRedirect(true)
               
            }
            catch(err){


            }
        }
        fetch()
      //  setLogginOut(true)

    },[loginToken])

    return(<div>



        {redirect? render(): null}
    </div>)

}

export default Logout