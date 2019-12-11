import React from "react";
import myimage from "../../assets/images/nice-piccy3.jpg";
import ListItem from "../ListItem";

class ListItems extends React.Component {
  componentDidMount() {
    console.log(this.props.articles);
  }

  render() {
    let articles = this.props.articles;
    console.log(articles);

    if (articles !== undefined || articles !== null || articles !=="") {
      console.log(articles);
      return articles.map((article, index) => {
        console.log(article);
        return <ListItem article={article}></ListItem>;
      });
    
// return(
//     <div>TESTING</div>
// )
}
    return null;
  }
}
export default ListItems;
