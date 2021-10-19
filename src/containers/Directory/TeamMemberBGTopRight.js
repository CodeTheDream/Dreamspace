import React from "react";
import './usercard.css'


//This code displays in the top righthand corner
//It links to the Articles and Projects from the individual page

const TeamMemberBGTopRight = () => {
  return (  
    <div className='container'>
    <div className='image'>
        <div id="top-right">
           <p>Links:</p>
           <a href="/articles" className="button--style-blue"> ARTICLES</a><br />
           <a href="/projects" className="button--style-blue"> PROJECTS</a>
        </div>
    </div>
    </div>
    )
}

 export default TeamMemberBGTopRight;
