import React from 'react';

function Footer(props) {
    return(
    <div className="footer">
        <div className="container">
            <div className="row justify-content-center">             
                <div className="col-4 offset-1 col-sm-2">
                    <h5>Links</h5>
                    <ul className="list-unstyled">
                        <li><a href="/home">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/content">Contents</a></li>
                        <li><a href="/contactus">Contact</a></li>
                    </ul>
                </div>
                <div className="col-7 col-sm-5">
                    <h5>Desclamier ⚠</h5>
                    <address>
		              This is just a Demo project<br />
		              Used to showcase our proficiency in-<br />
                      Webapp dev & React<br />
		              <i className="fa fa-phone fa-lg"></i>: 019543-79684<br />
		              <i className="fa fa-envelope fa-lg"></i>: <a href="dsfardin606@gmail.com">
                      dsfardin606@gmail.com</a>
                    </address>
                </div>
                <div className="col-12 col-sm-4 align-self-center">
                    <div className="text-center">
                        <a className="btn btn-social-icon btn-google" href="https://mail.google.com/mail/u/0/#inbox"><i className="fa fa-google-plus"></i></a>
                        <a className="btn btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook"></i></a>
                        <a className="btn btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/"><i className="fa fa-linkedin"></i></a>
                        <a className="btn btn-social-icon btn-twitter" href="http://twitter.com/"><i className="fa fa-twitter"></i></a>
                        <a className="btn btn-social-icon btn-google" href="http://youtube.com/"><i className="fa fa-youtube"></i></a>
                        <a className="btn btn-social-icon" href="mailto:"><i className="fa fa-envelope-o"></i></a>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">             
                <div className="col-auto">
                    <p>© Copyright 2023 Deathstar</p>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Footer;