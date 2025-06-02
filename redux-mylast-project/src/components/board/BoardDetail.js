import {useDispatch, useSelector} from "react-redux";
import {useParams, useNavigate, Link} from "react-router-dom";
import {useState, useEffect, Fragment} from "react";
import {boardDetail} from "../../actions/boardActions";

function BoardDetail() {
    const {no} = useParams();
    const dispatch = useDispatch();
    const nav = useNavigate();
    // 상세 정보 가져오기
    const detail = useSelector((state) => state.boards.board_detail);

    useEffect(() => {
        dispatch(boardDetail(no));
    }, [dispatch, no]);

    if (!detail) return <div>Loading...</div>;

    return (<Fragment>

            <section className="archive-area section_padding_80">
                <div className="comm-board-wrapper">
                    <div className="comm-board-title">게시글 상세</div>
                    <table className="comm-board-table" style={{border: "2px solid #ddd", width: "100%"}}>
                        <tbody>
                        <tr>
                            <th>번호</th>
                            <td>{detail.no}</td>
                            <th>작성일</th>
                            <td>{detail.regdate}</td>
                        </tr>
                        <tr>
                            <th>이름</th>
                            <td>{detail.name}</td>
                            <th>조회수</th>
                            <td>{detail.hit}</td>
                        </tr>
                        <tr>
                            <th>제목</th>
                            <td colSpan="3" className="text-left">{detail.subject}</td>
                        </tr>
                        <tr>
                            <td colSpan="4" className="text-left" style={{padding: '20px', verticalAlign: 'top'}}>
                                <textarea rows={10} className="comm-form-textarea"
                                >{detail.content}</textarea>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="4">
                                <div className="comm-board-action">
                                    <Link to={`/board/update/${no}`} className="comm-insert-btn">수정</Link>
                                    <Link to={`/board/delete/${no}`} className="comm-insert-btn">삭제</Link>
                                    <Link to="/board/list" className="comm-insert-btn">목록</Link>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </section>

        </Fragment>);
}

export default BoardDetail;