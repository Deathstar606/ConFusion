import React, { useState } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Button, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FaAngleLeft } from "react-icons/fa6";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { FaTimes } from 'react-icons/fa';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseurl';
import './DishBreadcrumb.css'; // Import your custom CSS
import "./reserveForm.css"

export const Breadcrumbs = ({ items }) => {
    return (
        <div className="custom-breadcrumb mt-3">
            {items.map((item, index) => (
                <div key={index} className="custom-breadcrumb-item">
                    {index === 0 ? (
                        <Link to={item.link}>
                            <span><FaAngleLeft color='rgb(255, 193, 0)'/></span>
                        </Link>
                    ) : item.active ? (
                        item.name
                    ) : (
                        <Link to={item.link}>{item.name}</Link>
                    )}
                </div>
            ))}
        </div>
    );
};

function RenderDish({ dish, addDish }) {
    const [quant, setQuant] = useState(false);
    const handleOrd = () => {
        setQuant(!quant);
    };

    const [quantity, setQuantity] = useState(1);
/*     const [orders, setOrders] = useState([]);

    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];

    useEffect(() => {
        setOrders(storedOrders);
    }, []); */

    const HandleAdd = () => {
        /* event.preventDefault(); */
        addDish({_id: dish._id, quantity: quantity})
/*         const updatedOrders = [...orders, { _id: dish._id, quantity: quantity }];
        console.log(updatedOrders)
        setOrders(updatedOrders);
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
        console.log(orders); */
        handleOrd();
    };

    return (
        <div className="col-12 col-md-5 mb-3">
            <Card>
                <div className="menu-image-container">
                    <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                </div>
                <CardImgOverlay>
                    <Button outline color="light" onClick={handleOrd}>
                        <MdOutlineDeliveryDining/>
                    </Button>
                </CardImgOverlay>
                <CardBody style={{backgroundColor: "rgb(0, 0, 0)", color: "rgb(255, 193, 0)"}}>
                    <CardTitle>{dish.name} <span className='text-muted ml-2'>{dish.price} Tk</span></CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
            {quant && (
                <AnimatePresence mode='wait'>
                    <motion.div 
                    className='modal-back'
                    initial={{ opacity: 0}}
                    animate={{ opacity: 1}}
                    exit={{ opacity: 0}}>
                        <motion.div 
                        className='d-flex justify-content-center m-5'
                        initial={{ opacity: 0, y: -70}}
                        animate={{ opacity: 1, y: 0}}
                        exit={{ opacity: 0, y: -70}}
                        transition={{duration: .25, delay: .25}}>
                        <form className="reservation-form" onSubmit={(e) => { e.preventDefault(); HandleAdd(); }}>
                            <FaTimes onClick={handleOrd} style={{ position: "absolute", top: "10px", right: "10px" }} />
                            <h1>Select Quantity</h1>
                            <div className="form-group">
                                <select value={quantity} onChange={(e) => setQuantity(e.target.value)} required>
                                    <option value="" disabled>Select Quantity</option>
                                    <option value="1">1 </option>
                                    <option value="2">2 </option>
                                    <option value="3">3 </option>
                                    <option value="4">4 </option>
                                    <option value="5">5 </option>
                                    <option value="6">6 </option>
                                </select>
                            </div>
                            <div className='home-butt'>
                                <button type="submit" className='butt'>Add To Basket</button>
                            </div>
                        </form>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            )}
        </div>
    );
}

function RenderComments({ comments, postComment, dishId }) {
    if (comments != null) {
        const total = comments.length;

        return (
            <div className="col-12 col-md-5 m-1">
                {total === 1 ? (
                    <h4>{total} Comment</h4>
                ) : (
                    <h4>{total} Comments</h4>
                )}
                <ul className="list-unstyled">
                    {comments.map((comment) => (
                        <li key={comment._id}>
                            <p>{comment.comment}</p>
                            <p>{comment.rating} ⭐</p>
                            <p>
                                -- {comment.author},{' '}
                                {new Intl.DateTimeFormat('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: '2-digit'
                                }).format(new Date(Date.parse(comment.updatedAt)))}
                            </p>
                        </li>
                    ))}
                </ul>
                <CommentForm dishId={dishId} postComment={postComment} />
            </div>
        );
    } else {
        return <div></div>;
    }
}


const CommentForm = (props) => {
    const [modal, setModal] = useState(false);
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
    const [author, setAuthor] = useState('');

    const handleMod = () => {
        setModal(!modal);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleMod();
        props.postComment(props.dishId, rating, comment, author);
    }

    return (
        <div>
            <div onClick={handleMod} className='pb-3 pt-3 home-butt'>
                <button
                className='butt'
                type="submit"
                >
                    Submit Comment
                </button>
            </div>
            <AnimatePresence mode='wait'>
                {modal && (
                    <motion.div
                        /* onClick={handleMod} */ 
                        className='modal-back'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            /* onClick={(e) => e.stopPropagation()} */ 
                            className='d-flex justify-content-center m-5'
                            initial={{ opacity: 0, y: -70 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -70 }}
                            transition={{ duration: 0.25, delay: 0.25 }}
                        >
                            <form style={{position: "relative"}} className="reservation-form" onSubmit={handleSubmit}>
                                <FaTimes onClick={handleMod} style={{ position: "absolute", top: "10px", right: "10px" }} />
                                <h1>Leave a Comment</h1>
                                <div className="form-group">
                                    <select value={rating} onChange={(e) => setRating(e.target.value)} required>
                                        <option value="" disabled>Rating</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <input 
                                        placeholder='Author'
                                        value={author} 
                                        onChange={(e) => setAuthor(e.target.value)} 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <textarea
                                        placeholder='Comment'
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className='home-butt'>
                                    <button type="submit" className='butt'>Submit</button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

const DishDetail = (props) => {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null)
        return (
            <div style={{ backgroundColor: "rgb(255, 193, 0)" }} className='pb-5'>
                <Container>
                    <div className="row">
                        <Breadcrumbs items={[
                            { link: '/menu', active: false },
                            { name: props.dish.name, link: '', active: true }
                        ]} />
                        <div className="col-12 mt-3">
                            <h3 className='row-header' style={{fontSize: "clamp(44px, 3vw, 100px)"}}>{props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row" style={{overflow: "hidden"}}>
                        <RenderDish dish={props.dish} addDish={props.addDish} />
                        <RenderComments comments={props.comments}
                            postComment={props.postComment}
                            dishId={props.dish._id} />
                    </div>
                </Container>
            </div>
        );
    else
        return (
            <div></div>
        );
}

export default DishDetail;
