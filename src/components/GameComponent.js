import React from "react";
import { Card, CardImg, CardBody, CardText, CardSubtitle, CardTitle, Breadcrumb, BreadcrumbItem  } from "reactstrap";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseurl";
import "../card.css"

function RenderMenuItem({ dish }) {
    return(
        <div className="carousel">
        <Card body inverse style={{ backgroundColor: '#353935', borderColor: '#333' }}>
          <CardImg top width="100%" src={baseUrl + dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardSubtitle>{dish.label}</CardSubtitle>
            <CardText>{dish.shortdis}</CardText>
            <Link to={`/content/game/${dish.id}`}>
            <div className="curd-button" >See More</div>
            </Link>
          </CardBody>
        </Card>
      </div>
    ); //whats the arrow?
}

function Game(props) {
    const menu = props.dishes.dishes.map((dish) => {
        
        return (
            <div key={ dish.id } className="col-12 col-md-4">    
                <RenderMenuItem dish={dish}/>
            </div>
        );
    });

    if (props.dishes.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    }

    else if (props.dishes.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.dishes.errMess}</h4>
                </div>
            </div>
        )
    }

    else
    return(
        <>
            <div className="page-header">
                <div className="container">
                    <div className="row row-header">
                    <div className="col-12">
                        <h1>Games</h1>
                        <p className="typewriter">In Games You Can Die ♾ Times</p>
                    </div>
                    </div>
                </div>
            </div>
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/content'>Content</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Games</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Games</h3>
                    <hr/>
                </div>
            </div>
            <div className="row">
                { menu }
            </div>
        </div>
        </>
    );
}

export default Game;