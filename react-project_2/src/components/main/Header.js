import {Fragment} from "react";
import {NavLink} from "react-router";

/*
        1. 자바스크립트 기반 => for(), map() , forEach()
        2. 변수
            일반변수 => let , const
            props : 속성으로 값을 전송 => 변경이 불가능
            function Header(props)
            {
                반드시 존재
                return (
                    HTML을 구사 => index.html
                    ==== XML 형식을 가지고 있다
                    ==============
                       | index.html에 첨부할때 랜더링 (파싱) => jsx
                         <div>
                           <span>Hello</span>
                         <div>

                         React.createElement('div',React.createElement('span',null,"Hello"))

                         => jsx는 태그/속성 => 소문자
                         => function / class => 대문자로 시작
                            -------- Header() X
                            <Header name="홍길동"> => 태그형으로 호출한다 => props.name
                         => html
                            1. 무조건 계층 구조를 가지고 있다
                               여는 태그와 닫는 태그가 동일
                               <a><b> </b></a>
                            2. 단독태그는 반드시 닫는다

                            3. style 태그는 {{}}으로 감싼다.

                                let style={
                                    "width":"100px",
                                    "height":"100px"

                                }
                                <input type="text" style={style}>
                            4. 반드시 한개의 태그안에 모든 HTML이 들어가 있어야한다.
                               ---------------- 최상위 태그
                            5. 속성값은 반드시 "" , '' 을 이용한다
                            6. 태그, 속성에 공백이 없어야 한다
                            7. 변수값을 추가할때 {}


                )
            }
            state : 값을 유지하고 있는 상태
                    외부에서 값을 받는 경우에는 state를 사용 => 수정이 가능하다
                    => state변수는 설정할때 => setXxx를 이용한다
                    setXxx() => 호출이 되면 리랜더링이 가능
                    -------- 함수를 다시 호출
                    -------- 브라우저의 화면이 갱신

                   // 단점
                        단방향 통신 => Redux(보완)
                        문법이 어렴다 / 전체 구조가 복잡하다 => React_Query


 */
function Header() {

    return (
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <div className="navbar-header">
                    <NavLink className="navbar-brand" to="/">ReactBasic</NavLink>
                </div>
                <ul className="nav navbar-nav">
                    <li className="active"><NavLink to="/">Home</NavLink></li>
                    <li className="dropdown">
                        <NavLink className="dropdown-toggle" data-toggle="dropdown" to="/">부산 맛집
                            <span className="caret"></span></NavLink>
                        <ul className="dropdown-menu">
                            <li><a href="#">맛집 목록</a></li>
                            <li><a href="#">맛집 검색</a></li>
                        </ul>
                    </li>
                    <li className="dropdown">
                        <a className="dropdown-toggle" data-toggle="dropdown" href="#">부산 여행
                            <span className="caret"></span></a>
                        <ul className="dropdown-menu">
                            <li><NavLink to="/busan/info_list">여행 목록</NavLink></li>
                            <li><NavLink to="/busan/info_find">여행 검색</NavLink></li>

                        </ul>
                    </li>
                    <li className="dropdown">
                        <a className="dropdown-toggle" data-toggle="dropdown" href="#">여행동영상
                            <span className="caret"></span></a>
                        <ul className="dropdown-menu">
                            <li><a href="#">동영상 목룩</a></li>
                            <li><a href="#">동영상 검색</a></li>
                        </ul>
                    </li>
                    <li><a href="#">커뮤니티</a></li>
                    <li><a href="#">NodeJS</a></li>
                </ul>
            </div>
        </nav>
    )
}

export default Header;