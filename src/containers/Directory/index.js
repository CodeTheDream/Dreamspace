import React from 'react';
// import { compose } from "recompose";
import DirectorySearchBar from '../../ctd-project-components/DirectorySearchBar';
import DirectoryList from '../../ctd-project-components/DirectoryList';

class Directory extends React.Component {
  state = {
    crewDirectory: [],
    searchDirectory: "",
  }
  componentDidMount() {
    this.directoryAirTable();
  }

  selectedStaffMember = (id) => {                                                  
    let allStaffMembers = this.state.crewDirectory;                                
    console.log('look at ', id)                                                      
    let selectStaffMember = allStaffMembers.find(x => x.id === id);
    console.log('selectStaffMember ', selectStaffMember)                                      
    this.setState({                                                                      
      selectStaffMember                                                                
    })                                                                              
  }                                                                                

  handleInput = e => {
    console.log(e.target.value);
    this.setState({
      searchDirectory: e.target.value
    })
  };

  directoryAirTable() {
    const url = "https://api.airtable.com/v0/appBu5I7tEJENCp45/Employee%20directory";
      fetch(url, {
        headers: { Authorization: "Bearer " + process.env.REACT_APP_DIRECTORY_AIRTABLE_KEY  }
      })
      .then(response => response.json())
      .then(responseData => {
        console.log("directory data ", responseData);
        const crewDirectory = responseData.records;
        console.log("crewDirectory ", crewDirectory);
        this.setState({crewDirectory: crewDirectory})
      });
    }

  render() {
    let filterDirectory = this.state.crewDirectory.filter(search => {
      return search.fields.Name.toUpperCase().includes(this.state.searchDirectory.toUpperCase()
      );
    })

   
    // let filterNumber = this.state.crewDirectory.filter(phone => {
    //   return phone.fields.Phone.includes(this.state.searchDirectory)                 // Part of the phone number filter attempt. Check DirectoryList.js
    // })

    return(
      <div className = 'directory-container'>
        {this.state.crewDirectory && (<DirectorySearchBar 
          crewDirectory={this.state.crewDirectory}
          selectedStaffMember={this.selectedStaffMember}
          handleInput={this.handleInput}
        />
        )}
        {this.state.crewDirectory && (<DirectoryList 
          crewDirectory={this.state.crewDirectory}
          selectedStaffMember={this.selectedStaffMember}
          filterDirectory={filterDirectory}
          // filterNumbers={filterNumber}                                                 // Part of the phone number filter.
        />)}
     </div>
   
    )
    
  }
}

export default Directory 