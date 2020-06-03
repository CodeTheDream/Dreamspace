import React from 'react';
import { Link } from 'react-router-dom';
//import directory from "./assets/images/Directorypage.gif"
import directory from '../../assets/images/directorypage1.gif';
import article from '../../assets/images/articles.gif';
const HomePage = () => {
    return (
        <div className="wrapper1">
            <div className="card1">
            <div class="pagecontainer">
               {/* <p><button> <Link to="/articles" style={{ color: "white", fontSize: "24px" }}>Articles </Link></button></p>*/}

                <Link to="/articles"><img src={article} alt="article" className="myprofile" /></Link>
                {/*<Link to="/articles"><img src="https://images.idgesg.net/images/article/2017/06/reactjs_code_coding_thinkstock-100725807-large.jpg" alt="articles"className="myprofile" /></Link>*/}
                <div className="pagecontent">
                <Link to="/articles"> <h2 classname="pageformat">Articles</h2></Link>
            </div>
            </div>
            </div>
            <div className="card1">
            <div className="pagecontainer">
               

               
                <Link to="/projects"><img src="https://stackify.com/wp-content/uploads/2013/08/best-dev-websites-2-793x397.jpg"
                 alt="projects" className="myprofile" /></Link>
                   <div className="pagecontent">
                   <Link to="/projects">  <h2 className="pageformat">Projects</h2></Link>
                   </div>
             </div>

             
            </div>
            <div className="card1">
               <div className="pagecontainer"> 
                <Link to="/directory"><img src={directory} alt="cdirectory"className="myprofile" /></Link>
               {/*<Link to="/directory"><img src="https://res.cloudinary.com/wnotw/images/c_limit,w_1536,q_auto:eco,f_auto/v1570469574/l6b1dynqevwroklkifec/code-the-dream" alt="cdirectory"className="myprofile" /></Link>*/}
               <div className="pagecontent">
               <Link to="/directory">  <h2 className="pageformat">Directory</h2></Link>
            </div>
           </div>
        </div>
        </div>
        

    )
}
export default HomePage