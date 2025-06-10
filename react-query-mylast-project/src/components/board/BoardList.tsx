import {Fragment, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {Link} from "react-router-dom";
import apiClient from "../../http-commons";
// 서버에서 전송된 데이터를 모아서 => 데이터형을 제작 => type BoardItem{} => 구조체
interface BoardItem {
    no: number;
    subject: string;
    name: string;
    dbday:string;
    hit:number;
}
interface BoardListResponse {
    list: BoardItem[];
    today: string;
    curpage:number;
    totalpage:number;
}
function BoardList(){
    const [curpage, setCurpage] = useState<number>(1);
    // 데이터형을 지정 => 가독성
    const {isLoading,isError,error,data}=useQuery<{data:BoardListResponse}>({
        queryKey:["board-list",curpage],
        queryFn:async()=>await apiClient.get(`/board/list/${curpage}`)
    })
    if(isLoading)
        return <h3>서버에서 데이터 전송 지연</h3>
    if(isError)
        return <h3>서버 에러 발생 : {`${error}`}</h3>

    const prev=()=> setCurpage(curpage>1?curpage-1:curpage)
    const next=()=> setCurpage(data?.data && curpage<data.data.totalpage?curpage+1:curpage)
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
                                <h1>커뮤니티</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="container" style={{marginTop:"50px"}}>
            <div className="row" >
                <h3 className={"text-center"}>TanStackQuery+TypeScript를 활용한 게시판</h3>
                <table className="table">
                    <tbody>
                    <tr>
                        <td>
                            <Link to={"/board/insert"} className="btn btn-primary">새글</Link>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table className="table">
                    <thead>
                    <tr>
                        <th className={"text-center"}>번호</th>
                        <th className={"text-center"}>제목</th>
                        <th className={"text-center"}>이름</th>
                        <th className={"text-center"}>작성일</th>
                        <th className={"text-center"}>조회수</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        data?.data.list.map((board:BoardItem) => (
                            <tr key={board.no}>
                                <td className={"text-center"}>{board.no}</td>
                                <td><Link to={"/board/detail/"+board.no}>{board.subject}</Link>
                                    {
                                        board.dbday === data.data.today &&
                                        <sup style={{color:"#FF0000"}}>&nbsp;new</sup>
                                    }
                                </td>
                                <td className={"text-center"}>{board.name}</td>
                                <td className={"text-center"}>{board.dbday}</td>
                                <td className={"text-center"}>{board.hit}</td>
                            </tr>
                        ))
                    }
                    <tr>
                        <td colSpan={5} className={"text-center"}>
                            <button className={"btn btn-sm btn-primary"} onClick={prev} style={{margin:"10px"}}>이전</button>
                            {data?.data.curpage} page / {data?.data.totalpage} pages
                            <button className={"btn btn-sm btn-primary"} onClick={next} style={{margin:"10px"}}>다음</button>
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