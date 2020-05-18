import React from "react";
import SearchBar from '../SearchBar';
import SideBarButton from '../SideBarButton';

const SideBarOpen = props => {
  console.log(props);
  let sideBarMenu = props.projectData;
  let probableList = sideBarMenu.filter(probable => probable.fields.Status !== 'Probable' && probable.fields.Status !== 'Paused');
      console.log('sideBarMenu ', sideBarMenu)
      return (
        <div className= 'sidebar-menu'>
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
              <SideBarButton handleClick = {() => props.handleClick()} title = {'Close'}/>
          <div className = 'menu-container'>
          {probableList.map(sideBar => (
            <li
              // style={{backgroundColor: '#fae596'}}
              key={sideBar.id}
              onClick={() => props.selectProject(sideBar.id)}
              className="menu">
              {sideBar.fields.Name}
            </li>
          ))}
          </div>
        </div>
      );
    };
  export default SideBarOpen;
   
                    
                    
                    


    


    


              
            

