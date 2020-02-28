import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes.js";
import SignOutButton from '../SignOut';
class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSidebar: false,
            myWindow:false
        }
        
    }
    toggleSidebar() {
        this.setState({showSidebar:!this.state.showSidebar})
    }
    onClose() {
        this.setState({
            showSidebar: false
        })
    
        
    }
        render() {
            const showSidebar = this.state.showSidebar
                   if (showSidebar == false) {
            return (
                <div className="bar">
                <a href="#Home" onClick={()=>this.toggleSidebar()}>
                        <i className="fa fa-bars" style={{float:"right",marginRight:"0",top:"2px"}} />
                    </a>
                    </div>
            )

        }
        else {
            return (
               
                <div className="sidebar">
                   
                    <div className="closebtn"  > <button onClick={() => this.onClose()}><i class="far fa-times"></i></button></div>
                    <Link className="linkstyle" to={ROUTES.HOME}>Home</Link>
                    <Link className="linkstyle" to={ROUTES.ACCOUNT}>Account</Link>
                    <div className="linkstyle">    <SignOutButton/></div>
                                        
                 </div>   
                    
                
       ) }
           
        }
    }
    export default Sidebar