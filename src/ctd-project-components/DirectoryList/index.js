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
  // const array = Object.keys(getImage);
  // console.log('array', array)
  // const putListInOrder = getImage.keys()
  // for (const key of putListInOrder) {
  //   console.log('key ', key)
  // }
  // let test = getImage[0];
  // console.log('test', test)
  // const pleaseWork = getImage.map((post) => post.filename);
  // console.log('pleaseWork ', pleaseWork)
  // const tryList = getImage.entries()
  // console.log('tryList ', tryList.next().value);
  // const digDeeper = getImage.map(muchDeeper => muchDeeper.filename)
  // console.log('digDeeper ', digDeeper);
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
          <ul
            key = {getImage['filename']}
            className = 'list'>
              <img className = 'image-contain'
                   src = {getImage['filename']}
                   alt = 'Staff Photos'></img>
                   {console.log('test key ', getImage['filename'])}
              <li>{renderTheList.fields.Name.toUpperCase()}</li>
              {/* <li>{renderTheList.fields['Slack Name'].toUpperCase()}</li> */}
              <li>{renderTheList.fields.Phone}</li>
              <li>{renderTheList.fields['Email address']}</li>

            </ul>
          
        ))}
       
        
      </div>
    )
  }
          
  export default DirectoryList;
          
        
           
        
  
  


  

  
    
    
  

    
