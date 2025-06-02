import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {useState, useEffect, Fragment} from "react";
import {fetchNatureList} from "../../actions/guestActions";

function NatureList() {
    const dispatch = useDispatch();
    const [curpage, setCurpage] = useState(1);
    useEffect(() => {
        dispatch(fetchNatureList(curpage));
    }, [curpage]);

    const guestList=useSelector(state=>state.guests.nature_list)

    const prev = () => {
        setCurpage(prev => Math.max(1, prev - 1));
    };

    const next = () => {
        setCurpage(prev => Math.min(guestList.totalpage, prev + 1));
    };

    if (!guestList || !guestList.list) return <div>Loading...</div>;
    return (
        <Fragment>

            <div id="wrapper">

                <div id="main">

                    <article className="post">
                        <header>
                            <div className="title">
                                <h2><a href="#">자연환경 리스트</a></h2>
                                <p>페이지를 선택하여 원하는 자연을 찾아보세요</p>
                            </div>
                            <div className="meta">
                                <time className="published" dateTime="2015-11-01">June 2025 개인프로젝트</time>
                                <a href="#" className="author"><span className="name">Woogy9999</span><img
                                    src="images/avatar.jpg" alt=""/></a>
                            </div>
                        </header>
                        <section>
                            <div className="hotel-grid">
                                {guestList.list.map((guest) => (
                                    <div className="hotel-card" key={guest.no}>
                                        <img src={guest.poster} alt={guest.title} className="hotel-image"
                                             onError={(e) => {
                                                 e.target.onerror = null;
                                                 e.target.src = "/noimg.jpg";
                                             }}/>
                                        <div className="hotel-info">
                                            <Link to={"#"}>
                                                <h3 className="hotel-title">{guest.title}</h3>
                                            </Link>
                                            <p className="hotel-address">{guest.address}</p>
                                        </div>
                                    </div>
                                ))}

                                <div className="col-12">
                                    <div className="pagination-area d-sm-flex mt-15">
                                        <nav aria-label="#">
                                            <button className={"btn-sm btn-info"}  onClick={prev}>이전</button>
                                            <button className={"btn-sm btn-info"} onClick={next}>다음</button>
                                        </nav>
                                        <div className="page-status">
                                            <p>Page {guestList.curpage} of {guestList.totalpage} results</p>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </section>

                    </article>


                </div>
            </div>
        </Fragment>
    )


}
export default NatureList;