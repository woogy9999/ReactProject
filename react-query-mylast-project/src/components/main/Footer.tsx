import {Fragment} from "react";

function Footer() {
    return (
        <Fragment>

            <footer>
                <div id="footer" className="fh5co-border-line">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 col-md-offset-2 text-center">
                                <p>Copyright 2025  <a href="#">Tanstack-Project</a><br/>
                                    Made <i className="icon-heart3 love"></i> by
                                    <a href="#" target="_blank"> Woogy9999</a> </p>
                                <p className="fh5co-social-icons">
                                    <a href="#"><i className="icon-twitter-with-circle"></i></a>
                                    <a href="#"><i className="icon-facebook-with-circle"></i></a>
                                    <a href="#"><i className="icon-instagram-with-circle"></i></a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

        </Fragment>

    )
}

export default Footer;