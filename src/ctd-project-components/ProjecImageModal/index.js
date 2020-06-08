import React from 'react';
// import FeatureCard from '../FeatureCard';

const ProjectImageModal = props => {
  let getProps = props;
  console.log('hello props ', getProps);
  let picture = 'https://ya-webdesign.com/images250_/placeholder-image-png-1.png';

  return(
    <div className = 'modal-image-container'>
      <div className = 'modal-image'>
        <img src = {picture} alt = 'Enlarged Image'/>
      </div>
    </div>
  )
}

export default ProjectImageModal;