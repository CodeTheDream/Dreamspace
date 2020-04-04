import React from 'react'

const DirectorySearchBar = (props) => {
  let test = props.filterDirectory;
  console.log('test ', test)
  return(
    <div className = 'search-contain'>
      <input 
        className = 'style-input'
        onChange = {(e) => props.filterDirectory(e.target.value)} 
        type = "text" 
        placeholder = "Search..."
        /> 
    </div>
  )
}

export default DirectorySearchBar
