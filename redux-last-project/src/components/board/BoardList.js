import {Fragment, useState, useEffect} from "react";
import {boardList} from "../../actions/boardActions";
import {useSelector, useDispatch} from "react-redux";
import {Link} from "react-router-dom";


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
            <div className="breadcumb-area" style={{"backgroundImage": "url(/img/bg-img/breadcumb.jpg)"}}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12">
                            <div className="bradcumb-title text-center">
                                <h2>자유게시판</h2>
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
                                    <td>
                                    <Link to={"/board/insert"} className={"btn btn-sm btn-primary"}>
                                        새글
                                    </Link>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <table className={"table"}>
                                <thead>
                                    <tr>
                                        <th width={"10%"} className={"text-center"}>번호</th>
                                        <th width={"45%"} className={"text-center"}>제목</th>
                                        <th width={"15%"} className={"text-center"}>이름</th>
                                        <th width={"20%"} className={"text-center"}>작성일</th>
                                        <th width={"10%"} className={"text-center"}>조회수</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    board_list && board_list.map((row, index) =>
                                        <tr key={index}>
                                            <td width={"10%"} className={"text-center"}>{row.no}</td>
                                            <td width={"45%"} >
                                                <Link to={`/board/detail/${row.no}`}>
                                                {row.subject}&nbsp;
                                                </Link>
                                                {
                                                    today===row.regdate && <sup style={{color:"red"}}>new</sup>
                                                }
                                            </td>
                                            <td width={"15%"} className={"text-center"}>{row.name}</td>
                                            <td width={"20%"} className={"text-center"}>{row.regdate}</td>
                                            <td width={"10%"} className={"text-center"}>{row.hit}</td>
                                        </tr>
                                    )
                                }
                                <tr>
                                    <td colSpan={5} className={"text-center"}>
                                        <Link to={"#"} className={"btn btn-sm btn-danger"} onClick={prev}>이전</Link>
                                        {curpage} page / {totalpage} pages
                                        <Link to={"#"} className={"btn btn-sm btn-danger"} onClick={next} >다음</Link>
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

export default BoardList;