import {  Box, Center } from "@chakra-ui/react"
import React, {useState, useEffect} from "react";
import { compose } from "recompose";
import { withFirebase } from "../../components/Firebase";
import { useParams } from 'react-router-dom'
import './usercard.css'
import TeamMemberBackGround from "./TeamMemberBackGround";
import TeamMemberBGBottomLeft from "./TeamMemberBGBottomLeft";


//This page displays each individual team member of CTD 
//The photo is currently static at the time

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
        
  console.log('show display');
  
  return (  

    <div className='image'>
      <TeamMemberBackGround  />
      <Center>
        <Box maxW='sm' borderWidth='1px' overflow='hidden' p='4px' ml='10px' mr='10px' mt='-1.5em' mb='2em' bg='grey'><br />
           <Center>
            <img src="https://bit.ly/sage-adebayo" alt="Segun Adebayo" ></img>
          </Center> 
            <h2>{user.firstName} {user.lastName}</h2> 
            <p>{user.developer}</p> 
        </Box>
      </Center>
      <TeamMemberBGBottomLeft />
      
    </div>
    
  )
}

 export default compose(withFirebase)(TeamMember);
