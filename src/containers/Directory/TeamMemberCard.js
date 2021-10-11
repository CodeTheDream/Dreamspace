import React, {useState, useEffect} from "react";
import { compose } from "recompose";
import { withFirebase } from "../../components/Firebase";
import { Box, Center, SimpleGrid } from "@chakra-ui/react"
import { Link } from "react-router-dom";


const TeamMemberCard = ({firebase}) => {
  console.log('hello world', firebase)
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
        <Center>
            <SimpleGrid columns={3} spacing={6} background>
                {users.map(user => {
                    return (
                        <Link to={`/directory/${user.uid}`}>
                            <Box maxW='sm' borderWidth='1px' overflow='hidden' p='4px' ml='10px' mr='10px'>
                                <Center mt='1em'>
                                    <img src="https://bit.ly/2Z4KKcF" alt="..." ></img> 
                                </Center>
                                    <h2>{user.firstName} {user.lastName}</h2>
                                    <p>{user.developer}</p> 
                                    <p>{user.github}</p>
                                    <p>{user.email}</p>
                            </Box>
                        </Link>
                    );
                })}
            </SimpleGrid>
        </Center>
    </>
  )
}


export default compose(withFirebase)(TeamMemberCard);

