import React from "react";
import { Link } from "react-router-dom";
//import directory from "./assets/images/Directorypage.gif"
import directory from "../../assets/images/directorypage1.gif";
import article from "../../assets/images/articles.gif";
import project from "../../assets/images/projects.gif";
const HomePage = () => {
  return (
    <div className="wrapper1">
      <div className="card1">
        <div class="pagecontainer">
          <Link to="/articles">
            <img src={article} alt="article" className="myprofile" />
          </Link>
                    <div className="pagecontent">
            <Link to="/articles">
              {" "}
              <h2 className="pageformat">Articles</h2>
            </Link>
          </div>
        </div>
      </div>
      <div className="card1">
        <div className="pagecontainer">
          <Link to="/projects">
            <img src={project} alt="projects" className="myprofile" />
          </Link>
          <div className="pagecontent">
            <Link to="/projects">
              {" "}
              <h2 className="pageformat">Projects</h2>
            </Link>
          </div>
        </div>
      </div>
      <div className="card1">
        <div className="pagecontainer">
          <Link to="/directory">
            <img src={directory} alt="cdirectory" className="myprofile" />
          </Link>
          {/*<Link to="/directory"><img src="https://res.cloudinary.com/wnotw/images/c_limit,w_1536,q_auto:eco,f_auto/v1570469574/l6b1dynqevwroklkifec/code-the-dream" alt="cdirectory"className="myprofile" /></Link>*/}
          <div className="pagecontent">
            <Link to="/directory">
              {" "}
              <h2 className="pageformat">Directory</h2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
