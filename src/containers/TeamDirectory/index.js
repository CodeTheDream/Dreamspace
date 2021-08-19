import React, { useState, useEffect } from 'react' ;
import { withFirebase } from "../../components/Firebase"; 

const TeamDirectory = ({firebase}) => {
  console.log(firebase)
  const [teamDirectory, setTeamDirectory] = useState([])
  return (
    <div>

    </div>
  )
}

export default withFirebase(TeamDirectory)