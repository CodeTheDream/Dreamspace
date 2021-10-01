

// import React from 'react'
// import { useParams, Link } from 'react-router-dom'
// import {  Box, Center, SimpleGrid } from "@chakra-ui/react"
// import UserCard from './UserCard'




// const  TeamMember = (user) => {
//   const params = useParams() 
//     console.log('Team member params', params)
//     console.log('Team', user)

//       return (
//         <div>
//           <ul>
//             {user.map(function (user) {
//               return (
//                 <div key={user.id}>
//                   <Link to={`/directory/${user.uid}`}>
//                     <UserCard  user={user} />
//                   </Link>
//                 </div>
//               );
        
//             })
//             }
            
//           </ul> 
//               <Center>
//       <SimpleGrid columns={3} spacing={8}>
//       <div style={{margin:'100px'}}>
//         {user.map(user => {
//           return (
            
            
//             <Box maxW='lg' borderWidth='3px' overflow='hidden' p='4px' ml='10px' mr='10px'>
//               <Center mt='1em'>
//                 <img src="https://bit.ly/sage-adebayo" alt="Segun Adebayo" ></img>

//               </Center>
//               <p>{params.id}</p> 
//                 <h3>{user.firstName} {user.lastName}</h3>
//                   <p>{user.username}</p>
//                   <p>{user.developer}</p>
//                   <p>{user.projects}</p>
//                   <p>{user.github}</p>
//                   <p>{user.email}</p>      
                  
//             </Box> 
            
                 
//         );
//       })}
//       </div>
//         </SimpleGrid>
//         </Center> 



//             </div>
          
        
  
//   )
// }

// export default TeamMember




















import React from 'react'
import { useParams, Link } from 'react-router-dom'
import UserCard from './UserCard'




const  TeamMember = (user) => {
  const params = useParams() 
    console.log('Team member params', params)

      return (
        <div>
          <ul>


         

            {user.map(user => {
              return (
                <div key={user.id}>
                <Link to={`/directory/${user.uid}`}>
                  <UserCard  user={user} />
                </Link>
                </div>
              )
        
            })
            }
            
          </ul> 
          <div style={{margin:'100px'}}>
            Team Member
            <p>{params.id}</p> 
          </div>
        </div>
  
  )
}

export default TeamMember















//May need code below:


// import { propNames } from '@chakra-ui/react'
// import React from 'react'
// import { useParams, Link } from 'react-router-dom'
// import {  Box, Center, SimpleGrid } from "@chakra-ui/react"
// import UserCard from './UserCard'




// const  TeamMember = (user) => {
//   const params = useParams() 
//     console.log('Team member params', params)
//     console.log('Team', user)

//       return (
//         <div>
//           <ul>
//             {user.map(function (user) {
//               return (
//                 <div key={user.id}>
//                   <Link to={`/directory/${user.uid}`}>
//                     <UserCard  user={user} />
//                   </Link>
//                 </div>
//               );
        
//             })
//             }
            
//           </ul> 
//               <Center>
//       <SimpleGrid columns={3} spacing={8}>
//       <div style={{margin:'100px'}}>
//         {user.map(user => {
//           return (
            
            
//             <Box maxW='lg' borderWidth='3px' overflow='hidden' p='4px' ml='10px' mr='10px'>
//               <Center mt='1em'>
//                 <img src="https://bit.ly/sage-adebayo" alt="Segun Adebayo" ></img>

//               </Center>
//               <p>{params.id}</p> 
//                 <h3>{user.firstName} {user.lastName}</h3>
//                   <p>{user.username}</p>
//                   <p>{user.developer}</p>
//                   <p>{user.projects}</p>
//                   <p>{user.github}</p>
//                   <p>{user.email}</p>      
                  
//             </Box> 
            
                 
//         );
//       })}
//       </div>
//         </SimpleGrid>
//         </Center> 



//             </div>
          
        
  
//   )
// }

// export default TeamMember
