import React,{useContext,useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPaperclip} from '@fortawesome/free-solid-svg-icons'
import {Navbar,Nav,NavDropdown,Form,FormControl,Button} from 'react-bootstrap'
import {context} from '../../contexts/context'
const Navigation = ()=>{

   console.log("from navigation")

  const {loginToken,confirmLogout,loggedInUserId} = useContext(context)
  
return (<div>
    <Navbar bg="dark" variant="dark"  expand="lg">
  <Navbar.Brand ><h3> <FontAwesomeIcon icon={faPaperclip}/> DevsHub</h3> </Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link ><Link to="/home" style={{color:"white"}} >Home</Link></Nav.Link>
      {loginToken?<Nav.Link ><Link to="/dashboard" style={{color:"white"}}  >Dashboard</Link></Nav.Link>:null }
      <Nav.Link ><Link to="/developers" style={{color:"white"}}  >Developers</Link></Nav.Link>

    </Nav>
     
     {!loginToken?
     <Nav>
      <Nav.Link ><Link to="/login" style={{color:"white"}}  >Log In</Link></Nav.Link> 
      <Nav.Link  ><Link to="/signup" style={{color:"white"}}  >Sign Up</Link></Nav.Link>
      </Nav> 
      :
      <Nav>
              <Nav.Link ><Link to={`/developer/${loggedInUserId}`} style={{color:"white"}}
      
       >User</Link></Nav.Link>
      <Nav.Link ><Link to="/login" style={{color:"white"}}
      onClick={()=>{confirmLogout()}}
       >Log Out</Link></Nav.Link>
      </Nav>
    }
  </Navbar.Collapse>
</Navbar>
    </div>)

}

export default Navigation