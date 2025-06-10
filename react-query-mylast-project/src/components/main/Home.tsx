import { useEffect, Fragment } from "react";

function Home() {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "/js/main.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);
    return (
        <Fragment>
            <div className="owl-carousel owl-carousel1 owl-carousel-fullwidth fh5co-light-arrow animate-box"
                 data-animate-effect="fadeIn">
                <div className="item"><a href="images/featured-1.jpg" className="image-popup">
                    <img src="images/featured-1.jpg" alt="image" /></a></div>
                <div className="item"><a href="images/featured-2.jpg" className="image-popup">
                    <img src="images/featured-2.jpg" alt="image"/></a></div>
            </div>

            <div id="fh5co-intro-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h2>We Create Cool Things For The Better Web.</h2>
                            <p>Made with love by the fine folks at <a href="http://freehtml5.co">FreeHTML5.co</a></p>
                        </div>
                    </div>
                </div>
            </div>
            <div id="fh5co-common-section">
                <div className="container">
                    <div className="heading-section text-center">
                        <h2>Who we are</h2>
                    </div>
                    <div className="row">
                        <div className="col-md-10 col-md-offset-1">
                            <div className="col-md-6 col-sm-6 services-num services-num-text-right">
                                <span className="number-holder">01</span>
                                <div className="desc">
                                    <h3>Countries Vokalia and Consonantia</h3>
                                    <p>Far far away, behind the word mountains, far from the countries Vokalia and
                                        Consonantia, there live the blind texts.</p>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6 services-num">
                                <span className="number-holder">02</span>
                                <div className="desc">
                                    <h3>Countries Vokalia and Consonantia</h3>
                                    <p>Far far away, behind the word mountains, far from the countries Vokalia and
                                        Consonantia, there live the blind texts.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fh5co-parallax"
                 style={{ backgroundImage: 'url(images/hero-1.jpg)' }}
                 data-stellar-background-ratio="0.5">
                <div className="overlay"></div>
                <div className="container">
                    <div className="row">
                        <div
                            className="col-md-8 col-md-offset-2 col-sm-12 col-sm-offset-0 col-xs-12 col-xs-offset-0 text-center fh5co-table">
                            <div className="fh5co-intro fh5co-table-cell">
                                <h1 className="text-center">Create more Themes</h1>
                                <p>Made with love by the fine folks at <a href="http://freehtml5.co">FreeHTML5.co</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="fh5co-services-section">
                <div className="container">
                    <div className="heading-section text-center">
                        <h2>Our Services</h2>
                    </div>
                    <div className="row">
                        <div className="col-md-4 col-sm-6">
                            <div className="fh5co-services-right">
                                <div className="fh5co-table2 text-center">
                                    <div className="fh5co-table-cell2">
                                        <i className="icon-heart3"></i>
                                    </div>
                                </div>
                                <div className="holder-section">
                                    <h3>Crafted With Love</h3>
                                    <p>Far far away, behind the word mountains, far from the countries Vokalia </p>
                                </div>
                            </div>
                            <div className="fh5co-services-right">
                                <div className="fh5co-table2 fh5co-table2-color-2 text-center">
                                    <div className="fh5co-table-cell2">
                                        <i className="icon-laptop"></i>
                                    </div>
                                </div>
                                <div className="holder-section">
                                    <h3>Web Design</h3>
                                    <p>Far far away, behind the word mountains, far from the countries Vokalia </p>
                                </div>
                            </div>
                            <div className="fh5co-services-right">
                                <div className="fh5co-table2 fh5co-table2-color-3 text-center">
                                    <div className="fh5co-table-cell2">
                                        <i className="icon-video"></i>
                                    </div>
                                </div>
                                <div className="holder-section">
                                    <h3>Video Editing</h3>
                                    <p>Far far away, behind the word mountains, far from the countries Vokalia </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 text-center">
                            <div className="fhco-hero2">
                                <img className="img-responsive" src="images/iphone6.png" alt="iphone6"/>
                            </div>
                        </div>

                        <div className="col-md-4 col-sm-6">
                            <div className="fh5co-services">
                                <div className="fh5co-table2 fh5co-table2-color-4 text-center">
                                    <div className="fh5co-table-cell2">
                                        <i className="icon-mobile"></i>
                                    </div>
                                </div>
                                <div className="holder-section">
                                    <h3>Mobile Optimization</h3>
                                    <p>Far far away, behind the word mountains, far from the countries Vokalia </p>
                                </div>
                            </div>
                            <div className="fh5co-services">
                                <div className="fh5co-table2 fh5co-table2-color-5 text-center">
                                    <div className="fh5co-table-cell2">
                                        <i className="icon-gears"></i>
                                    </div>
                                </div>
                                <div className="holder-section">
                                    <h3>SEO</h3>
                                    <p>Far far away, behind the word mountains, far from the countries Vokalia </p>
                                </div>
                            </div>
                            <div className="fh5co-services">
                                <div className="fh5co-table2 fh5co-table2-color-6 text-center">
                                    <div className="fh5co-table-cell2">
                                        <i className="icon-piechart"></i>
                                    </div>
                                </div>
                                <div className="holder-section">
                                    <h3>Web Analytic</h3>
                                    <p>Far far away, behind the word mountains, far from the countries Vokalia </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="fh5co-featured-work-section">
                <div className="container-fluid">
                    <div className="heading-section text-center">
                        <h2>Our Projects</h2>
                    </div>
                    <div className="owl-carousel owl-carousel2">
                        <div className="item">
                            <img src="images/portfolio_pic1.jpg" alt="image"/>
                            <a href="#" className="pop-up-overlay text-center">
                                <div className="desc">
                                    <h3>Camera</h3>
                                    <span>Video</span>
                                </div>
                            </a>
                        </div>
                        <div className="item">
                            <img src="images/portfolio_pic2.jpg" alt="image"/>
                            <a href="#" className="pop-up-overlay pop-up-overlay-color-2 text-center">
                                <div className="desc">
                                    <h3>Workstation</h3>
                                    <span>Illustration</span>
                                </div>
                            </a>
                        </div>
                        <div className="item">
                            <img src="images/portfolio_pic3.jpg" alt="image"/>
                            <a href="#" className="pop-up-overlay pop-up-overlay-color-3 text-center">
                                <div className="desc">
                                    <h3>Mobile Phone</h3>
                                    <span>Web</span>
                                </div>
                            </a>
                        </div>
                        <div className="item">
                            <img src="images/portfolio_pic4.jpg" alt="image"/>
                            <a href="#" className="pop-up-overlay pop-up-overlay-color-4 text-center">
                                <div className="desc">
                                    <h3>Camera Lens</h3>
                                    <span>Illustration</span>
                                </div>
                            </a>
                        </div>
                        <div className="item">
                            <img src="images/portfolio_pic5.jpg" alt="image"/>
                            <a href="#" className="pop-up-overlay text-center">
                                <div className="desc">
                                    <h3>Card</h3>
                                    <span>Card</span>
                                </div>
                            </a>
                        </div>
                        <div className="item">
                            <img src="images/portfolio_pic6.jpg" alt="image"/>
                            <a href="#" className="pop-up-overlay pop-up-overlay-color-2 text-center">
                                <div className="desc">
                                    <h3>Shoes</h3>
                                    <span>Brand</span>
                                </div>
                            </a>
                        </div>
                        <div className="item">
                            <img src="images/portfolio_pic7.jpg" alt="image"/>
                            <a href="#" className="pop-up-overlay text-center">
                                <div className="desc">
                                    <h3>Magazine</h3>
                                    <span>Web</span>
                                </div>
                            </a>
                        </div>
                        <div className="item">
                            <img src="images/portfolio_pic8.jpg" alt="image"/>
                            <a href="#" className="pop-up-overlay pop-up-overlay-color-3 text-center">
                                <div className="desc">
                                    <h3>VCard</h3>
                                    <span>Card</span>
                                </div>
                            </a>
                        </div>
                        <div className="item">
                            <img src="images/portfolio_pic9.jpg" alt="image"/>
                            <a href="#" className="pop-up-overlay pop-up-overlay-color-4 text-center">
                                <div className="desc">
                                    <h3>Paper</h3>
                                    <span>Illustration</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div id="fh5co-blog-section">
                <div className="container">
                    <div className="heading-section text-center">
                        <h2>Recent Blog</h2>
                    </div>
                    <div className="row">
                        <div className="col-md-4 blog-section">
                            <span>03 <small>July 2016</small></span>
                            <h3><a href="#">Mourntains countries Vokalia</a></h3>
                            <p>Far far away, behind the word mountains, far from the countries Vokalia, there live the
                                blind texts.</p>
                            <a className="btn btn-primary" href="#">Read More</a>
                        </div>
                        <div className="col-md-4 blog-section">
                            <span>02 <small>July 2016</small></span>
                            <h3><a href="#">Mourntains countries Vokalia</a></h3>
                            <p>Far far away, behind the word mountains, far from the countries Vokalia, there live the
                                blind texts.</p>
                            <a className="btn btn-primary" href="#">Read More</a>
                        </div>
                        <div className="col-md-4 blog-section">
                            <span>01 <small>July 2016</small></span>
                            <h3><a href="#">Mourntains countries Vokalia</a></h3>
                            <p>Far far away, behind the word mountains, far from the countries Vokalia, there live the
                                blind texts.</p>
                            <a className="btn btn-primary" href="#">Read More</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fh5co-parallax" style={{ backgroundImage: 'url(images/hero-2.jpg)' }}
                 data-stellar-background-ratio="0.5">
                <div className="overlay"></div>
                <div className="container">
                    <div className="row">
                        <div
                            className="col-md-8 col-md-offset-2 col-sm-12 col-sm-offset-0 col-xs-12 col-xs-offset-0 text-center fh5co-table">
                            <div className="fh5co-intro fh5co-table-cell">
                                <h1 className="text-center">Less is more</h1>
                                <p>Made with love by the fine folks at <a href="http://freehtml5.co">FreeHTML5.co</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </Fragment>

    )
}

export default Home;