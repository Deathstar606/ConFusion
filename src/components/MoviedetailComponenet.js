import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Row, Button,
Modal, ModalHeader, ModalBody, Label, Col } from "reactstrap";
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from "./LoadingComponent";
import { Link } from "react-router-dom";
import { baseUrl } from "../shared/baseurl";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class ReviewForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }
        
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen 
         });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postReviews(this.props.dishId, values.rating, values.author, values.comment)
    }

    render () {
        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-sign-i fa-lg">Submit Review</span>
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Review</ModalHeader>
                <ModalBody>
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                    <Row className="form-group">
                        <Label htmlFor="username" md={{size: 6, offset: 0.5}}>Rating</Label>
                        <Col md={12}>
                        <Control.select model=".rating" name="contactType"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                        </Control.select>
                        </Col>
                    </Row>
                    <Row className="form-group">
                                <Label htmlFor="firstname" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="firstname" name="firstname"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                                    }}   
                                        />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                    <Row className="form-group">
                                <Label htmlFor="message" md={12}>Review</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="message" name="message"
                                        rows="12"
                                        className="form-control" />
                                </Col>
                    </Row>
                    <Row className="form-group">
                                <Col md={{size:10}}>
                                    <Button type="submit" color="dark">
                                    Submit
                                    </Button>
                                </Col>
                    </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
            </div>
        )
    }

}

function RenderDish({dish}) {

        if (dish != null) {
            return (
                <div className='col-12 col-md-5 m-1'>
                    <Card>
                        <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle> {dish.name}</CardTitle>
                            <CardText> {dish.description} </CardText>
                        </CardBody>
                    </Card>
                </div>   
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }

function RenderReview({reviews, postReviews, dishId}){
        if (reviews == null) {
            return (<div></div>)
        }
        const cmnts = reviews.map(review => {
            return (
                <li key={review.id}>
                    <p>{review.comment}</p>
                    <p>-- {review.author},
                    &nbsp;
                    {new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit'
                    }).format(new Date(review.date))}
                    </p>
                </li>
            )
        })
        return (
            <div className='col-12 col-md-5 m-1'>
                <h4> Reviews </h4>
                <ul className='list-unstyled'>
                    {cmnts}
                    <ReviewForm dishId={dishId} postReviews={postReviews}/>
                </ul>

            </div>
        )
    }


 function ReviewDetail (props) {
        //const dish = props.dish
        
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            )
        }

        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            )
        }

        const dishItem = <RenderDish dish={props.dish}/>;
        const dishComment = <RenderReview reviews={props.reviews} postReviews={props.postReviews} dishId={props.dish.id}/>;

        return (
            <div className="container">
                <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/content/movie'>Movies</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr/>
                </div>
            </div>
            <div className='row'>
                {dishItem}
                {dishComment}
            </div>
            </div>
        )
    }

export default ReviewDetail;