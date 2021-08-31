
import React from 'react'
import styled from 'styled-components'
import { Box, Center, Wrap, WrapItem } from "@chakra-ui/react" 






//1. create TeamDirectoy function
//2. Get TD data fom firebase into an array
//3. Place array data inside state
//4. Render all team members info into team member cards
//5. onClick team member takes you to a route that is at directoy id
//6. Create team member component that displays team member's info from firebase
//7. When routing to team member container use params to pull individual team member from firebase
//8. Render individual team member inside of member component
//  useState let us keep local state in a function component
//9. Allow team members to edit if they are logged into my page
//10. useState Hook declares a state variable called diectory (same as this.state in a class).
//one person card
export const Grid = styled.div`

`;

export const Row = styled.div`
  display: flex;
`;

export const Col = styled.div`
  flex: ${(user) => user.auto}
`;

const usercard = (user) => {
  console.log('user info',user)

  return (
    <div>
      {/* Placed Center outside individual boxes to see what it would do placed around entire div*/}
      <Center>
        <Wrap>
          <WrapItem>
            <div className="containerbox">
              <Box boxSize="sm">
                {/* pic is an url not an image stored in devedit project */}
                
                  <img
                    src="https://bit.ly/sage-adebayo"
                    alt="Segun Adebayo"
                  ></img>
                
              </Box>
              <Col size={4}></Col>
              <div className="overlay">
                <div className="textcss">Chaka, Nigeria</div>
              </div>
            </div>
          </WrapItem>

          <div>
            <Wrap>
              <WrapItem>
                <div className="containerbox">
                  <Box boxSize="sm">
                    {/* pic is an url not an image stored in devedit project */}
                    <img
                      src="https://bit.ly/sage-adebayo"
                      alt="Segun Adebayo"
                    ></img>
                  </Box>
                  <Col size={4}></Col>
                  <div className="overlay">
                    <div className="textcss">Chaka, Nigeria</div>
                  </div>
                </div>
              </WrapItem>

              <div>
                <Wrap>
                  <WrapItem>
                    <div className="containerbox">
                      <Box boxSize="sm">
                        {/* pic is an url not an image stored in devedit project */}
                        <img
                          src="https://bit.ly/sage-adebayo"
                          alt="Segun Adebayo"
                        ></img>
                      </Box>
                      <Col size={4}></Col>
                      <div className="overlay">
                        <div className="textcss">Chaka, Nigeria</div>
                      </div>
                    </div>
                  </WrapItem>
                </Wrap>
              </div>
            </Wrap>
          </div>
        </Wrap>
      </Center>
    </div>
  );
}

 export default usercard

