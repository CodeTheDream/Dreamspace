import React from 'react'
import { Link } from 'react-router-dom'


const About = () => {
    return(
    <div>
    <div className="view-container about ">
        <h3>Code the Dream</h3><br></br>
           
        <p>Code the Dream (CTD) offers free intensive, web, mobile, front and backend sofware development trainings to individuals primarily from diverse low-income backgrounds.</p><br></br>
        <p>Coders work with trained and experienced Mentors to increase their technical skills through building digital applications and technological platforms for a wide varity of startups, nonprofits and governmental agencies.</p><br></br>
    <div className="container">
        <p>At CTD our goals are:</p>
            <ul>
            <li>To make the world a better place</li>
            <li>To create unique win-win professional outcomes</li>
            <li>To encourage real-life experiences by creating and developing web and mobile applications </li>
            <li>To guide and launch new career paths with enormous opportunities for themselves, their families and communities.</li>
            </ul> 
    </div><br></br>
        <div className="cta-wrapper">
            <div><a target="_blank" href="https://www.codethedream.org/donate/">Donate</a></div>
            <div><a target="_blank" href="https://www.codethedream.org/">Learn More</a></div>
        </div>
      </div>
    </div>

);

}

export default About;
