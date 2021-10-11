import React from "react";
// import { compose } from "recompose";
// import { withFirebase } from "../../components/Firebase";
// import { Box, Center, SimpleGrid } from "@chakra-ui/react"
// import { Link } from "react-router-dom";
import HeaderTitle from "./HeaderTitle";
import TeamMemberCard from "./TeamMemberCard";



function Directory() {
  return (
    <div>
      <HeaderTitle /> 
      <TeamMemberCard />
    </div>
  )
}


export default Directory;
