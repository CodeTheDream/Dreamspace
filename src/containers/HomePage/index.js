import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => (
    <div className="view-container">
      <div className="header-shim" style={{marginTop: '80px'}}></div>
        <div className="home-links">
            <Link className="home-link" to='/articles'>Articles</Link>
            <Link className="home-link" to="/projects">Projects</Link>
            <Link className="home-link" to="/company-directory">Company Directory</Link>
        </div>
    </div>
)

export default HomePage;
