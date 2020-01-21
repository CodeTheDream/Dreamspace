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
      render() {
        let users = this.state.users;
        console.log(users);
    
        if (users !== undefined || users !== null || users !=="") {
          console.log(users);
          return users.map((user, index) => {
            console.log(user);
            return <tr><td>{user.username}</td> <td>{user.email}</td></tr>;
          });
        
    // return(
    //     <div>TESTING</div>
    // )
    }
        return null;
      }
}


export default compose(withFirebase)(Users)