import React from "react"
import { withFirebase } from "../Firebase";
import {compose} from "recompose";

class Users extends React.Component{
    constructor(props) {
        super(props);
    
        this.state = {
          users: []
        };
      }
        componentDidMount() {
        // let articles =this.props.firebase.articles()
        this.unsubscribe = this.props.firebase.users().onSnapshot(snapshot => {
          let users = [];
          snapshot.forEach(doc => users.push({ ...doc.data(), uid: doc.id }));
    
          console.log("Users loaded here yo!", users);
          this.setState({ users });
        })
      }
    render(){
        return(
            <div>Users</div>
        )
    }
}


export default compose(withFirebase)(Users)