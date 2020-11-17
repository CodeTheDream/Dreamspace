import React from 'react';
// import styled from 'styled-components';
// import profile from '../../containers/Directory/profile.js';
// import displayProfiles from '../../containers/Directory/profile.js';



// const Button = styled.button`
//   cursor: pointer;
//   background: transparent;
//   font-size: 16px;
//   border-radius: 3px;
//   color: palevioletred;
//   border: 2px solid palevioletred;
//   margin: 0 1em;
//   padding: 0.25em 1em;
//   transition: 0.5s all ease-out;
 
//   &:hover {
//     background-color: palevioletred;
//     color: white;
//   }
// `;
 
 const Profile = (props) => {
//     return (
//         <div className="Profiles">
//             <p>{props.name}</p>
//             <p>{props.title}</p>
//             <p>{props.photo}</p>
//             <p>{props.email}</p>
//         </div>
//     )
//     };
//     displayProfiles = () => {

//         this.setState({
//             displayProfiles: !this.state.displayProfiles
//         })

//     }

//     if (this.state.displayProfiles) {
//         profile = (
//         <div>
//              { this.state.profiles.map((profile, index) => {
//                   return <Profile key={profile.id}
//                   name={profile.name.title.photo.email} />       

//              })}
//         </div>
//      )
// }

        
    return(
        <div>
            <h1 className="profile-page">
            <br></br>
            Welcome to this Profile page. 
            <p>Hoping it appears in the browser.</p>
            {/* <Button>I am a Button</Button> */}
            </h1>
        </div>
       
    )
    }



export default Profile;
