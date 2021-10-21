import React, {useState, useEffect} from "react";
import { compose } from "recompose";
import { withFirebase } from "../../components/Firebase";
import { useParams } from 'react-router-dom'
import './usercard.css'


//This code displays both left and right sides view

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
                    <h3>Introduction</h3>
                    <p>{user.introduction}</p>
                </div>

                <div className="column">
                    <h3 mb='2em'>Favorite Quote</h3>
                    <p>{user.quote}</p>

                    <h3>Hobbies</h3>
                    <p>{user.hobbies}</p>
                </div>
            </div>
        </div>  
    )
}

 export default compose(withFirebase)(TeamMemberBGBottomLeft);
