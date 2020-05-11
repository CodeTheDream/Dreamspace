import React from 'react';

const SideBarOpenButton = props => (
  <div className = 'side-btn-container'>
    <button 
    onClick = {props.handleClick}
    style = {{
      height: '35px',
      width: '75px',
      margin: '10px',
      fontSize: '15px',
      backgroundColor: '#3fb0ac',
      color: '#fff',
      }} 
    type = 'button'>Open</button>
  </div>
)
export default SideBarOpenButton;
