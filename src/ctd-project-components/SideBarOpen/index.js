import React from "react";
// import OpenClose from "../OpenClose";
import SearchBar from '../SearchBar';
// import '../../../src/'

const SideBarOpen = props => {
  console.log(props);
  let sideBarMenu = props.projectData;
  let probableList = sideBarMenu.filter(probable => probable.fields.Status !== 'Probable' && probable.fields.Status !== 'Paused');
  probableList.sort((a, b) => (a.fields.Name > b.fields.Name) ? 1 : -1);
  console.log(probableList)

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
                    filterProjectList={props.filterProjectList}
                    // handleInput={props.handleInput}
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
