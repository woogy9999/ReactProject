import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchHotelFind } from "../../actions/hotelActions";
import ReactPaginate from "react-paginate";

function HotelFind() {
    const dispatch = useDispatch();
    const [fd, setFd] = useState("호텔"); // 검색어 상태

    const hotelList = useSelector(state => state.hotels.hotel_find);

    useEffect(() => {
        dispatch(fetchHotelFind(fd));
    }, []);

    // 검색 버튼 클릭 또는 Enter 입력 시
    const handleSearch = () => {
        dispatch(fetchHotelFind(fd));
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };
    return (
        <>


            <div id="wrapper">

                <div id="main">

                    <article className="post">
                        <header>
                            <div className="title">
                                <h2><a href="#">호텔 검색</a></h2>
                                <p>검색어를 입력하여 호텔을 찾아보세요</p>
                            </div>
                            <div className="meta">
                                <time className="published" dateTime="2015-11-01">June 2025 개인프로젝트</time>
                                <a href="#" className="author"><span className="name">Woogy9999</span><img
                                    src="images/avatar.jpg" alt=""/></a>
                            </div>
                        </header>
                        <section>


                            <div style={{display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px"}}>
                                    <input style={{width: "150px", height: "45px"}}
                                        type="text"
                                        size="25"
                                        className="input-group-sm"
                                        value={fd}
                                        onChange={(e) => setFd(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                    />
                                    <button className="btn-sm btn-primary ml-2" onClick={handleSearch}>
                                        검색
                                    </button>
                            </div>


                            <div className="hotel-grid">

                                {hotelList.map((hotel) => (
                                    <div className="hotel-card" key={hotel.NO}>
                                        <img src={hotel.POSTER} alt={hotel.title} className="hotel-image" />
                                        <div className="hotel-info">
                                            <Link to={"/hotel/detail/"+hotel.NO}>
                                                <h3 className="hotel-title">{hotel.TITLE}</h3>
                                            </Link>
                                            <p className="hotel-address">{hotel.ADDRESS}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </section>

                    </article>

                </div>
            </div>
        </>
    )
}

export default HotelFind;