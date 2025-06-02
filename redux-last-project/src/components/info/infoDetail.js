import {useEffect, useState,Fragment} from "react";
import InfoMap from "./infoMap";
import {useNavigate,useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchInfoDetail} from "../../actions/infoActions";
import infoList from "./infoList";

function InfoDetail(){
    const {no} = useParams(); // List에서 받는 변수
    const dispatch = useDispatch(); // 액션연결
    const nav = useNavigate(); // 화면이동 (-1)
    useEffect(() => {
        dispatch(fetchInfoDetail(no));
    },[])
    const id = useSelector(state=>state.infos.info_detail)
    const listClick=()=>{
        nav(-1)
    }

    if (!id || !id.vo) return <div>Loading...</div>;
    return(
        <Fragment>
            <div className="breadcumb-area" style={{"backgroundImage": "url(/img/bg-img/breadcumb.jpg)"}}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12">
                            <div className="bradcumb-title text-center">
                                <h2>맛집 상세보기</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="archive-area section_padding_80">
                <div className="container">
                    <div className="row">
                        <table className="table">
                            <tbody>
                            <tr>
                                <td>
                                    <img src={id.vo.poster} style={{width:"100%"}} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h3>{id.vo.title}</h3>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {id.vo.address}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {id.vo.phone}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                   {id.vo.info}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <InfoMap address={id.addr} />
                                </td>
                            </tr>
                            <tr>
                                <td className="text-right">
                                    <button className={"btn-sm btn-danger"} onClick={listClick}>목록으로</button>
                                </td>
                            </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

        </Fragment>
    )
}

export default InfoDetail;