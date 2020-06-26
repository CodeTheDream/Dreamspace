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
  let getImage = optInStaffMembers.map(( renderImage ) => renderImage.fields.Photo);
  console.log('getImage ', getImage)

  // begin code for card flip
  const [isFlipped, setIsFlipped] = useState(false);
  const handleClick = () => {
    setIsFlipped(!isFlipped)
  }
  return(
    <ReactCardFlip isFlipped = {isFlipped} flipDirection = 'horizontal'>
      <div className = 'list-container'>
        {optInStaffMembers.map(staff => {
          let pics = 'https://ya-webdesign.com/images250_/placeholder-image-png-1.png';
          if(staff.fields.Photo) {
            pics = staff.fields.Photo[0].url
          }
          return(
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
                <li className = 'number'>{staff.fields['Primary Department']}</li>
                {/* <li className = 'email'>{staff.fields['Email address']}</li> */}
            </ul> 
        )})}
      </div>
      <div className = 'back-of-list'>
            {optInStaffMembers.map(back => {
              console.log('hello world')
              const backInfo = back.fields;
              console.log('backInfo ', backInfo)
              return(
                <ul className = 'back-of-list'
                    onClick = {handleClick}>
                      <li>{back.fields.Phone}</li>
                    </ul>
              )
            })}
      </div>
    </ReactCardFlip>
    )
  }
  export default DirectoryList;




            

  

          
       
        
          
          
        
           
        
  
  


  

  
    
    
  

    
