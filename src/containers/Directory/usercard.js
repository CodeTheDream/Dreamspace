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


function UserCard(user) {
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
        {users.map(user => {
            return (
            
              
                <Box maxW='lg' borderWidth='1px' overflow='hidden' p='5px' ml='10px' mr='10px'>
                <Box maxW='lg' borderWidth='3px' overflow='hidden' p='5px' ml='10px' mr='10px'>
                    <img src={user.picture.large} className='border' alt='...' />
                </Box>
                    <h4>{user.name.first} {user.name.last}</h4>
                        <p>{user.email}</p>
                        <p>{user.gender}</p>
                        <p>{user.location.city}, {user.location.state}</p>
                        
                </Box>  
            
               
        );
      })}
        </SimpleGrid>
        </Center> 
    </>
    );
}


export default UserCard

// import { useState, useEffect } from 'react';
// import HeaderTitle from '../Directory/HeaderTitle'
// import './App.css'
// import styled from 'styled-components'
// import { Image, Box } from "@chakra-ui/react"



// //1**. create TeamDirectoy function
// //2**. Get TD data from firebase into an array
// //**3. Place array data inside state

// //**4. Render all team members info into team member cards**

// //5. onClick team member takes you to a route that is at directoy id
// //6. Create team member component that displays team member's info from firebase
// //7. When routing to team member container use params to pull individual team member from firebase
// //8. Render individual team member inside of member component
// //  useState let us keep local state in a function component
// //9. Allow team members to edit if they are logged into my page
// //10. useState Hook declares a state variable called diectory (same as this.state in a class).
// //one person card
// // export const Grid = styled.div`

// // `;
// //displays directory pictures

// export const Row = styled.div`
//   display: flex;
// `;

// export const Col = styled.div`
//   flex: ${(user) => user.auto}
// `;

// function UserCard(user) {
//   console.log('user info', user)
//   const [users, setUsers] = useState(null);

//     useEffect(() => {
//       axios.get("")
//       .then(response => setUsers(response.data.users));

//     }, [])

//       if (!users) return null;
        

//   return (
//     <Box>
//       <HeaderTitle />
//       {users.map(user => {
//         return (
//           <SimpleGrid columns={3} spacing={10}>
//             <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'></Box>
//             <Image objectFit="fill" maxW='xm' src={user.picture.small} alt='random pics of male female'/>
//               <h4>{user.name.first}</h4>
//                <p>{user.location.city}</p>


            
//           </SimpleGrid>
//         )
//       })}
//     </Box>
    


//     <div>
//     {/* Placed Center outside individual boxes to see what it would do placed around entire div*/}
//       <Center>
//         <Wrap>
//           <WrapItem>
//             <div className="containerbox">
//               <Box boxSize="sm">
//               <img src="https://bit.ly/sage-adebayo" alt="Segun Adebayo" ></img>
//               </Box> 
//                 <Col size={4}></Col>
//                   {/* <div className="overlay">
                  
//                    <div className="textcss">Chaka, Nigeria</div>
//                     </div> */}
                   
//                   </div>
//           </WrapItem>

//       <div>
//         <Wrap>
//           <WrapItem>
//             <div className="containerbox">
//               <Box boxSize="sm">
              
//               {/* pic is an url not an image stored in devedit project */}
//                 <img src="https://bit.ly/sage-adebayo" alt="Segun Adebayo" ></img>
//               </Box> 
//                 <Col size={4}></Col>
//                   <div className="overlay">
//                     <div className="textcss">Chaka, Nigeria</div>
//                     </div>
//                   </div>
//           </WrapItem>

//       <div>
//         <Wrap>
//           <WrapItem>
//             <div className="containerbox">
//               <Box boxSize="sm">
//               {/* pic is an url not an image stored in devedit project */}
//                 <img src="https://bit.ly/sage-adebayo" alt="Segun Adebayo" ></img>
//               </Box> 
//                 <Col size={4}></Col>
//                   <div className="overlay">
//                   {/* <Teamcard />  */}
//                     <div className="textcss">Chaka, Nigeria</div> 
//                     </div>
//                   </div>
//           </WrapItem>
//       </Wrap>
  
//         </div>
//       </Wrap> 
//         </div>
//       </Wrap>
//       </Center>
//       </div>

     
//   );
// }

//  export default UserCard

