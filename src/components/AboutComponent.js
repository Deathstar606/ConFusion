import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseurl';

function RenderLeader({leader}) {
  return(
      <div className="col-12 mt-5">
          <Media tag="li">
              <Media left middle>
                  <Media object className='carousel aboutimg' src={baseUrl + leader.image} alt={leader.name} />
              </Media>
              <Media body className="col-12">
                  <Media heading>{leader.name}</Media>
                  <p>{leader.designation}</p>
                  <p>{leader.description}</p>
              </Media>    
          </Media>
      </div>
  );
}

function About(props) {

  const leaders = props.leaders.leaders.map((leader) => {
      return (
          <div key={ leader.id }>
              <RenderLeader leader={leader}/>
          </div>
      );
  });

  if (props.leaders.isLoading) {
    return(
        <div className="container">
            <div className="row">
                <Loading />
            </div>
        </div>
    )
}

else if (props.leaders.errMess) {
    return(
        <div className="container">
            <div className="row">
                <h4>{props.leaders.errMess}</h4>
            </div>
        </div>
    )
}

  else  
  return(
      <div className="container">
          <div className="row">
              <Breadcrumb>
                  <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                  <BreadcrumbItem active>About Us</BreadcrumbItem>
              </Breadcrumb>
              <div className="col-12">
                  <h3>About Us</h3>
                  <hr />
              </div>                
          </div>
          <div className="row row-content">
              <div className="col-12 col-md-6">
                  <h2>Our Application</h2>
                  <p>"Codex" is an innovative web application built on the React framework that aims to revolutionize the way users consume content online. The project's primary goal is to provide a seamless, intuitive, and interactive news browsing experience, keeping users engaged and able leave their on reviews/comments on products/contents.</p>
                  <p>This project was our first react application used for our software development course.It is a work in progress so some 🐞s are yet to squished.</p>
              </div>
              <div className="col-12 col-md-5">
                  <Card>
                      <CardHeader className="bg-dark text-white">Facts At a Glance</CardHeader>
                      <CardBody>
                          <dl className="row p-1">
                              <dt className="col-6">App Based On</dt>
                              <dd className="col-6">React</dd>
                              <dt className="col-6">Hosted By</dt>
                              <dd className="col-6">Json Server</dd>
                              <dt className="col-6">Contributors</dt>
                              <dd className="col-6">4</dd>
                          </dl>
                      </CardBody>
                  </Card>
              </div>
          </div>
          <div className="row row-content">
              <div className="col-12">
                  <h2>People Who Contributed</h2>
              </div>
              <div className="col-12">
                  <Media list>
                      {leaders}
                  </Media>
              </div>
          </div>
      </div>
  );
}

export default About;    