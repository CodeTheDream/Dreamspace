import React from 'react';
import ReactCardFlip from 'react-card-flip';

const DirectoryList = (props) => {
  // all ctd projects
  let projects = props.projectData;
  console.log('projects ', projects);
  
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

  // Randomize the flip direction on the cards
    const getFlip = ['vertical', 'horizontal'];
    let randomFlip = getFlip[Math.floor(Math.random() * 2)];
    console.log('get ', randomFlip);
   
    return(
      <div className = 'list-container'>
          {sortNames.map(staff => {
            let pics = 'https://ya-webdesign.com/images250_/placeholder-image-png-1.png';
            if(staff.fields.Photo) {
              pics = staff.fields.Photo[0].url
            }
            
            return(
             <ReactCardFlip isFlipped = {staff.id === props.isFlipped} flipDirection = {randomFlip}>  
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
                

            
              
              

  

            
  
     
              
      
    


          
            

  

 

          
        

          

         
          

   

    
  
  
  
  
            

  

          
       
        
          
          
        
           
        
  
  


  

  
    
    
  

    