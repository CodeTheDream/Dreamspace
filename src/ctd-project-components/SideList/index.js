import React from "react";

import axios from "axios";
import SideListContent from "../SideListContent";

class SideList extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   Name: "",
    //   Repo: "",
    //   Website: "",
    //   // Meeting_Time: "",
    //   Project_Description: "",
    //   Notes: "",
    //   External: false
    // };
  }

  render() {
    const dumList = this.props.projectData;
    console.log("dumList", dumList);
    const probList = dumList.filter(
      listItem => listItem.fields.Status !== "Probable"
    );
    console.log("probList", probList);
    const finalFitler = probList.filter(
      listItem => listItem.fields.Status !== "Complete"
    );
    console.log("finalFilter", finalFitler);
    return (
      <div className="modal-wrapper-postarticle">
        <div className="dialogstyle devedit-form" id="popform">
          <button
            className=" dialogCloseButonStayle"
            onClick={this.props.closePopup}
          >
            X
          </button>
          <h4>{this.props.text}</h4>
          <div className="pop-Side">
            {finalFitler.map(sideBar => (
              <li
                key={sideBar.fields.Name}
                onClick={() => this.props.selectProject(sideBar.id)}
                className="menu-container"
              >
                {sideBar.fields.Name.toUpperCase()}
              </li>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default SideList;
