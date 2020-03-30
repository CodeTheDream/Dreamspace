import React from "react";
// import OpenClose from "../OpenClose";
import SearchBar from '../SearchBar';
// import '../../../src/'


const SideBarOpen = props => {
  let sideBarMenu = props.filterProject
  let probableList = sideBarMenu.filter(filterProjectList =>
    filterProjectList.fields.Status !== 'Probable'
    );

    let filteredList = probableList.filter(project => 
      project.fields.Status !== 'Complete')
  console.log('sideBarMenu ', sideBarMenu)
  console.log('probableList ', probableList)
  console.log('filteredList ', filteredList)
    return (
      <div className="sidebar-menu">
        <div className="btn-home">
          {/* <OpenClose /> */}       {/* I don't need at this time or if at all */}
          <div className = 'search-container'>
                <SearchBar
                  projectData={props.projectData}
                  selectProject={props.selectProject}
                  handleInput={props.handleInput}
                />
            </div>
              
            
        </div>
        <div className = 'menu-container'>
        {filteredList.map(sideBar => (
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


  // console.log("check for today's ", sideBarMenu);

export default SideBarOpen;
