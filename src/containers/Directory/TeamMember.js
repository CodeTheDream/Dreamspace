import React from 'react'
import { useParams } from 'react-router-dom'

const  TeamMember = () => {
  const params = useParams() 
  console.log('Team member params',params)

  return (
    <div style={{margin:'100px', color:'#FFF'} }>
      Team Member
      <p> {params.id}</p>
    </div>
  );
}

export default TeamMember
