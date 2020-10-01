import React from 'react'
import directors from '../../assets/images/directors.svg';
import Binoculars from './Binoculars.svg'



const DirectoryList = (props) => {
    console.log(props.crew)
    console.log(props.crew.fields)
    //const firstName = props.crew.map(name => console.log(name.fields['First Name']));
    return (
        <div>
            
            <form className="search-cards">
                <input className="search-bar" type="text" placeholder="Search.." name="search"></input>
                <input type="image" className="binoculars" id="image" alt="search" src={Binoculars}></input>
            </form>
            <div className="individual-cards">
                {props.crew.map(name => {
                    console.log(name)
                    return(
                        <>
                        <img src={name.fields.Photo}/>
                        <p>{name.fields.Name}</p>
                        <p>{name.fields.Title}</p>
                        <p>{name.fields['Primary Department']}</p>
                        <p>{name.fields.Location}</p>
                        </>
                    )
                })}
            </div>
            {/*<div className="last-names">
                {props.crew.map(name => <p className="full-names">{name.fields.Name}</p>)}
            </div>
            <div className="roles">
                {props.crew.map(roles => <p className="job-roles">{roles.fields['Email address']}</p>)}
    </div>*/}





        </div>
    )
}

export default DirectoryList