import {useDispatch, useSelector} from "react-redux";
import {useState, useEffect, Fragment} from "react";
import {fetchYoutubeFind} from "../../actions/youtubeActions";
import {Link} from "react-router-dom";
import ReactPaginate from "react-paginate";


function YoutubeFind() {
    const dispatch = useDispatch();
    const [fd, setFd] = useState("신라호텔");
    const [keyword, setKeyword] = useState("신라호텔");
    useEffect(() => {
        dispatch(fetchYoutubeFind(fd));
    }, [fd]);
    const movie = useSelector(state => state.youtubes.movie_data)
    console.log(movie)

    const handleSearch = () => {
        setFd(keyword);
    };


    return (
        <Fragment>


            <div className="breadcumb-nav" style={{marginTop: "50px"}}>
                <div className="container">
                    <div className="row">
                    </div>
                </div>
            </div>


            <div id="wrapper">

                <div id="main">

                    <article className="post">
                        <header>
                            <div className="title">
                                <h2><a href="#">검색어 기반 유튜브 영상 추출 TOP 12</a></h2>
                                <p>아래에 검색어를 입력하여 원하는 영상을 찾아보세요</p>
                            </div>
                            <div className="meta">
                                <time className="published" dateTime="2015-11-01">June 2025 개인프로젝트</time>
                                <a href="#" className="author"><span className="name">Woogy9999</span><img
                                    src="images/avatar.jpg" alt=""/></a>
                            </div>
                        </header>
                        <section>

                            <div style={{display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px"}}>
                                <input
                                    type="text"
                                    className="comm-form-input"
                                    style={{width: "150px", height: "45px"}}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    value={keyword}
                                    onKeyDown={(e) => { if (e.key === 'Enter') {
                                            handleSearch();
                                        }
                                    }}
                                />
                                <button
                                    className="btn-lg"
                                    onClick={handleSearch}
                                    style={{height: "45px", padding: "0 12px",width:"80px"}}
                                >
                                    검색
                                </button>
                            </div>
                            <div style={{marginBottom: "50px"}}></div>
                            <div className="hotel-grid">
                                {
                                    movie && movie.length > 0 ? (
                                        movie.map((m) => (
                                            <div className="hotel-card">
                                                <iframe src={"http://www.youtube.com/embed/" + m.id.videoId + "?autoplay=0"} width="100%" height={"200px"}></iframe>
                                                <div className="hotel-info">
                                                    <h4 className="post-headline">{m.snippet.title}</h4>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-12">
                                            <p className="text-center">검색 결과가 없습니다.</p>
                                        </div>
                                    )
                                }
                            </div>

                        </section>

                    </article>


                </div>
            </div>
        </Fragment>
    )
}

export default YoutubeFind;