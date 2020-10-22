import React from 'react'
import ReactCardFlip from '../DirectoryCard'
import props from '../DirectoryCard'
import randomFlip from '../DirectoryCard'
import secondaryImage from '../DirectoryCard'
import pics from '../DirectoryCard'
// import { Link } from 'react-router-dom'


const DirectoryCard = ({staff}) => {
    return(
    
 <div className="directory-card ">
  <ReactCardFlip key = {staff.id} isFlipped = {staff.id === props.isFlipped} flipDirection = {randomFlip}>  
              <ul
                className = 'list' onClick = {() => props.selectedStaffMember(staff.id)}>
                <div className = 'image-contain'>
                  <img 
                    src = {pics}
                    alt = 'Staff Photos'/>
                </div>
                <div className = 'list-card-wrap'>
                  <li className = 'staff'>{staff.fields.Name}</li>
                  <li className = 'location'>{staff.fields.Location}</li>
                  <li className = 'job'>{staff.fields.Title}</li>
                  <li className = 'primary-job'>{staff.fields['Primary Department']}</li> 
                </div>
              </ul> 
  
              <ul className = 'back-of-list'
                  onClick = {() => props.selectedStaffMember(null)}>
                  <div className = 'language-container'>{secondaryImage(staff)}</div>
                  <div className = 'content-container'>
                    <li className = 'slack' style = {{marginTop: '10px'}}><strong>Slack Name:</strong> {staff.fields['Slack Name']}</li>
                    <li className = 'number'><strong>Phone Number:</strong> {staff.fields.Phone}</li>
                    <li className = 'email'><strong>Email:</strong> {staff.fields['Email address']}</li>
                  </div>
              </ul>
             </ReactCardFlip> 
 </div>
    

  
    // <br></br>
    //     <div className="cta-wrapper">
    //         <div><a target="_blank" href="https://www.codethedream.org/donate/">Donate</a></div>
    //         <div><a target="_blank" href="https://www.codethedream.org/">Learn More</a></div>
    //     </div>
    


);

}

export default DirectoryCard;
