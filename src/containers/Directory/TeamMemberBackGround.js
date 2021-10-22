import React from 'react'
import TeamMemberBGTopLeft from './TeamMemberBGTopLeft' 
import TeamMemberBGTopRight from './TeamMemberBGTopRight' 
import './usercard.css'


//This is the code display for the world map which is static.
//future work effort on the long/lat coordinants may display individually

const TeamMemberBackGround = () => {
  return (
    <div className fluid id='member'>
      
        <div className="jumbotron jumbotron-fluid bg-info text-white">
          <div className="container text-sm-center pt-5">
            <TeamMemberBGTopLeft />
            <TeamMemberBGTopRight />
          </div>        
        </div>
    </div>
  )
}

export default TeamMemberBackGround

