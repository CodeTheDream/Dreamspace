import React from 'react';

const SideBarCloseButton = props => {
  return(
    <div className = 'open-side-bar'>
      <button 
      style = {{
        width:'65px', 
        height:'30px',
        fontSize:'15px', 
        backgroundColor: '#3fb0ac',
        color: '#fff',
        margin: '3px',
        }}
        onClick = {props.handleCloseClick}
        type = 'button'>Close</button>
    </div>
  )
}

export default SideBarCloseButton;