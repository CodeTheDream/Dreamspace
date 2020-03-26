import React from 'react';

const DirectoryList = (props) => {
  // all ctd staff info
  let staffList = props.crewDirectory
  console.log('staffNames ', staffList);
  // opt in members list
  let optInStaffMembers = staffList.filter(filterList  => 
    filterList.fields.Directory === "YES, Include my contact info in CTD Team Directory")
    console.log("optInStaffMembers ", optInStaffMembers);
  let getImage = optInStaffMembers.map(( renderImage ) => renderImage.fields.Photo);
  console.log('getImage ', getImage)
  // let grabPhoto = optInStaffMembers.fields.Photo[0].url
  // console.log('grabPhoto ', grabPhoto)

    return(
      <div className = 'list-container'>
      {/* {getImage.map(getImageDetails => (
        <img 
          className = 'images'
          // key = {getImageDetails}
          src = {getImageDetails.url} />
      ))} */}
        {optInStaffMembers.map(renderTheList => (
          <li
            className = 'list'>
              {renderTheList.fields.Name.toUpperCase()}
            </li>
        ))}
        
      </div>
    )
  

  
}
        
export default DirectoryList;
    
    
  

    