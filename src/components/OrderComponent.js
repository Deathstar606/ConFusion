import {useRef, useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  CardImg,
  Container,
} from 'reactstrap';
import axios from 'axios';
import { baseUrl } from '../shared/baseurl';
import { motion, useInView as Fview } from "framer-motion";

function Order (props) {
  const [total, setTotal] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const [giftCardId, setGiftCardId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      address: '',
      email: '',
      order_type: "Online",
      gift_stat: false,
      total: 0,
      items: []
    });
  
    useEffect(() => {
      let newTotal = 0;
      props.orders.orders.forEach((order) => {
        const matchingDish = props.dishes.dishes
          .flatMap((dish) => dish.items)
          .find((di) => di._id === order._id);
        if (matchingDish) {
          newTotal += matchingDish.price * order.quantity;
        }
      });
      setTotal(newTotal);
      setFinalTotal(newTotal);
      setPaymentMethod("onlinePayment")
    }, [props.orders.orders, props.dishes.dishes]);

    useEffect(() => {
      const savedFormData = localStorage.getItem('formData');
      if (savedFormData) {
        const parsedData = JSON.parse(savedFormData);
        setFormData((prevData) => ({
          ...prevData,
          firstName: parsedData.firstName || '',
          lastName: parsedData.lastName || '',
          phoneNumber: parsedData.phoneNumber || '',
          address: parsedData.address || '',
          email: parsedData.email || ''
        }));
      }
    }, []);
  
    useEffect(() => {
      setFormData((prevData) => ({
        ...prevData,
        total: finalTotal,
        items: props.orders.orders,
      }));
    }, [finalTotal, props.orders.orders]);

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };

const applyGiftCard = async () => {
  try {
    const response = await axios.post('http://localhost:9000/gifts', { trans_id: giftCardId });
    const giftValue = response.data.value;
    if (giftValue >= total) {
      alert('Gift card value exceeds or matches the total amount');
    } else {
      setFinalTotal(total - giftValue);
      setFormData((prevData) => ({
        ...prevData,
        gift_stat: true,
      }));
      alert('Gift card applied successfully');
    }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem('formData', JSON.stringify(formData));
  
    if (paymentMethod === 'onlinePayment') {
      try {
        const response = await axios.post('http://localhost:9000/orders/sslPay/', formData);
        window.open(response.data.url, '_blank'); // Opens the payment URL in a new tab
      } catch (error) {
        console.error("Payment Error:", error.response ? error.response.data : error.message);
      }
    } else {
      try {
        const response = await axios.post('http://localhost:9000/orders/cod/', formData);
        console.log('Order Confirmed:', response.data);
      } catch (error) {
        console.error("Could not complete order:", error.response ? error.response.data : error.message);
      }
    }
  };

    const ref2 = useRef(null)
    const isInview2 = Fview(ref2, { once: true })

    const variants = {
        initial: {
          pathLength: 0,
          pathOffset: 1,
        },
        animate: {
          pathLength: 1,
          pathOffset: 0,
          transition: {
            duration: 2,
            ease: "easeInOut",
          },
        },
      };

    return (
      <motion.div
      transition={{duration: 0.5, type: "tween", ease: "easeIn"}}
      initial = {{x: 1000, opacity: 0}}
      animate= {{x: 0, opacity: 1}}
      exit= {{x: -1000, opacity: 0}}>
          <div style={{backgroundColor: "rgb(255, 193, 0)"}}>
            <h1 className='p-4 text-center row-header' style={{fontSize: "clamp(54px, 4vw, 100px)"}}>Confirm Your Order</h1>
                <div className='d-flex justify-content-center pb-4'>
                    <motion.svg width="204" height="204" viewBox="-190 0 854 674" fill="none" ref={ref2}>
                        <motion.path d="M11.045 670.143C4.79187 670.143 0 664.89 0 658.295V196.152C0 193.295 0.895185 190.623 2.56707 188.583L55.8437 95.7591V11.835C55.8437 5.34482 60.6619 0 66.7308 0H410.1C415.339 0 419.802 4.08102 420.776 9.53115L426.411 101.696L481.82 199.443L480.095 671.341L458.953 672.144L403.939 673.368C291.975 675.856 111.911 670.143 11.045 670.143ZM80.5271 486.141C161.594 485.983 242.595 485.905 323.662 486.141C328.48 486.168 332.429 490.091 332.429 494.909C332.429 508.008 326.94 533.639 297.307 533.639H106.856C77.2228 533.639 71.7201 508.008 71.7201 494.909C71.7201 490.091 75.6826 486.168 80.5271 486.141ZM262.026 351.047C269.477 351.047 275.546 357.089 275.546 364.567C275.546 372.018 269.503 378.073 262.026 378.073C254.588 378.073 248.519 372.031 248.519 364.567C248.545 357.115 254.588 351.047 262.026 351.047ZM144.256 352.008C151.707 352.008 157.776 358.05 157.776 365.514C157.776 372.966 151.734 379.034 144.256 379.034C136.805 379.034 130.75 372.992 130.75 365.514C130.75 358.05 136.779 352.008 144.256 352.008ZM202.667 339.133C210.118 339.133 216.174 345.162 216.174 352.639C216.174 360.091 210.145 366.146 202.667 366.146C195.216 366.146 189.147 360.104 189.147 352.639C189.174 345.162 195.216 339.133 202.667 339.133ZM312.169 408.984H94.8106C81.001 408.984 69.6796 397.689 69.6796 383.879C69.6796 348.098 140.952 322.124 200.798 321.505C318.554 320.334 371.396 408.984 312.169 408.984ZM331.85 443.436C332.217 444.044 332.412 444.74 332.416 445.45C332.416 445.911 332.39 446.411 332.377 446.911C332.416 447.411 332.416 447.912 332.416 448.372C332.412 449.082 332.217 449.778 331.85 450.386C329.849 459.101 321.858 470.502 297.307 470.502H106.856C82.2912 470.502 74.3135 459.115 72.3125 450.386C71.9462 449.778 71.7506 449.082 71.7464 448.372C71.7464 447.912 71.7727 447.411 71.7859 446.911C71.7464 446.411 71.7464 445.911 71.7464 445.45C71.7506 444.74 71.9462 444.044 72.3125 443.436C74.3135 434.721 82.3043 423.32 106.856 423.32H205.471L241.832 460.879L277.955 423.32H297.307C321.872 423.346 329.849 434.721 331.85 443.436ZM139.78 81.1464H191.122V105.198H139.78V81.1464ZM213.66 81.1464H264.988V105.198H213.66V81.1464ZM287.341 81.1464H310.945V105.198H287.341V81.1464ZM399.134 23.5119H77.5783V81.1464H118.322V105.198H76.1565C61.1095 131.567 46.5891 158.383 31.7922 184.923H380.48L398.397 105.29C379.769 105.29 352.808 105.198 334.207 105.198V81.1464C355.586 81.1464 377.136 80.791 398.778 80.791C398.871 61.5444 398.963 42.6664 399.134 23.5119ZM417.196 117.31L409.086 184.923H454.688L417.196 117.31ZM405.479 208.527V646.618H455.623L454.899 208.527H405.479ZM21.6556 208.527V646.618H384.64V208.527H21.6556Z" 
                                    fill="none"
                                    stroke="black"
                                    strokeWidth="10"
                                    variants={variants}
                                    animate={isInview2 ? "animate" : "initial"}/>                              
                    </motion.svg>
                </div>
            <p className='text-center pb-3'>Some Description About Our Establishment</p>
            <Container className="pb-5">
              <Row>
                <Col md={6}>
                  <h2 className="text-center mb-4">Customer Details</h2>
                    <Form /* onSubmit={handleSubmit} */>
                      <FormGroup>
                        <Label>First Name</Label>
                          <Input
                            style={{
                              border: "2px solid black",
                              backgroundColor: "transparent"
                            }}
                            type="text"
                            name="firstName"
                            id="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                          />
                      </FormGroup>
                      <FormGroup>
                        <Label>Last Name</Label>
                          <Input
                            style={{
                              border: "2px solid black",
                              backgroundColor: "transparent"
                            }}
                            type="text"
                            name="lastName"
                            id="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                          />
                      </FormGroup>
                      <FormGroup>
                        <Label>Phone Number</Label>
                          <Input
                            style={{
                              border: "2px solid black",
                              backgroundColor: "transparent"
                            }}
                            type="text"
                            name="phoneNumber"
                            id="phoneNumber"
                            placeholder="Phone Number"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                          />
                      </FormGroup>
                      <FormGroup>
                        <Label>Address</Label>
                          <Input
                            style={{
                              border: "2px solid black",
                              backgroundColor: "transparent"
                            }}
                            type="text"
                            name="address"
                            id="address"
                            placeholder="Address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                          />
                      </FormGroup>
                      <FormGroup>
                        <Label>Email</Label>
                          <Input
                            style={{
                              border: "2px solid black",
                              backgroundColor: "transparent"
                            }}
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                      </FormGroup>
                    </Form>
                  </Col>
                <Col md={5} className="p-3 m-3" style={{ backgroundColor: "rgb(255, 193, 0)", border: "black solid 2px" }}>
                  <ul className='p-3' style={{ padding: 0, listStyleType: 'none' }}>
                    {props.orders.orders.map((order, index) => {
                      const matchingDish = props.dishes.dishes
                        .flatMap(dish => dish.items)
                        .find(di => di._id === order._id);
                      
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
                        </>
                      ) : <h3>Food cart is empty</h3>
                    })}
                  </ul>
                  <FormGroup>
                    <Label for="giftCard">Gift Card</Label>
                    <Input
                        type="text"
                        id="giftCard"
                        style={{
                          border: "2px solid black",
                          backgroundColor: "transparent"
                        }}
                        value={giftCardId}
                        onChange={(e) => setGiftCardId(e.target.value)}
                        placeholder="Enter gift card ID"
                    />
                    <div className='home-butt'>
                      <button onClick={applyGiftCard} className="mt-3 butt">Apply Gift Card</button>
                    </div>
                  </FormGroup>
                  <h4><strong>Total:</strong> {total} Tk</h4>
                  <h4><strong>Final Total:</strong> {finalTotal} Tk</h4>
                  <div className='d-flex'>
                    <FormGroup check className="mr-2">
                      <Label check>
                        <Input
                          type="radio"
                          name="paymentMethod"
                          value="cashOnDelivery"
                          checked={paymentMethod === 'cashOnDelivery'}
                          onChange={handlePaymentChange}
                        />
                          Cash on Delivery
                      </Label>
                    </FormGroup>
                    <FormGroup check>
                      <Label check>
                        <Input
                          type="radio"
                          name="paymentMethod"
                          value="onlinePayment"
                          checked={paymentMethod === 'onlinePayment'}
                          onChange={handlePaymentChange}
                        />
                        Online Payment
                      </Label>
                    </FormGroup>
                  </div>
                  <div className='pb-3 pt-3 home-butt'>
                    <button
                      className='butt'
                      onClick={handleSubmit}
                    >
                      Confirm Order
                    </button>
                  </div>
                </Col>
              </Row>
            </Container>
        </div>
      </motion.div>
    )
}

export default Order