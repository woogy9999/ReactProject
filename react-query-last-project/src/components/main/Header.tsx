
import {Fragment, useRef, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import apiClient from "../../http-commons";
import {AxiosResponse,AxiosError} from "axios";

// jsx => javascript+xml => createElement
function Header() {
    //const nav=useNavigate()
    const [login, setLogin] = useState<boolean>(false);
    const [id, setId] = useState<string>("");
    const [pwd, setPwd] = useState<string>("");
    const idRef = useRef<HTMLInputElement>(null)
    const pwdRef = useRef<HTMLInputElement>(null)
    //sessionStorage
    /*
         서버에서 Session 저장 안된다
         ------------------------ DB
         세션 저장 : sessionStorage.setItem(key,value) => 서버로 id,pwd 전송 => 결과값
         세션 해제 : sessionStorage.clear()

         // 댓글
     */
    interface LoginData{
        msg:string;
        id:string;
        name:string;
    }
    const {mutate: loginOK} = useMutation({
        mutationFn: async () => {
            const res:AxiosResponse<LoginData> = await apiClient.get(`/member/login/${id}/${pwd}`);
            return res.data;

        },
        onSuccess: (data:LoginData) => {
            if(data.msg==='NOID')
            {
                alert("아이디가 존재하지 않습니다")
                setId("");
                setPwd("");
                idRef.current?.focus();
            }
            else if(data.msg==='NOPWD')
            {
                alert("비밀번호가 틀립니다")
                setPwd("");
                pwdRef.current?.focus();
            }
            else if(data.msg==='OK')
            {
                window.sessionStorage.setItem("id",data.id);
                window.sessionStorage.setItem("name",data.name);
                setLogin(true);
                window.location.reload();
            }
        },
        onError: (error:AxiosError) => {
            console.log("Login Error ",error.message);
        }
    })

    // 로그인 여부에 따라 새로고침 => id!=null
    useEffect(()=>{
        if(sessionStorage.getItem("id"))
        {
            setLogin(true);
        }
    },[])

    const memberLogin = () :void=> {
        if(id.trim()==="")
        {
            idRef.current?.focus();
        }
        if(pwd.trim()==="")
        {
            pwdRef.current?.focus();
        }
        loginOK();
    }
    const memberLogout = () :void=> {
        window.sessionStorage.clear();
        setId("")
        setPwd("")
        setLogin(false);
        window.location.reload();
    }
    return (
        <Fragment>
            <div className="top_header_area">
                <div className="container">
                    <div className="row">
                        <div className="col-5 col-sm-6">

                            <div className="top_social_bar">
                                <a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                                <a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                                <a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a>
                                <a href="#"><i className="fa fa-skype" aria-hidden="true"></i></a>
                                <a href="#"><i className="fa fa-dribbble" aria-hidden="true"></i></a>
                            </div>
                        </div>

                        <div className="col-7 col-sm-6">
                            <div className="signup-search-area d-flex align-items-center justify-content-end">
                                <div className="login_register_area d-flex">
                                    {
                                        !login?(
                                            <div className="login">
                                                ID<input type="text" size={10} className={"input-sm"}
                                                         ref={idRef}
                                                         onChange={(e:any)=>{setId(e.target.value)}}
                                                         value={id}/>&nbsp;
                                                PWD<input type="password" size={10} className={"input-sm"}
                                                         ref={pwdRef}
                                                         onChange={(e:any)=>{setPwd(e.target.value)}}
                                                         value={pwd}/>&nbsp;
                                                <button className="btn-primary btn-sm" onClick={memberLogin} >로그인</button>
                                            </div>


                                        ):(

                                            <div className="login">
                                                {window.sessionStorage.getItem("name")}님 로그인중입니다&nbsp;
                                                <button className="btn-primary btn-sm" onClick={memberLogout}>로그아웃</button>
                                            </div>

                                        )

                                    }
                                </div>



                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <header className="header_area">
                <div className="container">
                    <div className="row">

                        <div className="col-12">
                            <div className="logo_area text-center">
                                <Link to="/" className="yummy-logo">TanStack-Query Project</Link>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <nav className="navbar navbar-expand-lg">
                                <button className="navbar-toggler" type="button" data-toggle="collapse"
                                        data-target="#yummyfood-nav" aria-controls="yummyfood-nav" aria-expanded="false"
                                        aria-label="Toggle navigation"><i className="fa fa-bars"
                                                                          aria-hidden="true"></i> Menu
                                </button>

                                <div className="collapse navbar-collapse justify-content-center" id="yummyfood-nav">
                                    <ul className="navbar-nav" id="yummy-nav">
                                        <li className="nav-item active">
                                            <Link className="nav-link" to="/">Home <span
                                                className="sr-only">(current)</span></Link>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="yummyDropdown"
                                               role="button" data-toggle="dropdown" aria-haspopup="true"
                                               aria-expanded="false">레시피</a>
                                            <div className="dropdown-menu" aria-labelledby="yummyDropdown">
                                                <Link className="dropdown-item" to="/recipe/list">레시피 목록</Link>
                                                <Link className="dropdown-item" to="/recipe/find">레시피 검색</Link>

                                            </div>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="yummyDropdown"
                                               role="button" data-toggle="dropdown" aria-haspopup="true"
                                               aria-expanded="false">맛집</a>
                                            <div className="dropdown-menu" aria-labelledby="yummyDropdown">
                                                <Link className="dropdown-item" to={"/food/list"}>맛집 목록</Link>
                                                <Link className="dropdown-item" to={"/food/find"}>맛집 검색</Link>
                                            </div>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to={"/youtube/find"}>동영상</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to={"/board/list"}>커뮤니티</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to={"/news/list"}>뉴스</Link>

                                        </li>

                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>

        </Fragment>
    )
}

export default Header;