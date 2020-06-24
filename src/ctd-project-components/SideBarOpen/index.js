import React from "react";
import SearchBar from '../SearchBar';
import SideBarButton from '../SideBarButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
library.add(faTimes);

const DrawLines = ({ color }) => (
  <hr style={{color: color, backgroundColor: color, height: 1}} />);

const DrawBottomLine = ({color}) => (
  <hr style = 
    {{color: color, 
      backgroundColor: color, 
      height: 1, 
      position: 'relative', 
      top: '23.3em',
      marginTop: '16px'
    }}/>
);
  
  const SideBarOpen = props => {
    console.log(props);
    let sideBarMenu = props.projectData;
    let probableList = sideBarMenu.filter(probable => probable.fields.Status !== 'Probable' && probable.fields.Status !== 'Paused' && probable.fields.Status);
    probableList.sort((a, b) => (a.fields.Name > b.fields.Name) ? 1 : -1);
    console.log('see this', probableList)
    // let checkPhoto = probableList.fields.photo[0];
    // console.log('check ', checkPhoto);

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
              <SideBarButton handleClick = {() => props.handleClick()} title = {<FontAwesomeIcon className = 'times' icon = {faTimes} />}/>
              <div className = 'top-line-container'><DrawLines color = '#3fb0ac'/></div>
          </div>

          <div className = 'menu-container'>
              {probableList.map(sideBar => {
            // console.log('x');
            return(
              <li
                // style={{backgroundColor: '#fae596'}}
                key={sideBar.id}
                onClick={() => props.selectProject(sideBar.id)}
                className="menu">
                {sideBar.fields.Name}
              </li> 
            )})}
            <div><DrawBottomLine color = '#3fb0ac'/></div>
          </div>
          
        </div>
      );
};
  export default SideBarOpen;

              
            
            

          
            
          
              
   
                    
                    
                    


    


    


              
            

