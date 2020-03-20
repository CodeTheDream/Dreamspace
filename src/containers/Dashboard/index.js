import React from "react";
//import myimage from "../../assets/images/nice-piccy3.jpg";
import { compose } from "recompose";
import {
  withAuthorization,
  withEmailVerification
} from "../../components/Session";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes.js";
import { withFirebase } from "../../components/Firebase";
import ListItems from "../../components/ListItems";
import Create_article from "../Create-article";
import SearchBar from "../../components/Search-bar";
class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
        search: "" ,
      sortType:"asc",
    };
  }

  componentDidMount() {
    // let articles =this.props.firebase.articles()
    this.unsubscribe = this.props.firebase.articles().onSnapshot(snapshot => {
      let articles = [];
      snapshot.forEach(doc => articles.push({ ...doc.data(), uid: doc.id }));

      // console.log("Articles loaded here yo!", articles);
      this.setState({ articles });
    });
  }


  componentWillUnmount() {
    this.unsubscribe();
  }


  
  handleInput = e => {
    console.log(e.target.value);
    this.setState({
      search: e.target.value
    });
  };
    render() {
        const { sortType } = this.state;
        

        let filteredArticles = this.state.articles.filter(article => {
           
      return (
          article.tags.toLowerCase().includes(this.state.search.toLowerCase()),
         // article.timeCreated.toLowerCase().includes(this.state.search.toLowerCase()),
        article.title.toLowerCase().includes(this.state.search.toLowerCase())
       // article.description
         // .toLowerCase()
         // .includes(this.state.search.toLowerCase())
      )
        });
        
        if (filteredArticles) {
            filteredArticles.sort((a, b) => {
                const isReversed = (sortType === 'dsc') ? 1 : -1;
                return isReversed * a.timeCreated.localeCompare(b.timeCreated)
            })

        }
    return (
      <div className="wrapper">
        <div className="main-class">
        <div className="search-bar" >
          <SearchBar handleInput={this.handleInput} />
        </div>
        <div className="create-post">
          <Create_article />
        </div>
        
        </div>
        <div className="popular-title">
          <p style={{ float: "left" }}>Popular Posts</p>
        </div>
        <div>
          <ListItems
                    filteredArticles={filteredArticles}
                  
            //recipes={this.state.recipes}
          />
        </div>
      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default compose(withFirebase, withAuthorization(condition))(Dashboard);
