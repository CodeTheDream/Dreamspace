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
import Directory from "../Directory";
class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      search: "",
      sortType: "dsc",
      calculatedvote: []
    };
  }

  componentDidMount() {
    // let articles =this.props.firebase.articles()
    this.unsubscribe = this.props.firebase
      .articles()
      .orderBy("calculatedvote", "desc") // here i have tried to  sort using the calculated vote
      .onSnapshot(snapshot => {
        let articles = [];
        snapshot.forEach(doc => articles.push({ ...doc.data(), uid: doc.id }));
        // { collection: 'article',limit:5, orderBy: ['calculatedvote', 'des'] },

        // console.log("Articles loaded here yo!", articles);
        this.setState({ articles });
      });
    // let { calculatedvote } = this.props;
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
         // article.tags.toLowerCase().includes(this.state.search.toLowerCase()),
          article.timeCreated.toLowerCase().includes(this.state.search.toLowerCase()),
        article.title.toLowerCase().includes(this.state.search.toLowerCase())
       // article.description.toLowerCase() .includes(this.state.search.toLowerCase())
      )
    });
    return (
      <div className="wrapper">
        <div className="main-class">
          <div className="search-bar">
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
        {/* <div>
          <Directory 
            crewDirectory={this.state.crewDirectory}
          />
        </div> */}
      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default compose(withFirebase, withAuthorization(condition))(Dashboard);
