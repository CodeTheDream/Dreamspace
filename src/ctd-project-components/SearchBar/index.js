import React from "react";
// import SideBarOpen from '../SideBarOpen';`


const SearchBar = props => {
  return (
    <div className = 'search-container'>
      <input onChange={props.handleInput} type="text" placeholder = 'Search...'/>
      <div className = 'search'></div>
      <div className = 'closed-side-bar'>
      <button 
      style = {{
        width:'65px', 
        height:'30px',
        fontSize:'15px', 
        backgroundColor: '#3fb0ac',
        color: '#fff',
        }}
        onClick = {props.handleClick}
        type = 'button'>{props.closeSideBar ? 'Open' : 'Close'}</button>
    </div>

      {/* <input onChange = {() => props.selectProject} type = 'submit' />  button is not working properly */}
    </div>
  );
};

export default SearchBar;
