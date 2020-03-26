import React from 'react'

const DirectorySearchBar = (props) => {
  let searchDirectory = props.crewDirectory;
  console.log('searchDirectory ', searchDirectory)
  let staffNames = searchDirectory.map((justNames) => justNames.fields);
  console.log('staffNames ', staffNames)
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