import React from "react";
import axios from "axios";

class PopFrom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "",
      Repo: "",
      Website: "",
      // Meeting_Time: "",
      Project_Description: "",
      Notes: "",
      External: false
    };
  }

  push2AirTable = async e => {
    e.preventDefault();
    const {
      Name,
      Repo,
      Notes,
      External,
      Website,
      // Meeting_Time,
      Project_Description
    } = this.state;

    let fields = {
      fields: {
        Name,
        Repo,
        Notes,
        External,
        Website,
        // Meeting_Time,
        Project_Description
      }
    };

    const url = `https://api.airtable.com/v0/appQSPi3XUdUMbM1m/Projects?api_key=${process.env.REACT_APP_AIRTABLE_KEY}`;

    try {
      const response = await axios.post(url, fields);
      console.log("airtables response \n", response);
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = e => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="modal-wrapper-postarticle">
        <div className="dialogstyle devedit-form">
          <button
            className=" dialogCloseButonStayle"
            onClick={this.props.closePopup}
          >
            X
          </button>
          <h4>{this.props.text}</h4>
          <form className="dialog_inner" onSubmit={this.push2AirTable}>
            <input
              name="Name"
              placeholder="Project Title"
              type="text"
              value={this.state.Name}
              onChange={this.handleChange}
            />
            <input
              name="Repo"
              placeholder="Repository"
              type="text"
              value={this.state.Repo}
              onChange={this.handleChange}
            />
            <input
              name="Website"
              placeholder="Project Website"
              type="text"
              value={this.state.Website}
              onChange={this.handleChange}
            />
            {/* <input
              name="Meeting_Time"
              placeholder="Meeting_time"
              type="datetime-local"
              value={this.state.Meeting_Time}
              onChange={this.handleChange}
            /> */}
            <textarea
              name="Project_Description"
              style={{ height: "50px" }}
              placeholder="Project Description"
              type="text"
              value={this.state.Project_Description}
              onChange={this.handleChange}
            />
            <textarea
              name="Notes"
              style={{ height: "50px" }}
              placeholder="Project Notes"
              type="text"
              value={this.state.Notes}
              onChange={this.handleChange}
            />
            {/* <input
              name="External"
              placeholder="External"
              type="checkbox"
              checked={this.state.External}
              onChange={this.handleChange}
            /> */}
            <button className="button-tertiary" type="submit" value="Submit">
              Submit
            </button>
            {/* <button
              className="form-button-style"
              onClick={this.props.closePopup}
            >
              Close
            </button> */}
          </form>
        </div>
      </div>
    );
  }
}
export default PopFrom;
