import {Fragment,useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {AxiosResponse} from "axios";
import apiClient from "../../http-commons";
import {Link} from "react-router-dom";
import PagePrint from "../commons/PagePrint";
/*
      "sno": 1,
      "hit": 0,
      "likecount": 0,
      "replycount": 0,
      "title": "하늘공원",
      "poster": "https://korean.visitseoul.net/data/POST/20211012//202110121703032151",
      "msg": "하늘공원은 2002년 제17회 월드컵축구대회를 기념하며 난지도 쓰레기매립장을 복원하기 위해 개원한 월드컵경기장 일대 5대 공원 중 하나이다.",
      "address": "03900 서울 마포구 하늘공원로 95 (탐방객안내소)"
 */
interface Seoul{
    sno: number;
    hit: number;
    likecount: number;
    replycount: number;
    title: string;
    poster: string;
    msg: string;
    address: string;

}
interface SeoulListProps{
    list:Seoul[];
    totalpage:number;
    curpage:number;
    startPage:number;
    endPage:number;
}


function SeoulList() {
    const [curpage, setCurpage] = useState<number>(1);
    const {isLoading,isError,error,data}=useQuery<AxiosResponse<SeoulListProps>,Error>({
        queryKey:["seoul-list",curpage], // 키 변경 => 서버연결
        queryFn: async ()=>{
            return await apiClient.get(`/seoul/list/${curpage}`);
        }
    })
    if(isLoading){
        return <h3 className={"text-center"}>Loading...</h3>
    }
    if(isError)
        return <h3 className={"text-center"}>{error?.message}</h3>;

    console.log(data?.data)
    return (
        <Fragment>
            <div className="fh5co-parallax"
                 style={{backgroundImage: 'url(../images/hero-1.jpg)', height: "300px"}}
                 data-stellar-background-ratio="0.5">
                <div className="overlay"></div>
                <div className="container">
                    <div className="row">
                        <div
                            className="col-md-8 col-md-offset-2 col-sm-12 col-sm-offset-0 col-xs-12 col-xs-offset-0 text-center fh5co-table">
                            <div className="fh5co-intro fh5co-table-cell">
                                <div className="text-center" style={{height: "300px"}}>
                                    <h1>자연 목록</h1>
                                    <p className="text-center" style={{height: "300px"}}>페이지를 선택하여 상품을 찾아보세요</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div id="fh5co-work-section">
                <div className="container">
                    <div className="row text-center">
                        {
                            data?.data.list.map((seoul:Seoul,index:number)=>

                                <div className="col-md-4 col-sm-6" key={index}>
                                    <div className="fh5co-grid-work">
                                        <div className="work-holder">
                                            <Link to={`/seoul/detail/${seoul.sno}`}><img src={seoul.poster} alt="Work" style={{width:"340px",height:"260px"}}/></Link>
                                            <Link to={`/seoul/detail/${seoul.sno}`} className="inner-overlay inner-overlay-2"><i className="icon-plus"></i></Link>
                                        </div>
                                        <div className="desc">
                                            <h3><a href={`/seoul/detail/${seoul.sno}`}><p style={{margin:"0px"}}><b>{seoul.title}</b></p></a></h3>
                                            <p >{seoul.msg}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        <div className="col-md-12 text-center">
                            <nav aria-label="Page navigation" className="pagination-container">
                                {data && <PagePrint data={data.data} setCurpage={setCurpage} />}
                            </nav>
                            <p className="text-muted">
                                Page {curpage} of {data?.data.totalpage} results
                            </p>
                        </div>


                    </div>

                </div>
            </div>


        </Fragment>
    )
}

export default SeoulList;