import React, {useState, useEffect} from "react";
import { compose } from "recompose";
import { withFirebase } from "../../components/Firebase";
import { useParams } from 'react-router-dom'
import './usercard.css'
import styled from 'styled-components';




//This code displays on the top lefthand corner of the individual page

const Button = styled.button`
  cursor: pointer;
  font-weight: bold;
  font-size: 10px;
  border-radius: 20px;
  color: white;
  border: 2px blue;   
  margin: .5em .5em;
  padding: .5em 1em;
  transition: 0.5s all ease-out;
  background-color: blue;
  
  
  &:hover {
    background-color: orange;
    color: white;
  
  }
`;


const TeamMemberBGTopLeft = ({firebase}) => {
  const params = useParams() 
  console.log('Team member params', params)

  const [user, setUser] = useState([])
  useEffect(() => {
    firebase
    .users().doc(params.id).get()
    .then( snapshot =>{ 
      console.log('snapshot', snapshot.data()) 
      return (setUser(snapshot.data()))
    })

  },[]);


  return (  
    <div className='image'>
        <div id="top-left">
          <p>Developer:  {user.developer}</p> 
          <p>Title:  {user.title}</p> 
          <p>Language:  {user.language}</p>
          <p>Projects:  {user.projects}</p> 
          <p>Mentor:  {user.mentor}</p> 
          <p>Github:  {user.github}</p> 
          <p>Email:  {user.email}</p> 
          <p>Remote:  {user.remote}</p> 
          <p>Equipment:  {user.equipment}</p>  
          <p>State:  {user.state}</p>
          <p>Country:  {user.country}</p>
        </div>
    </div>
    
    )
}

 export default compose(withFirebase)(TeamMemberBGTopLeft);


 // so line 59 in that first message
// 9:36
// that error messages is sayign the object that has .developer on it is undefined
// 9:37
// so from a debugging standpoint ou should be trying to see what's going on with that object... in that case it's the "user" object
// 9:37
// and what is probably appening is that the component is trying to render before it has access to the user object
// 9:38
// so you have to stop that component from rendering until the object is defined

//This code displays on the top lefthand corner of the individual page