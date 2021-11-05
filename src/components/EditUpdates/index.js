import "./styles.css";
import { useState } from "react";
//import { compose } from "recompose";
import { withFirebase } from "../../components/Firebase";
import { useParams } from 'react-router-dom'



const firstName = " ";
const lastName = " ";
const developer = " ";
const title = " ";
const projects = " ";
const introdution = " ";
const language = " ";
const mentor = " ";
const email = " ";
const github = " ";
const quote = " ";
const hobbies = " ";
const remote = " ";
const equipment = " ";
const city = " ";
const state = " ";
const country = " ";
const passwordOne = " ";
const passwordTwo = " ";

const Updates = () => {
  const [editFirstName, setEditFirstName] = useState(false);
  const [editLastName, setEditLastName] = useState(false);
  const [editDeveloper, setEditDeveloper] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [editProjects, setEditProjects] = useState(false);
  const [editIntroduction, setEditIntroduction] = useState(false);
  const [editLanguage, setEditLanguage] = useState(false);
  const [editMentor, setEditMentor] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editGithub, setEditGithub] = useState(false);
  const [editQuote, setEditQuote] = useState(false);
  const [editHobbies, setEditHobbies] = useState(false);
  const [editRemote, setEditRemote] = useState(false);
  const [editEquipment, setEditEquipment] = useState(false);
  const [editCity, setEditCity] = useState(false);
  const [editState, setEditState] = useState(false);
  const [editCountry, setEditCountry] = useState(false);
const [editPasswordOne, setEditPasswordOne] = useState(false);
const [editPasswordTwo, setEditPasswordTwo] = useState(false);
const [editDisabledSave, setEditDisabledSave] = useState(true);

// const saveEdit = () => {
//     setDisabledField(true);
//     setDisabledSave(true);
//     setDisabledEdit(false);
//   };


const EditUpdates = ({firebase}) => { 
    const params = useParams() 
      // console.log('Team member params', params)
      const [user, setUser] = useState([])
      useEffect(() => {
        firebase
        .users().doc(params.id).get()
        .then( snapshot =>{ 
          console.log('snapshot', snapshot.data()) 
          return (setUser(snapshot.data()))
        })
  
      },[]);


  const updateProfileField = (object) => {
    console.log("firebase update call goes here", object);
    setEditLastName(false);
    setEditFirstName(false);
    setEditTitle(false);
    setEditProjects(false);
    setEditIntroduction(false);
    setEditLanguage(false);
    setEditMentor(false);
    setEditEmail(false);
    setEditGithub(false);
    setEditQuote(false);
    setEditHobbies(false);
    setEditRemote(false);
    setEditEquipment(false);
    setEditCity(false);
    setEditState(false);
    setEditCountry(false);
    setEditDeveloper(false);
  };

  return (
    <div>
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>

        {!editFirstName && (
          <div className="profile-item">
            <div>First Name:</div>&nbsp;&nbsp;
            <div>La La</div>
            <div onClick={() => setEditFirstName(true)} className="edit">
              EDIT
            </div>
          </div>
        )}

        {editFirstName && (
          <EditProfileItem name=" " save={updateProfileField} itemValue=" " />
        )}

        {!editLastName && (
          <div className="profile-item">
            <div>Last Name:</div>&nbsp;&nbsp;
            <div>Miller</div>
            <div onClick={() => setEditLastName(true)} className="edit">
              EDIT
            </div>
          </div>
        )}

        {editLastName && (
          <EditProfileItem name=" " save={updateProfileField} itemValue=" " />
        )}

        {!editDeveloper && (
          <div className="profile-item">
            <div>Developer:</div>&nbsp;&nbsp;
            <div>React JS</div>
            <div onClick={() => setEditDeveloper(true)} className="edit">
              EDIT
            </div>
          </div>
        )}

        {editDeveloper && (
          <EditProfileItem name=" " save={updateProfileField} itemValue=" " />
        )}

        {!editTitle && (
          <div className="profile-item">
            <div>Title:</div>&nbsp;&nbsp;
            <div>Intern</div>
            <div onClick={() => setEditTitle(true)} className="edit">
              EDIT
            </div>
          </div>
        )}

        {editTitle && (
          <EditProfileItem name=" " save={updateProfileField} itemValue=" " />
        )}

        {!editProjects && (
          <div className="profile-item">
            <div>Projects:</div>&nbsp;&nbsp;
            <div>ACCT</div>
            <div onClick={() => setEditProjects(true)} className="edit">
              EDIT
            </div>
          </div>
        )}

        {editProjects && (
          <EditProfileItem name=" " save={updateProfileField} itemValue=" " />
        )}

        {!editEmail && (
          <div className="profile-item">
            <div>Email:</div>&nbsp;&nbsp;
            <div>lalamil@yahoo.com</div>
            <div onClick={() => setEditEmail(true)} className="edit">
              EDIT
            </div>
          </div>
        )}

        {editEmail && (
          <EditProfileItem name=" " save={updateProfileField} itemValue=" " />
        )}

        {!editIntroduction && (
          <div className="profile-item">
            <div>Introduction:</div>&nbsp;
            <div>I'm new to the area and been in the industry for 5 years.</div>
            <div onClick={() => setEditIntroduction(true)} className="edit">
              EDIT
            </div>
          </div>
        )}

        {editIntroduction && (
          <EditProfileItem name=" " save={updateProfileField} itemValue=" " />
        )}

        {!editQuote && (
          <div className="profile-item">
            <div>Quote:</div>&nbsp;
            <div>'Become the change you want to see.' Ghandi</div>
            <div onClick={() => setEditQuote(true)} className="edit">
              EDIT
            </div>
          </div>
        )}

        {editQuote && (
          <EditProfileItem name=" " save={updateProfileField} itemValue=" " />
        )}

        {!editHobbies && (
          <div className="profile-item">
            <div>Hobbies:</div>&nbsp;&nbsp;
            <div>Dancing, Hiking, Baking, Running</div>
            <div onClick={() => setEditHobbies(true)} className="edit">
              EDIT
            </div>
          </div>
        )}

        {editHobbies && (
          <EditProfileItem name=" " save={updateProfileField} itemValue=" " />
        )}

        {!editLanguage && (
          <div className="profile-item">
            <div>Language:</div>&nbsp;&nbsp;
            <div>English</div>
            <div onClick={() => setEditLanguage(true)} className="edit">
              EDIT
            </div>
          </div>
        )}

        {editLanguage && (
          <EditProfileItem name=" " save={updateProfileField} itemValue=" " />
        )}

        {!editGithub && (
          <div className="profile-item">
            <div>Github:</div>&nbsp;&nbsp;
            <div>lala/github</div>
            <div onClick={() => setEditGithub(true)} className="edit">
              EDIT
            </div>
          </div>
        )}

        {editGithub && (
          <EditProfileItem name=" " save={updateProfileField} itemValue=" " />
        )}

        {!editRemote && (
          <div className="profile-item">
            <div>Remote:</div>&nbsp;&nbsp;
            <div>No</div>
            <div onClick={() => setEditRemote(true)} className="edit">
              EDIT
            </div>
          </div>
        )}

        {editRemote && (
          <EditProfileItem name=" " save={updateProfileField} itemValue=" " />
        )}

        {!editMentor && (
          <div className="profile-item">
            <div>Mentor:</div>&nbsp;&nbsp;
            <div>No</div>
            <div onClick={() => setEditMentor(true)} className="edit">
              EDIT
            </div>
          </div>
        )}

        {editMentor && (
          <EditProfileItem name=" " save={updateProfileField} itemValue=" " />
        )}

        {!editEquipment && (
          <div className="profile-item">
            <div>Equipment:</div>&nbsp;&nbsp;
            <div>No</div>
            <div onClick={() => setEditEquipment(true)} className="edit">
              EDIT
            </div>
          </div>
        )}

        {editEquipment && (
          <EditProfileItem name=" " save={updateProfileField} itemValue=" " />
        )}

        {!editCity && (
          <div className="profile-item">
            <div>City:</div>&nbsp;&nbsp;
            <div>Durham</div>
            <div onClick={() => setEditCity(true)} className="edit">
              EDIT
            </div>
          </div>
        )}

        {editCity && (
          <EditProfileItem name=" " save={updateProfileField} itemValue=" " />
        )}

        {!editState && (
          <div className="profile-item">
            <div>State:</div>&nbsp;&nbsp;
            <div>North Carolina</div>
            <div onClick={() => setEditState(true)} className="edit">
              EDIT
            </div>
          </div>
        )}
        {editState && (
          <EditProfileItem name=" " save={updateProfileField} itemValue=" " />
        )}

        {!editCountry && (
          <div className="profile-item">
            <div>Country:</div>&nbsp;&nbsp;
            <div>United States</div>
            <div onClick={() => setEditCountry(true)} className="edit">
              EDIT
            </div>
          </div>
        )}
        {editCountry && (
          <EditProfileItem name=" " save={updateProfileField} itemValue=" " />
        )}
      </div>
    </div>
  )
}



const EditProfileItem = ({ name, save, itemValue }) => {
    console.log('checking');
  const [thisValue, setThisValue] = useState(itemValue);

  return (
    <div>
      <input
        type="text"
        name={name}
        value={thisValue}
        onChange={(e) => setThisValue(e.target.value)}
      />

    <div onClick={save}>Update {name}</div>
    </div>
  );
};

export default EditUpdates;

export { EditProfileItem };
export { Updates };

