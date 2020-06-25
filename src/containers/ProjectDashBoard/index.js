import React from "react";
import {
  FeatureCard,
  Header,
  SearchBar,
  SideBarOpen,
} from "../../ctd-project-components";
//import SideBarButton from '../../ctd-project-components/SideBarButton';
class ProjectDashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectData: [],
      searchName: "",
      // selectedProject: {}
      closeSideBar: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.getAirTable();
  }

  handleClick = () => {
    console.log('click');
    this.setState(prevState => ({closeSideBar: !prevState.closeSideBar}));
  }

  // getPersonnelDirectory = (id) => {
  //   const personnel = this.state.crewDirectory;
  //   console.log("id", id);
  // }

  selectProject = id => {
    const allProjects = this.state.projectData;
    console.log("see", id);
    const selectedProject = allProjects.find(x => x.id === id);
    console.log(selectedProject);
    this.setState({
      selectedProject
    });
  };
  // handleInput = e => {
  //   console.log(e.target.value);
  //   this.setState({
  //     searchName: e.target.value
  //   });
  // };
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
        this.setState({ projectData: projectData, allProjects: projectData});
      });
    }
    // filterProject = locate => {
    //   locate = this.state.projectData.filter(locates => {
    //     return locates.fields.Name.includes(this.state.searchName)
    //   })
    // }
    filterProjectList = search => {
      console.log('search ', search);
      let projects = this.state.allProjects;
      console.log('project ', projects);
      const formattedSearch = search.toLowerCase();
      // console.log(projects);
      let getResults = projects.filter(result => {
        console.log('result', result) 
        if(!result.fields.Name) {
          return false;
        }
        else {
          let grabResults = result.fields.Name.toLowerCase();
          return grabResults.indexOf(formattedSearch) > -1;
        }
      })
      console.log('ccccc ', getResults);
      this.setState({projectData: getResults});
}
    render() {
      // Filtering out the side bar Menu
      // let filterProject = this.state.projectData.filter(sideBarFilter => {
      //   console.log('side bar filter', sideBarFilter);
      //   return sideBarFilter.fields.Name.toUpperCase().includes(
      //     this.state.searchName.toUpperCase()
      //   );
      // });
  
      return (
        <div className="view-container dashboard">
          <div className="dashboard-content">
         
            {/* <div>
              {this.state.projectData && (
                <Header
                  projectData={this.state.projectData}
                  selectProject={this.selectProject}
                />
              )} 
            {this.state.projectData && (
                <SearchBar
                  projectData={this.state.projectData}
                  selectProject={this.selectProject}
                  handleInput={this.handleInput}
                />
              )}
            </div> */}
  
            {this.state.selectedProject ? (<FeatureCard project={this.state.selectedProject}/>) : null}          
            {this.state.projectData && (
              <SideBarOpen
                projectData={this.state.projectData}
                selectProject={this.selectProject}
                // filterProject={filterProject}
                handleInput={this.handleInput}
                handleCloseClick={this.handleCloseClick}
              >
                <SearchBar
                  projectData={this.state.projectData}
                  selectProject={this.selectProject}
                  // handleInput={this.handleInput}
                  handleClick={this.handleClick}
                  closeSideBar={this.state.closeSideBar}
                />
              </SideBarOpen>
          
            )}
            
            {/* {this.state.crewDirectory && (
              <StaffDirectory 
                crewDirectory = {this.state.crewDirectory}
              />
            )} */}
          </div>
        </div>
      );
    }
  }
  export default ProjectDashBoard;
