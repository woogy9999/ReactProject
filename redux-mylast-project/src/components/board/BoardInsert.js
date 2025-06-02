import {Fragment, useState, useEffect, useRef} from "react";
import {useSelector, useDispatch} from "react-redux";
import {boardInsert, resetResult} from "../../actions/boardActions";
import {useNavigate} from "react-router-dom";

function BoardInsert(props) {
    const dispatch = useDispatch();
    const nav= useNavigate();
    const nameRef = useRef(null);
    const subjectRef = useRef(null);
    const contentRef = useRef(null);
    const pwdRef = useRef(null);

    const[name,setName]=useState("");
    const[subject,setSubject]=useState("");
    const[content,setContent]=useState("");
    const[pwd,setPwd]=useState("");

    const insert=()=>{
        console.log("글쓰기 클릭됨");

        if(name.trim()===""){
            nameRef.current.focus();
            return;
        }
        else if(subject.trim()===""){
            subjectRef.current.focus();
            return;
        }
        else if(content.trim()===""){
            contentRef.current.focus();
            return;
        }
        else if(pwd.trim()===""){
            pwdRef.current.focus();
            return;
        }

        const params={
            name:name,
            subject:subject,
            content:content,
            pwd:pwd
        }
        dispatch(boardInsert(params));

    }
    const cancel=()=>{
        dispatch(resetResult());
        nav('/board/list');
    }
    const result=useSelector((state)=>state.boards.result)

    if(result && result.msg==='yes'){
        dispatch(resetResult());
        nav('/board/list')
    }


    return(
        <Fragment>

            <div className={"container"}>
                <div className="comm-board-wrapper">
                    <h2 className="comm-board-title">게시글 작성하기</h2>

                <section className="archive-area section_padding_80">
                    <div className="container">
                        <div className="comm-write-container">
                            <table className="comm-form-table" style={{border:"2px solid #ddd",width:"100%"}} >
                                <tbody>
                                <tr>
                                    <th className="comm-form-label">이름</th>
                                    <td>
                                        <input
                                            type="text"
                                            className="comm-form-input"
                                            ref={nameRef}
                                            onChange={(e) => setName(e.target.value)}
                                            value={name}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th className="comm-form-label">제목</th>
                                    <td>
                                        <input
                                            type="text"
                                            className="comm-form-input"
                                            ref={subjectRef}
                                            onChange={(e) => setSubject(e.target.value)}
                                            value={subject}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th className="comm-form-label">내용</th>
                                    <td>
                                    <textarea
                                        rows={10}
                                        className="comm-form-textarea"
                                        ref={contentRef}
                                        onChange={(e) => setContent(e.target.value)}
                                        value={content}
                                    ></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="comm-form-label">비밀번호</th>
                                    <td>
                                        <input
                                            type="password"
                                            className="comm-form-input"
                                            ref={pwdRef}
                                            onChange={(e) => setPwd(e.target.value)}
                                            value={pwd}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        <div className="comm-form-btns" style={{textAlign:"center"}}>
                                            <button className="comm-btn-simple" onClick={insert} >글쓰기</button>
                                            <button className="comm-btn-simple" onClick={cancel}>취소</button>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
            </div>
        </Fragment>


    )
}
export default BoardInsert;