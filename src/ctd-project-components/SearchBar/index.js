import React from "react";
// import SideBarOpen from '../SideBarOpen';

const SearchBar = props => {
  return (
    <div>
      <form>
        <label>
          Search:
          <input onChange={props.handleInput} type="text" />
          {/* <input onChange = {() => props.selectProject} type = 'submit' />  button is not working properly */}
        </label>
      </form>
    </div>
  );
};

export default SearchBar;
