import React ,{useState,useEffect,useContext,createRef} from 'react'
import { Button,Modal } from 'react-bootstrap'
//import GetProfilePic from '../GetProfilePic/getProfilePic'
import {context} from '../../contexts/context'
//import Comment from './comment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashAlt,faWindowClose } from '@fortawesome/free-solid-svg-icons'


const CustomModal = (props)=>{

    return(
        <div  >

<Modal.Dialog>
  <Modal.Header onClick={()=>{props.closeHandler()}} closeButton>
    
  </Modal.Header>

  <Modal.Body>
  <Button variant="danger" onClick={()=>{props.saveHandler()}}  >
       
       <FontAwesomeIcon  icon={faTrashAlt}  />
       {" Delete"}
   </Button>
  </Modal.Body>

  <Modal.Footer>
    <Button variant="secondary" onClick={()=>{props.closeHandler()}} >

        <FontAwesomeIcon icon={faWindowClose} /> {" Close"}
    </Button>
    
  </Modal.Footer>
</Modal.Dialog>
        </div>
    )
}

export default CustomModal