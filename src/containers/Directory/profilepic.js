import React, { useState } from "react";





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
              {/* <h2 className="formTitle">Jane Doe</h2> */}
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