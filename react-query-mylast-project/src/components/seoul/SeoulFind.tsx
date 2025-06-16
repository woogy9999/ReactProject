import { Fragment, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import PagePrint from "../commons/PagePrint";
/*
   SNO         NOT NULL NUMBER
TITLE      NOT NULL VARCHAR2(200)
POSTER     NOT NULL VARCHAR2(300)
MSG        NOT NULL VARCHAR2(4000)
ADDRESS    NOT NULL VARCHAR2(300)
HIT                 NUMBER
LIKECOUNT           NUMBER
REPLYCOUNT          NUMBER
    */
interface Seoul {
    SNO: number;
    POSTER: string;
    TITLE: string;
    MSG: string;
    ADDRESS: number;
    LIKECOUNT: number;
    REPLYCOUNT: number;
    NUM: number;
}

function SeoulFind() {

    const [curpage, setCurpage] = useState<number>(1);
    const [title, setTitle] = useState<string>("공원");

    const { isLoading, isError, error, data, refetch } = useQuery({
        queryKey: ['seoul-find', curpage],
        queryFn: async () => {
            const res = await axios.get<Seoul[]>(`http://localhost:3355/seoul/find`, {
                params: { fd: title, page: curpage }
            });
            return res.data;
        },
        enabled: false
    });

    const findBtn = () => {
        if (!title.trim()) return;
        setCurpage(1);
        refetch();
    };

    useEffect(() => {
        if (curpage !== 1) {
            refetch();
        }
    }, [curpage]);


    return (
        <Fragment>
            <div className="fh5co-parallax"
                 style={{backgroundImage: 'url(../images/hero-1.jpg)', height: "300px"}}
                 data-stellar-background-ratio="0.5">
                <div className="overlay"></div>
                        <div
                            className="col-md-8 col-md-offset-2 col-sm-12 col-sm-offset-0 col-xs-12 col-xs-offset-0 text-center fh5co-table">
                            <div className="fh5co-intro fh5co-table-cell">
                                <div className="text-center" style={{height: "300px"}}>
                                    <h1>자연 검색</h1>
                                    <p className="text-center" style={{height: "300px"}}>검색어를 입력하여 찾아보세요</p>
                                </div>
                            </div>
                </div>
            </div>
            <div id="fh5co-work-section">
                <div className="container">
                    <div className={"text-right"}>
                    <input
                        type="text"
                        className="input-sm"
                        size={8}
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        style={{height:"35px"}}
                    />&nbsp;
                    <button className="btn-success btn-sm" onClick={findBtn}>
                        검색
                    </button>
                    </div>
                    <div className="row" style={{marginTop:"20px"}}>
                        <div className="row text-center">

                            {
                                data?.map((seoul:Seoul,index:number)=>
                                    <div className="col-md-4 col-sm-6" key={index}>
                                        <div className="fh5co-grid-work">
                                            <div className="work-holder">
                                                <Link to={`/seoul/detail/${seoul.SNO}`}><img src={seoul.POSTER} alt="Work" style={{width:"340px",height:"260px"}}/></Link>
                                                <Link to={`/seoul/detail/${seoul.SNO}`} className="inner-overlay inner-overlay-2"><i className="icon-plus"></i></Link>
                                            </div>
                                            <div className="desc">
                                                <h3><a href={`/seoul/detail/${seoul.SNO}`}><p style={{margin:"0px"}}><b>{seoul.TITLE}</b></p></a></h3>
                                                <p >{seoul.MSG}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}



                        </div>

                    </div>
                </div>
            </div>



        </Fragment>
    )
}
export default SeoulFind
