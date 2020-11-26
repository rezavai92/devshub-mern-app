import React , {useState,useContext,useEffect} from 'react'
import {context} from '../../contexts/context'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEdit ,faUserCircle, faLink,faUser,faUserMd ,faGraduationCap,faBriefcase} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { Form,Button } from 'react-bootstrap'
import { set } from 'js-cookie'
import { Redirect } from 'react-router-dom'

const GetProfilePic = (props)=>{

    const {loginToken} = useContext(context)
    const [image,setImage] = useState("")
   // const [imageData,setImageData] = useState({data:{data:""}})

    const arrayBufferToBase64=(buffer)=> {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    }

    useEffect(()=>{

        

               

                
              if(props.imgData){
                let base64Flag = 'data:image/jpeg;base64,';
                let imageStr =arrayBufferToBase64(props.imgData.data.data);

                setImage(base64Flag + imageStr)
        
             //   console.log(props.imgData.data.data)

              }

    },[])

    return (<div>
        <img src={image} height={props.width} width={props.height}
        style={{borderRadius:`${props.borderRadius}`}}
        />
    </div>)
}

export default GetProfilePic