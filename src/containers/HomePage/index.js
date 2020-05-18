import React from 'react';
import { Link } from 'react-router-dom';
import directory from "../assets/images/Directorypage.gif"
const HomePage = () => {
    return (
        <div className="wrapper1">
            <div className="card1">
                <p><button> <Link to="/articles" style={{ color: "white", fontSize: "24px" }}>Articles </Link></button></p>


                <Link to="/articles"><img src="https://images.idgesg.net/images/article/2017/06/reactjs_code_coding_thinkstock-100725807-large.jpg" alt="articles"className="myprofile" /></Link>

            </div>
            <div className="card1">
                <p><button> <Link to="/projects" style={{ color: "white" ,fontSize:"24px" }}>Projects </Link></button></p>


                <Link to="/projects"><img src="https://stackify.com/wp-content/uploads/2013/08/best-dev-websites-2-793x397.jpg" alt="projects" className="myprofile" /></Link>

            </div>
            <div className="card1">
                <p><button> <Link to="/directory" style={{ color: "white", fontSize: "24px" }}>CompanyDirectory</Link></button></p>

                <Link to="/directory"><img src={directory} alt="cdirectory"className="myprofile" /></Link>
               {/*<Link to="/directory"><img src="https://res.cloudinary.com/wnotw/images/c_limit,w_1536,q_auto:eco,f_auto/v1570469574/l6b1dynqevwroklkifec/code-the-dream" alt="cdirectory"className="myprofile" /></Link>*/}

            </div>

        </div>

    )
}
export default HomePage