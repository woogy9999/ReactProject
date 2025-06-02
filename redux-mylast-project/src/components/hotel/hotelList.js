import {Fragment, useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchHotelList} from "../../actions/hotelActions";
import ReactPaginate from 'react-paginate';
import {Link} from "react-router-dom";

function HotelList() {


    const dispatch = useDispatch();
    const [curpage, setcurpage] = useState(1);
    useEffect(() => {
        // 리렌더링
        dispatch(fetchHotelList(curpage));

    }, [curpage]);

    const hotelList = useSelector(state => state.hotels.hotel_list);
    if (!hotelList || !hotelList.list) return <div>Loading...</div>;


    return (
        <Fragment>

            <div id="wrapper">

                <div id="main">

                    <article className="post">
                        <header>
                            <div className="title">
                                <h2><a href="#">호텔 리스트</a></h2>
                                <p>페이지를 선택하여 원하는 호텔을 찾아보세요</p>
                            </div>
                            <div className="meta">
                                <time className="published" dateTime="2015-11-01">June 2025 개인프로젝트</time>
                                <a href="#" className="author"><span className="name">Woogy9999</span><img
                                    src="images/avatar.jpg" alt=""/></a>
                            </div>
                        </header>
                        <section>
                            <div className="hotel-grid">
                                {hotelList.list.map((hotel) => (
                                    <div className="hotel-card" key={hotel.no}>
                                        <img src={hotel.poster} alt={hotel.title} className="hotel-image" />
                                        <div className="hotel-info">
                                            <Link to={"/hotel/detail/"+hotel.no}>
                                            <h3 className="hotel-title">{hotel.title}</h3>
                                            </Link>
                                            <p className="hotel-address">{hotel.address}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </section>

                    </article>
                    <ReactPaginate
                        pageCount={hotelList.totalpage}
                        onPageChange={(data) => setcurpage(data.selected + 1)}
                        containerClassName="pagination"
                        previousLabel={"이전"}
                        nextLabel={"다음"}
                        pageRangeDisplayed={5}
                        marginPagesDisplayed={0}
                        activeClassName={"active"}
                        breakLabel={"..."}
                    />

                </div>
            </div>
        </Fragment>
    )

}

export default HotelList;