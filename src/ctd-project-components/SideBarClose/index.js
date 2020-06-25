import React from 'react';
import SideBarButton from '../SideBarButton';

const SideBarClose = props => {
  return(<div style = {{height: '100%', backgroundColor: '#fff',}}className = 'closed-side-bar'><SideBarButton/></div>)
}
export default SideBarClose;