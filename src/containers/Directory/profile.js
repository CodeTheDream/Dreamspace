
// import styled from 'styled-components';
// import DirectorySearchBar from '../../components/DirectorySearchBar';
// import DirectoryList from '../../components/DirectoryList';
 

// // // and can help with the linking

// // // basically you need to make sure we have access to 
// // //whatever value we will use as the query params id for 
// // //each student (an airtable field) and that id will be part of the url

import React from 'react';
import ReactDOM from 'react-dom';
// import ScotchInfoBar from './ScotchInfoBar';
// import './styles.css';

/**
 * Our data
 * ------------------------
 */
const user = {
  name: 'Chris on Code',
  location: 'Las Vegas',
  foodType: 'Everything',
  age: 28,
  likes: 'Coding into the wee hours of the morning',
  twitterUsername: 'chrisoncode',
  avatar:
    'https://scotch-res.cloudinary.com/image/upload/v1556479698/xRZsnhr0_400x400_cpyg2t.png'
};

/**
 * Our React component where we should display data
 * ------------------------
 */
function Profile() {
  const url = `https://twitter.com/${user.twitterUsername}`;

  return (
    <div className="App">
      {/* Show user data here */}
      <div className="user-deets">
        <img src={user.avatar} alt={user.name} />
        <h3>
          <a href={url}>{user.name}</a>
        </h3>
        <p>
          <strong>Location</strong> {user.location}
        </p>
        <p>
          <strong>Eats</strong> {user.foodType}
        </p>
        <p>
          <strong>Age</strong> {user.age}
        </p>
        <p>
          <strong>Likes</strong> {user.likes}
        </p>
        <p>
          <strong>Twitter</strong>{' '}
          <a href={url}>@{user.twitterUsername}</a>
        </p>
      </div>

      {/* <ScotchInfoBar /> */}
    </div>
  );
}

export default Profile;

// const rootElement = document.getElementById('root');
// ReactDOM.render(<App />, rootElement);


// class Profile extends Component {
//     state = {
//       firstName: '',
//       lastName: '',
//       email: '',
//       photo: '',
//     };
//     handleChange = e => {
//       this.setState({
//         [e.target.id]: e.target.value
//       });
//     };
//     handleSubmit = e => {
//       e.preventDefault();
//       console.log(this.state);
//     };
//     render() {
//       return (
//         <div>
//           <form onSubmit={this.handleSubmit}>
//             <label htmlFor="heading">
//               <h2>
//                 <u> Personal Information: </u>
//               </h2>
//             </label>
//             <br />
//             <label htmlFor="firstName">First Name:</label>
//             <input
//               type="text"
//               placeholder="First Name"
//               id="firstName"
//               onChange={this.handleChange}
//             />
//             &nbsp;&nbsp;&nbsp;&nbsp;
//             <label htmlFor="middleName">Middle Name:</label>
//             <input
//               type="text"
//               placeholder="Middle Name"
//               id="middleName"
//               onChange={this.handleChange}
//             />{" "}
//             &nbsp;&nbsp;&nbsp;&nbsp;
//             <label htmlFor="lastName">Last Name:</label>
//             <input
//               type="text"
//               placeholder="Last Name"
//               id="lastName"
//               onChange={this.handleChange}
//             />{" "}
//             &nbsp;&nbsp;&nbsp;&nbsp;
//             <br />
//             <br />
//             <label htmlFor="mailId">Mail Id:</label>
//             <input
//               type="email"
//               placeholder="Enter Mail id"
//               id="mailId"
//               onChange={this.handleChange}
//             />
//             &nbsp;&nbsp;&nbsp;&nbsp;
//             <label htmlFor="phoneNum">Phone Number:</label>
//             <input
//               type="text"
//               placeholder="Enter Phone Number"
//               id="phoneNum"
//               onChange={this.handleChange}
//             />
//             &nbsp;&nbsp;&nbsp;&nbsp; Department:
//             <select id="department" onChange={this.handleChange}>
//               <option value="one">one</option>
//               <option value="two">two</option>
//               <option value="three">three</option>
//               <option value="four">four</option>
//             </select>
//             <br />
//             <br />
//             <label htmlFor="jobTitle">Job Title:</label>
//             <input
//               type="text"
//               placeholder="Job Title"
//               id="jobTitle"
//               onChange={this.handleChange}
//             />
//             &nbsp;&nbsp;&nbsp;&nbsp; Reporting Manager:
//             <select id="reportingManager" onChange={this.handleChange}>
//               <option value="one">one</option>
//               <option value="two">two</option>
//               <option value="three">three</option>
//               <option value="four">four</option>
//             </select>
//             <br />
//             <br />
//             Branch:
//             <select id="branch" onChange={this.handleChange}>
//               <option value="one">one</option>
//               <option value="two">two</option>
//               <option value="three">three</option>
//               <option value="four">four</option>
//             </select>
//             <br />
//             <br />
//             Employee Status:
//             <select id="employeeStatus" onChange={this.handleChange}>
//               <option value="Active">Active</option>
//               <option value="Inactive">Inactive</option>
//             </select>
//             <br />
//             <br />
//             Marital Status:
//             <select id="maritalStatus" onChange={this.handleChange}>
//               <option value="Married">Married</option>
//               <option value="Unmarried">Unmarried</option>
//             </select>
//             <br />
//             <br />
//             Role:
//             <select id="role" onChange={this.handleChange}>
//               <option value="Manager">Manager</option>
//               <option value="User">User</option>
//             </select>
//             <br />
//             <br />
//             <label htmlFor="checkbox">Promote as Manager</label>
//             <input type="checkbox" id="promote" onChange={this.handleChange} />
//           </form>
//         </div>
//       );
//     }
//   }
  
//   export default Profile;

// class Profile extends Component {
//   constructor(props) {
//       super(props);
//       this.state = {
//         employeeDirectory: [],
//         searchDirectory: "",
//         isFlipped: false,
//         isMapView: true
//       }
//   }
              
//   componentDidMount() {
//     this.directoryAirTable();
//   }
//   selectedStaffMember = id => {
//     this.setState({isFlipped: id});
//   }

//   directoryAirTable() {
//       const url = "https://api.airtable.com/v0/appBu5I7tEJENCp45/Employee%20directory";
//         fetch(url, {
//           headers: { Authorization: "Bearer " + process.env.REACT_APP_DIRECTORY_AIRTABLE_KEY  }
//         })
//         .then(response => response.json())
//         .then(responseData => {
//           // console.log("directory data ", responseData);
//           const employeeDirectory = responseData.records;
//           // console.log("crewDirectory ", crewDirectory);
//           this.setState({
//             employeeDirectory: employeeDirectory, 
//             allDirectory: employeeDirectory,
//           })
//         });
//       }
      
//     // projectAirTable() {
//     //   const url = "https://api.airtable.com/v0/appQSPi3XUdUMbM1m/Projects";
//     //   fetch(url, {
//     //     headers: { Authorization: "Bearer " + process.env.REACT_APP_AIRTABLE_KEY }
//     //   })
//     //     .then(response => response.json())
//     //     .then(responseData => {
//     //       // console.log("data from Airtable", responseData);
//     //       const projectData = responseData.records;
//     //       // console.log("projectData ", projectData);
//     //       this.setState({projectData: projectData});
//     //     });
//     //   }
  
//     filterDirectory = searchTerm => {
//       // console.log('searchTerm ', searchTerm)
//       let directory = this.state.allDirectory;
//       const formattedSearch = searchTerm.toLowerCase();
//       // console.log(directory)
//     const results = directory.filter(person => {
//       let grabData = (
//         person.fields.Name +
//         person.fields.Photo +
//         person.fields['Email Address'] +
//         person.fields.Location +
//         person.fields.Title +
//         person.fields.Images +
//         person.fields.Languages 
//       )
    
//         .replace(/[^a-zA-Z0-9]/g, "")
//         .toLowerCase();
//         return grabData.indexOf(formattedSearch) > -1;
//       })
//       // console.log(results)
//       this.setState({ employeeDirectory: results })
//     }
    
//     // toggleMap = () => {
//     //   this.setState({
//     //     isMapView: !this.state.isMapView
        
//     //   })
//     // }
  
//       render() {
      
//       return(
//         // <div>
//         // {this.state.isMapView ?
//         // <World 
//         //   toggleMap={this.toggleMap}
//         //   employeeDirectory = {this.state.employeeDirectory}
          
//         // /> :
//         <div className = 'directory-container'>
//          <p>Hello Tom, I'm stuck and need your assistance.</p>
//           {this.state.employeeDirectory && (
          
//           <div>
//           <DirectorySearchBar 
//             employeeDirectory={this.state.employeeDirectory}
//             selectedStaffMember={this.selectedStaffMember}
//             // handleInput={this.handleInput}
//             filterDirectory={this.filterDirectory}
//           />
//           <div onClick={this.toggleMap}>Toggle Map</div>
//           {selectedPerson && (
//           <p>{selectedPerson.individual.name}</p><br></br>
//           </div>
          
//           )}
//           {this.state.crewDirectory && (<DirectoryList 
//             employeeDirectory={this.state.employeeDirectory}
//             selectedStaffMember={this.selectedStaffMember}
//             projectData={this.state.projectData}
//             isFlipped={this.state.isFlipped}
//           />)}
//         </div>
//     )
//   }
    
// }
  
// export default Profile 
 