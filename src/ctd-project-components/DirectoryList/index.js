import React from 'react';
import DirectorySearchBar from '../DirectorySearchBar';

const DirectoryList = (props) => {
  // all ctd staff info
  let staffList = props.crewDirectory
  console.log('staffNames ', staffList);
  let filteredOptInList = props.filterDirectory;
  console.log('filteredOptInList ', filteredOptInList)
  // opt in members list
  let optInStaffMembers = staffList.filter(filterList  => 
    filterList.fields.Directory === "YES, Include my contact info in CTD Team Directory")
    console.log("optInStaffMembers ", optInStaffMembers);
  let getImage = optInStaffMembers.map(( renderImage ) => renderImage.fields.Photo);
  console.log('getImage ', getImage)
  return(
    <div className = 'list-container'>
      {optInStaffMembers.map(staff => {
        let pics = 'https://ya-webdesign.com/images250_/placeholder-image-png-1.png';
        console.log('pics ', pics);
        if(staff.fields.Photo) {
          pics = staff.fields.Photo[0].url
        }
        return(
        <ul
          key = {getImage['filename']}
          className = 'list'
          onClick = {props.selectedStaffMembers}>
          <div className = 'image-contain'>
            <img 
              src = {pics}
              alt = 'Staff Photos'/>
          </div>
                 {console.log('test key ', getImage['filename'])}
            {/* <li className = 'staff'>{filteredOptInList}</li> */}
            <li className = 'job'>{staff.fields.Title}</li>
            <li className = 'number'>{staff.fields.Phone}</li>
            <li className = 'email'>{staff.fields['Email address']}</li>
          </ul>
      )})}
    </div>
    )
  }
  export default DirectoryList;
            

  

          
       
        
          
          
        
           
        
  
  


  

  
    
    
  

    