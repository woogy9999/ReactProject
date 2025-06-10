import {useState, useRef, MutableRefObject} from "react";
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
        <div className="container"  style={{marginTop:"50px"}}>
            <div className="row">
                <h3 className="text-center">글쓰기</h3>
                <table className="table">
                    <tbody>
                    <tr>
                        <th className="text-center" style={{width: "15%"}}> 이름 </th>
                        <td width="85%">
                            <input type="text" size={15} className="input-group-sm"
                                ref={nameRef}
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </td>
                    </tr>
                    <tr>
                        <th className="text-center" style={{width: "15%"}}>제목</th>
                        <td width="85%">
                            <input type="text" size={50} className="input-group-sm"
                                ref={subjectRef}
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)} />
                        </td>
                    </tr>
                    <tr>
                        <th className="text-center" style={{width: "15%"}}>
                            내용
                        </th>
                        <td width="85%">
                             <textarea rows={10} cols={50}
                                  ref={contentRef} value={content}
                                  onChange={(e) => setContent(e.target.value)} ></textarea>
                        </td>
                    </tr>
                    <tr>
                        <th className="text-center" style={{width: "15%"}}> 비밀번호 </th>
                        <td width="85%">
                            <input type="password" size={15} className="input-group-sm"
                                ref={pwdRef}
                                value={pwd}
                                onChange={(e) => setPwd(e.target.value)} />
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
    );
}

export default BoardInsert;
