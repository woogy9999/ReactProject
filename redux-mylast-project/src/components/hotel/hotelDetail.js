import {useState,useEffect,Fragment} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate,useParams} from "react-router-dom";
import {fetchHotelDetail} from "../../actions/hotelActions";
import HotelMap from "./HotelMap";
// redirect , useRef , useCallback , useMemo
// => history.back() Navigate

function HotelDetail() {
    const {no} = useParams();
    const dispatch = useDispatch();
    const nav=useNavigate();
    useEffect(()=>{
        dispatch(fetchHotelDetail(no)) // 데이터를 서버에서 읽어서 저장
    },[])
    const hotelDetail=useSelector(state=>state.hotels.hotel_detail)
    const listClick=()=>{
        nav("/hotel/list")
    }
    if (!hotelDetail) return <div>Loading...</div>;
    return (
        <Fragment>

            <div id="wrapper">
                <div id="main">
                    <article className="post">
                        <header>
                            <div className="title">
                                <h2>{hotelDetail.title}</h2>
                                <p></p>
                            </div>
                            <div className="meta">
                                <time className="published" dateTime="2015-11-01">June 2025 개인프로젝트</time>
                                <a href="#" className="author"><span className="name">Woogy9999</span><img
                                    src="images/avatar.jpg" alt=""/></a>
                            </div>
                        </header>
                        <span className="image featured" ><img src={hotelDetail.poster}  style={{ width: "70%", display: "block", margin: "0 auto" }}/></span>
                        <h2  style={{textAlign:"center"}}> 호텔명 : {hotelDetail.title}</h2>
                        <p className={"text-center"} style={{textAlign:"center"}}>주소 : {hotelDetail.address}</p>
                        <HotelMap address={hotelDetail.address} name={hotelDetail.title} />
                        <div style={{textAlign:"right", margin: "30px"}}>
                        <button className={"btn-danger"} onClick={listClick} >목록</button>
                        </div>
                    </article>
                </div>
            </div>
        </Fragment>
    )
}

export default HotelDetail;