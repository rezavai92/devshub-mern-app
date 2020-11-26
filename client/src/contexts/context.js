import React, {createContext,useState,useEffect} from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
export const context = createContext();


const ContextProvider = (props)=>{




const [token,setToken] =useState("");
const[loggedInUserId,setLoggedInUserId]=useState(null)
const[loginToken,setLoginToken] = useState("");
//console.log("from context")


useEffect(()=>{

setLoginToken(Cookies.get("token"))
setLoggedInUserId(Cookies.get("user"))
},[])
const registerUser = (token)=>{

    setToken(token);

}

const confirmLogin = (token,loggedInUserId)=>{

    setLoginToken(token);
    setLoggedInUserId(loggedInUserId)

}
const confirmLogout = ()=>{
    
    async function fetch (){

        try{
            await axios.get('/api/auth/logout',
           {headers:{
               xAuthToken :loginToken
           }} ,
            )
            setLoginToken(Cookies.get("token"))
            setLoggedInUserId(Cookies.get("user"))
            
        }
        catch(err){


        }
    }
    fetch()

    }

    return(<div>

        <context.Provider value={{setLoginToken,setLoggedInUserId, loggedInUserId, loginToken,registerUser,confirmLogin,confirmLogout}} >

            {props.children}
        </context.Provider>
    </div>)
}


export default ContextProvider

