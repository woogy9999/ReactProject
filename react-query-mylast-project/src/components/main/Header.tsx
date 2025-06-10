import {Fragment} from "react";

function Header() {
    return (
        <Fragment>
            <header>
                <div className="container text-center">
                    <div className="fh5co-navbar-brand">
                        <a className="fh5co-logo" href="/">블랙 프라이데이</a>
                    </div>
                    <nav id="fh5co-main-nav" role="navigation">
                        <ul>
                            <li><a href="/" className="active">홈으로</a></li>
                            <li><a href="/goods/list">상품 목록</a></li>
                            <li><a href="/goods/find">상품 검색</a></li>
                            <li><a href="/board/list">커뮤니티</a></li>
                            <li><a href="about.html">About</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
        </Fragment>

    )
}

export default Header;