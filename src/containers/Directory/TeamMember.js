import React from 'react'
import { useParams, Link } from 'react-router-dom'
import UserCard from './UserCard'




const  TeamMember = (user) => {
  const params = useParams() 
    console.log('Team member params', params)

      return (
        <div>
          <ul>


          {/* var itemInfo = items.map(item => >Hex:{item.hex}</div>); */}


            {user.map(user => {
              return (
                <div key={user.id}>
                <Link to={`/directory/${user.uid}`}>
                  <UserCard  user={user} />
                </Link>
                </div>
              );
        
            })
            }
            
          </ul> 
          <div style={{margin:'100px'}}>
            Team Member
            <p>{params.id}</p> 
          </div>
        </div>
  
  )
}

export default TeamMember
