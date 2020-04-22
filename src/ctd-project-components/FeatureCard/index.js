import React from "react";
// import logo from "../styles/images/logo.png";
import moment from "moment";
import ctdlogo from "../../assets/images/ctd-logo.png";
import ctd from "../../assets/images/ctd-labs-horiz.png";

const FeatureCard = (props) => {
  const { project } = props;

  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <div className="row">
            <div className="side">
              <h2>{project.fields.Name}</h2>

              <img src={ctdlogo} id="flip-card-logo" alt={ctd} />
            </div>
          </div>
        </div>
        <div className="flip-card-back">
          <div className="header">
            <img src={ctd} alt={ctdlogo} />
            <h5>{project.fields.Name}</h5>
            <div className="container">
              {project.fields.Current_Team && (
                <div className="grid-row">
                  <div className="grid-item">Team:</div>
                  <div className="grid-item">{project.fields.Current_Team}</div>
                </div>
              )}
              {project.fields.Status && (
                <div className="grid-row">
                  <div className="grid-item">Status:</div>
                  <div className="grid-item">{project.fields.Status}</div>
                </div>
              )}
              {project.fields.Repo && (
                <div className="grid-row">
                  <div className="grid-item">Repo:</div>
                  <div className="grid-item">{project.fields.Repo}</div>
                </div>
              )}
              {project.fields.Meeting_Time && (
                <div className="grid-row">
                  <div className="grid-item">Meeting Time:</div>
                  <div className="grid-item">
                    {moment(project.fields.Meeting_Time).format(
                      "dddd @ h:mm a"
                    )}
                  </div>
                </div>
              )}
            </div>
            {/* </div> */}

            {/* {project.fields.Type && (
              <>
                <div className="card-type">Type</div>
                <div className="card-type-info">{project.fields.Type}</div>
              </>
            )} */}

            {/* {project.fields.Notes && (
              <>
                <div className="card-note">Notes</div>
                <div className="card-note-info">{project.fields.Notes}</div>
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
