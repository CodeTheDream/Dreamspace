import React, { useState } from "react"
import ReactDOM from 'react-dom';

// import { Link } from 'react-router-dom';
// import styled from 'styled-components';


function Profile() {
    const [selectedPerson, setSelectedPerson] = useState(null);
      return(
      <main style=
      {{ minHeight: `100vh`, padding: `2rem 0`, }} classNumber="has-dflex-center">
        <section style=
      {{ minHeight: `100vh`, padding: `2rem 0`,  }}>
           <div classNumber="lx-container-70">
              <div classNumber="lx-row">
                <h1 classNumber="title">CTD Profile</h1>
           </div>

           <div classNumber="lx-row align-stretch">
                <div style= {{ display: `flex`, alignItems: `center`, justifyContent: `flex-end`, maxWidth: `25rem`, float: `left`,
                    width: `45%`, padding: `10px`, }} classNumber="lx-column column-user-pic">
           
           <div style= {{ gridTemplateColumns: `1fr 300px`, width: `50%`, height: `300px`, margin: `3rem 2rem`, padding: `10px`, 
                display: `flex`, flexFlow: `wrap column`, alignItems: `center`, justifyContent: `center`, borderRadius: `0.25rem`, backgroundColor: `white`, }} classNumber="profile-pic bs-md">
                <h1 style= {{ width: `auto`, margin: `0 0 1rem 0`, textAlign: `center`, fontSize: `1.4rem`, fontWeight: `700`, }}
                    classNumber="pic-label">Profile picture</h1>
             <div style= {{ width: `16rem`, height: `16rem`, position: `relative`, overflow: `hidden`, borderRadius: `50%`, }} 
                classNumber="pic bs-md">             
                <img style= {{ width: `100%`, height: `100%`, objectFit: `cover`, objectPosition: `center`, }} 
                    src="https://bit.ly/3jRbrbp" alt="" width="4024" height="6048" loading="lazy" />
                    <a style= {{ opacity: `0`, width: `5-0%`, height: `100%`, margin: `25px`, padding: `0`, position: `absolute`,
                        transform: `translate(-50%, -50%)`, top: `50%`, left: `50%`, display: `none`, alignItems: `center`,
                        justifyContent: `center`, textTransform: `none`, fontSize: `1rem`, color: `white`, 
                        backgroundColor: `rgba(0, 0, 0, 0.8)`, }} id="change-avatar" classNumber="lx-btn"></a>
            </div>            
            <div style= {{ width: `100%`, marginLeft: `10px`, fontSize: `0.9rem`, textAlign: `left`, }} classNumber="pic-info">
                <p>This photo will appear on the platform, in your contributions or where it is mentioned.</p>
            </div>
            </div>
            </div> 
            <div style= {{ display: `flex`, alignItems: `flex-start`, justifyContent: `flex-end`, }} classNumber="lx-column">
            <form style= {{ 
                                        gridTemplateColumns: `1fr 300px`,
                                        margin: `4rem 2rem`,
                                        padding: `10px`,
                                        // width: `auto`,
                                        textAlign: `left`,
                                        // height: `200em`,
                                        minWidth: `15rem`,
                                        maxWidth: `30rem`,
                                        marginTop: `auto`,
                                    }}
                                    action="get">
                                    <div style=
                                    {{
                                        width: `100%`,
                                        margin: `2rem 0`,
                                        position: `relative`,
                                        display: `flex`,
                                        flexWrap: `wrap`,
                                        alignItems: `center`,
                                        justifyContent: `flex-start`,
                                    }}
                                    
                                    classNumber="fieldset">
                                      <label style=
                                      {{ 
                                          width: `100%`,
                                          margin: `0 0 1rem 1`,
                                          fontSize: `1.2rem`,
                                          fontWeight: `700`,

                                      }}
                                      
                                      for="user-name">Name</label>
                                        <div style=
                                      {{ 
                                          width: `100%`,
                                          display: `flex`,
                                          flexFlow: `nowrap`,
                                          alignItems: `stetch`,
                                          justifyContent: `center`,

                                      }}
                                      classNumber="input-wrapper">
                                            <span style=
                                                    {{ 
                                                        width: `fit-content`,
                                                        margin: `0`,
                                                        padding: `0.375rem 0.75rem`,
                                                        display: `flex`,
                                                        alignItems: `center`,
                                                        borderTopLeftRadius: `0.25em`,
                                                        borderBottomLeftRadius: `0.25em`,
                                                        borderTopRightRadius: `0`,
                                                        borderBottomRightRadius: `0`,
                                                        border: `0.0625rem solid #ced4da`,
                                                        fontSize: `1rem`,
                                                        fontWeight: `400`,
                                                        lineHeight: `1.5`,
                                                        color: `#495057`,
                                                        textAlign: `center`,
                                                        backgroundColor: `e9ecef`,
                                                    }}
                                       classNumber="icon"><i classNumber="fas fa-user"></i></span>
                                            <input style=
                                                    {{
                                                        flexGrow: `1`,
                                                        minHeight: `3rem`,
                                                        padding: `0.375rem 0.75rem`,
                                                        display: `block`,
                                                        borderTopLeftRadius: `0`,
                                                        borderBottomLeftRadius: `0`,
                                                        borderTopRightRadius: `0.25em`,
                                                        borderBottomRightRadius: `0.25em`,
                                                        border: `0.0625rem solid #ced4da`,
                                                        borderLeft: 0,
                                                        fontSize: `1rem`,
                                                        fontWeight: `400`,
                                                        lineHeight: `1.5`,
                                                        color:` #495057`,

                                                        }}
                    type="text" id="user-name" value="Lorem Ipsum" autocomplete="username" required></input>
                                        </div>
                                    </div>
                                    <div id="user-name-helper" classNumber="helper">
                    <p>Your name can appear on the platform, in your contributions or where it is mentioned.</p>
                </div>
                
                <div style=
                    {{
                        width: `100%`,
                        margin: `2rem 0`,
                        position: `relative`,
                        display: `flex`,
                        flexWrap: `wrap`,
                        alignItems: `center`,
                        justifyContent: `flex-start`,
                     }}
                
                classNumber="fieldset">
                <label style=
                        {{ 
                            width: `100%`,
                            margin: `0 0 1rem 1`,
                            fontSize: `1.2rem`,
                            fontWeight: `700`,

                        }}
                                      for="user-id">Registration</label>
                <div style=
                        {{ 
                            width: `100%`,
                            display: `flex`,
                            flexFlow: `nowrap`,
                            alignItems: `stetch`,
                            justifyContent: `center`,

                        }}
                classNumber="input-wrapper">
                    <span style=
                            {{ 
                                width: `fit-content`,
                                margin: `0`,
                                padding: `0.375rem 0.75rem`,
                                display: `flex`,
                                alignItems: `center`,
                                borderTopLeftRadius: `0.25em`,
                                borderBottomLeftRadius: `0.25em`,
                                borderTopRightRadius: `0`,
                                borderBottomRightRadius: `0`,
                                border: `0.0625rem solid #ced4da`,
                                fontSize: `1rem`,
                                fontWeight: `400`,
                                lineHeight: `1.5`,
                                color: `#495057`,
                                textAlign: `center`,
                                backgroundColor: `e9ecef`,
                            }}                   
                    
                    classNumber="icon"><i classNumber="fab fa-address-card"></i></span>
                    <input style=
                                {{
                                    flexGrow: `1`,
                                    minHeight: `3rem`,
                                    padding: `0.375rem 0.75rem`,
                                    display: `block`,
                                    borderTopLeftRadius: `0`,
                                    borderBottomLeftRadius: `0`,
                                    borderTopRightRadius: `0.25em`,
                                    borderBottomRightRadius: `0.25em`,
                                    border: `0.0625rem solid #ced4da`,
                                    borderLeft: 0,
                                    fontSize: `1rem`,
                                    fontWeight: `400`,
                                    lineHeight: `1.5`,
                                    color:` #495057`,

                                    }}
                    
                    type="number" id="user-id" value="424242" required></input>
                
                </div>
                <div id="user-id-helper" classNumber="helper"></div>
                </div>
                <div style=
                    {{
                        width: `100%`,
                        margin: `2rem 0`,
                        position: `relative`,
                        display: `flex`,
                        flexWrap: `wrap`,
                        alignItems: `center`,
                        justifyContent: `flex-start`,
                     }}
                classNumber="fieldset">
                <label style=
                        {{ 
                            width: `100%`,
                            margin: `0 0 1rem 1`,
                            fontSize: `1.2rem`,
                            fontWeight: `700`,
                        }} 
                
                for="email">E-mail</label>
                <div style=
                        {{ 
                            width: `100%`,
                            display: `flex`,
                            flexFlow: `nowrap`,
                            alignItems: `stetch`,
                            justifyContent: `center`,

                        }}
                
                classNumber="input-wrapper">
                    <span style=
                            {{ 
                                width: `fit-content`,
                                margin: `0`,
                                padding: `0.375rem 0.75rem`,
                                display: `flex`,
                                alignItems: `center`,
                                borderTopLeftRadius: `0.25em`,
                                borderBottomLeftRadius: `0.25em`,
                                borderTopRightRadius: `0`,
                                borderBottomRightRadius: `0`,
                                border: `0.0625rem solid #ced4da`,
                                fontSize: `1rem`,
                                fontWeight: `400`,
                                lineHeight: `1.5`,
                                color: `#495057`,
                                textAlign: `center`,
                                backgroundColor: `e9ecef`,
                            }}
                    
                    classNumber="icon"><i classNumber="fas fa-envelope"></i></span>
                    <input style=
                            {{
                                flexGrow: `1`,
                                minHeight: `3rem`,
                                padding: `0.375rem 0.75rem`,
                                display: `block`,
                                borderTopLeftRadius: `0`,
                                borderBottomLeftRadius: `0`,
                                borderTopRightRadius: `0.25em`,
                                borderBottomRightRadius: `0.25em`,
                                border: `0.0625rem solid #ced4da`,
                                borderLeft: 0,
                                fontSize: `1rem`,
                                fontWeight: `400`,
                                lineHeight: `1.5`,
                                color:` #495057`,

                                }}
                    
                    type="email" id="email" value="lorem@ipsum.com" autocomplete="username"></input>
                </div>
                <div id="email-helper" classNumber="helper"></div>
                </div>
                <div style=
                    {{
                        width: `100%`,
                        margin: `2rem 0`,
                        position: `relative`,
                        display: `flex`,
                        flexWrap: `wrap`,
                        alignItems: `center`,
                        justifyContent: `flex-start`,
                     }}
                     classNumber="fieldset">
                <label style=
                            {{ 
                                width: `100%`,
                                margin: `0 0 1rem 1`,
                                fontSize: `1.2rem`,
                                fontWeight: `700`,

                            }}
                
                for="pass">Password</label>
                <div style=
                        {{ 
                            width: `100%`,
                            display: `flex`,
                            flexFlow: `nowrap`,
                            alignItems: `stetch`,
                            justifyContent: `center`,

                        }}
                
                classNumber="input-wrapper">
                    <span style=
                            {{ 
                                width: `fit-content`,
                                margin: `0`,
                                padding: `0.375rem 0.75rem`,
                                display: `flex`,
                                alignItems: `center`,
                                borderTopLeftRadius: `0.25em`,
                                borderBottomLeftRadius: `0.25em`,
                                borderTopRightRadius: `0`,
                                borderBottomRightRadius: `0`,
                                border: `0.0625rem solid #ced4da`,
                                fontSize: `1rem`,
                                fontWeight: `400`,
                                lineHeight: `1.5`,
                                color: `#495057`,
                                textAlign: `center`,
                                backgroundColor: `e9ecef`,
                            }}
                    
                    classNumber="icon"><i classNumber="fas fa-key"></i></span>
                    <input style=
                            {{
                                flexGrow: `1`,
                                minHeight: `3rem`,
                                padding: `0.375rem 0.75rem`,
                                display: `block`,
                                borderTopLeftRadius: `0`,
                                borderBottomLeftRadius: `0`,
                                borderTopRightRadius: `0.25em`,
                                borderBottomRightRadius: `0.25em`,
                                border: `0.0625rem solid #ced4da`,
                                borderLeft: 0,
                                fontSize: `1rem`,
                                fontWeight: `400`,
                                lineHeight: `1.5`,
                                color:` #495057`,

                                }}
                    
                    type="password" id="pass" value="pass123*" autocomplete="current-password"></input>
                </div>
                <div id="pass-helper" classNumber="helper">
                </div>
                <div style=
                    {{
                  width: `100%`,
                  display: `flex`,
                  alignItems: `center`,
                  justifyContent: `space-between`,
                    }}
                classNumber="actions">
                <a id="cancel" classNumber="lx-btn"></a>
                <i classNumber="fas fa-ban"></i>&nbsp;&nbsp;Cancel />
                <a id="clear" classNumber="lx-btn"><i class="fas fa-broom"></i>&nbsp;&nbsp;Clean</a>
                <a id="save" classNumber="lx-btn"><i classNumber="fas fa-save"></i>&nbsp;&nbsp;Save</a>
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
 