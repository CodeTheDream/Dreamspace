import React, { useState } from "react";
import styled from 'styled-components';




const imgData = styled.div`
width: 20rem;
height: 20rem;
position: relative;
borderRadius: 50%;
} 
`
const img = styled.div`
  width: 100%; 
  height: 100%;
  objectFit: cover;
  objectPosition: center; 
}`


function ProfilePic() {
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(null);
  const onChangePicture = e => {
    if (e.target.files[0]) {
      console.log("picture: ", e.target.files);
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  return (
    <div className="register_wrapper">
      <div className="register_player_column_layout_one">
        <div className="register_player_Twocolumn_layout_two">
          <form className="myForm">
            <div className="formInstructionsDiv formElement">
              <p className="instructionsText" />
              <div className="register_profile_image">
                <input id="profilePic" type="file" onChange={onChangePicture} />
              </div>
               <div className="previewProfilePic">
                <img className="userProfilePic" src={imgData} />
              </div> 
            </div>
            <div className="fillContentDiv formElement">
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePic