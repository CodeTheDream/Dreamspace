import React from "react";
// import SideBar from '../../components/SideBar'

class OpenClose extends React.Component {
  state = {
    isOpen: false,
    isClicked: "" 
  };

  handleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
    console.log("hello ", this.state.isOpen);
    let openSlider = !this.state.isOpen;
    console.log("openSlider ", openSlider);
    if (openSlider === true) {
      console.log("Hello, Nick");
    }
  };

 

  // handleClose = () => {
  //   this.setState({
  //     isOpen: false
  //   })
  // }

  render() {
    return (
      <div class="hamburger-container" onClick = {this.animateButton}>
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
      </div>
    );
  }
}

export default OpenClose;
