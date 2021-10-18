import React from 'react'
// import{ Container, Jumbotron } from 'reactstrap'
import TeamMemberBGTopLeft from './TeamMemberBGTopLeft' 
import TeamMemberBGTopRight from './TeamMemberBGTopRight' 
import './usercard.css'


const TeamMemberBackGround = () => {
  return (
    <div className fluid id='member'>
      
        <div class="jumbotron jumbotron-fluid bg-info text-white">
          <div class="container text-sm-center pt-5">
            <TeamMemberBGTopLeft />
            <TeamMemberBGTopRight />
          </div>        
        </div>
    </div>
  )
}

export default TeamMemberBackGround

