import {Fragment} from "react";


function Footer() {

    return (
        <Fragment>

            <section id="footer" style={{textAlign:"center"}}>
                <ul className="icons">
                    <li><a href="#" className="icon brands fa-twitter"><span className="label">Twitter</span></a></li>
                    <li><a href="#" className="icon brands fa-facebook-f"><span className="label">Facebook</span></a></li>
                    <li><a href="#" className="icon brands fa-instagram"><span className="label">Instagram</span></a></li>
                    <li><a href="#" className="icon solid fa-rss"><span className="label">RSS</span></a></li>
                    <li><a href="#" className="icon solid fa-envelope"><span className="label">Email</span></a></li>
                </ul>
                <p className="copyright">
                    2025 React 개인프로젝트: <a href="#">by - Woogy9999</a>
                </p>
            </section>


        </Fragment>

    )

}

export default Footer;