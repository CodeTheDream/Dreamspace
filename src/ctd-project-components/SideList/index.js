import React from "react";

import axios from "axios";
import SideListContent from "../SideListContent";

class SideList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const dumList = this.props.projectData;
    console.log("dumList", dumList);
    const probList = dumList.filter(
      (listItem) => listItem.fields.Status !== "Probable"
    );
    console.log("probList", probList);
    const finalFitler = probList.filter(
      (listItem) => listItem.fields.Status !== "Complete"
    );
    console.log("finalFilter", finalFitler);
    return (
      <div className="modal-wrapper-postarticle">
        <div className="side-style devedit-form" id="popform">
          <button
            className=" dialogCloseButonStayle"
            onClick={this.props.closePopup}
          >
            X
          </button>
          <div className="pop-Side">
            {finalFitler.map((sideBar) => (
              <li
                key={sideBar.fields.Name}
                onClick={() => this.props.selectProject(sideBar.id)}
                className="side-item"
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
