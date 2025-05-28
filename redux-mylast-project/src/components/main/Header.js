import {Fragment} from "react";
import {Link} from "react-router-dom";

function Header() {
    return (

        <Fragment>

            <header id="header">
                <h1>
                    <a href="index.html">Future Imperfect</a>
                </h1>
                <nav className="links">
                    <ul>
                        <li><Link to="/">홈으로</Link></li>
                        <li><Link to="hotel/list">호텔목록</Link></li>
                        <li><a href="#">Feugiat</a></li>
                        <li><a href="#">Tempus</a></li>
                        <li><a href="#">Adipiscing</a></li>
                    </ul>
                </nav>
                <nav className="main">
                    <ul>
                        <li className="search">
                            <a className="fa-search" href="#search">Search</a>
                            <form id="search" method="get" action="#">
                                <input type="text" name="query" placeholder="Search" />
                            </form>
                        </li>
                        <li className="menu">
                            <a className="fa-bars" href="#menu">Menu</a>
                        </li>
                    </ul>
                </nav>
            </header>




        </Fragment>
    )
}
export default Header;