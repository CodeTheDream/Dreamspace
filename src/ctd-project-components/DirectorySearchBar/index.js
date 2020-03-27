import React from 'react'

const DirectorySearchBar = (props) => {
  let test = props.filterDirectory;
  console.log('test ', test)
  return(
    <div className = 'search-contain'>
      <input onChange={props.filterDirectory} type="text" name="name" />
      <input type="submit" value="Submit" />
    </div>
  )
}

export default DirectorySearchBar
