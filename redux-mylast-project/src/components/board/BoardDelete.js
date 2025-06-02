import {useState, useEffect, Fragment, useRef} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import {boardDelete, resetResult} from "../../actions/boardActions";

function BoardDelete(){

    const {no}= useParams();
    const dispatch = useDispatch();
    const nav=useNavigate();
    const [pwd,setPwd]=useState("");
    const pwdRef=useRef(null);
    const cancel =()=>{
        nav(-1)
    }
    const del=()=>{

        if(pwd.trim()===""){
            pwdRef.current.focus();
            return;
        }
        // action으로 값 전송
        dispatch(boardDelete(no,pwd));
    }
    // 결과값 받기
    const delData = useSelector(state => state.boards.result)

    useEffect(()=>{
        if(delData.msg==='yes')
        {
            dispatch(resetResult());
            nav('/board/list')

        }
        if(delData.msg==='no')
        {
            alert("비밀번호가 틀립니다")
            setPwd("");
            pwdRef.current.focus();
        }
    },[delData])

    return (
        <Fragment>
            <section className="archive-area section_padding_80">
                <div className="comm-board-wrapper">
                    <div className="comm-board-title">삭제하기</div>

                    <table className="comm-board-table" style={{border:"2px solid #000000",width:"100%"}}>
                        <tbody>
                        <tr>
                            <td className="text-center">
                                비밀번호: <input
                                    type="password"
                                    className="comm-form-input"
                                    ref={pwdRef}
                                    value={pwd}
                                    onChange={(e) => setPwd(e.target.value)}
                                    style={{ marginLeft: '10px', width: '200px' }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="comm-board-action">
                                    <button className="comm-btn-simple" onClick={del}>삭제</button>
                                    <button className="comm-btn-simple" onClick={cancel}>취소</button>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </Fragment>

    )
}
export default BoardDelete;