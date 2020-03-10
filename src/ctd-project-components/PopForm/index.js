import React from "react";
import axios from "axios";

class PopFrom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "",
      Repo: "",
      Website: "",
      Current_Team: "",
      Meeting_Time: "",
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
      // Current_Team,
      Meeting_Time,
      Project_Description
    } = this.state;

    let fields = {
      fields: {
        Name,
        Repo,
        Notes,
        External,
        Website,
        // Current_Team,
        Meeting_Time,
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

  tryingThis = e => {
    e.preventDefault();
    const {
      Name,
      Repo,
      Notes,
      External,
      Website,
      Current_Team,
      Meeting_Time,
      Project_Description
    } = this.state;
    console.log(
      "Name: ",
      Name,
      " Repo: ",
      Repo,
      " Notes: ",
      Notes,
      " External: ",
      External,
      "website",
      Website,
      "CT",
      Current_Team,
      "MT",
      Meeting_Time,
      "PD",
      Project_Description
    );
  };

  handleChange = e => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="popup">
        <div className="popup\_inner">
          <h1>{this.props.text}</h1>
          <form className="form-content" onSubmit={this.push2AirTable}>
            <li>
              <label>
                Project Name:
                <input
                  name="Name"
                  value={this.state.Name}
                  onChange={this.handleChange}
                />
              </label>
            </li>
            <li>
              <label>
                Project Repo:
                <input
                  name="Repo"
                  value={this.state.Repo}
                  onChange={this.handleChange}
                />
              </label>
            </li>
            <li>
              <label>
                Project Website:
                <input
                  name="Website"
                  value={this.state.Website}
                  onChange={this.handleChange}
                />
              </label>
            </li>
            {/* <li>
              <label>
                Current Team:
                <input
                  name="Current_Team"
                  value={this.state.Current_Team}
                  onChange={this.handleChange}
                />
              </label>
            </li> */}
            <li>
              <label>
                Meeting Time:
                <input
                  name="Meeting_Time"
                  type="datetime-local"
                  value={this.state.Meeting_Time}
                  onChange={this.handleChange}
                />
              </label>
            </li>
            <li>
              <label>
                Project Description:
                <input
                  name="Project_Description"
                  value={this.state.Project_Description}
                  onChange={this.handleChange}
                />
              </label>
            </li>
            <li>
              <label>
                Project Notes:
                <input
                  name="Notes"
                  value={this.state.Notes}
                  onChange={this.handleChange}
                />
              </label>
            </li>
            <li>
              <label>
                External:
                <input
                  name="External"
                  type="checkbox"
                  checked={this.state.External}
                  onChange={this.handleChange}
                />
              </label>
            </li>

            <button className="form-button-style" type="submit" value="Submit">
              Submit
            </button>
          </form>
          <button className="form-button-style" onClick={this.props.closePopup}>
            Close
          </button>
        </div>
      </div>
    );
  }
}
export default PopFrom;
