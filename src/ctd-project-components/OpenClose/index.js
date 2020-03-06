import React from "react";
// import SideBar from '../../components/SideBar'

class OpenClose extends React.Component {
  state = {
    isOpen: false
  };

  handleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
    console.log("hello ", this.state.isOpen);
    let openSlider = !this.state.isOpen;
    console.log("bernie ", openSlider);
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
      <div>
        <button onClick={this.handleOpen}>test</button>
      </div>
    );
  }
}

export default OpenClose;
