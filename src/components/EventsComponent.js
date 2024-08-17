import { useRef, useState } from "react";
import { Form, FormGroup, CardImg, Label, Container, Input, Row, Col } from 'reactstrap';
import axios from "axios";
import { FaTimes } from 'react-icons/fa';
import { baseUrl } from '../shared/baseurl';
import { AnimatePresence, motion, useInView as Fview } from "framer-motion";
import MediaQuery from "react-responsive";

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

function Event({ eve, index }) {
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState('');
  const formRef = useRef(null);

  const handleShow = () => {
    setModal(!modal);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {email: email}
    try {
      const pay = await axios.post('http://localhost:9000/events/ticket', data)
      window.open(pay.data.url);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  return (
    <>
      {index % 2 === 0 ? (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          transition={{ duration: 1, type: "tween", ease: "easeIn" }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          <Row>
            <Col md={8}>
              <CardImg src={baseUrl + eve.image} />
            </Col>
            <Col md={4} className="d-flex justify-content-center align-items-center">
              <div>
                <div className="text-center pt-4" style={{ fontSize: "24px" }}>
                  {eve.name || "Description Goes Here"}
                </div>
                <p className="text-cener">{eve.description}</p>
                  {eve.action && (
                    <div onClick={handleShow} className="d-flex justify-content-center pt-2 pb-4 home-butt">
                      <div className="rounded-0 butt">
                          Purchase Ticket
                      </div>
                    </div>
                  )}
              </div>
            </Col>
          </Row>
        </motion.div>
      ) : (
        <div>
          <MediaQuery minWidth={640}>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              transition={{ duration: 1, type: "tween", ease: "easeIn" }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <Row>
                <Col md={4} className="d-flex justify-content-center align-items-center">
                  <div>
                    <div className="text-center pt-4" style={{ fontSize: "24px" }}>
                      {eve.name || "Description Goes Here"}
                    </div>
                    <p className="text-center">{eve.description}</p>
                    {eve.action && (
                      <div onClick={handleShow} className="d-flex justify-content-center pt-2 pb-4 home-butt">
                        <div className="rounded-0 butt">
                          Purchase Ticket
                        </div>
                      </div>
                    )}
                  </div>
                </Col>
                <Col md={8}>
                  <CardImg src={baseUrl + eve.image} />
                </Col>
              </Row>
            </motion.div>
          </MediaQuery>
          <MediaQuery maxWidth={639}>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              transition={{ duration: 1, type: "tween", ease: "easeIn" }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <Row>
                <Col md={8}>
                  <CardImg src={baseUrl + eve.image} />
                </Col>
                <Col md={4} className="d-flex justify-content-center align-items-center">
                  <div>
                    <div className="text-center pt-4" style={{ fontSize: "24px" }}>
                      {eve.name || "Description Goes Here"}
                    </div>
                    <p className="text-center">{eve.description}</p>
                    {eve.action && (
                      <div onClick={handleShow} className="d-flex justify-content-center pt-2 pb-4 home-butt">
                        <div className="rounded-0 butt">
                          Purchase Ticket
                        </div>
                      </div>
                    )}
                  </div>
                </Col>
              </Row>
            </motion.div>
          </MediaQuery>
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
                          initial={{ opacity: 0, y: -500 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -500 }}
                          transition={{ duration: 0.25, delay: 0.25 }}
                      >
                          <Container style={{ position: "relative" }}>
                              <Row className="justify-content-center ml-1 mr-1">
                                  <Col md={5} className="p-4" style={{ backgroundColor: "rgb(255, 193, 0)", border: "black solid 2px" }}>
                                      <FaTimes onClick={handleShow} style={{ position: "absolute", top: "10px", right: "10px" }} />
                                      <h2 className="text-center mb-2">Ticket Purchase</h2>
                                      <p className='text-center mb-3'>Exclusive access to our events</p>
                                      <Form ref={formRef} onSubmit={handleSubmit}>
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
                                                  Purchase
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
      )}
    </>
  );
}

function Events({events}) {
  const ref2 = useRef(null)
  const isInview2 = Fview(ref2, { once: true })

  const even = events.events.map((eve, index) => {
    return (
      <Event key={index} eve={eve} index={index} />
    )
  })

  return (
    <>
      <motion.div
      transition={{duration: 0.5, type: "tween", ease: "easeIn"}}
      initial = {{x: 1000, opacity: 0}}
      animate= {{x: 0, opacity: 1}}
      exit= {{x: -1000, opacity: 0}}>
        <Container style={{ maxWidth: "100%", overflow: "hidden", backgroundColor: "rgb(255, 193, 0)" }} className="px-0">
          <div className="d-flex justify-content-center pt-5"> 
            <motion.svg width="204" height="204" viewBox="-100 0 854 674" fill="none" ref={ref2}>
                <motion.path d="M335.543 565.612C209.483 565.612 106.927 463.058 106.927 337.004C106.927 210.945 209.483 108.388 335.543 108.388C461.597 108.388 564.15 210.945 564.15 337.004C564.15 463.06 461.597 565.612 335.543 565.612ZM335.543 124.903C218.591 124.903 123.442 220.051 123.442 337.004C123.442 453.952 218.59 549.097 335.543 549.097C452.49 549.097 547.635 453.952 547.635 337.004C547.635 220.051 452.49 124.903 335.543 124.903ZM58.2601 556.149H34.8996C30.3381 556.149 26.6421 552.451 26.6421 547.891V290.93C10.9049 283.928 0 268.904 0 251.542V135.61C0 131.05 3.69606 127.352 8.25752 127.352C12.819 127.352 16.515 131.05 16.515 135.61V243.285H25.5455V135.61C25.5455 131.05 29.2415 127.352 33.803 127.352C38.3644 127.352 42.0605 131.05 42.0605 135.61V243.285H51.1008V135.61C51.1008 131.05 54.7969 127.352 59.3583 127.352C63.9198 127.352 67.6159 131.05 67.6159 135.61V243.285H76.6479V135.61C76.6479 131.05 80.344 127.352 84.9054 127.352C89.4669 127.352 93.163 131.05 93.163 135.61V251.542C93.163 268.904 82.2564 283.928 66.5193 290.932V547.891C66.5176 552.451 62.8215 556.149 58.2601 556.149ZM43.1571 539.634H50.0042V295.129H43.1571V539.634ZM17.9452 259.8C21.8312 270.703 33.1985 278.615 46.5807 278.615C59.9628 278.615 71.3301 270.703 75.2161 259.8H17.9452ZM635.319 554.02H611.207C606.645 554.02 602.949 550.322 602.949 545.762V130.868C602.949 127.461 605.043 124.401 608.219 123.169C611.403 121.935 615.003 122.783 617.304 125.3C619.157 127.329 662.77 175.781 670.552 244.457C678.125 311.236 670.898 421.412 670.586 426.07C670.296 430.407 666.694 433.777 662.347 433.777H643.574V545.762C643.576 550.322 639.88 554.02 635.319 554.02ZM619.466 537.505H627.063V433.777H619.466V537.505ZM619.466 417.262H654.577C656.089 390.701 660.421 301.652 654.146 246.318C649.731 207.378 632.298 174.879 619.466 155.56V417.262ZM335.543 493.905C249.022 493.905 178.633 423.52 178.633 337.004C178.633 250.484 249.022 180.095 335.543 180.095C422.058 180.095 492.444 250.485 492.444 337.004C492.444 423.52 422.058 493.905 335.543 493.905ZM335.543 196.61C258.128 196.61 195.148 259.59 195.148 337.004C195.148 414.413 258.128 477.39 335.543 477.39C412.952 477.39 475.929 414.413 475.929 337.004C475.929 259.59 412.952 196.61 335.543 196.61ZM173.086 232.826C171.609 232.826 170.115 232.431 168.767 231.6C164.881 229.21 163.672 224.124 166.062 220.24C193.379 175.849 243.841 152.244 245.975 151.261C250.119 149.352 255.024 151.164 256.931 155.307C258.837 159.448 257.028 164.349 252.89 166.258C252.412 166.48 204.775 188.843 180.126 228.895C178.566 231.43 175.857 232.826 173.086 232.826Z" 
                fill="none"
                stroke="black"
                strokeWidth="10"
                variants={variants}
                animate={isInview2 ? "animate" : "initial"}/>                                
            </motion.svg>
          </div>
          <h2 className="text-center row-header" style={{fontSize: "clamp(54px, 4vw, 100px)"}}>Heading Text</h2>
          <p className="text-center pb-5">Some Description Text</p>
          {even}
        </Container>
      </motion.div>
    </>
  );
}

export default Events;