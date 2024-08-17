import { AnimatePresence, motion } from 'framer-motion';
import {useState} from 'react';
import { Container, Row, Col, Button } from 'reactstrap';

const locations = [
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3677.4169300778453!2d89.54844477504687!3d22.824059323707594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ff91b5e39f0c17%3A0x2d130df9a8c47066!2s4Cheez!5e0!3m2!1sen!2sbd!4v1715541437038!5m2!1sen!2sbd",
    "https://another-location-url.com",
    "https://yet-another-location-url.com",
  ];

function Location () {

    const [selectedLocation, setSelectedLocation] = useState(locations[0]);

    const handleLocationChange = (index) => {
      setSelectedLocation(locations[index]);
    };

    return(
        <motion.div
        transition={{duration: 0.5, type: "tween", ease: "easeIn"}}
        initial = {{x: 1000, opacity: 0}}
        animate= {{x: 0, opacity: 1}}
        exit= {{x: -1000, opacity: 0}}>
            <Container style={{maxWidth: "100%", backgroundColor: "rgb(255, 193, 0)"}}>
                <Row className="pb-5 pt-5">
                    <Col md={4} className="d-flex align-items-center justify-content-center">
                        <div>
                            <h1 className='text-center pt-3 row-header' style={{fontSize: "clamp(54px, 4vw, 100px)"}}>Hours & Location</h1>
                            <h4 className='text-center'>Open 7 days a week</h4>
                            <p className='text-center'>10.00 Pm - 12.00 Am</p>
                            <div className='d-flex justify-content-center home-butt mt-5 mb-5'>
                                <h6 className='mt-2 mr-2'>CheckOut</h6>
                                    {locations.map((location, index) => (
                                        <Button
                                            key={index}
                                            className="butt"
                                            onClick={() => handleLocationChange(index)}
                                        >
                                            Local {index + 1}
                                        </Button>
                                        ))}
                            </div>
                        </div>
                    </Col>
                    <Col md={8}>
                        <AnimatePresence>
                            <div className='d-flex justify-content-center'
                            style={{overflow: "hidden"}}>
                                <motion.iframe
                                key={selectedLocation}
                                src={selectedLocation}
                                width="600"
                                height="450"
                                allowfullscreen=""
                                loading="lazy"
                                referrerpolicy="no-referrer-when-downgrade"
                                initial={{ opacity: 0, x: 500 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 500 }}
                                transition={{ duration: 0.25, delay: 0.25 }}
                                />
                            </div>
                        </AnimatePresence>
                    </Col>
                </Row>
            </Container>
        </motion.div>
    )
}

export default Location