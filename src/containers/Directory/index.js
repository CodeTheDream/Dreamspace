
import React, {useState, useEffect} from "react";
import { compose } from "recompose";
import { withFirebase } from "../../components/Firebase";
import {  Box, Center, SimpleGrid } from "@chakra-ui/react"
import HeaderTitle from "./HeaderTitle";
//import {Link} from 'react-router-dom'
//import UserCard from "./UserCard";



//9. Allow team members to edit if they are logged into my page
//10. useState Hook declares a state variable called diectory (same as this.state in a class).
//11. setDirectory updates 

  
const Directory = ({firebase}) => {
  // console.log('hello world', firebase)
  const [users, setUsers] = useState([])
  useEffect(() => {
   firebase.users().onSnapshot((snapshot) => {
      let team = [];
      snapshot.forEach((doc) => team.push({ ...doc.data(), uid: doc.id }));
      setUsers( team )
    });
  }, [])


  return (

    <>
    <HeaderTitle />
    <Center>
      <SimpleGrid columns={3} spacing={8}>
        {users.map(user => {
          return (
            
            <Box maxW='lg' borderWidth='3px' overflow='hidden' p='4px' ml='10px' mr='10px'>
              <Center mt='1em'>
                <img src="https://bit.ly/sage-adebayo" alt="Segun Adebayo" ></img>
              </Center>
                <h3>{user.firstName} {user.lastName}</h3>
                  <p>{user.username}</p>
                  <p>{user.developer}</p>
                  <p>{user.projects}</p>
                  <p>{user.github}</p>
                  <p>{user.email}</p>      
                  
            </Box> 
            
                 
        );
      })}
        </SimpleGrid>
        </Center> 

    {/* <ul>
      {users.map(function (user) {
        console.log("users", users)
        return (
          <Link to={`/directory/${user.uid}`}>
            <UserCard user={user} />
          </Link>

        );
  
      })}
    </ul>  */}
  </>
  
  )
}


export default compose(withFirebase)(Directory);


