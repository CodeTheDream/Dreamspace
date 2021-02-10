import React from 'react'
import { Link } from 'react-router-dom'


const ProjectCard = ({project}) => {
  return (
    <div className="project-card ">
      <div className="card-view">
      <img src="./ctdlogo.png" alt=""></img>
        <h1 className="name-header"> {project.fields.Name}</h1>
        <h4 className="manager-header"> {project.fields["Project Manager"]}</h4>
        <button>Check This Out</button>


    </div>
    </div>

  )
}
   
 

   
  


export default ProjectCard;
