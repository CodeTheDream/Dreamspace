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
    let sortNames = optInStaffMembers;
    console.log('let\'s see the names', sortNames)
    sortNames.sort((a, b) => (a.fields['First Name'] > a.fields['Last Name']) ? 1 : -1);

    // begin code for card flip
    const [isFlipped, setIsFlipped] = useState(false);
    const handleClick = () => {
      setIsFlipped(!isFlipped)
    }
    return(
      <div className = 'list-container'>
          {sortNames.map(staff => {
            let pics = 'https://ya-webdesign.com/images250_/placeholder-image-png-1.png';
            if(staff.fields.Photo) {
              pics = staff.fields.Photo[0].url
            }
            
            return(
             <ReactCardFlip isFlipped = {isFlipped} flipDirection = 'horizontal'>  
            
  
              <ul
                className = 'list'
                onClick = {handleClick}
                key = {staff.fields}>
                <div className = 'image-contain'>
                  <img 
                    src = {pics}
                    alt = 'Staff Photos'/>
                </div>
                  <li className = 'staff'>{staff.fields.Name}</li>
                  <li className = 'location'>{staff.fields.Location}</li>
                  <li className = 'job'>{staff.fields.Title}</li>
                  <li className = 'primary-job'>{staff.fields['Primary Department']}</li>
                  {/* <li className = 'email'>{staff.fields['Email address']}</li> */} 
              </ul> 
  
              <ul className = 'back-of-list'
                  onClick ={handleClick}>
                  <div className = 'rear-contain'
                       style = {{paddingTop: '234px'}}>


                  </div>
                <li className = 'slack'>Slack Name: {staff.fields['Slack Name']}</li>
                <li className = 'number'>{staff.fields.Phone}</li>
                <li className = 'email'>{staff.fields['Email address']}</li>
              </ul>
            
             </ReactCardFlip> 
          )})}
        </div>
     )
    }
  
    export default DirectoryList;
     
      
    


          
            

  

 

          
        

          

         
          

   

    
  
  
  
  
            

  

          
       
        
          
          
        
           
        
  
  


  

  
    
    
  

    