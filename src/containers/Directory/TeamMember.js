import {  Box, Center } from "@chakra-ui/react"
import React, {useState, useEffect} from "react";
//import TeamPhoto from './TeamPhoto'
import { compose } from "recompose";
import { withFirebase } from "../../components/Firebase";
import { useParams } from 'react-router-dom'
import './usercard.css'



const TeamMember = ({firebase}) => { 
  const params = useParams() 
    console.log('Team member params', params)

    const [user, setUser] = useState([])
    useEffect(() => {

      firebase
      .users().doc(params.id).get()
      .then( snapshot =>{ 
        console.log('snapshot', snapshot.data()) 
        return (setUser(snapshot.data()))
      })

    },[]);
        
  return (
    <div className='image'>
      <Center>
        <Box maxW='sm' borderWidth='1px' overflow='hidden' p='4px' ml='10px' mr='10px' mt='8em' mb='8em' bg='grey'><br />
          Team Member
          <Center mt='1em'>
            <img src="https://bit.ly/sage-adebayo" alt="Segun Adebayo" ></img>
          </Center>
            <h2>{user.firstName} {user.lastName}</h2>
            <p>{user.developer}</p> 
            <p>{user.title}</p> 
            <p>{user.github}</p> 
            <p>{user.email}</p> 
            <p>{user.projects}</p> 
            <p>{user.mentor}</p> 
            <p>{user.remote}</p> 
            <p>{user.state}</p>
            <p>{user.country}</p> 
        </Box>
      </Center>
    </div>
    )
}

 export default compose(withFirebase)(TeamMember);
