 import React from "react"
 import{ Box, Center } from "@chakra-ui/react"



 const TeamPhoto = ({user}) => {
    console.log('user info', user)
    const [user, setUser] = useState();   //Declare a new state variable, which we'll call "users", set at null
  
    // ("https://randomuser.me/api/?results=10")
  
      useEffect(() => {
        axios.get('https://randomuser.me/api/?results=10')
        .then(response => setUser(response.data.results));
        
      }, [])
  
        if (!user) return null;
          
    return (
      
      <>
       
        <RandomTitle />
        <Center>
          <SimpleGrid columns={1}>
          {users.map(user => {
              return (
                  <Box maxW='lg' borderWidth='3px' overflow='hidden' p='2px' ml='10px' mr='10px'>
                  <Box maxW='lg' borderWidth='3px' overflow='hidden' p='2px' ml='10px' mr='10px'>
                      {/* <img src={user.picture.large} className='border' alt='...' /> */}
                      {/* <h4>{user.name.first} {user.name.last}</h4>
                          <p>{user.email}</p>
                          <p>{user.gender}</p>
                          <p>{user.location.city}, {user.location.state}</p> */}
                  </Box> 
                  </Box>      
          );
        })}
          </SimpleGrid>
          </Center> 
      </>
      );
  }
  
  
 
  
export default TeamPhoto 
