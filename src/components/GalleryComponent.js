import {useState} from 'react';
import { Container, Card, Row, Col, CardImg } from 'reactstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import MediaQuery from 'react-responsive';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import "../components/Gallery.css";
import gal1 from "../image/Gallary/pexels-fotios-photos-776538.jpg"
import gal2 from "../image/Gallary/pexels-pixabay-260922.jpg"
import gal3 from "../image/Gallary/pexels-pixabay-262047.jpg"
import gal4 from "../image/Gallary/pexels-reneasmussen-1581384.jpg"
import { Pagination, Navigation, EffectCoverflow } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';

function TestiPhn() {

  const [fullscreenImage, setFullscreenImage] = useState("");

  const handleClick = (imageUrl) => {
    setFullscreenImage(imageUrl);
  };
  
  const handleCloseFullscreen = () => {
    setFullscreenImage(null);
  };

  return (
    <>
      <Container style={{maxWidth: "100%"}}>
          <Row>
            <Col md={3}></Col>
            <Col md={6}>
              <Swiper
                effect={'coverflow'}
                slidesPerView={'1'}
                spaceBetween={15}
                centeredSlides={true}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 50,
                  modifier: 1,
                  slideShadows: true,
                }}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[ Pagination, Navigation, EffectCoverflow]}
                className="mySwiper"
              >
                <SwiperSlide>
                  <CardImg onClick={() => handleClick(gal1)} className="acrd" style={{position: "relative", height: "50vh"}} src={gal1}/>
                </SwiperSlide>
                <SwiperSlide>
                  <CardImg onClick={() => handleClick(gal2)} className="acrd" style={{position: "relative", height: "50vh"}} src={gal2}/>
                </SwiperSlide>
                <SwiperSlide>
                  <CardImg onClick={() => handleClick(gal3)} className="acrd" style={{position: "relative", height: "50vh"}} src={gal3}/>
                </SwiperSlide>
                <SwiperSlide>
                  <CardImg onClick={() => handleClick(gal4)} className="acrd" style={{position: "relative", height: "50vh"}} src={gal4}/>
                </SwiperSlide>
              </Swiper>
            </Col>
          </Row>
      </Container>
      <AnimatePresence mode='wait'>
      {fullscreenImage && (
          <motion.div
            className="fullscreen-preview"
            onClick={handleCloseFullscreen}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{duration: 0.25}}
            layoutId="fullscreen-preview"
          >
            <img src={fullscreenImage} alt="Full Screen Preview" />
          </motion.div>
      )}
      </AnimatePresence>
    </>
  );
}

function TestiMonial1() {

  const [fullscreenImage, setFullscreenImage] = useState("");

  const handleClick = (imageUrl) => {
    setFullscreenImage(imageUrl);
};
  
  const handleCloseFullscreen = () => {
    setFullscreenImage(null);
};

  return (
    <>
    <div className='d-flex logos'>
        <div className="d-flex logos-slide" style={{position: "relative"}}>
            <CardImg onClick={() => handleClick(gal1)} className="acrd" style={{position: "relative", width: "1000px"}} src={gal1}/>
            <CardImg onClick={() => handleClick(gal2)} className="acrd" style={{position: "relative", width: "1000px"}} src={gal2}/>
            <CardImg onClick={() => handleClick(gal3)} className="acrd" style={{position: "relative", width: "1000px"}} src={gal3}/>
            <CardImg onClick={() => handleClick(gal4)} className="acrd" style={{position: "relative", width: "1000px"}} src={gal4}/>
        </div>
        <div className="d-flex logos-slide" style={{position: "relative"}}>
            <CardImg onClick={() => handleClick(gal1)} className="acrd" style={{position: "relative", width: "1000px"}} src={gal1}/>
            <CardImg onClick={() => handleClick(gal2)} className="acrd" style={{position: "relative", width: "1000px"}} src={gal2}/>
            <CardImg onClick={() => handleClick(gal3)} className="acrd" style={{position: "relative", width: "1000px"}} src={gal3}/>
            <CardImg onClick={() => handleClick(gal4)} className="acrd" style={{position: "relative", width: "1000px"}} src={gal4}/>
        </div>
    </div>
    <AnimatePresence mode='wait'>
      {fullscreenImage && (
          <motion.div
            className="fullscreen-preview"
            onClick={handleCloseFullscreen}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{duration: 0.25}}
            layoutId="fullscreen-preview"
          >
            <img src={fullscreenImage} alt="Full Screen Preview" />
          </motion.div>
      )}
    </AnimatePresence>
    </>
  )
}

function TestiSlide () {

  return (
    <motion.div
    transition={{duration: 0.5, type: "tween", ease: "easeIn"}}
    initial = {{x: 1000, opacity: 0}}
    animate= {{x: 0, opacity: 1}}
    exit= {{x: -1000, opacity: 0}}>
      <div>
        <div className='pb-2 pt-1' style={{overflow: "hidden", backgroundColor: "rgb(255, 193, 0)"}}>
          <MediaQuery minWidth={640}>
            <TestiMonial1/>
          </MediaQuery>
          <MediaQuery maxWidth={639}>
            <TestiPhn/>
          </MediaQuery> 
        </div>
      </div>
    </motion.div>
  )
}

export default TestiSlide;