import React from "react";
import ctdlogo from "../../assets/images/ctd-labs-logo.png";
import {
  FeatureCard,
  PopForm,
  SearchBar,
  SideBarOpen
} from "../../ctd-project-components";

class ProjectDashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectData: [],
      searchName: "",
      showPopup: false
      // selectedProject: {}
    };
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  componentDidMount() {
    this.getAirTable();
  }

  selectProject = id => {
    const allProjects = this.state.projectData;
    console.log("see", id);
    const selectedProject = allProjects.find(x => x.id === id);
    console.log(selectedProject);
    this.setState({
      selectedProject
    });
  };

  handleInput = e => {
    console.log(e.target.value);
    this.setState({
      searchName: e.target.value
    });
  };

  getAirTable() {
    const url = "https://api.airtable.com/v0/appQSPi3XUdUMbM1m/Projects";

    fetch(url, {
      headers: { Authorization: "Bearer " + process.env.REACT_APP_AIRTABLE_KEY }
    })
      .then(response => response.json())
      .then(responseData => {
        console.log("data from Airtable", responseData);
        const projectData = responseData.records;
        console.log("projectData ", projectData);
        this.setState({ projectData: projectData });
      });
  }

  render() {
    // Filtering out the side bar Menu
    let filterProject = this.state.projectData.filter(sideBarFilter => {
      return sideBarFilter.fields.Name.toUpperCase().includes(
        this.state.searchName.toUpperCase()
      );
    });

    return (
      <div className="dashboard">
        <div className="dashboard-content">
          <div className="addButton">
            <button
              className="button-style"
              onClick={this.togglePopup.bind(this)}
            >
              Add Project
            </button>
            {this.state.showPopup ? (
              <PopForm
                text="Enter Project Data"
                closePopup={this.togglePopup.bind(this)}
              />
            ) : null}
          </div>
          <div className="featured">
            {this.state.selectedProject ? (
              <FeatureCard project={this.state.selectedProject} />
            ) : (
              <img className="featured" src={ctdlogo} />
            )}
          </div>
          {this.state.projectData && (
            <div className="sidebar-menu">
              <SideBarOpen
                projectData={this.state.projectData}
                selectProject={this.selectProject}
                filterProject={filterProject}
                handleInput={this.handleInput}
              >
                <SearchBar
                  projectData={this.state.projectData}
                  selectProject={this.selectProject}
                  // handleInput={this.handleInput}
                />
              </SideBarOpen>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ProjectDashBoard;
