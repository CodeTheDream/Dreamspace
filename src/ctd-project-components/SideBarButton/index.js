import React from 'react';

const SideBarButton = props => {
  console.log('test for ',props)
  return(
  <div className = 'side-btn-container'>
    <div className = 'other-btn-container'>
      <button
      onClick = {props.handleClick}
      style = {{
        height: '45px',
        width: '150px',
        margin: '10px',
        fontSize: '20px',
        backgroundColor: '#3fb0ac',
        color: '#fff',
        }} 
      >{props.title}</button>
    </div>
  </div>

  )
    }
export default SideBarButton;

