import React from "react";
// import SideBarOpen from '../SideBarOpen';`

const SearchBar = props => {
  return (
    <div className = 'search-container'>
          <input 
      onChange = {(e) => props.filterProjectList(e.target.value)} 
      type="text" placeholder = 'Search...'/>
      {/* <input onChange = {() => props.selectProject} type = 'submit' />  button is not working properly */}
    </div>
  );
};

export default SearchBar;
