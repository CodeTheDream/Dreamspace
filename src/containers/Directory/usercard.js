import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios'
// import '../App.css'
//import HeaderTitle from './HeaderTitle'
import {  Box, Center, SimpleGrid } from "@chakra-ui/react"
import HeaderTitle from './HeaderTitle';



// Usercard displays the layout & look of page


function UserCard(user) {
  console.log('user info', user)
  const [users, setUsers] = useState();   //Declare a new state variable, which we'll call "users", set at null

  // ("https://randomuser.me/api/?results=10")

    useEffect(() => {
      axios.get('https://randomuser.me/api/?results=10')
      .then(response => setUsers(response.data.users));
      
    }, [])

      // if (!users) return null;
        
  return (
    
    <>
     
      <HeaderTitle />
      <Center>
        <SimpleGrid columns={3} spacing={8}>
        {users.map(user => {
            return (
                <Box maxW='lg' borderWidth='3px' overflow='hidden' p='2px' ml='10px' mr='10px'>
                <Box maxW='lg' borderWidth='3px' overflow='hidden' p='2px' ml='10px' mr='10px'>
                <img src="https://bit.ly/sage-adebayo" alt="Segun Adebayo" ></img>
                </Box>
                    <h4>{user.firstName} {user.lastName}</h4>
                        <p>{user.email}</p>
                        <p>{user.github}</p>
                        
                </Box>      
        );
      })}
        </SimpleGrid>
        </Center> 
    </>
    );
}


export default UserCard
