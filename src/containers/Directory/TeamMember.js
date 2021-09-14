import React from 'react'
//import  { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import UserCard from './UserCard'
// import firebase from 'firebase';



const  TeamMember = () => {
  const params = useParams() 
    console.log('Team member params', params)


  //   const [users, setUsers] = useState([])
  //   // console.log('howdy')
  // useEffect(() => {
  //   // console.log('two lines above working')
  //  firebase.users().onSnapshot((snapshot) => {
  //     // console.log('not sure if this will work')
  //     let team = [];
  //     snapshot.forEach((doc) => team.push({ ...doc.data(), uid: doc.id }));
  //     setUsers( team )
  //   });
  // }, [])


return (
  <div>
    <ul>
      {user.map((function (user) {
        return (
          <Link to={`/directory/${user.uid}`}>
            <UserCard key={user.id} user={user} />
          </Link>
        )
  
      })}
      
    </ul> 
    <div style={{margin:'100px'}}>
      Team Member
      <p>{params.id}</p> 
    </div>
  </div>


    
  
  )
}

export default TeamMember