import React from 'react';
import styled from 'styled-components';
import profile from '../../containers/Directory/profile.js';


const Button = styled.button`
  cursor: pointer;
  background: transparent;
  font-size: 16px;
  border-radius: 3px;
  color: palevioletred;
  border: 2px solid palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  transition: 0.5s all ease-out;
 
  &:hover {
    background-color: palevioletred;
    color: white;
  }
`;
 
const Profile = () => {
    return(
        <div>
            <h1 className="profile-page">
            <br></br>
            Welcome to this Profile page. 
            <p>Hoping it appears in the browser.</p>
            <Button>I am a Button</Button>
            </h1>
        </div>
    )   
}


export default Profile;
