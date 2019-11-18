import React from 'react'
import { Link } from 'react-router-dom'

const About = () => (
    <div className="view-container about ">
        <h3>About Code the Dream</h3>
        <p>
        Code the Dream offers free intensive training in software development to people from diverse low-income backgrounds. In CTD Labs, our coders work with experienced mentors to hone those skills by building apps and technology platforms for a range of startups, nonprofits and government clients. The ultimate aim of Code the Dream is to create a unique win-win, where our coders gain real experience building apps that make the world a little better place, and then use that experience to launch new careers with enormous opportunity for themselves, their families, and their communities.
        </p>
        <div className="cta-wrapper">
            <div><a target="_blank" href="https://www.codethedream.org/donate/">Donate</a></div>
            <div><a target="_blank" href="https://www.codethedream.org/">Learn More</a></div>
        </div>
    </div>
)

export default About;
