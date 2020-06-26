import React from 'react';


const DirectoryList = (props) => {
  // all ctd staff info
  let staffList = props.filterDirectory;
  console.log('staffList ', staffList);
  // opt in members list
  let optInStaffMembers = staffList.filter(filterList  => 
    filterList.fields.Directory === "YES, Include my contact info in CTD Team Directory")
    console.log("optInStaffMembers ", optInStaffMembers);
  let getImage = optInStaffMembers.map(( renderImage ) => renderImage.fields.Photo);
  console.log('getImage ', getImage)
  // let searchByNum = props.filterNumber;                                                // trying to figure out how to filter by phone numbers
  // let newOptInList = optInStaffMembers.concat(searchByNum);
  // console.log('newOptInList ', newOptInList)
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
          className = 'list'
          onClick = {() => props.selectedStaffMember(staff.id)}
          key = {staff.fields.Names}>
          {console.log(staff.fields.Name)}
          <div className = 'image-contain'>
            <img 
              src = {pics}
              alt = 'Staff Photos'/>
          </div>
              {console.log('test key ', getImage['filename'])}
            <li className = 'staff'>{staff.fields.Name.toUpperCase()}</li>
            <li className = 'job'>{staff.fields.Title}</li>
            <li className = 'number'>{staff.fields.Phone}</li>
            <li className = 'email'>{staff.fields['Email address']}</li>
          </ul>
      )})}
    </div>
    )
  }
  export default DirectoryList;
            

  

          
       
        
          
          
        
           
        
  
  


  

  
    
    
  

    
