import React, { useState } from "react"
import ReactDOM from 'react-dom';

// import { Link } from 'react-router-dom';
// import styled from 'styled-components';


function Profile () {
    const [selectedPerson, setSelectedPerson] = useState(null);
      return(
      <main style=
      {{
        minHeight: `100vh`,
        padding: `2rem 0`,

      }} class="has-dflex-center">
        <section>
           <div class="lx-container-70">
              <div class="lx-row">
         <h1 class="title">Edit your profile</h1>
       </div>
                <div class="lx-row align-stretch">
                    <div class="lx-column column-user-pic">
                        <div class="profile-pic bs-md">
                        <h1 class="pic-label">Profile picture</h1>
                            <div class="pic bs-md">             
                            <img style=
                                {{
                                width: `4024`, 
                                height: `6048`, 
                                loading: `lazy`, 
                                // marginTop: `10px`,
                                // background: `blue`,
                                }} 
                                src={setSelectedPerson.image} alt="uploaded images" />
                            
                            <a id="change-avatar" class="lx-btn"><i class="fas fa-camera-retro"></i>&nbsp;&nbsp;Change your profile picture.</a>
                            </div>            
                                <div class="pic-info">
                                  <p><i class="fas fa-exclamation-triangle"></i>&nbsp;&nbsp;This photo will appear on the platform, in your contributions or where it is mentioned.</p>
                                </div>
                              </div>
                            </div> 
                             <div style=
                                    {{
                                      display: `flex`,
                                      alignItems: `flex-start`,
                                      justifyContent: `flex-end`,

                                    }}
                             class="lx-column">
                                <form action="get">
                                    <div class="fieldset">
                                      <label for="user-name">Name</label>
                                        <div class="input-wrapper">
                                            <span class="icon"><i class="fas fa-user"></i></span>
                                            <input type="text" id="user-name" value="Lorem Ipsum" autocomplete="username" required></input>
                                        </div>
                                    </div>
                                    <div id="user-name-helper" class="helper">
                    <p>Your name can appear on the platform, in your contributions or where it is mentioned.</p>
                </div>
                
                <div class="fieldset">
                <label for="user-id">Registration</label>
                <div class="input-wrapper">
                    <span class="icon"><i class="fas fa-address-card"></i></span>
                    <input type="number" id="user-id" value="424242" required></input>
                
                </div>
                <div id="user-id-helper" class="helper"></div>
                </div>
                <div class="fieldset">
                <label for="email">E-mail</label>
                <div class="input-wrapper">
                    <span class="icon"><i class="fas fa-envelope"></i></span>
                    <input type="email" id="email" value="lorem@ipsum.com" autocomplete="username"></input>
                </div>
                <div id="email-helper" class="helper"></div>
                </div>
                <div class="fieldset">
                <label for="pass">Password</label>
                <div class="input-wrapper">
                    <span class="icon"><i class="fas fa-key"></i></span>
                    <input type="password" id="pass" value="pass123*" autocomplete="current-password"></input>
                </div>
                <div id="pass-helper" class="helper">
                </div>
                <div class="actions">
                <a id="cancel" class="lx-btn"></a>
                <i class="fas fa-ban"></i>&nbsp;&nbsp;Cancel />
                <a id="clear" class="lx-btn"><i class="fas fa-broom"></i>&nbsp;&nbsp;Clean</a>
                <a id="save" class="lx-btn"><i class="fas fa-save"></i>&nbsp;&nbsp;Save</a>
                </div>
                </div>
            </form>
            </div>
            </div>
            </div>
    </section>
    </main>
    )
 };


export default Profile;





/**
 * Our data
 * ------------------------
//  */
// const person = {
//   profilePic: '',
//   name: '',
// //   foodType: 'Everything',
//   age: 28,
//   likes: 'Coding into the wee hours of the morning',
//   twitterUsername: 'chrisoncode',
//   avatar:
//     'https://scotch-res.cloudinary.com/image/upload/v1556479698/xRZsnhr0_400x400_cpyg2t.png'
// };

/**
 * Our React component where we should display data
 * ------------------------
 */
// function Profile () {
//   const url = `https://twitter.com/${user.twitterUsername}`;

//   return (
//     <div className="App">
//       {/* Show user data here */}
//       <div className="user-deets">
//         <img src={person.profilePic} alt={person.name} />
//         {/* <h3>
//           <a href={url}>{user.name}</a>
//         </h3>
//         <p>
//           <strong>Location</strong> {user.location}
//         </p>
//         <p>
//           <strong>Eats</strong> {user.foodType}
//         </p>
//         <p>
//           <strong>Age</strong> {user.age}
//         </p>
//         <p>
//           <strong>Likes</strong> {user.likes}
//         </p>
//         <p>
//           <strong>Twitter</strong>{' '}
//           <a href={url}>@{user.twitterUsername}</a>
//         </p>
//       </div> */}

//       {/* <ScotchInfoBar /> */}
//       </div>
//     </div>
//   );
// }


 
// const rootElement = document.getElementById('root');
// ReactDOM.render(<App />, rootElement); 

// export default Profile;

// 
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
 