import React from "react";
import { Card, CardImg, CardBody, CardText, CardSubtitle, CardTitle, Breadcrumb, BreadcrumbItem  } from "reactstrap";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseurl";

function RenderMenuItem({ movie }) {
    return(
        <div className="carousel">
        <Card body inverse style={{ backgroundColor: '#353935', borderColor: '#333' }}>
          <CardImg top width="100%" src={baseUrl + movie.image} alt={movie.name} />
          <CardBody>
            <CardTitle>{movie.name}</CardTitle>
            <CardSubtitle>{movie.label}</CardSubtitle>
            <CardText>{movie.shortdis}</CardText>
            <Link to={`/content/movie/${movie.id}`}>
            <div className="curd-button" >See More</div>
            </Link>
          </CardBody>
        </Card>
      </div>
    ); //whats the arrow?
}

function Movie(props) {
    const catalouge = props.movies.movies.map((movie) => {
        
        return (
            <div key={ movie.id } className="col-12 col-md-4">    
                <RenderMenuItem movie={movie}/>
            </div>
        );
    });

    if (props.movies.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    }

    else if (props.movies.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.movies.errMess}</h4>
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
                        <h1>Movies</h1>
                        <p className="typewriter">Maybe Your Life is A Movie Starring 🌟 You</p>
                    </div>
                    </div>
                </div>
            </div>
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/content'>Content</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Movies</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Movies</h3>
                    <hr/>
                </div>
            </div>
            <div className="row">
                { catalouge }
            </div>
        </div>
        </>
    );
}

export default Movie;