import React from 'react';
import SideBarOpenButton from '../SideBarButton';

const SideBarClose = props => {
  return(
    <div 
    style = {{
      height: '100%', 
      backgroundColor: '#fff',
      }}
      className = 'closed-side-bar'>
      <SideBarOpenButton handleClick = {props.handleClick}/>
    </div>)
}
export default SideBarClose;