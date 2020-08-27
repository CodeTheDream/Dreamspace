import React from "react";
// import SideBarCloseButton from '../SideBarCloseButton';


const SearchBar = props => {
  // console.log(props)
  return (
    <div className = 'search-container'>
      <input 
      onChange = {(e) => props.filterProjectList(e.target.value)} 
      type="text" placeholder = 'Search...'/>
      <div className = 'search'></div>
      {/* <input onChange = {() => props.selectProject} type = 'submit' />  button is not working properly */}
    </div>
  );
};

export default SearchBar;
