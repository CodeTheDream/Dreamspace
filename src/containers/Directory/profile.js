import React, { Component }from 'react';
import styled from 'styled-components';
import DirectorySearchBar from '../../components/DirectorySearchBar';
import DirectoryList from '../../components/DirectoryList';
 

// // and can help with the linking

// // basically you need to make sure we have access to 
// //whatever value we will use as the query params id for 
// //each student (an airtable field) and that id will be part of the url

class Profile extends Component {
  constructor(props) {
      super(props);
      this.state = {
        employeeDirectory: [],
        searchDirectory: "",
        isFlipped: false,
        isMapView: true
      }
  }
              
   componentDidMount() {
    this.directoryAirTable();
  }
  selectedStaffMember = id => {
    this.setState({isFlipped: id});
  }

  directoryAirTable() {
      const url = "https://api.airtable.com/v0/appBu5I7tEJENCp45/Employee%20directory";
        fetch(url, {
          headers: { Authorization: "Bearer " + process.env.REACT_APP_DIRECTORY_AIRTABLE_KEY  }
        })
        .then(response => response.json())
        .then(responseData => {
          // console.log("directory data ", responseData);
          const employeeDirectory = responseData.records;
          // console.log("crewDirectory ", crewDirectory);
          this.setState({
            employeeDirectory: employeeDirectory, 
            allDirectory: employeeDirectory,
          })
        });
      }
      
    // projectAirTable() {
    //   const url = "https://api.airtable.com/v0/appQSPi3XUdUMbM1m/Projects";
    //   fetch(url, {
    //     headers: { Authorization: "Bearer " + process.env.REACT_APP_AIRTABLE_KEY }
    //   })
    //     .then(response => response.json())
    //     .then(responseData => {
    //       // console.log("data from Airtable", responseData);
    //       const projectData = responseData.records;
    //       // console.log("projectData ", projectData);
    //       this.setState({projectData: projectData});
    //     });
    //   }
  
    filterDirectory = searchTerm => {
      // console.log('searchTerm ', searchTerm)
      let directory = this.state.allDirectory;
      const formattedSearch = searchTerm.toLowerCase();
      // console.log(directory)
    const results = directory.filter(person => {
      let grabData = (
        person.fields.Name +
        person.fields.Photo +
        person.fields['Email Address'] +
        person.fields.Location +
        person.fields.Title +
        person.fields.Images +
        person.fields.Languages 
      )
    
        .replace(/[^a-zA-Z0-9]/g, "")
        .toLowerCase();
        return grabData.indexOf(formattedSearch) > -1;
      })
      // console.log(results)
      this.setState({ employeeDirectory: results })
    }
    
    // toggleMap = () => {
    //   this.setState({
    //     isMapView: !this.state.isMapView
        
    //   })
    // }
  
      render() {
      
      return(
        // <div>
        // {this.state.isMapView ?
        // <World 
        //   toggleMap={this.toggleMap}
        //   employeeDirectory = {this.state.employeeDirectory}
          
        // /> :
        <div className = 'directory-container'>
         <p>Hello Tom, I'm stuck and need your assistance.</p>
          {this.state.employeeDirectory && (
          
          <div>
          <DirectorySearchBar 
            employeeDirectory={this.state.employeeDirectory}
            selectedStaffMember={this.selectedStaffMember}
            // handleInput={this.handleInput}
            filterDirectory={this.filterDirectory}
          />
          <div onClick={this.toggleMap}>Toggle Map</div>
          </div>
          
          )}
          {this.state.crewDirectory && (<DirectoryList 
            employeeDirectory={this.state.employeeDirectory}
            selectedStaffMember={this.selectedStaffMember}
            projectData={this.state.projectData}
            isFlipped={this.state.isFlipped}
          />)}
        </div>
    )
  }
    
}
  
export default Profile 
 