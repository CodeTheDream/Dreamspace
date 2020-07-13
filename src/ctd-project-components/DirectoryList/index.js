import React from 'react';
import ReactCardFlip from 'react-card-flip';
import reactImage from '../../assets/images/react-image.png';
import rubyImage from '../../assets/images/ruby-on-rails.png';

const secondaryImage = (staff) => {
  console.log('pppp', staff);
  if(checkDepartment(staff.fields['Primary Department']) === 'react') {
  
  return (<img className = 'react-pic' src = {reactImage} alt = 'react' />)
  }

if(checkDepartment(staff.fields['Primary Department']) === 'ruby') {
  return (<img src = {rubyImage} alt = 'ruby' />); 
  } 
}
const checkDepartment = (departments) => {
  console.log('dddddd', departments);
  for(let i = 0; i < departments.length; i ++) {
    if(departments[i] === 'Front End (React JS)') {
      return 'react';
    }
    if(departments[i] === 'Back End (Ruby on Rails)') {
      return 'ruby';
    }
  }
}

 
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

  // Names sorted from a-z
    let sortNames = optInStaffMembers;
    console.log('let\'s see the names', sortNames)
    sortNames.sort((a, b) => (a.fields['First Name'] > b.fields['First Name']) ? 1 : -1);
    sortNames.map(job => {
      console.log('hehehehehhehehehhehe', job.fields['Primary Department']);
      let department = job.fields['Primary Department'];
      console.log('check this out ', department);
    });

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
             <ReactCardFlip key = {staff.id} isFlipped = {staff.id === props.isFlipped} flipDirection = {randomFlip}>  
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
                  {/* <div className = 'back-card-directory-image' style = {{
                    width: '100px', height: '100px', borderRadius: '50%'}}>
                    <img src = {pics} alt = 'Staff Member' style = {{
                      width: '100px', height: '100px', borderRadius: '50%', marginLeft: '10px', marginTop: '10px'}}/>
                  </div> */}
                  <div>
                      {secondaryImage(staff)}
                    {/* <img className = 'react-pic' src = {reactImage} alt = 'react' /> */}
                  </div>
                  <li className = 'slack' style = {{marginTop: '10px'}}><strong>Slack Name:</strong> {staff.fields['Slack Name']}</li>
                  <li className = 'number'><strong>Phone Number:</strong> {staff.fields.Phone}</li>
                  <li className = 'email'><strong>Email:</strong> {staff.fields['Email address']}</li>
              </ul>
             </ReactCardFlip> 
          )})}
        </div>
     )
    }
  
    export default DirectoryList;
                

            
              
              

  

            
  
     
              
      
    


          
            

  

 

          
        

          

         
          

   

    
  
  
  
  
            

  

          
       
        
          
          
        
           
        
  
  


  

  
    
    
  

    