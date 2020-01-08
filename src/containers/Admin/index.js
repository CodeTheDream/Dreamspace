import React from "react";
import { compose } from 'recompose';
import { withFirebase } from '../../components/Firebase';
import Articles from "../../components/Articles"
import Comments from "../../components/Comments"
import Users from "../../components/Users";

class Admin extends React.Component{

    render(){
        return(
            <div>
                Admin

                <Articles/>
                <Comments/>
                <Users/>
            </div>
        )
    }
}

export default compose (withFirebase)(Admin);