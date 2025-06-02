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
            <div className="breadcumb-area" style={{"backgroundImage": "url(/img/bg-img/breadcumb.jpg)"}}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12">
                            <div className="bradcumb-title text-center">
                                <h2>글쓰기</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="archive-area section_padding_80">
                <div className="container">
                    <div className="row">
                        <div className="col-10">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <th className="text-center" width={"15%"}>이름</th>
                                        <td width={"85%"}>
                                            <input type={"text"} size={"15"} className={"input-group-sm"}
                                                   ref={nameRef}
                                            onChange={(e) => setName(e.target.value)}
                                            value={name}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="text-center" width={"15%"}>제목</th>
                                        <td width={"85%"}>
                                            <input type={"text"} size={"15"} className={"input-group-sm"} ref={subjectRef}
                                                   onChange={(e) => setSubject(e.target.value)}
                                                   value={subject}
                                            />
                                        </td>
                                    </tr>
                                        <tr>
                                            <th className="text-center" width={"15%"}>내용</th>
                                            <td width={"85%"}>
                                                <textarea rows={10} cols={"50"} ref={contentRef}
                                                          onChange={(e) => setContent(e.target.value)}
                                                          value={content}></textarea>
                                            </td>

                                    </tr>
                                    <tr>
                                        <th className="text-center" width={"15%"}>비밀번호</th>
                                        <td width={"85%"}>
                                            <input type={"password"} size={"15"} className={"input-group-sm"} ref={pwdRef}
                                            onChange={(e) => setPwd(e.target.value)}
                                            value={pwd}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={"2"} className="text-center">
                                                <button className="btn btn-primary btn-sm " onClick={insert}>글쓰기</button>
                                                <button className="btn btn-primary btn-sm " onClick={cancel}>취소</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}
export default BoardInsert;