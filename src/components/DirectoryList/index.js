import React from 'react';
// import profile from '../../containers/Directory/profile'
import ReactCardFlip from 'react-card-flip';
import reactImage from '../../assets/images/react-image.png';
import rubyImage from '../../assets/images/ruby-on-rails.png';
import wordPress from '../../assets/images/wordpress.png';
// import executive from '../../assets/images/executive-director.png';
import directors from '../../assets/images/directors.svg';
// import teacher from '../../assets/images/mentor.png';

const secondaryImage = (staff) => {
  if(checkDepartment(staff.fields['Primary Department']) === 'react') {
    return (<img className = 'react-pic' src = {reactImage} alt = 'react' />)
  }
  if(checkDepartment(staff.fields['Primary Department']) === 'ruby') {
    return (<img className = 'ruby-class' src = {rubyImage} alt = 'ruby' />); 
  }
  if(checkDepartment(staff.fields['Primary Department']) === 'wordpress') {
    return (<img className = 'wordpress' src = {wordPress} alt = 'word press' />)
  } 
  if(checkDepartment(staff.fields['Primary Department']) === 'executive') {
    return (<img className = 'boss' src = {directors} alt = 'executive' />)
  }
}

const checkDepartment = (departments) => {
  for(let i = 0; i < departments.length; i++) {
    if(departments[i] === 'Front End (React JS)') {
      return 'react';
    }
    if(departments[i] === 'Back End (Ruby on Rails)') {
      return 'ruby';
    }
    if(departments[i] === 'Wordpress / Web Dev.') {
      return 'wordpress';
    }
    if(departments[i] === 'Operations Staff') {
      return 'executive';
    }
  }
}

 const DirectoryList = (props) => {
  // all ctd projects
  let projects = props.projectData;
  // all ctd staff info
  let staffList = props.employeeDirectory;
  // opt in members list
  let optInStaffMembers = staffList.filter(filterList  => 
    filterList.fields.Directory === "YES, Include my contact info in CTD Team Directory")

  // Names sorted from a-z
    let sortNames = optInStaffMembers;
    // console.log('let\'s see the names', sortNames)
    sortNames.sort((a, b) => (a.fields['First Name'] > b.fields['First Name']) ? 1 : -1);
    sortNames.map(job => {
      let department = job.fields['Primary Department'];
    });

  // Randomize the flip direction on the cards
    const getFlip = ['vertical', 'horizontal'];
    let randomFlip = getFlip[Math.floor(Math.random() * 2)];
    
    return(
      <div className = 'list-container'>
          {sortNames.map(staff => {
            let pics = 'https://ya-webdesign.com/images250_/placeholder-image-png-1.png';
            if(staff.fields.Photo) {
              pics = staff.fields.Photo[0].url
            }
            return(
              // <DirectoryCard
              // staff={staff}
              // />
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
                  <div className = 'language-container'>{secondaryImage(staff)}</div>
                  <div className = 'content-container'>
                    <li className = 'slack' style = {{marginTop: '10px'}}><strong>Slack Name:</strong> {staff.fields['Slack Name']}</li>
                    <li className = 'number'><strong>Phone Number:</strong> {staff.fields.Phone}</li>
                    <li className = 'email'><strong>Email:</strong> {staff.fields['Email address']}</li>
                  </div>
              </ul>
             </ReactCardFlip> 
          )})}
        </div>
     )
    }
  
    export default DirectoryList;