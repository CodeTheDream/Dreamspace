import React from 'react';
import SideBarOpen from '../SideBarOpen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes} from '@fortawesome/free-solid-svg-icons';
library.add(faTimes);

const ProjectImageModal = props => {
  let getProps = props;
  console.log('hello props ', getProps);

  // declared a stock image, then called conditional to set up proper images.
  let canvas = 'https://ya-webdesign.com/images250_/placeholder-image-png-1.png';
  console.log('dee ',props.projectCanvas.fields);
  if(props.projectCanvas.fields.photo) {
    canvas = props.projectCanvas.fields.photo[0].url;
  }

// this handles the x button inside the modal
  let exit = <SideBarOpen />
  if(props.handleImageClick === false) {
    return exit;
  }

  return(
    <div className = 'entire-width-of-page'>
      <div className = 'modal-image-container'>
        <div onClick = {props.handleImageClick} className = 'exit-modal'><FontAwesomeIcon className = 'column' icon = {faTimes} /></div>
        <div className = 'modal-image'>
          <img src = {canvas} alt = 'Enlarged'/>
        </div>
      </div>
    </div>
  )
}
 
export default ProjectImageModal;




