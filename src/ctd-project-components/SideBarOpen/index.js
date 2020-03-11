import React from "react";
import OpenClose from "../OpenClose";
import SearchBar from '../SearchBar';
// import '../../../src/'


const SideBarOpen = props => {
  let sideBarMenu = props.filterProject
  // const dummyList = props.projectData;
  // console.log("dummy", dummyList);
  // const probableList = dummyList.filter(
  //   project => project.fields.Status !== "Probable"
  // );
  // let sideBarMenu = probableList.filter(
  //   project => project.fields.Status !== "Complete"
  // );
  // sideBarMenu = props.filterProject
  // let filterSideBarMenu = props.filterProject
  // console.log('filterSideBarMenu ', filterSideBarMenu)
  console.log('sideBarMenu ', sideBarMenu)

  // console.log("check for today's ", sideBarMenu);
  return (
    <div className="sidebar-menu">
      <div className="btn-home">
        {/* <OpenClose /> */}       {/* I don't need at this time or if at all */ }
        <div className = 'search-container'>
              <SearchBar
                projectData={props.projectData}
                selectProject={props.selectProject}
                // handleInput={props.handleInput}
              />
          </div>
            
          
      </div>
      <div className = 'menu-container'>
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
    </div>
  );
};

export default SideBarOpen;
