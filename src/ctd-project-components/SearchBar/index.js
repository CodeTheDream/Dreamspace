import React from "react";
// import SideBarCloseButton from '../SideBarCloseButton';


const SearchBar = props => {
  return (
    <div className = 'search-container'>
      <input onChange={props.handleInput} type="text" placeholder = 'Search...'/>
      <div className = 'search'></div>
      {/* <input onChange = {() => props.selectProject} type = 'submit' />  button is not working properly */}
    </div>
  );
};

export default SearchBar;
