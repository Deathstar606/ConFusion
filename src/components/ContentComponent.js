import React from "react";
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem  } from "reactstrap";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseurl";
import "../card.css"

function RenderMenuItem({ content }) {
    return(
        <div className="curd">
            <CardImg src={baseUrl + content.image}/>
            <div className="curd-body">
                <h1 className="curd-title">{content.name}</h1>
                <p className="curd-sub-title">{content.label}</p>
                <p className="curd-info">{content.description}</p>
                <Link to= {`/content/${content.category}`}>
                <div className="curd-button" >Explore</div>
                </Link>
            </div>
        </div>
    ); //whats the arrow?
}

function Content(props) {
    const menu = props.contents.contents.map((content) => {
        
        return (
            <div key={ content.id } className="col-12 col-md-6 mb-4">    
                <RenderMenuItem content={content}/>
            </div>
        );
    });

    if (props.contents.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    }

    else if (props.contents.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.contents.errMess}</h4>
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
                        <h1>Content</h1>
                        <p className="typewriter">Only Games & Movies for Now *_*</p>
                    </div>
                    </div>
                </div>
            </div>
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Content</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Select Catagory</h3>
                    <hr/>
                </div>
            </div>
            <div className="row">
                { menu }
            </div>
        </div></>
    );
}

export default Content;