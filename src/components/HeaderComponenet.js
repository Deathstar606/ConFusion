import React, { useState, useEffect } from 'react';
import {
  Form,
  FormGroup,
  Input,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  Row,
  Col,
  CardImg,
  Container
} from 'reactstrap';
import Brand from "../image/icons8-restaurant-64.png"
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { baseUrl } from '../shared/baseurl';
import axios from 'axios';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { MdOutlineNoFood } from "react-icons/md";
import { FaTimes } from 'react-icons/fa';
import MediaQuery from 'react-responsive';
import 'react-datepicker/dist/react-datepicker.css';
import { AnimatePresence, motion } from 'framer-motion';
import Burger from './Burger';

export const OrderBar = ({ orders, dishes, handleOrdPage, total, removeOrder }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sidebarWidth = windowWidth < 640 ? '70vw' : '500px';

  return (
    <motion.div
      onClick={handleOrdPage}
      className='modal-back'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()} // Prevent click event propagation
        initial={{ x: '100%' }}
        animate={{ x: '0%' }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          backgroundColor: "rgb(0, 0, 0)",
          color: "rgb(255, 193, 0)",
          width: sidebarWidth, // Use the calculated width
          height: '100vh', // Full height of the viewport
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', // Box shadow for some depth
          position: 'fixed', // Fix to the right side
          top: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div style={{
          flex: 1, // Allow this container to grow and take up available space
          maxHeight: 'calc(100vh - 80px)', // Adjust max height to account for footer space
          overflowY: orders.length > 0 ? 'auto' : 'hidden',
          padding: '0 1rem', // Add padding for aesthetics
        }}>
          <ul className='p-3' style={{ padding: 0, listStyleType: 'none' }}>
            {orders.length > 0 ? (
              orders.map((order, index) => {
                const matchingDish = dishes
                  .flatMap(dish => dish.items)
                  .find(di => di._id === order._id);
                let price = matchingDish.price * order.quantity;
                total = total + price;

                return matchingDish ? (
                  <>
                    <Row key={index} style={{ marginBottom: '20px' }}>
                      <Col md={4} className="mx-0">
                        <CardImg src={baseUrl + matchingDish.image} alt={matchingDish.name}></CardImg>
                      </Col>
                      <Col md={8}>
                        <strong>{matchingDish.name}<br /></strong>
                        <strong>Price:</strong> {matchingDish.price} Tk<br />
                        <strong>Quantity:</strong> {order.quantity}
                      </Col>
                    </Row>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <button className='butt' outline onClick={() => removeOrder(order._id, order.quantity)}>Remove</button>
                    </div>
                  </>
                ) : null;
              })
            ) : (
              <h3>Food cart is empty</h3>
            )}
          </ul>
        </div>
        <div className='p-3'/* style={{ padding: '1rem', borderTop: '1px solid rgba(255, 193, 0, 0.5)' }} */>
          <div className='ml-3 mb-1'>Total: {total} Tk </div>
          <Link to="/order">
            <button onClick={handleOrdPage} className='butt ml-3'>Place Order</button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

export const Reserve = ({ showMod, resSeat }) => {
  const [email, setEmail] = useState('');
  const [people, setPeople] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [total, setTotal] = useState('');
  const [selectedSeat, setSelectedSeat] = useState(''); // Added state for selected seat

  const today = new Date().toISOString().split('T')[0];

  const handleSeatClick = (seatValue) => {
    setTotal(seatValue);
    setSelectedSeat(seatValue); // Update selected seat
  };

  const seats = resSeat.map((s) => {
    const isSelected = s.seat_value === selectedSeat;
    return (
      <Col
        md={6}
        key={s._id}
      >
        <div onClick={() => handleSeatClick(s.seat_value)} className={`seat-col ${isSelected ? 'selected' : ''}`}>
          <CardImg src={baseUrl + s.image} />
          <p className='text-center'>{s.name}, {s.seat_value} Tk</p>
        </div>
      </Col>
    )
  });

  useEffect(() => {
    const savedFormData = localStorage.getItem('formData');
    if (savedFormData) {
      const formData = JSON.parse(savedFormData);
      setEmail(formData.email || '');
    }
  }, []);

  const handleSubmitRes = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(baseUrl + 'reservation', { people, date, time, email, total });
      window.open(response.data.url);
      setPeople("");
      setTime("");
      setDate("");
      setTotal("");
      setSelectedSeat(""); // Clear the selected seat after submission
      showMod();
    } catch (error) {
      alert("Reservation failed");
      console.log(error.response.data);
    }
    alert("Reservation confirmed");
  };

  return (
    <motion.div 
      className='modal-back'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className='d-flex justify-content-center m-5'
        initial={{ opacity: 0, y: -70 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -70 }}
        transition={{ duration: .25, delay: .25 }}
      >
        <Container className="d-flex justify-content-center">
          <Row className="ml-1 mr-1 d-flex justify-content-center w-100">
            <Col md={6} xs={12} className="p-4 d-flex flex-column align-items-center modal-content">
              <Form onSubmit={handleSubmitRes} className="w-100" style={{overflowY: "auto", overflowX: "hidden"}}>
                <FaTimes onClick={showMod} style={{ position: "absolute", top: "10px", right: "10px" }} />
                <h1 className='text-center pb-1'>Reservation</h1>
                <p className='text-center'>Book a booth in advance</p>
                <FormGroup>
                  <Input
                    style={{
                      border: "2px solid black",
                      backgroundColor: "transparent",
                      padding: "5px",
                      width: "100%"
                    }}
                    className="rounded-0"
                    type="select"
                    value={people}
                    onChange={(e) => setPeople(e.target.value)}
                    required
                  >
                    <option value="" disabled>Select People</option>
                    <option value="1">1 Person</option>
                    <option value="2">2 People</option>
                    <option value="3">3 People</option>
                    <option value="4">4 People</option>
                    <option value="5">5 People</option>
                    <option value="6">6 People</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Input
                    style={{
                      border: "2px solid black",
                      backgroundColor: "transparent"
                    }}
                    className="rounded-0"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={today}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    style={{
                      border: "2px solid black",
                      backgroundColor: "transparent"
                    }}
                    className="rounded-0"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    style={{
                      border: "2px solid black",
                      backgroundColor: "transparent"
                    }}
                    className="rounded-0"
                    type="email"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </FormGroup>
                <Row className="mb-2">
                  {seats}
                </Row>
                <div className="home-butt d-flex justify-content-center">
                  <button type="submit" className="butt">Find a Table</button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </motion.div>
    </motion.div>
  );
}

const Example = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const handleNavLinkClick = (path) => {
    setActiveLink(path);
  };

  const [ordPage, setOrdPage] = useState(false)
  const handleOrdPage = () => {
    setOrdPage(!ordPage)
  }
  
  let total = 0
  
  const [ResMod, setResMod] = useState(false)

  const handleShowRes = () => {
    setResMod(!ResMod);
  };

  if (props.headers.headers.length > 0) {
    const handleClick = () => {
      localStorage.setItem('activeCategory', 'Sandwiches');  // Set activeCategory in localStorage
      navigate('/menu');  // Navigate to /menu
    };

    return (
      <div>
      <div className='nav-c'>
        <Navbar light expand="md">
          <NavbarBrand href=/* "http://Deathstar606.github.io/ConFusion_Front/" */"http://localhost:3000/ConFusion_Front#/home">
            <img src={Brand} alt="ConFusante" style={{ height: '30px' }} />
          </NavbarBrand>
              <Nav className="ml-auto" navbar>
                <MediaQuery minWidth={640}>
                  <NavItem>
                    <NavLink
                      to="/menu"
                      activeclassname="active"
                      onClick={() => handleNavLinkClick('/menu')} // Update active link on click
                    >
                      <div className={`nav-items pr-2 pl-2 ${activeLink === '/menu' ? 'active' : ''}`}>
                        Menu
                        <div className='nav-items-inner'/>
                      </div>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      to="/location"
                      activeclassname="active"
                      onClick={() => handleNavLinkClick('/location')} // Update active link on click
                    >
                      <div className={`nav-items pr-2 pl-2 ${activeLink === '/location' ? 'active' : ''}`}>
                        Location
                        <div className='nav-items-inner'/>
                      </div>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      to="/events"
                      activeclassname="active"
                      onClick={() => handleNavLinkClick('/events')} // Update active link on click
                    >
                      <div className={`nav-items pr-2 pl-2 ${activeLink === '/events' ? 'active' : ''}`}>
                        Events
                        <div className='nav-items-inner'/>
                      </div>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      to="/catering"
                      activeclassname="active"
                      onClick={() => handleNavLinkClick('/catering')} // Update active link on click
                    >
                      <div className={`nav-items pr-2 pl-2 ${activeLink === '/catering' ? 'active' : ''}`}>
                        Catering
                        <div className='nav-items-inner'/>
                      </div>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      to="/gift"
                      activeclassname="active"
                      onClick={() => handleNavLinkClick('/gift')} // Update active link on click
                    >
                      <div className={`nav-items pr-2 pl-2 ${activeLink === '/gift' ? 'active' : ''}`}>
                        Gift Cards
                        <div className='nav-items-inner'/>
                      </div>
                    </NavLink>
                  </NavItem>
                  <NavItem className="mt-2 mr-4 ml-3" style={{ position: 'relative' }}>
                    <MdOutlineNoFood onClick={handleOrdPage} color="rgb(255, 193, 0)" size={25}/>
                    {props.orders.orders.length > 0 && (
                      <div className="bubble">
                        {props.orders.orders.length}
                      </div>
                    )}
                  </NavItem>
                  <NavItem>
                    <div onClick={handleShowRes} className="text-center rounded-0 butt">
                      Reservation
                    </div>
                  </NavItem>
{/*                   <NavItem>
                    <Link to="/order">
                      <div className="text-center rounded-0 butt">
                        Order Now
                      </div>
                    </Link>
                  </NavItem> */}
                </MediaQuery>
                <MediaQuery maxWidth={639}>
                  <Burger resSeat={props.seats.seats}/>
                </MediaQuery>
              </Nav>
        </Navbar>
      </div>
      <AnimatePresence mode='wait'>
        {ResMod && (
          <Reserve showMod={handleShowRes} resSeat={props.seats.seats}/>
        )}
      </AnimatePresence>
      <AnimatePresence mode='wait'>
        {ordPage && (
          <OrderBar orders={props.orders.orders} dishes={props.dishes.dishes} total={total} handleOrdPage={handleOrdPage} removeOrder={props.removeOrder}/>
        )}
      </AnimatePresence>
      <Swiper
        autoplay={{
          delay: 4800,
          disableOnInteraction: false,
        }}
        pagination={{
          dynamicBullets: true,
        }}
        loop={true}
        modules={[Autoplay, Pagination]}
        speed={2500}
      >
        <SwiperSlide className='d-flex justify-content-center align-items-center' style={{ position: 'relative', height: '100vh' }}>
          <CardImg src={baseUrl + props.headers.headers[0].image} style={{ height: '100vh', width: '100%', objectFit: 'cover' }}/>
          <div className="d-flex flex-column align-items-center justify-content-center w-100 p-3" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: 'white' }}>
            <h1 className="mb-2 text-white pb-3 text-center" style={{fontSize: "clamp(44px, 4vw, 70px)"}}>{props.headers.headers[0].head}</h1>
            <h6 className='mb-3 text-white' style={{fontSize: "clamp(18px, 1vw, 40px)"}}>{props.headers.headers[0].subhead}</h6>
            <div className="rounded-0 butt" style={{fontSize: "21px"}} onClick={handleClick}>
              {props.headers.headers[0].action}
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className='d-flex justify-content-center align-items-center' style={{ position: 'relative', height: '100vh' }}>
          <CardImg src={baseUrl + props.headers.headers[1].image} style={{ height: '100vh', width: '100%', objectFit: 'cover' }}/>
          <div className="d-flex flex-column align-items-center justify-content-center w-100 p-3" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: 'white' }}>
            <h1 className="mb-2 text-white pb-3 text-center" style={{fontSize: "clamp(44px, 4vw, 70px)"}}>{props.headers.headers[1].head}</h1>
            <h6 className='mb-3 text-white' style={{fontSize: "clamp(18px, 1vw, 40px)"}}>{props.headers.headers[1].subhead}</h6>
            <Link to="/gift">
              <div className="rounded-0 butt" style={{fontSize: "21px"}}>
                {props.headers.headers[1].action}
              </div>
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide className='d-flex justify-content-center align-items-center' style={{ position: 'relative', height: '100vh' }}>
          <CardImg src={baseUrl + props.headers.headers[2].image} style={{ height: '100vh', width: '100%', objectFit: 'cover' }}/>
          <div className="d-flex flex-column align-items-center justify-content-center w-100 p-3" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: 'white' }}>
            <h1 className="mb-2 text-white pb-3 text-center" style={{fontSize: "clamp(44px, 4vw, 70px)"}}>{props.headers.headers[2].head}</h1>
            <h6 className='mb-3 text-white' style={{fontSize: "clamp(18px, 1vw, 40px)"}}>{props.headers.headers[2].subhead}</h6>
            <Link to="/events">
              <div className="rounded-0 butt" style={{fontSize: "21px"}}>
                {props.headers.headers[2].action}
              </div>
            </Link>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
    )
  }
};

export default Example;