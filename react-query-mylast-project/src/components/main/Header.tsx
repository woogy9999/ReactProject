
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
        else if(pwd.trim()==="")
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

            <header style={{paddingBottom:"20px"}} >

                <div className="container text-center">
                    <div className="fh5co-navbar-brand">
                        <a className="fh5co-logo" href="/">Tanstack Project</a>

                    </div>

                    <nav id="fh5co-main-nav" role="navigation">
                        <ul>
                            <li><a href="/" className="active">홈으로</a></li>
                            <li><a href="/seoul/list">서울 자연</a></li>
                            <li><a href="/seoul/find">자연 검색</a></li>
                            <li><a href="/goods/list">상품 목록</a></li>
                            <li><a href="/board/list">커뮤니티</a></li>
                            <li><a href="/news/list">네이버 뉴스</a></li>

                        </ul>
                    </nav>
                </div>
                <div className={"row"} style={{marginTop:"20px", marginRight:"50px",marginBottom:"0px"}}>
                    {!login && (
                        <div style={{ textAlign: "right"  }}>
                            <input
                                type="text"
                                placeholder="아이디"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                ref={idRef}
                                size={7}
                                style={{ marginRight: "5px", height: "40px"}}
                            />
                            <input
                                type="password"
                                placeholder="비밀번호"
                                value={pwd}
                                onChange={(e) => setPwd(e.target.value)}
                                ref={pwdRef}
                                size={7}
                                style={{ marginRight: "5px", height: "40px"}}
                            />
                            <button className="btn  btn-success" onClick={memberLogin}>
                                로그인
                            </button>
                        </div>
                    )}

                    {login && (
                        <div style={{ textAlign: "right"}}>
                                        <span style={{ marginRight: "10px" }}>
                                            {sessionStorage.getItem("name")}님 환영합니다
                                        </span>
                            <button className="btn btn-danger" onClick={memberLogout}>
                                로그아웃
                            </button>
                        </div>
                    )}
                </div>
            </header>

        </Fragment>

    )
}

export default Header;