import {useState, useRef, MutableRefObject, Fragment} from "react";
import {useMutation} from "@tanstack/react-query";
import apiClient from "../../http-commons";
import {useNavigate} from "react-router-dom";

function BoardInsert() {
    // input 참조
    const nameRef = useRef<HTMLInputElement>(null);
    const subjectRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const pwdRef = useRef<HTMLInputElement>(null);

    // 상태값
    const [name, setName] = useState<string>("");
    const [subject, setSubject] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [pwd, setPwd] = useState<string>("");

    const nav = useNavigate();

    // 등록 요청
    const {mutate: boardInsert} = useMutation({
        mutationFn: async () => {
            return await apiClient.post("/board/insert", {
                name,
                subject,
                content,
                pwd,
            });
        },
        onSuccess: (res) => {
            console.log(res);
            if (res.data.msg === "yes") {
                window.location.href = "/board/list";
            } else {
                alert(res.data.msg);
            }
        },
        onError: (err) => {
            console.error(err);
        },
    });

    // 글쓰기 버튼
    const insert = () => {
        if (name.trim() === "") {
            nameRef.current?.focus();
            return;
        }
        if (subject.trim() === "") {
            subjectRef.current?.focus();
            return;
        }
        if (content.trim() === "") {
            contentRef.current?.focus();
            return;
        }
        if (pwd.trim() === "") {
            pwdRef.current?.focus();
            return;
        }
        boardInsert();
    };

    // 취소 버튼
    const cancel = () => {
        nav(-1);
    };

    return (
        <Fragment>
            <div className="fh5co-parallax"
                 style={{backgroundImage: 'url(/images/hero-1.jpg)', height: "300px"}}
                 data-stellar-background-ratio="0.5">
                <div className="overlay"></div>
                <div className="container">
                    <div className="row">
                        <div
                            className="col-md-8 col-md-offset-2 col-sm-12 col-sm-offset-0 col-xs-12 col-xs-offset-0 text-center fh5co-table">
                            <div className="fh5co-intro fh5co-table-cell">
                                <div className="text-center" style={{height: "300px"}}>
                                    <h1>게시글 작성</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container" style={{marginTop: "50px"}}>
                <div className="row">
                    <table className="table">
                        <tbody>
                        <tr>
                            <th className="text-center" style={{width: "15%"}}> 이름</th>
                            <td width="85%">
                                <input type="text" size={15} className="input-group-sm"
                                       ref={nameRef}
                                       value={name}
                                       onChange={(e) => setName(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <th className="text-center" style={{width: "15%"}}>제목</th>
                            <td width="85%">
                                <input type="text" size={50} className="input-group-sm"
                                       ref={subjectRef}
                                       value={subject}
                                       onChange={(e) => setSubject(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <th className="text-center" style={{width: "15%"}}>
                                내용
                            </th>
                            <td width="85%">
                             <textarea rows={10} cols={50}
                                       ref={contentRef} value={content}
                                       onChange={(e) => setContent(e.target.value)}></textarea>
                            </td>
                        </tr>
                        <tr>
                            <th className="text-center" style={{width: "15%"}}> 비밀번호</th>
                            <td width="85%">
                                <input type="password" size={15} className="input-group-sm"
                                       ref={pwdRef}
                                       value={pwd}
                                       onChange={(e) => setPwd(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} className="text-center">
                                <button className="btn btn-primary btn-sm" onClick={insert}>글쓰기</button>
                                <button className="btn btn-primary btn-sm" onClick={cancel}>취소</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    );
}

export default BoardInsert;
