import React, { useState, useEffect } from "react";
import { CardImg, Container, Row, Button, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";
import { motion, AnimatePresence } from "framer-motion";
import MediaQuery from "react-responsive";
import { baseUrl } from "../shared/baseurl";

const activeButtonStyles = {
  backgroundColor: 'black',
  border: "2px solid black",
  color: 'rgb(255, 193, 0)',
};

const inactiveButtonStyles = {
  backgroundColor: 'transparent',
  border: "2px solid black",
  color: 'black',
  '&:hover': {
    backgroundColor: 'darkgray',
    cursor: 'pointer',
  },
};

function RenderButtons({ category, changer, activeCategory, setActiveCategory }) {
    const isActive = activeCategory === category.name;
  
    const handleClick = () => {
      changer(category.items);
      setActiveCategory(category.name);
      localStorage.setItem('activeCategory', category.name);
    };
  
    return (
      <motion.div whileHover={{ scale: 1.1 }}>
        <Button
          style={{ ...(isActive ? activeButtonStyles : inactiveButtonStyles) }}
          className="m-2 rounded-0"
          onClick={handleClick}
        >
          <div>{category.name}</div>
        </Button>
      </motion.div>
    );
}

function RenderMenu({ items, rats }) {
    const filteredRats = rats.filter(rat => rat.dish === items._id);
    const sum = filteredRats.reduce((acc, rat) => acc + rat.rating, 0);
    const count = filteredRats.length;
    const avg = count ? (sum / count).toFixed(1) : 0;

    return (
        <Col md={4} className="px-0">
            <AnimatePresence mode="wait">
                {items && (
                    <motion.div
                        key={items._id}
                        style={{ scale: "0.9" }}
                        initial={{ opacity: 0, y: -500 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        {items.availability ? (
                            <>
                                <h3>
                                    {items.name}
                                    <span className="ml-3" style={{ fontSize: "18px" }}>
                                        {avg}/5⭐
                                    </span>
                                </h3>
                                <Link to={`/menu/${items._id}`}>
                                    <div className="menu-image-container">
                                        <CardImg src={baseUrl + items.image} alt={items.name} />
                                    </div>
                                </Link>
                                <h4 className="mt-3">{items.ingreds}</h4>
                                <h5 className="text-muted">{items.price} TK</h5>
                            </>
                        ) : (
                            <>
                                <h3>
                                    {items.name}
                                    <span className="ml-3" style={{ fontSize: "18px" }}>
                                        {avg}/5⭐
                                    </span>
                                </h3>
                                <div style={{opacity: "0.6"}}>
                                    <CardImg src={baseUrl + items.image} alt={items.name} />
                                    <h4 className="mt-3">{items.ingreds}</h4>
                                </div>
                                <h5 className="text-danger">Currently Unavailable</h5>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </Col>
    );
}

function Menu(props) {
    const [items, setItems] = useState(null);
    const [activeCategory, setActiveCategory] = useState(null);

    const handleChange = (change) => {
        setItems(change);
        localStorage.setItem('activeCategory', change[0].category);
    };

    useEffect(() => {
        if (props.dishes && props.dishes.dishes.length > 0) {
            console.log(props.dishes.dishes[0])
            const savedCategory = localStorage.getItem('activeCategory');
            const initialCategory = savedCategory ? props.dishes.dishes.find(dish => dish.name === savedCategory) : "Burgers";
            if (initialCategory) {
                setItems(initialCategory.items);
                setActiveCategory(initialCategory.name);
            }
        }
    }, [props.dishes]);

    const category = props.dishes.dishes.map((dish) => {
        return (
          <div key={dish._id}>
            <RenderButtons
              category={dish}
              changer={handleChange}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          </div>
        );
    });

    const menu = items
        ? items.map((item) => {
            let rats = props.comments.comments;
            return <RenderMenu key={item._id} items={item} rats={rats} />;
        })
        : null;

    if (props.dishes.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    } else if (props.dishes.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.dishes.errMess}</h4>
                </div>
            </div>
        );
    } else {
        return (
            <motion.div
                transition={{ duration: 0.5, type: "tween", ease: "easeIn" }}
                initial={{ x: 1000, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -1000, opacity: 0 }}
            >
                <div style={{ backgroundColor: "rgb(255, 193, 0)" }}>
                    <h1 className="text-center pt-4 row-header" style={{ fontSize: "clamp(54px, 4vw, 100px)" }}>Menu</h1>
                    <Container style={{ maxWidth: "85%" }}>
                        <Row className="d-flex justify-content-center pt-2 pb-2">
                            {category}
                        </Row>
                        <Row md={8} className="d-flex justify-content-center">
                            <MediaQuery minWidth={640}>
                                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                    {menu}
                                </div>
                            </MediaQuery>
                            <MediaQuery maxWidth={639}>
                                <div style={{ width: "100%" }}>
                                    {menu}
                                </div>
                            </MediaQuery>
                        </Row>
                    </Container>
                </div>
            </motion.div>
        );
    }
}

export default Menu;
