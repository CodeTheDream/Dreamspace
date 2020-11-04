import React from 'react'
import { Link } from 'react-router-dom'


const ProjectCard = ({project}) => {
  console.log("testing project", project)
  return (
    <div style={{width: "300px", height: "200px", backgroundColor: "green"}} className="project-card ">
      {project.fields.Name}
    </div>
  )
}

export default ProjectCard;
