
import React, {useState, useEffect} from "react";
//import firebase from './firebase.js'
//import directory from '../../components/Firebase/firebase';
import { compose } from "recompose";
import { withFirebase } from "../../components/Firebase";
import UserCard from './UserCard'
import {Link} from 'react-router-dom'


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
//11. setDirectory updates 

  
const Directory = ({firebase}) => {
  // console.log('hello world', firebase)
  const [users, setUsers] = useState([])
    // console.log('howdy')
  useEffect(() => {
    // console.log('two lines above working')
   firebase.users().onSnapshot((snapshot) => {
      // console.log('not sure if this will work')
      let team = [];
      snapshot.forEach((doc) => team.push({ ...doc.data(), uid: doc.id }));
      setUsers( team )
    });
  }, [])


return (
  
  <div>
    <ul>
      {users.map(function (user) {
        return (
          <Link to={`/directory/${user.uid}`}>
            <UserCard user={user} />
          </Link>

        );
  
      })}
    </ul> 
  </div>
  
  )
}


export default compose(withFirebase)(Directory);


