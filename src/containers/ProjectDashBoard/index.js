import React from "react";
import {
  FeatureCard,
  Header,
  SearchBar,
  SideBarOpen,
} from "../../ctd-project-components";
import SideBarButton from '../../ctd-project-components/SideBarButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faColumns} from '@fortawesome/free-solid-svg-icons';
library.add(faColumns);
class ProjectDashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectData: [],
      searchName: "",
      openSideBar: true,
      enlargeImage: false
    };
  }

  componentDidMount() {
    this.getAirTable();
    window.addEventListener('resize', this.updateWindowDimensions);
    this.loadWithOutSideBarForMobileView();
  }

// open, closes sidebar automatically at set width below
  updateWindowDimensions = () => {
    console.log('yy', window.innerWidth);
    let viewPortWidth = window.innerWidth;
    if(viewPortWidth >= 722) {
      this.setState({openSideBar: true})
    }
    if(viewPortWidth <= 601) {
      this.setState({openSideBar: null});
    }
  }

// loads page without the side bar for over head menu
  loadWithOutSideBarForMobileView = () => {
    let loadClosed = window.innerWidth;
    if(loadClosed <= 570) {
      this.setState(prevState => ({openSideBar: !prevState.openSideBar}));
    }
  }

// handles the image clicked on the project cards
  handleImageClick = () => {
    console.log('hello world');
    this.setState(prevState => ({enlargeImage: !prevState.enlargeImage}),
    () => console.log(this.state.enlargeImage));
  }

// handles side bar open and close buttons
  handleClick = () => {
    console.log('click');
    this.setState(prevState => ({openSideBar: !prevState.openSideBar}),
    () => console.log(this.state.openSideBar));
  }

// handles the selection of projects.
  selectProject = id => {
    const allProjects = this.state.projectData;
    // console.log("see", id);
    const selectedProject = allProjects.find(x => x.id === id);
    // console.log(selectedProject);
    this.setState({
      selectedProject
    });
  };
  
// grabs air table project data
  getAirTable() {
    const url = "https://api.airtable.com/v0/appQSPi3XUdUMbM1m/Projects";
    fetch(url, {
      headers: { Authorization: "Bearer " + process.env.REACT_APP_AIRTABLE_KEY }
    })
      .then(response => response.json())
      .then(responseData => {
        // console.log("data from Airtable", responseData);
        const projectData = responseData.records;
        // console.log("projectData ", projectData);
        this.setState({ projectData: projectData, allProjects: projectData});
      });
    }

// filters the project list
    filterProjectList = search => {
      console.log('search ', search);
      let projects = this.state.allProjects;
      console.log('project ', projects);
      const formattedSearch = search.toLowerCase();
      // console.log(projects);
      let getResults = projects.filter(result => {
        // console.log('result', result) 
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
  
            {/* {this.state.projectData.length > 0 ? (<FeatureCard project={this.state.selectedProject}/>) : null}  */}
            
            {this.state.selectedProject ? (<FeatureCard project={this.state.selectedProject} handleImageClick={this.handleImageClick}/>) : null} 
       
            {this.state.openSideBar ? (<>{this.state.projectData && (
              <SideBarOpen
                openSideBar={this.state.openSideBar}
                projectData={this.state.projectData}
                selectProject={this.selectProject}
                handleClick={this.handleClick}
                filterProjectList={this.filterProjectList}
                slideOpen={this.updateWindowDimensions}>
                <SearchBar
                  handleClick={this.handleClick}
                  openSideBar={this.state.openSideBar}/>
              </SideBarOpen>
          
            )} </>) : (<div 
                          className = 'closed-side-bar'>
                          <SideBarButton handleClick = {this.handleClick} title = {<FontAwesomeIcon className = 'column' icon = {faColumns} />}/>
                        </div>)}
            {/* {this.state.projectData && (
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
                  handleCloseClick={this.handleCloseClick}
                  openSideBar={this.state.openSideBar}
                />
              </SideBarOpen>
          
            )}  */}

            
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
                
                  
                  
                  
                 
                  
