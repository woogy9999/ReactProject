import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {useState, useEffect, Fragment, useRef} from "react";
import {fetchNewsData} from "../../actions/mainActions";

function NewsList() {
    const dispatch = useDispatch();
    const [fd, setFd] = useState("호텔");
    const newsList = useSelector(state => state.mains.news_data);

    // 검색 키워드가 바뀔 때마다 뉴스 요청
    useEffect(() => {
        dispatch(fetchNewsData(fd));
    }, []);


    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            dispatch(fetchNewsData(fd));
        }
    };
    const handleSearch = () => {
        dispatch(fetchNewsData(fd));
    };

    if (!newsList) return <div>Loading...</div>;
    return (
        <Fragment>
            <div id="wrapper">

                <div id="main">

                    <article className="post">
                        <header>
                            <div className="title">
                                <h2><a href="#">네이버 뉴스 검색</a></h2>
                                <p>검색어를 입력하여 뉴스를 찾아보세요</p>
                            </div>
                            <div className="meta">
                                <time className="published" dateTime="2015-11-01">June 2025 개인프로젝트</time>
                                <a href="#" className="author"><span className="name">Woogy9999</span><img
                                    src="images/avatar.jpg" alt=""/></a>
                            </div>
                        </header>

                        <section className="archive-area section_padding_80">
                            <div className="container">
                                <div className="row">
                                    <div style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        marginBottom: "20px"
                                    }}>
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
                                </div>
                            </div>
                        </section>

                                        <table className="table">
                                            <tbody>
                                            <tr>
                                                <td>
                                                    {
                                                        newsList.items && newsList.items.map(news =>
                                                            <table className="table">
                                                                <tbody>
                                                                <tr>
                                                                    <td className={"text-left"}><h2
                                                                        style={{color: "orange"}}
                                                                        dangerouslySetInnerHTML={{__html: news.title}}/>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className={"text-left"}><p
                                                                        dangerouslySetInnerHTML={{__html: news.description}}/>
                                                                    </td>
                                                                </tr>
                                                                </tbody>
                                                            </table>
                                                        )
                                                    }
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                    </article>
                </div>
            </div>
        </Fragment>
    )
}

export default NewsList;