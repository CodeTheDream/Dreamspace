import React from "react";
import OpenClose from "../OpenClose";

const SideBarOpen = props => {
  const dummyList = props.projectData;
  console.log("dummy", dummyList);
  const probableList = dummyList.filter(
    project => project.fields.Status !== "Probable"
  );
  const sideBarMenu = probableList.filter(
    project => project.fields.Status !== "Complete"
  );

  console.log("check for today's ", sideBarMenu);
  return (
    <div className="sidebar-menu">
      <div className="btn-home">
        <OpenClose />
      </div>
      {sideBarMenu.map(sideBar => (
        <li
          key={sideBar.fields.Name}
          onClick={() => props.selectProject(sideBar.id)}
          className="menu-container"
        >
          {sideBar.fields.Name.toUpperCase()}
        </li>
      ))}
    </div>
  );
};

export default SideBarOpen;
