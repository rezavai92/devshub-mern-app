import React ,{useState,useEffect,useContext,createRef} from 'react'
import { Form,Button,InputGroup,FormControl } from 'react-bootstrap'
import Developer from './developer'
import {context} from '../../contexts/context'
//import Comment from './comment'
import './developers.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserTie} from '@fortawesome/free-solid-svg-icons'

import axios from 'axios'

const Developers = ()=>{

    const {loginToken} = useContext(context)
    const [searchTerm,setSearchTerm] =useState("")
    
    const [developers,setDevelopers] = useState([])

    useEffect(()=>{
        const fetchData = async ()=>{

            try{

                const profiles = await axios.get("api/profile")

                const allProfiles =profiles.data.allProfiles;


                setDevelopers([...allProfiles])
             //   console.log(allProfiles)
            }
            catch(error){


            }
        }

        fetchData()


    },[])

    const searchTermChangeHandler=(e)=>{

        setSearchTerm(e.target.value)
    }

    const findUserHandler = (e)=>{

        e.preventDefault();
        
        async function getData (){

            try{

                const profiles = await axios.get(`api/profile/searched/${searchTerm}`);

                if(profiles.length===0){

                    setDevelopers([])
                }
                else {
                    setDevelopers(profiles.data.profiles)
                }


            }
            catch(error){
                console.log(error)

            }
        }
        getData()

    }
    const mappedDevelopers = developers.map((d)=>{

        return(<div className="" key={d._id} >
            <Developer
           profile={d}
             ></Developer>
        </div>)
    })

    return(<div className="cotainer  developers">

    <Form onSubmit={(e)=>{findUserHandler(e)}} >
    <InputGroup className="mb-3" >
    <FormControl
      placeholder="Search by  Username"
      aria-label="Recipient's username"
      onChange={ (e)=> {searchTermChangeHandler(e)}}
      aria-describedby="basic-addon2"
    />
     <InputGroup.Append>
      <Button id="basic-addon2" type="submit" variant="info" >search</Button>
    </InputGroup.Append>
    </InputGroup>

    </Form>

    {mappedDevelopers}
    </div>
        )


}

export default Developers