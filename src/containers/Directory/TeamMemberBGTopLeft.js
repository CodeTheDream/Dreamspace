import React, {useState, useEffect} from "react";
import { compose } from "recompose";
import { withFirebase } from "../../components/Firebase";
import { useParams } from 'react-router-dom'
import './usercard.css'




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
            <h2>Name:  {user.firstName} {user.lastName}</h2>
                <p>Developer:  {user.developer}</p> 
                <p>Title:  {user.title}</p> 
                <p>Github:  {user.github}</p> 
                <p>Email:  {user.email}</p> 
                <p>Projects:  {user.projects}</p> 
                <p>Mentor:  {user.mentor}</p> 
                <p>State:  {user.state}</p>
                <p>Country:  {user.country}</p> 
        </div>
    </div>
    
    )
}

 export default compose(withFirebase)(TeamMemberBGTopLeft);
