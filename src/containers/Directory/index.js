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
    
  // filterTheWholeDirectory = text => {
  //   const { crewDirectory } = this.state;
  //   const showResults = crewDirectory.filter(search => {
  //     const grabData = (
  //       search.Name +
  //       search.Phone +
  //       search.id +
  //       search.Email +
  //       search.Directory
  //     )
  //     .replace (/[^a-zA-Z0-9]/g, "")     // need to read up more on regex
  //     .toLowerCase();

  //     const textFormatted = text.toLowerCase()
  //     return grabData.indexOf(textFormatted.replace(/\s/g, "")) > -1;   // i don't  understand the regex.
  //   })
  //   this.setState({
  //     directorySearch: showResults,
  //     text
  //   });
  // };

  handleInput = e => {
    console.log(e.target.value);
    this.setState({
      searchDirectory: e.target.value
    })
  };

 

  // filterWhatIsPicked = () => {
  //   let filterDirectory = this.state.crewDirectory.filter(search => {
  //     let grabData = (
  //       search.Name +
  //       search.Phone +
  //       search['Email Address']
  //     )
  //     return grabData.includes(this.state.searchDirectory)
  //   })
  // }

// filterList = text => {
//   const {crewDirectory} = this.state;
//   const allResults = crewDirectory.filter(search => {
//     const lookAtData = 
//   })
// }

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
        this.setState({
          crewDirectory: crewDirectory, 
          allDirectory: crewDirectory,
        })

      });
    }

  filterDirectory = searchTerm => {
    console.log('searchTerm ', searchTerm)
    let directory = this.state.allDirectory;
    const formattedSearch = searchTerm.toLowerCase();
    console.log(directory)
    
    const results = directory.filter(person => {
      console.log(person)
      let grabData = (
        person.fields.Name +
        person.fields.Phone +
        person.fields['Email Address']
      )
      .replace(/[^a-zA-Z0-9]/g, "")
      .toLowerCase();
      return grabData.indexOf(formattedSearch) > -1;
      
      
    })
    console.log(results)
    this.setState({ crewDirectory: results })
    
      // console.log('grabData ', grabData === grabData)
  
    }
  render() {
    
    
    

   
    // let filterNumber = this.state.crewDirectory.filter(phone => {
    //   return phone.fields.Phone.includes(this.state.searchDirectory)                 // Part of the phone number filter attempt. Check DirectoryList.js
    // })

    return(
      <div className = 'directory-container'>
        {this.state.crewDirectory && (<DirectorySearchBar 
          crewDirectory={this.state.crewDirectory}
          selectedStaffMember={this.selectedStaffMember}
          handleInput={this.handleInput}
          filterDirectory={this.filterDirectory}

          // filterTheWholeDirectory={this.filterTheWholeDirectory}
        />
        )}
        {this.state.crewDirectory && (<DirectoryList 
          crewDirectory={this.state.crewDirectory}
          selectedStaffMember={this.selectedStaffMember}
          // filterTheWholeDirectory={this.filterTheWholeDirectory}
          // filterDirectory={this.filterDirectory}
          // filterNumbers={filterNumber}                                                 // Part of the phone number filter.
        />)}
     </div>
   
    )
    
  }
}

export default Directory 