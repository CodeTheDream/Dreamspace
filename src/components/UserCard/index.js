import React  from "react";
import ReactCardFlip from 'react-card-flip';
import { randomFlip } from 'react-card-flip';

  
// so the next thing is you need to make a component for the cards
// and then you will import that component into your directory page
//4. Render all team members info into team member cards
//5. onClick team member takes you to a route that is at directoy id

// and what you will want to do with that component is render it inside your map
// first tho just make the component and import it
// and you will want to give it 1 prop (for now)
// which is the student
// or team member or whatever


const UserCard = ({users}) => {
  console.log('howdy')
    return (

      <div className="directory-card ">
  <ReactCardFlip key = {users.id} isFlipped = {users.id === users.isFlipped} flipDirection = {randomFlip}>  
              <ul
                className = 'list' onClick = {() => users.selectedStaffMember(users.id)}>
                {/* <div className = 'image-contain'>
                  <img 
                    src = {pics}
                    alt = 'Staff Photos'/>
                </div> */}
                <div className = 'list-card-wrap'>
                  <li className = 'staff'>{users.firstName}</li>
                  <li className = 'location'>{users.lastName}</li>
                  <li className = 'job'>{users.github}</li>
                  {/* <li className = 'primary-job'>{staff.fields['Primary Department']}</li>  */}
                </div>
              </ul> 
  
              <ul className = 'back-of-list'
                  onClick = {() => users.selectedStaffMember(null)}>
                  {/* <div className = 'language-container'>{secondaryImage(users)}</div> */}
                  <div className = 'content-container'>
                    {/* <li className = 'slack' style = {{marginTop: '10px'}}><strong>Slack Name:</strong> {user.fields['Slack Name']}</li> */}
                    <li className = 'number'><strong>Github:</strong> {users.github}</li>
                    <li className = 'email'><strong>Email:</strong> {users.email['Email address']}</li>
                  </div>
              </ul>
             </ReactCardFlip> 
 </div>
      
     
    )
        
}
          
export default UserCard
