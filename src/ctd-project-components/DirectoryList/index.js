import React, { useState } from 'react';
// import ReactCardFlip from 'react-card-flip';

const DirectoryList = (props) => {
  // all ctd staff info
  let staffList = props.crewDirectory;
  console.log('staffList ', staffList);

  // opt in members list
  let optInStaffMembers = staffList.filter(filterList  => 
    filterList.fields.Directory === "YES, Include my contact info in CTD Team Directory")
    console.log("optInStaffMembers ", optInStaffMembers);

  
    let aToZOrder = optInStaffMembers.sort((a, b) => {
      let firstName = a.fields['First Name'].toUpperCase();
      let lastName = b.fields['Last Name'].toUpperCase();
      console.log('check first ', firstName);
      console.log('check for last ', lastName);
      return a.name > b.name ? 1 : -1;
    })
    console.log('final results of the order ', aToZOrder);
    
 

  // begin code for card flip
  // const [isFlipped, setIsFlipped] = useState(false);
  // const handleClick = () => {
  //   setIsFlipped(!isFlipped)
  // }
  return(
    <div className = 'list-container'>
        {aToZOrder.map(staff => {
        
          
          let pics = 'https://ya-webdesign.com/images250_/placeholder-image-png-1.png';
          
        

          

         
          
          if(staff.fields.Photo) {
            pics = staff.fields.Photo[0].url
          }
          return(
          // <ReactCardFlip isFlipped = {isFlipped} flipDirection = 'horizontal'>  
          // </ReactCardFlip> 
          <div className = 'check'>

            <ul
              className = 'list'
              // onClick = {handleClick}
              key = {staff.fields.Names}>
              <div className = 'image-contain'>
                <img 
                  src = {pics}
                  alt = 'Staff Photos'/>
              </div>
                <li className = 'staff'>{staff.fields.Name.toUpperCase()}</li>
                <li className = 'location'>{staff.fields.Location}</li>
                <li className = 'job'>{staff.fields.Title}</li>
                <li className = 'primary-job'>{staff.fields['Primary Department']}</li>
                {/* <li className = 'email'>{staff.fields['Email address']}</li> */} 
            </ul> 

            <ul className = 'back-of-list'>
              <li className = 'slack'>Slack Name: {staff.fields['Slack Name']}</li>
              <li className = 'number'>{staff.fields.Phone}</li>
              <li className = 'email'>{staff.fields['Email address']}</li>
            </ul>
          </div>
        )})}
      </div>
   )
  }
  export default DirectoryList;

   

    
  
  
  
  
            

  

          
       
        
          
          
        
           
        
  
  


  

  
    
    
  

    
