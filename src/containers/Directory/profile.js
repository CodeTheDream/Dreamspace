import React from 'react';
// import styled from 'styled-components';
 

// and can help with the linking

// basically you need to amke sure we have access to whatever value we will use as the queryparamsid for each student (an airtable field) and that id will be part of the url

 const Profile = (props) => {        
    return(
        <div>
            <h1 className="profile-page">
            <br></br>
            Welcome to this Profile page.</h1>
            <p>Hoping it appears in the browser.</p>
                <a className="App-link"
                href="https://airtable.com/tbl6BlIjU9xtYPc3h/viw8KgO9S6wm4O7Y8?blocks=bipZ12rnUhaJi0Q7F"
                target="_blank"
                rel="noopener noreferrer"
            >      <br></br>
                    Click Profile 
                </a>
              
        </div>    
    );
 };
                   
// directoryAirTable() {
//     const url = "https://api.airtable.com/v0/appBu5I7tEJENCp45/Employee%20directory";
//       fetch(url, {
//         headers: { Authorization: "Bearer " + process.env.REACT_APP_DIRECTORY_AIRTABLE_KEY  }
//       })
//       .then(response => response.json())
//       .then(responseData => {
//         // console.log("directory data ", responseData);
//         const crewDirectory = responseData.records;
//         // console.log("crewDirectory ", crewDirectory);
//         this.setState({
//           crewDirectory: crewDirectory, 
//           allDirectory: crewDirectory,
//         });
//       });
// };

// filterDirectory = searchTerm => {
//     // console.log('searchTerm ', searchTerm)
//     let directory = this.state.allDirectory;
//     const formattedSearch = searchTerm.toLowerCase();
//     // console.log(directory)
    
//     const results = directory.filter(person => {
//       // console.log(person)
//       let grabData = (
//         person.fields.Name +
//         person.fields.Phone +
//         person.fields['Email Address'] +
//         person.fields.Location +
//         person.fields.Title +
//         person.fields.State
//       )
//       .replace(/[^a-zA-Z0-9]/g, "")
//       .toLowerCase();
//       return grabData.indexOf(formattedSearch) > -1;
//     })
//     // console.log(results)
//     this.setState({ crewDirectory: results })
//   }


export default Profile
