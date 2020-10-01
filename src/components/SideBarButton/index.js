import React from 'react';

const SideBarButton = props => {
  console.log('test for ',props)
  return(
  <div className = 'side-btn-container'>
    <div className = 'other-btn-container'>
      <p
      onClick = {props.handleClick}>{props.title}</p>
    </div>
  </div>

  )
    }
export default SideBarButton;

