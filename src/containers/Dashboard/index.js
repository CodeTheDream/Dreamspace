import React from "react";

import { compose } from "recompose";
import {
  withAuthorization,
  withEmailVerification,
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
      articlesvotes: [],
      search: "",
      sortType: "asc",
      calculatedvote: [],
      showPopup: false,
      orangeButtonId: "null",
      sortBy: "time",
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.firebase.articles().onSnapshot((snapshot) => {
      let articles = [];
      snapshot.forEach((doc) => articles.push({ ...doc.data(), uid: doc.id }));
      this.setState({ articles });
    });
    this.unsubscribe = this.props.firebase
      .articles()
      .orderBy("calculatedvote", "desc")
      .onSnapshot((snapshot) => {
        let articlesvotes = [];
        snapshot.forEach((doc) =>
          articlesvotes.push({ ...doc.data(), uid: doc.id })
        );
        this.setState({ articlesvotes }, () =>
          console.log("sortedvotes", articlesvotes)
        );
      });
  }
  changeArticleSort = (type) => {
    this.setState({ sortBy: type });
  };
  componentWillUnmount() {
    this.unsubscribe();
  }
  handleInput = (e) => {
    console.log(e.target.value);
    this.setState({
      search: e.target.value,
    });
  };
  render() {
    const { sortType, articlesvotes, articles } = this.state;
    let filteredArticles = articles.filter((article) => {
      return (
         // article.tags.toLowerCase().includes(this.state.search.toLowerCase()),
          article.timeCreated.toLowerCase().includes(this.state.search.toLowerCase()),
        article.title.toLowerCase().includes(this.state.search.toLowerCase())
       // article.description.toLowerCase() .includes(this.state.search.toLowerCase())
      )
    });
    if (filteredArticles) {
      filteredArticles.sort((a, b) => {
        const isReversed = sortType === "dsc" ? 1 : -1;
        return isReversed * a.timeCreated.localeCompare(b.timeCreated);
      });
    }
    return (
<<<<<<< HEAD
      <div className="dashboard_wrapper">
=======
      <div className="dashbord_wrapper">
>>>>>>> new update
        <div className="main-class">
          <div className="search-bar">
            <SearchBar handleInput={this.handleInput} />
          </div>
          <div className="create-post">
            <Create_article />
          </div>
        </div>
        <div className="popular-title">
          <button
            className={
              this.state.sortBy === "vote"
                ? "sortbutton activesort "
                : "sortbutton"
            }
            onClick={() => this.changeArticleSort("vote")}
          >
            <i class="fa fa-fire"></i>
            {""}
            Popular
          </button>
          <button
            className={
              this.state.sortBy === "time"
                ? " sortbutton activesort"
                : "sortbutton"
            }
            onClick={() => this.changeArticleSort("time")}
          >
            {" "}
            <i class="far fa-clock"></i> Timefiltered
          </button>
        </div>
        {this.state.sortBy === "vote" ? (
          <div>
            <ListItems filteredArticles={articlesvotes} />
          </div>
        ) : (
          <ListItems filteredArticles={filteredArticles} />
        )}
      </div>
    );
  }
}

const condition = (authUser) => !!authUser;

export default compose(withFirebase, withAuthorization(condition))(Dashboard);
