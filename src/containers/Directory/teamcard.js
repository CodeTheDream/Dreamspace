import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios'
// import './App.css'
import HeaderTitle from './HeaderTitle'
import {  Box, Center, SimpleGrid } from "@chakra-ui/react"



//1**. create TeamDirectoy function
//2**. Get TD data from firebase into an array
//**3. Place array data inside state

//**4. Render all team members info into team member cards**

//5. onClick team member takes you to a route that is at directoy id
//6. Create team member component that displays team member's info from firebase
//7. When routing to team member container use params to pull individual team member from firebase
//8. Render individual team member inside of member component
//  useState let us keep local state in a function component
//9. Allow team members to edit if they are logged into my page
//10. useState Hook declares a state variable called diectory (same as this.state in a class).
//one person card


function teamcard(user) {
  console.log('user info', user)
  const [users, setUsers] = useState(null);   //Declare a new state variable, which we'll call "users", set at null

  // ("https://randomuser.me/api/?results=10")

    useEffect(() => {
      axios.get('https://console.firebase.google.com/u/1/project/devedit-8d545/firestore/data/~2Fusers')
      .then(response => setUsers(response.data.users));
      
    }, [])

      if (!users) return null;
        
  return (
    
    <>
  {/* Layout view to page, with title and row column to pics */}
      <HeaderTitle />
        <Center>
            <SimpleGrid columns={4} spacing={8}>
                {/* {users.map(user => { */}
                    return (
                        <Box maxW='lg' borderWidth='1px' overflow='hidden' p='5px' ml='10px' mr='10px'>
                            <Box maxW='lg' borderWidth='3px' overflow='hidden' p='5px' ml='10px' mr='10px'>
                                <img src={user.picture.large} className='border' alt='...' />
                            </Box>
                            
                                {/* <h4>{user.name.first} {user.name.last}</h4> */}
                                    {/* <p>{user.email}</p>
                                    <p>{user.gender}</p>
                                    <p>{user.location.city} {user.location.state}</p> */}
                        </Box>  
                );
            })}
            </SimpleGrid>
        </Center> 
    </>
    );
}


export default teamcard
