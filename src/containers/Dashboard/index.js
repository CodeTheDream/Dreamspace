import React from "react";
import labsLogo from '../../assets/images/ctd-labs-logo.png'

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }
  componentDidMount() {
    
  }


  render() {

    return (
      <div className="view-container dashboard">
        <div className="dashboard-content">
          <p>Welcome to the Code the Dream starter kit. This barebones react boilerplate based off of create react app has react router 5 and SCSS installed. The rest is whatever you can dream up!</p>
          <div className="logo-wrapper">
            <p>made with love by</p>
            <img src={labsLogo} />
          </div>
          <div className="cta-wrapper">
            <a target="_blank" href="https://github.com/CodeTheDream">View on Github</a>
          </div>
        </div>
      </div>
    );
  }
}


export default Dashboard