import React, {useState, useEffect} from "react";
import { compose } from "recompose";
import { withFirebase } from "../../components/Firebase";
import { useParams } from 'react-router-dom'
import './usercard.css'



const TeamMemberBGBottomLeft = ({firebase}) => {
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

    <div id='container'>
        <div className="row">
            <div className="column">
                <h2>Introduction</h2>
                <p>{user.lastName}</p>
            </div>

        <div className="column">
            <h2>Quote</h2>
            <p>{user.email}</p>


            <h2>Hobbies</h2>
            <p>{user.github}</p>
        </div>
        </div>
        </div>  
    )
}

 export default compose(withFirebase)(TeamMemberBGBottomLeft);
