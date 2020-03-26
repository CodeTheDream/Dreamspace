import React from "react";
//import myimage from "../../assets/images/nice-piccy3.jpg";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import { AuthUserContext } from "../Session";
import ListItem1 from "../ListItem1";
import "firebase/auth";
class ListItem extends React.Component {
    constructor(props) {
        // console.log("this is the props value:" + props)
        super(props);
        this.state = {
            article: [],
            username: "",
            TotallComment: "",
            totalcount: "",
            sortType: "asc",
            photoUrl: " ",
            email:" ",
        };
    }
    openPost(e, article) {
        // console.log("ARTICLE", article)
        e.preventDefault();
        this.props.history.push({
            pathname: "/articles/" + article.uid,
            params: article.uid,
            state: { article }
        });
    }

    componentDidMount() {
        const { article } = this.props;
        this.props.firebase
            .comments()
            .where("articleId", "==", article.uid)
            .onSnapshot(snapshot => {
                const TotallComment = [];
                snapshot.forEach(doc => {
                    const data = doc.data();
                    TotallComment.push(data);
                });
                this.setState({ TotallComment: TotallComment });
                const totalcount = TotallComment.length;
                this.setState({ totalcount: totalcount });

                this.setState({
                    isOldestFirst: true,
                    article: article
                })
            })




        let autherId = article.userId;
        this.unsubscribe = this.props.firebase
            .user(autherId)
            .get()
            .then(doc => {
                // console.log("userdata", doc.data())
                let user = doc.data()
                //console.log("userphoto" + user.PhotoURL)
                this.setState({

                    username: user.username,
                    //photoURL: user.photoURL,
                    //photoUrl: user.photoURL,
                })
               // console.log("userphoto" + user.photoURL)
              // console.log( user.photoURL)
            })



            

          

            


       /*function authUser () {
            authUser.providerData.forEach(function (profile) {
                console.log("Sign-in provider: " + profile.providerId);
                console.log("  Provider-specific UID: " + profile.uid);
                console.log("  Name: " + profile.displayName);
                console.log("  Email: " + profile.email);
                console.log("  Photo URL: " + profile.photoURL);
            });



        }*/



    }
    render() {
        //const { upvotes } = this.state;
        // const { downvotes } = this.state;
        const { article } = this.props;
        return (
            <AuthUserContext.Consumer>
                {authUser => (


                    <div className="card">
                        <ListItem1 article={article} />
                        <div className="maincontent" id="content">

                            <div className="auther">
                                <div className="auther-style">
                                   
                                    
                                        
                                    <img src={this.state.photoUrl} className="user-profile"
                                        />
                                posted by {this.state.username} {article.timeCreated}
                                   
                                </div>
                            </div>
                            {/*} <div> {this.props.article.tags}</div>*/}
                            <div className="auther-style">
                                <a href={this.props.article.url}>{this.props.article.title}</a>
                            </div>

                            <div className="description-style">
                                {this.props.article.description}
                            </div>
                        </div>

                        <div id="commentarea">
                            <span style={{ float: "right" }}>
                                <button
                                    className="button"
                                    onClick={e => this.openPost(e, article)}>

                                    <i className="fa fa-comment">

                                        {" "}
                                        {this.state.totalcount} {" comment "}
                                    </i>
                                </button>
                                <span style={{ float: "right" }}>
                                    <button className="button">
                                        <i className="fa fa-share">share...</i>
                                    </button>
                                </span>
                            </span>
                        </div>
                    </div >



                )
                }





            </AuthUserContext.Consumer>
        );
    }
}
export default compose(withFirebase, withRouter)(ListItem);
