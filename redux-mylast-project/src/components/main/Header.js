import {Fragment} from "react";
import {Link} from "react-router-dom";

function Header() {
    return (

        <Fragment>
            <section id="menu">



                <section>
                    <ul className="actions stacked">
                        <li><a href="#" className="button large fit">Log In</a></li>
                    </ul>
                </section>

            </section>
            <header id="header">
                <h1>
                    <Link to="/">Hotel PlatForm</Link>
                </h1>
                <nav className="links">
                    <ul>
                        <li><Link to="/">홈으로</Link></li>
                        <li className="nav-item dropdown">
                            <div className="nav-link-wrapper">
                                <Link className="nav-link dropdown-toggle" to="/hotel/list">
                                    호텔
                                </Link>
                                <div className="dropdown-menu">
                                    <Link className="dropdown-item" to="/hotel/list">호텔 목록</Link>
                                    <Link className="dropdown-item" to="/hotel/find">호텔 검색</Link>
                                </div>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <div className="nav-link-wrapper">
                                <a className="nav-link dropdown-toggle" href="#">
                                    방문 추천
                                </a>
                                <div className="dropdown-menu">
                                    <Link className="dropdown-item" to="/shop/list">쇼핑</Link>
                                    <Link className="dropdown-item" to="/location/list">문화</Link>
                                    <Link className="dropdown-item" to="/nature/list">자연</Link>
                                    <Link className="dropdown-item" to="/guest/list">민박집</Link>
                                </div>
                            </div>
                        </li>
                        <li><Link to="/board/list">커뮤니티</Link></li>
                        <li><Link to="/youtube/find">유튜브 영상</Link></li>
                        <li><Link to="/news/list">호텔 뉴스</Link></li>

                    </ul>
                </nav>
                <nav className="main">
                    <ul>
                        <li className="search">
                            <a className="fa-search" href="#search">Search</a>
                            <form id="search" method="get" action="#">
                                <input type="text" name="query" placeholder="Search"/>
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