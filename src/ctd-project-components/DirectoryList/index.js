import React from 'react';
import ReactCardFlip from 'react-card-flip';

const DirectoryList = (props) => {
  // all ctd projects
  let projects = props.projectData;
  console.log('projects ', projects);
  const getKey = props.selectedStaffMember;
  console.log('key ', getKey)
  // all ctd staff info
  let staffList = props.crewDirectory;
  console.log('staffList ', staffList);

  // opt in members list
  let optInStaffMembers = staffList.filter(filterList  => 
    filterList.fields.Directory === "YES, Include my contact info in CTD Team Directory")
    console.log("optInStaffMembers ", optInStaffMembers);

  // Names sorted by first from a-z
    let sortNames = optInStaffMembers;
    console.log('let\'s see the names', sortNames)
    sortNames.sort((a, b) => (a.fields['First Name'] > b.fields['First Name']) ? 1 : -1);
    
  
    return(
      <div className = 'list-container'>
          {sortNames.map(staff => {
            let pics = 'https://ya-webdesign.com/images250_/placeholder-image-png-1.png';
            if(staff.fields.Photo) {
              pics = staff.fields.Photo[0].url
            }
            
            return(
             <ReactCardFlip isFlipped = {props.isFlipped}  flipDirection = 'vertical'>  
              <ul
                className = 'list'
                onClick = {() => props.handleClick(getKey)}
                // key = {staff.fields.id}
                >
                <div className = 'image-contain'>
                  <img 
                    src = {pics}
                    alt = 'Staff Photos'/>
                </div>
                  <li className = 'staff' style = {{fontSize: '15px', fontWeight: 'bold'}}>{staff.fields.Name}</li>
                  <li className = 'location'>{staff.fields.Location}</li>
                  <li className = 'job'>{staff.fields.Title}</li>
                  <li className = 'primary-job'>{staff.fields['Primary Department']}</li>
                  {/* <li className = 'email'>{staff.fields['Email address']}</li> */} 
              </ul> 
  
              <ul className = 'back-of-list'
                  onClick = {() => props.handleClick(getKey)}>
                  <h4 className = 'project' style = {{textAlign: 'center', fontWeight: 'bold'}}>Current Project</h4>
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

            
  
     
              
      
    


          
            

  

 

          
        

          

         
          

   

    
  
  
  
  
            

  

          
       
        
          
          
        
           
        
  
  


  

  
    
    
  

    