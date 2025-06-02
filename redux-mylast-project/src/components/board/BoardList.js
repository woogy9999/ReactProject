import {Fragment, useState, useEffect} from "react";
import {boardList} from "../../actions/boardActions";
import {useSelector, useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import './board.css'

function BoardList() {
    // action 연결 => reducer => 데이터를 모아서 sotre에 저장
    const dispatch = useDispatch();
    const [curpage, setCurpage] = useState(1);
    useEffect(() => {
        dispatch(boardList(curpage));
    }, [curpage])

    const board_list = useSelector(state => state.boards.board_list.list);
    const totalpage = useSelector(state => state.boards.board_list.totalpage);
    const today = useSelector(state => state.boards.board_list.today);

    const prev = () => {
        setCurpage(prev => Math.max(1, prev - 1));
    };

    const next = () => {
        setCurpage(prev => Math.min(totalpage, prev + 1));
    };

    return (
        <Fragment>
            <div className={"container"}>
            <div className="comm-board-wrapper">
                <h2 className="comm-board-title">게시판 목록</h2>

                <div className="comm-board-action">
                    <Link to="/board/insert" className="comm-insert-btn">새글</Link>
                </div>

                <table className="comm-board-table">
                    <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>이름</th>
                        <th>작성일</th>
                        <th>조회수</th>
                    </tr>
                    </thead>
                    <tbody>
                    {board_list && board_list.map((row, index) => (
                        <tr key={index}>
                            <td>{row.no}</td>
                            <td>
                                <Link to={`/board/detail/${row.no}`} className="comm-subject-link">
                                    {row.subject}
                                </Link>
                                {today === row.regdate && <span className="comm-badge-new">NEW</span>}
                            </td>
                            <td>{row.name}</td>
                            <td>{row.regdate}</td>
                            <td>{row.hit}</td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan={5}>
                            <div className="comm-pagination">
                                <button onClick={prev} className="comm-page-btn">이전</button>
                                <span className="comm-page-info">{curpage} / {totalpage} 페이지</span>
                                <button onClick={next} className="comm-page-btn">다음</button>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            </div>
        </Fragment>

    )
}

export default BoardList;