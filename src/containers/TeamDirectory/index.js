
//1. create TeamDirectoy function
//2. Get TD data fom firebase into an array
//3. Place array data inside state
//4. Render all team members info into team member cards
//5. onClick team member takes you to a route that is at directoy id
//6. Create team member component that displays team member's info from firebase
//7. When routing to team member container use params to pull individual team member from firebase
//8. Render individual team member inside of member component
//  useState let us keep local state in a function component
//9. Allow team members to edit if they are logged into my page
//10. useState Hook declares a state variable called diectory (same as this.state in a class).
//11. setDirectory updates 


//1. create TeamDirectoy function
import React, {useState, useEffect} from "react";
import withFirebase from '../../components/withFirebase';
library.add(faColumns);


//1. create team directory function
const TeamDirectory = ({firebase}) => {
//2. declare a new state variable, directory
//3. setDirectory is a function, the second return item. It updates
//   directory
//4. initialize empty array & place array data inside state
  const [directory, setDirectory] = useState([])
  useEffect(() => {
    firebase.directory().onSnapshot((snapshot) => {
      let directory = [];
      snapshot.forEach((doc) => directory.push({ ...doc.data(), uid: doc.id }));
      setDirectory( directory )
    });
  }, [])





return (
  <div>
  <p>Display all team {directory} members info onto individual cards. </p>
    {directory.map(directory => <div>{directory.name}</div>)}
  </div>
)
}
export default compose(withFirebase, withAuthorization(condition))(Directory);





//     const [loader, setLoader] = useState(false);

// const handleChange = (e) => {
//     e.preventDefault();
//     setLoader(true);

//     db.collection('users')
//         .add({
//             usename:,.
//             firstName: firstName,
//             lastName: lastName,
//             title: title,
//             projects: projects,
//             language: language,
//             email: email,
//             developer: developer,
//             github: github,
//             equipment: equipment,
//             mentor: mentor,
//             remote: remote,
//             state: state,
//             country: country,

//         })

//         .then(() => {
//             setLoader(false);
//             alert("Info submitted");
//         })
//         .catch((error) => {
//             alert(error.messasge);
//             setLoader(false);
//         });

//       setFirstName("");
//       setLastName("");
//       setTitle("");
//       setProjects("");
//       setLanguage("");
//       setEmail("");
//       setDeveloper("");
//       setGithub("");
//       setEquipment("");
//       setMentor("");
//       setRemote("");
//       setState("");
//       setCountry("");


// };     

//     return (
//         <div>
//             Hello World
//         </div>
//     )
// }

// export default TeamDirectory

