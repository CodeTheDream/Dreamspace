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
                <table>
                <tr>
    <th>Article Title</th>
    <th>Article ID</th>
  </tr>
                <Articles/>
                </table>

                <table>
                <tr>
    <th>Article ID</th>
    <th>Comment ID</th>
  </tr>
                <Comments/>
                </table>

                <table>
                <tr>
    <th>Username</th>
    <th> Email</th>
  </tr>
                <Users/>
                </table>
            </div>
        )
    }
}

export default compose (withFirebase)(Admin);