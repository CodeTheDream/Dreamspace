import React from "react";
import myimage from "../../assets/images/nice-piccy3.jpg";
import ListItem from "../ListItem";

class ListItems extends React.Component {
  componentDidMount() {
    //console.log(this.props.articles);
  }

  render() {
    let articles = this.props.filteredArticles;
   // console.log(articles);

    if (articles !== undefined || articles !== null || articles !=="") {
     // console.log(articles);
      return articles.map((article,i) => {
        //console.log(article);
        return <div>
        
          <ListItem   key={i} article={article}></ListItem>
        </div>;

      });
    
// return(
//     <div>TESTING</div>
// )
}
    return null;
  }
}
export default ListItems;
