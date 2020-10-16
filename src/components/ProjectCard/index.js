import React from 'react'
import { Link } from 'react-router-dom'


const ProjectCard = ({project}) => {
  console.log("testing project", project)
  return (
    <div className="project-card ">
      {project.fields.Name}
    </div>
  )
}

export default ProjectCard;
