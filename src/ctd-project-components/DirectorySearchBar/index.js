import React from 'react'

const DirectorySearchBar = (props) => {
  let searchDirectory = props.crewDirectory;
  console.log('searchDirectory ', searchDirectory)
  return(
    <div>
      <form>
        <label>
          <input type="text" name="name" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default DirectorySearchBar
