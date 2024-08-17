import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponenet';
import Footer from './FooterComponenet';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponenet';
import Gallery from "./GalleryComponent"
import Location from './LocationConponent';
import Order from './OrderComponent';
import Events from './EventsComponent'
import Gift from './GiftComponent';
import Catering from './CateringComponent';
import Sidebar from './TestNews';
import PaySuccess from './PayStatus/PaySuccess';
import PayFailure from './PayStatus/PayFailure';
import GiftSuccess from './PayStatus/GiftSuccess';
import ReserveSuccess from './PayStatus/ReserveSuccess';
import TicketSuccess from './PayStatus/TicketSuccess';
import { Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { connect } from 'react-redux';
import { postComment, fetchDishes, fetchComments, fetchCaterings, fetchEvents, fetchGifts, fetchHeaders, fetchHome, fetchSeats,
  fetchPromos, fetchLeaders, fetchOrders, addNewOrder, removeExistingOrder ,/* postFeedback, */ fetchSubscribers } from '../redux/ActionCreators';
import React, { useEffect } from 'react';
import { actions } from 'react-redux-form';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
    catering: state.catering,
    seats:state.seats,
    headers: state.headers,
    home: state.home,
    events: state.events,
    orders: state.orders,
    gifts: state.gifts,
    subscribers: state.subscribers
  }
}

const mapDispatchToProps = dispatch => ({
  fetchSubscribers: () => dispatch(fetchSubscribers()),
  fetchOrders: () => dispatch(fetchOrders()),
  fetchGifts: () => dispatch(fetchGifts()),
  fetchCaterings: () => dispatch(fetchCaterings()),
  fetchSeats: () => dispatch(fetchSeats()),
  fetchEvents: () => dispatch(fetchEvents()),
  fetchHeaders: () => dispatch(fetchHeaders()),
  fetchHome: () => dispatch(fetchHome()),
  addNewOrder: (order) => dispatch(addNewOrder(order)),
  removeExistingOrder: (order_id, quantity) => dispatch(removeExistingOrder(order_id, quantity)),
  fetchComments: () => dispatch(fetchComments()),
  postComment: (dishId, rating, comment, author) => dispatch(postComment(dishId, rating, comment, author)),
  fetchDishes: () => {dispatch(fetchDishes())},
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
  /* postFeedback: (firstname, lastname, telnum, email, agree, contactType, message, id) => dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message, id)) */
});

const Main = (props) => {
  const location = useLocation();

  useEffect(() => {
    props.fetchDishes();
    props.fetchComments();
    props.fetchPromos();
    props.fetchLeaders();
    props.fetchOrders();
    props.fetchHeaders();
    props.fetchHome();
    props.fetchGifts();
    props.fetchCaterings();
    props.fetchSeats();
    props.fetchEvents();
    props.fetchSubscribers();
  }, []);
  
  const HomePage = () => (
    <Home
      home={props.home}
    />
  );

  const DishWithId = (props) => {
    const { dishId } = useParams();
    const dish = props.dishes.dishes.flatMap(items => items.items).find(dish => dish._id === dishId) ?? null;
    const comments = props.comments.comments.filter(comment => comment.dish === dishId);
  
    return (
      <DishDetail
        dish={dish}
        isLoading={props.dishes.isLoading}
        errMess={props.dishes.errMess}
        comments={comments}
        commentsErrMess={props.comments.errMess}
        postComment={props.postComment}
        addDish={props.addNewOrder}
      />
    );
  };

  return (
    <div>
      <Header
        dishes={props.dishes}
        orders={props.orders}
        headers={props.headers}
        seats={props.seats}
        removeOrder={props.removeExistingOrder}
      />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.key}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/aboutus" element={<About leaders={props.leaders} />} />
          <Route path="/menu" element={<Menu dishes={props.dishes} comments={props.comments} />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/location" element={<Location />} />
          <Route path="/order" element={<Order dishes={props.dishes} orders={props.orders}/>} />
          <Route path="/events" element={<Events events={props.events}/>} />
          <Route path="/gift" element={<Gift gifts={props.gifts}/>} />
          <Route path="/catering" element={<Catering catering={props.catering}/>} />
          <Route path="/admin" element={<Sidebar subscribers={props.subscribers}/>} />
          <Route path="/menu/:dishId" element={<DishWithId {...props} />} />
          <Route path="/paystat/:tranId" element={<PaySuccess/>} />
          <Route path="/payfail/:tranId" element={<PayFailure/>} />
          <Route path="/gift/:tranId/:value/:email" element={<GiftSuccess/>} />
          <Route path="/reserve/:tranId/:email" element={<ReserveSuccess/>} />
          <Route path="/events/:tranId/:email" element={<TicketSuccess/>} />
          {/* <Route path="/favorites" element={<PrivateRoute isAuthenticated={props.auth.isAuthenticated}><Favorites favorites={props.favorites} deleteFavorite={props.deleteFavorite} /></PrivateRoute>} /> */}
          <Route path="/contactus" element={<Contact resetFeedbackForm={props.resetFeedbackForm} postFeedback={props.postFeedback} />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </AnimatePresence>
      <Footer orders={props.orders.orders} dishes={props.dishes.dishes} removeOrder={props.removeExistingOrder}/>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);