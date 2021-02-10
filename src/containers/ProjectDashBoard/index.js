import React from "react";
import {
  FeatureCard,
  Header,
  SearchBar,
  SideBarOpen,
} from "../../components";
import ProjectCard from "../../components/ProjectCard"
import ProjectImageModal from '../../components/ProjecImageModal'
import SideBarButton from '../../components/SideBarButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faColumns} from '@fortawesome/free-solid-svg-icons';
library.add(faColumns);

const TextBox = () => {
  return (
    <input className="text-input" type="text"></input>
  )
}

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
    if(viewPortWidth >= 766) {
      this.setState({openSideBar: true})
    }
    if(viewPortWidth <= 765) {
      this.setState({openSideBar: null});
    }
  }

// loads page without the side bar for over head menu
  loadWithOutSideBarForMobileView = () => {
    let loadClosed = window.innerWidth;
    if(loadClosed <= 765) {
      this.setState(prevState => ({openSideBar: !prevState.openSideBar}));
    }
  }

// handles the image clicked on the project cards
  handleImageClick = () => {
    // console.log('hello world');
    this.setState(prevState => ({enlargeImage: !prevState.enlargeImage}),
    () => console.log(this.state.enlargeImage));
  }

// handles side bar open and close buttons
  handleClick = () => {
    // console.log('click');
    this.setState(prevState => ({openSideBar: !prevState.openSideBar}),
    () => console.log(this.state.openSideBar));
  }

// handles the selection of projects.
  selectProject = id => {
    const allProjects = this.state.projectData;
    const selectedProject = allProjects.find(x => x.id === id);
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
         console.log("data from Airtable", responseData);
        const projectData = responseData.records.filter(result => result.fields.Status == "Active_high" || result.fields.Status == "Active_mid" ||result.fields.Status == "Active_Slow");
        // console.log("projectData ", projectData);
        this.setState({ projectData: projectData, allProjects: projectData});
      });
    }

// filters the project list
    filterProjectList = search => {
      let projects = this.state.allProjects;
      // console.log('project ', projects);
      const formattedSearch = search.toLowerCase();
      let getResults = projects.filter(result => {
        if(!result.fields.Name) {
          return false;
        }
        else {
          let grabResults = result.fields.Name.toLowerCase();
          return grabResults.indexOf(formattedSearch) > -1;
        }
      })
      // console.log('ccccc ', getResults);
      this.setState({projectData: getResults});
    }

    render() {
      let modalScreen = <ProjectImageModal 
      handleImageClick = {this.handleImageClick}
      projectCanvas = {this.state.selectedProject}/>

      if(this.state.enlargeImage === true) {
        return modalScreen;
      }
    
      return (
        <>
        <div className="view-container">
          {/* <TextBox /> */}   
          <SearchBar 
            projectData={this.state.projectData}
            selectProject={this.selectProject}
            handleInput={this.handleInput}
            filterProjectList={this.filterProjectList}
            />  
         
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
                  filterProjectList={this.filterProjectList}
                />
              )}
            </div>*/}
  
            {/* {this.state.projectData.length > 0 ? (<FeatureCard project={this.state.selectedProject}/>) : null}  */}
            
            {/* {this.state.selectedProject ? (
              <FeatureCard 
                project={this.state.selectedProject} 
                handleImageClick={this.handleImageClick}
                crewDirectory={this.state.crewDirectory}>
                {modalScreen}
              </FeatureCard>) : null}  */}
           
              {this.state.projectData.map(project => (
              <ProjectCard 
                project={project} 
                handleImageClick={this.handleImageClick}
                crewDirectory={this.state.crewDirectory}
              >
                {modalScreen}
              </ProjectCard>)
              )}

      
          </div>
          </>
      );
    }
  }
  export default ProjectDashBoard;
                
                  
                  
                  
                 
                  
