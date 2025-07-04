import {useQuery} from "@tanstack/react-query";
import {useParams, useNavigate, Link} from "react-router-dom";
import apiClient from "../../http-commons";
import { useSearchParams } from "react-router-dom";
import {Fragment} from "react";


interface BoardDetailData {
    no: number;
    name: string;
    subject: string;
    content: string;
    regdate: string;
    hit: number;
}

function BoardDetail() {
    const {no} = useParams();  // URL 파라미터
    const nav = useNavigate();

    // 조회수 증가 안하는거
    const [searchParams] = useSearchParams();
    const increase = searchParams.get("increase") !== "false";

    const {isLoading, isError, error, data} = useQuery<{ data: BoardDetailData }>({
        queryKey: ["board-detail", no],
        queryFn: async () => await apiClient.get(`/board/detail/${no}?increase=${increase}`),
    });

    if (isLoading) return <h3>서버에서 데이터 로딩 중...</h3>;
    if (isError) return <h3>에러 발생: {`${error}`}</h3>;

    const board = data?.data;

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
                                    <h1>게시글 상세 정보</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <div className="container" style={{marginTop:"50px"}}>
            <div className="row justify-content-center">
                <div className="col-10">
                    <table className="table">
                        <tbody>
                        <tr>
                            <td className="text-center" width="20%">번호</td>
                            <td className="text-center" width="30%">{board?.no}</td>
                            <td className="text-center" width="20%">작성일</td>
                            <td className="text-center" width="30%">{board?.regdate}</td>
                        </tr>
                        <tr>
                            <td className="text-center" width="20%">이름</td>
                            <td className="text-center" width="30%">{board?.name}</td>
                            <td className="text-center" width="20%">조회수</td>
                            <td className="text-center" width="30%">{board?.hit}</td>
                        </tr>
                        <tr>
                            <td className="text-center" width="20%">제목</td>
                            <td colSpan={3}>{board?.subject}</td>
                        </tr>
                        <tr>
                            <td colSpan={4} className="text-left" style={{ verticalAlign: "top", height: "200px" }}>
                            <pre style={{
                                whiteSpace: "pre-wrap",
                                border: "none",
                                backgroundColor: "#ffffff"
                            }}><h3>{board?.content}</h3></pre>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={4} className="text-right">
                                <Link to={`/board/update/${board?.no}`} className="btn btn-sm btn-danger">수정</Link>
                                <Link to={`/board/delete/${board?.no}`} className="btn btn-sm btn-primary">삭제</Link>
                                <Link to="/board/list" className="btn btn-sm btn-success">목록</Link>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        </Fragment>
    );
}

export default BoardDetail;
