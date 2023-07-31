import React from "react";
import { CardImg, CardTitle } from 'reactstrap'
import Caro from "./Carousel"
import { Loading } from "./LoadingComponent";
import { baseUrl } from '../shared/baseurl'; 

function RenderCard({item}) {
        return(
            <div className="container">
                <div className="row">
                <div className="col-12 col-md-8 writing">
                    <CardTitle className="font-weight-bold">{item.name}</CardTitle>
                        {item.description2}
                </div>
                    <div className="col-12 col-md-4 edge mb-5">
                        <CardImg className="carousel" src={baseUrl + item.image2}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-4 mb-3 edge">
                        <CardImg className="carousel" src={baseUrl + item.image}/>
                    </div>
                    <div className="col-12 col-md-8 writing">
                        {item.description}

                    <div className="curd-button mt-2 mb-3">
                    <a href="https://github.com/Deathstar606/coursera_ass/tree/gh-pages/React_Node_Express/React_JS/React/confusion" >Explore</a>
                    </div>

                    </div>
                </div>
            </div>
            )
}

function Home(props) {

    const homer = props.promotions.promotions.map((promo) => {
        
        return (
            <div key={ promo.id }>    
                <RenderCard item={promo}/>
            </div>
        );
    });

    if (props.promotions.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    }

    else if (props.promotions.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.promotions.errMess}</h4>
                </div>
            </div>
        )
    }

    else
    return(
        <>
            <div className="jumbotron">
                <div className="container">
                    <div className="row row-header">
                    <div className="col-12 col-md-3">
                        <h1>React APP</h1>
                        <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                    </div>
                    <div className="col-12 col-md-9">
                        <Caro/>
                    </div>
                    </div>
                </div>
            </div>
        <div className="container">
            <div className="row">
                { homer }
            </div>
        </div>
        </>
    );
}

export default Home;