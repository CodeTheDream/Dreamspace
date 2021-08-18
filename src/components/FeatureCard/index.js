import React from "react";
// import logo from "../styles/images/logo.png";
// import moment from "moment";
import ctdlogo from "../../assets/images/ctd-logo.png";
import ctd from "../../assets/images/ctd-labs-horiz.png";


const FeatureCard = props => {
  const { project } = props;
  const directoryData = props.crewDirectory;
  let images = 'https://ya-webdesign.com/images250_/placeholder-image-png-1.png';
  if(project.fields.photo) {
    images = project.fields.photo[0].url;
  }
  
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <div className="card-content">
            <img className = "ctd-image-logo-front" src={ctdlogo} id="card-logo" alt={ctd} />
            <h2 className = 'project-name-on-card'>{project.fields.Name}</h2>
          </div>
        </div>
        <div className="flip-card-back">
          <div className="flip-card-bun">
            {/* <div className="scroll-tip"> */}
            <img className = 'back-img' src={ctd} id="flip-card-logo-title" alt={ctdlogo} />
            {/* <div className="scroll-tip-text">
                Card is scrollable depending on size of content
              </div> */}
            {/* </div> */}
            <div className="flip-card-header"><strong>{project.fields.Name}</strong></div>
            {project.fields.Current_Team && (
              <>
                <div className = 'card-client'><strong>Client{'(s):\n'}</strong>{project.fields.Client}</div>
                <div className = 'website'><strong>Website:</strong> {project.fields.Website}</div>
                <div className = 'desc-container'><div className = 'project-desc'><strong>Description:</strong> {project.fields.Project_Description}</div></div>
                <div className="card-team"><strong>Current Team:</strong>{'\n'}{project.fields.Current_Team}</div>
                {/* <ProjectImageModal onClick = {props.handleImageClick} /> */}

              </>
            )}
            {project.fields.Status && (
              <>
                <div className="card-status"><strong>Status:</strong>{'\n'}{project.fields.Status}</div>
                <div className = 'project-image-container'>
                  <img onClick = {props.handleImageClick} style = {{width: '100px', height: '100px', cursor: 'pointer'}}src = {images} alt = 'Project Images' />
                </div>
              </>
            )}
            {/* {project.fields.Type && (
              <>
                <div className="card-type">Type</div>
                <div className="card-type-info">{project.fields.Type}</div>
              </>
            )} */}
            {/* {project.fields.Repo && (
              <>
                <div className="card-repo">Repo</div>
                <div className="card-repo-info">{project.fields.Repo}</div>
              </>
            )} */}
            {/* {project.fields.Notes && (
              <>
                <div className="card-note">Notes</div>
                <div className="card-note-info">{project.fields.Notes}</div>
              </>
            )} */}
            {/* {project.fields.Meeting_Time && (
              <>
                <div className="card-time">Meeting Time</div>
                <div className="card-time-info">
                  {moment(project.fields.Meeting_Time).format("dddd @ h:mm a")}
                </div>
              </>
            )} */}
            {/* {project.fields.Project_Description && (
              <>
                <div className="card-des">Project Description</div>
                <div className="card-des-info">
                  {project.fields.Project_Description}
                </div>
              </>
            )} */}
            {/* {project.fields.Website && (
              <>
                <div className="card-website">Website</div>
                <div className="card-website-info">
                  {project.fields.Website}
                </div>
              </>
            )} */}
          </div>
        </div>
      </div>
    </div>    
  );
};

export default FeatureCard;


