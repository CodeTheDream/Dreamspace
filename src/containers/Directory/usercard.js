
import React from 'react'
import { Image, Box } from "@chakra-ui/react"

//one person card


const UserCard = (user) => {
  return (
  

  <div className="containerbox">
  {/* <img src="img_avatar.png" alt="Avatar" className="imagecard"></img> */}
  
  <Box boxSize="sm">
  <img src="https://bit.ly/sage-adebayo" alt="Segun Adebayo" ></img>
  </Box> 
  <div className="overlay">
    <div className="textcss">Chaka, Niger</div>
  </div>
  </div>

    
  );
}

 export default UserCard

 