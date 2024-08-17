import { useState, useRef } from 'react';
import { Row, Col, Container, Form, FormGroup, Label, Input } from 'reactstrap';
import { OrderBar } from './HeaderComponenet';
import MediaQuery from 'react-responsive';
import { FaTimes } from 'react-icons/fa';
import { FaFacebook, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

function Footer({orders, dishes, removeOrder}) {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const formRef = useRef(null);
    const [modal, setModal] = useState(false);
    const location = useLocation()

    const [ordPage, setOrdPage] = useState(false)
    const handleOrdPage = () => {
      setOrdPage(!ordPage)
    }
    
    const dialPhoneNumber = () => {
        window.location.href = "tel:01762277102";
    };
    
    let total = 0

    const handleSubmit = async (e) => {
        console.log("Initialized");
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9000/subscribe/', { firstname: fname, lastname: lname, email })
            setEmail('');
            setFname('');
            setLname('');
            handleHide();
            alert("You have been subcribed")
        } catch (error) {
            console.error(error);
        }
    };

    const handleShow = () => {
        setModal(!modal);
    };

    const handleHide = () => {
        setModal(false);
    };

    return (
        <>
            <MediaQuery minWidth={640}>
                <div style={{ backgroundColor: "rgb(0, 0, 0)", padding: "30px 0px 30px 0px" }}>
                    <Container style={{ maxWidth: "100%" }}>
                        <Row>
                            <Col md={4} xs={12} className="d-flex">
                                <div>
                                    <div className="text-center">
                                        <FaFacebook color="rgb(255, 193, 0)" size={30} className='mr-3' />
                                        <FaWhatsapp color="rgb(255, 193, 0)" size={30} className='mr-3' />
                                        <FaInstagram color="rgb(255, 193, 0)" size={30} className='mr-3' />
                                        <SiGmail color="rgb(255, 193, 0)" size={30} className='mr-3' />
                                    </div>
                                </div>
                            </Col>
                            <Col md={4}></Col>
                            <Col md={4} className="d-flex justify-content-end">
                                <Link to="/aboutus">
                                    <div style={{ fontWeight: "300", fontSize: "20px", color: "rgb(255, 193, 0)" }} className="pt-1 pr-3">About</div>
                                </Link>
                                <Link to="/gallery">
                                    <div style={{ fontWeight: "300", fontSize: "20px", color: "rgb(255, 193, 0)" }} className="pt-1 pr-3">Gallery</div>
                                </Link>
                                <div style={{ fontWeight: "300", fontSize: "20px", color: "rgb(255, 193, 0)" }} className="pt-1 pr-3">Contact Us</div>
                                <div onClick={handleShow} className="butt">Email-Signup</div>
                            </Col>
                        </Row>
                    </Container>
                    <AnimatePresence>
                        {modal && (
                            <motion.div
                                className='modal-back'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <motion.div
                                    className='d-flex justify-content-center m-5'
                                    initial={{ opacity: 0, y: 500 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 500 }}
                                    transition={{ duration: .25, delay: .25 }}
                                >
                                    <Container style={{ position: "relative" }}>
                                        <Row className="ml-1 mr-1 d-flex justify-content-center w-100">
                                            <Col md={6} className="p-4 d-flex flex-column align-items-center modal-content">
                                                <FaTimes onClick={handleShow} style={{ position: "absolute", top: "10px", right: "10px" }} />
                                                <h2 className="text-center mb-4">Newsletter</h2>
                                                <p className='text-center mb-4'>You will get regular updates on our invents</p>
                                                <Form ref={formRef} onSubmit={handleSubmit} className="w-100" style={{overflowY: "auto", overflowX: "hidden"}}>
                                                    <FormGroup>
                                                        <Label>First Name</Label>
                                                        <Input
                                                            style={{
                                                                border: "2px solid black",
                                                                backgroundColor: "transparent"
                                                            }}
                                                            className="rounded-0"
                                                            type="text"
                                                            placeholder="First Name"
                                                            value={fname}
                                                            onChange={(e) => setFname(e.target.value)}
                                                        />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label>Last Name</Label>
                                                        <Input
                                                            style={{
                                                                border: "2px solid black",
                                                                backgroundColor: "transparent"
                                                            }}
                                                            className="rounded-0"
                                                            type="text"
                                                            placeholder="Last Name"
                                                            value={lname}
                                                            onChange={(e) => setLname(e.target.value)}
                                                        />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label>Email</Label>
                                                        <Input
                                                            style={{
                                                                border: "2px solid black",
                                                                backgroundColor: "transparent"
                                                            }}
                                                            className="rounded-0"
                                                            type="text"
                                                            placeholder="Email"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                        />
                                                    </FormGroup>
                                                    <div className='d-flex justify-content-center pb-2 pt-2 home-butt'>
                                                        <button
                                                            className='butt'
                                                            type="submit"
                                                        >
                                                            Send
                                                        </button>
                                                    </div>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Container>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </MediaQuery>
            {location.pathname !== '/order' && (
                <MediaQuery maxWidth={639}>
                    <div className="text-center" style={{ position: "sticky", bottom: 0, width: "100%", backgroundColor: "rgb(0, 0, 0)", color: "rgb(255, 193, 0)", overflow: "hidden", padding: "10px 0px 0px 0px", textDecoration: "none" }}>
                        <h2 onClick={handleOrdPage}>Order Now</h2>
                        <p onClick={dialPhoneNumber} className='text-center'>01762277102</p>
                    </div>
                    <div className='d-flex justify-content-center' style={{backgroundColor: "rgb(0, 0, 0)", zIndex: "1000"}}>
                        <div onClick={handleShow} className="butt mb-3">Email-Signup</div>
                    </div>
                    <AnimatePresence>
                        {modal && (
                            <motion.div
                                className='modal-back'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <motion.div
                                    className='d-flex justify-content-center m-5'
                                    initial={{ opacity: 0, y: 500 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 500 }}
                                    transition={{ duration: .25, delay: .25 }}
                                >
                                    <Container style={{ position: "relative" }}>
                                        <Row className="ml-1 mr-1 d-flex justify-content-center w-100">
                                            <Col md={6} className="p-4 d-flex flex-column align-items-center modal-content">
                                                <FaTimes onClick={handleShow} style={{ position: "absolute", top: "10px", right: "10px" }} />
                                                <h2 className="text-center mb-4">Newsletter</h2>
                                                <p className='text-center mb-4'>You will get regular updates on our invents</p>
                                                <Form ref={formRef} onSubmit={handleSubmit} className="w-100" style={{overflowY: "auto", overflowX: "hidden"}}>
                                                    <FormGroup>
                                                        <Label>First Name</Label>
                                                        <Input
                                                            style={{
                                                                border: "2px solid black",
                                                                backgroundColor: "transparent"
                                                            }}
                                                            className="rounded-0"
                                                            type="text"
                                                            placeholder="First Name"
                                                            value={fname}
                                                            onChange={(e) => setFname(e.target.value)}
                                                        />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label>Last Name</Label>
                                                        <Input
                                                            style={{
                                                                border: "2px solid black",
                                                                backgroundColor: "transparent"
                                                            }}
                                                            className="rounded-0"
                                                            type="text"
                                                            placeholder="Last Name"
                                                            value={lname}
                                                            onChange={(e) => setLname(e.target.value)}
                                                        />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label>Email</Label>
                                                        <Input
                                                            style={{
                                                                border: "2px solid black",
                                                                backgroundColor: "transparent"
                                                            }}
                                                            className="rounded-0"
                                                            type="text"
                                                            placeholder="Email"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                        />
                                                    </FormGroup>
                                                    <div className='d-flex justify-content-center pb-2 pt-2 home-butt'>
                                                        <button
                                                            className='butt'
                                                            type="submit"
                                                        >
                                                            Send
                                                        </button>
                                                    </div>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Container>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {ordPage && (
                    <AnimatePresence mode='wait'>
                        <OrderBar orders={orders} dishes={dishes} total={total} handleOrdPage={handleOrdPage} removeOrder={removeOrder}/>
                    </AnimatePresence>
                    )}
                </MediaQuery>
            )}
        </>
    )
}

export default Footer;
