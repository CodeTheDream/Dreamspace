import React, { Component } from 'react';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import ListItems from "../../components/ListItems";

class FilterDropDown extends Component {
  constructor(props) {
    super();
    
    this.state = {
      showMenu: false,
      filterBy: "Popular Posts",
      articles: []
    };
    
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.filterReact = this.filterReact.bind(this);
    this.changeFilter = this.changeFilter.bind(this);

  }
  componentDidMount(){
    console.log("FILTER", this.props.articles)
    this.setState({articles: this.props.articles})
  }
  showMenu(event) {
    event.preventDefault();
    
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }
  
  closeMenu(event) {
    
    if (!this.dropdownMenu.contains(event.target)) {
      
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });  
      
    }
  }

  changeFilter(filterTag){ 
    this.setState({filterBy: filterTag})

    this.props.firebase
      .articles()
      .where("tags", "==", filterTag)
      .get()
      .then(function(querySnapshot) {
        let articles =[]

        querySnapshot.forEach(function(doc) {
            articles.push({...doc.data(), uid: doc.id})
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());

            console.log(articles)
        });
        console.log("FIltered Articles", articles)
        this.setState({articles:articles})
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });


  }
  filterReact(){
    this.setState({filterBy : "React"})
  }
  render() {
    let articles= this.state.articles
console.log("RENDER", articles)
    return (
      <div>
      <div>
        <button onClick={this.showMenu}>
        {this.state.filterBy}
                </button>
        
        {
          this.state.showMenu
            ? (
              <div
                className="menu"
                ref={(element) => {
                  this.dropdownMenu = element;
                }}
              >
                <button onClick={()=>this.changeFilter("React")}> React</button>
                <button onClick={()=>this.changeFilter("Ruby")}> Ruby</button>
                <button onClick={()=>this.changeFilter("Javascript")}> Javascript</button>
              </div>
            )
            : (
              null
            )
        }
      </div>
        {this.state.articles !==[] ?  (<ListItems articles={this.props.articles}/>):<div> State<ListItems articles={articles}/></div>}

          </div>
    );
  }
}

export default compose(withFirebase)(FilterDropDown)