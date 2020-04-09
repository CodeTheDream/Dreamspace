import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';

const DirectoryList = (props) => {
  // all ctd staff info
  let staffList = props.crewDirectory;
  console.log('staffList ', staffList);

  // opt in members list
  let optInStaffMembers = staffList.filter(filterList  => 
    filterList.fields.Directory === "YES, Include my contact info in CTD Team Directory")
    console.log("optInStaffMembers ", optInStaffMembers);

  // begin code for card flip
  const [isFlipped, setIsFlipped] = useState(false);
  const handleClick = () => {
    setIsFlipped(!isFlipped)
  }
  return(
    <div className = 'list-container'>
        {optInStaffMembers.map(staff => {
          let pics = 'https://ya-webdesign.com/images250_/placeholder-image-png-1.png';
          if(staff.fields.Photo) {
            pics = staff.fields.Photo[0].url
          }
          return(
          <ReactCardFlip isFlipped = {isFlipped} flipDirection = 'horizontal'> 
            <ul
              className = 'list'
              onClick = {handleClick}
              key = {staff.fields.Names}>
              <div className = 'image-contain'>
                <img 
                  src = {pics}
                  alt = 'Staff Photos'/>
              </div>
                <li className = 'staff'>{staff.fields.Name.toUpperCase()}</li>
                <li className = 'job'>{staff.fields.Title}</li>
                <li className = 'primary-job'>{staff.fields['Primary Department']}</li>
                {/* <li className = 'email'>{staff.fields['Email address']}</li> */} 
            </ul> 

        <ul onClick = {handleClick} className = 'back-of-list'>
            <div className = 'image-rear-contain'>
              <img src = {pics} alt = 'Staff Photos' />
            </div>
            <li className = 'number'>{staff.fields.Phone}</li>
            <li className = 'email'>{staff.fields['Email address']}</li>
          </ul>
          </ReactCardFlip> 
        )})}
      </div>
   )
  }
  export default DirectoryList;

   

    
  
  
  
  
            

  

          
       
        
          
          
        
           
        
  
  


  

  
    
    
  

    
