import React from "react";
// import SearchBar from '../SearchBar';
import { Zoom } from "react-slideshow-image";

const zoomOutProperties = {
  duration: 9000000,
  transitionDuration: 200,
  infinite: true,
  indicators: true,
  scale: 0.4,
  arrows: true
};

const Header = props => {
  const dummyList = props.projectData;
  console.log("dummy", dummyList);
  const probableList = dummyList.filter(
    project => project.fields.Status !== "Probable"
  );
  const filterList = probableList.filter(
    project => project.fields.Status !== "Complete"
  );
  console.log("filterList", filterList);

  return (
    <div className="slide-container">
      <Zoom {...zoomOutProperties}>
        {filterList.map(project => (
          <li
            key={project.id}
            onClick={() => props.selectProject(project.id)}
            style={{ width: "73%" }}
            className="card"
          >
            {project.fields.Name.toUpperCase()}
          </li>
        ))}
      </Zoom>
    </div>
  );
};

export default Header;
