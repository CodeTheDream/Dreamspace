import React from "react";

const SideListContent = props => {
  const dummyList = props.projectData;
  console.log("side-dummy", dummyList);
  const probableList = dummyList.filter(
    project => project.fields.Status !== "Probable"
  );
  const filterList = probableList.filter(
    project => project.fields.Status !== "Complete"
  );
  console.log("side-filterList", filterList);

  return (
    // <div className="sidebar-menu">
    // {/* <OpenClose /> */} {/* I don't need at this time or if at all */}
    // <div className="collapse-container">
    // {/* <div className="search-container">
    //   <SearchBar
    //     projectData={props.projectData}
    //     selectProject={props.selectProject}
    //     handleInput={props.handleInput}
    //   />
    // </div> */}
    <div className="menu-container">
      {filterList.map(sideBar => (
        <li
          key={sideBar.fields.Name}
          onClick={() => props.selectProject(sideBar.id)}
          className="menu-container"
        >
          {sideBar.fields.Name.toUpperCase()}
        </li>
      ))}
    </div>
    // </div>
    // </div>
  );
};
export default SideListContent;
