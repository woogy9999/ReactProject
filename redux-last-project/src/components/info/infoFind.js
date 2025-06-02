import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {useState, useEffect, Fragment} from "react";
import {fetchInfoFind } from "../../actions/infoActions";

function InfoFind(){


    const dispatch = useDispatch();
    const [fd, setFd] = useState("부산"); // 검색어 상태

    const infofind = useSelector(state => state.infos.info_find);

    useEffect(() => {
        dispatch(fetchInfoFind(fd));
    }, []);

    // 검색 버튼 클릭 또는 Enter 입력 시
    const handleSearch = () => {
        dispatch(fetchInfoFind(fd));
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    if (!infofind) return <div>Loading...</div>;
    return(
        <Fragment>
            <div className="breadcumb-area" style={{"backgroundImage": "url(/img/bg-img/breadcumb.jpg)"}}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12">
                            <div className="bradcumb-title text-center">
                                <h2>명소,쇼핑,음식 검색</h2>

                            </div>
                        </div>
                    </div>
                </div>
            </div>




            <section className="archive-area section_padding_80">
                <div className="container">
                    <div className="row">
                        <input
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
                </div>
            </section>


            <section className="archive-area section_padding_80">
                <div className="container">
                    <div className="row">
                        {infofind.map((info) => (
                            <div className="col-12 col-md-6 col-lg-4">
                                <div className="single-post wow fadeInUp" data-wow-delay="0.1s">
                                    <div className="post-thumb">
                                        <Link to={"/info/detail/"+info.NO}>
                                            <img src={info.POSTER}/>
                                        </Link>
                                    </div>
                                    <div className="post-content">
                                        <div className="post-meta d-flex">


                                        </div>
                                        <Link to={"/info/detail/"+info.NO}>
                                            <h4 className="post-headline">{info.TITLE}</h4>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </section>
        </Fragment>
    )
}
export default InfoFind