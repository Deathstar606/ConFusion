import React, {useState} from 'react';
import { CardImg, Row, Col, Container } from 'reactstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { baseUrl } from '../shared/baseurl';

function RenderLeader({ leader }) {
  const [modal, setModal] = useState(false);

  const handleShow = () => setModal(true);
  const handleHide = () => setModal(false);

  return (
    <>
      <Col md={4}>
        <motion.div onClick={handleShow} initial={{ scale: 1 }} whileHover={{ scale: 1.05 }}>
          <CardImg src={baseUrl + leader.image} />
        </motion.div>
        <h2 className='text-center pt-3'>{leader.name}</h2>
        <p className='text-center pb-4'>{leader.designation}</p>
      </Col>
      <AnimatePresence>
        {modal && (
          <motion.div
            className='modal-back'
            onClick={handleHide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className='d-flex justify-content-center'
              style={{ marginTop: "10vh" }}
              initial={{ opacity: 0, scale: 0.2 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.2 }}
            >
              <Container style={{ position: "absolute" }}>
                <Row className="justify-content-center ml-1 mr-1">
                  <Col md={5} className="p-4">
                    <h2 className="text-center mb-4 text-white">{leader.name}</h2>
                    <p className="text-center mb-4 text-white">{leader.designation}</p>
                    <h5 className="text-center mb-4 text-white">{leader.description}</h5>
                  </Col>
                </Row>
              </Container>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function About(props) {

  const leaders = props.leaders.leaders.map((leader) => {
      return (
        <RenderLeader leader={leader}/>
      );
  });

  return(
    <motion.div
    transition={{duration: 0.5, type: "tween", ease: "easeIn"}}
    initial = {{x: 1000, opacity: 0}}
    animate= {{x: 0, opacity: 1}}
    exit= {{x: -1000, opacity: 0}}>
      <div className='pt-4 pb-4' style={{backgroundColor: "rgb(255, 193, 0)"}}>
        <div className='text-center'>
            <h1 className='pt-4 row-header' style={{fontSize: "clamp(54px, 4vw, 100px)"}}>Our Identity</h1>
            <p>Say somethings about the company</p>
            <h1 className='pt-4 pb-5 row-header' style={{fontSize: "clamp(54px, 4vw, 100px)"}}>Our Team</h1>
        </div>
        <Container className="pb-4" style={{maxWidth: "80%"}}>
          <motion.div
          initial = {{y: 50, opacity: 0}}
          transition={{duration: 1, type: "tween", ease: "easeIn"}}
          whileInView={{y: 0, opacity: 1}}
          viewport={{ once: true }}>
            <Row>
                {leaders}
            </Row>
          </motion.div>
        </Container>
      </div>
    </motion.div>
  );
}

export default About;    