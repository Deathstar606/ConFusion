import Content from './ContentComponent';
import Game from './GameComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponenet';
import Footer from './FooterComponenet';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponenet';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, postReviews, fetchReviews, fetchDishes, fetchComments, fetchMovies,
  fetchPromos, fetchLeaders, fetchContents, fetchFeatured, postFeedback } from '../redux/ActionCreators';
import React, { Component } from 'react';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Movie from './MoviesComponent';
import ReviewDetail from './MoviedetailComponenet';

const mapStateToProps = state => {
  return {
    dishes: state.dishes, //this represents games
    comments: state.comments,
    reviews: state.reviews,
    promotions: state.promotions,
    leaders: state.leaders,
    contents: state.contents,
    movies: state.movies,
    features: state.features
  }
}

const mapDispatchToProps = dispatch => ({    //method defination  
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  postReviews: (dishId, rating, author, comment) => dispatch(postReviews(dishId, rating, author, comment)),
  fetchReviews: () => dispatch(fetchReviews()),
  fetchDishes: () => {dispatch(fetchDishes())},
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
  fetchContents: () => dispatch(fetchContents()),
  fetchMovies: () => dispatch(fetchMovies()),
  fetchFeatured: () => dispatch(fetchFeatured()),
  postFeedback: (firstname, lastname, telnum, email, agree, contactType, message, id) => dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message, id))
});

class Main extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchReviews();
    this.props.fetchPromos();
    this.props.fetchLeaders();
    this.props.fetchContents();
    this.props.fetchMovies();
    this.props.fetchFeatured()
  }

  render() {
  
  const DishWithId = ({match}) => {
    return(
      <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
      isLoading={this.props.dishes.isLoading}
      errMess={this.props.dishes.errMess}
      comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
      commentsErrMess={this.props.comments.errMess}
      postComment={this.props.postComment}
    />
    )
  }

  const RevWithId = ({match}) => {
    return(
      <ReviewDetail dish={this.props.movies.movies.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
      isLoading={this.props.movies.isLoading}
      errMess={this.props.movies.errMess}
      reviews={this.props.reviews.reviews.filter((review) => review.dishId === parseInt(match.params.dishId,10))}
      reviewsErrMess={this.props.reviews.errMess}
      postReviews={this.props.postReviews}
    />
    )
  }

  return (
    <div className="App">
      <Header/>
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
          <Switch>
          <Route path='/home' component={() => <Home promotions={this.props.promotions}/>}/>
          <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders}/>}/>
          <Route exact path='/content' component={() => <Content contents={this.props.contents}/>}/>
          <Route exact path='/content/game' component={() => <Game dishes={this.props.dishes}/>}/>
          <Route exact path='/content/movie' component={() => <Movie movies={this.props.movies}/>}/>
          <Route path="/content/game/:dishId" component={DishWithId}/>
          <Route path="/content/movie/:dishId" component={RevWithId}/>
          <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}/>}/>
          <Redirect to='/home' />
          </Switch>
          </CSSTransition>
        </TransitionGroup>
      <Footer />
    </div>
  );
}
} //selected dish is dick
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));