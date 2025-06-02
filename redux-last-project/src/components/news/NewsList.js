import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {useState, useEffect, Fragment, useRef} from "react";
import {fetchNewsData} from "../../actions/mainActions";

function NewsList() {
    const dispatch = useDispatch();
    const [fd, setFd] = useState("맛집");
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
            <div className="breadcumb-area" style={{"backgroundImage": "url(/img/bg-img/breadcumb.jpg)"}}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12">
                            <div className="bradcumb-title text-center">
                                <h2>네이버 뉴스 검색</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="archive-area section_padding_80">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
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
                </div>
            </section>
            <section className="archive-area section_padding_80">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <table className="table">
                                <tbody>
                                <tr>
                                    <td>
                                        {
                                            newsList.items && newsList.items.map(news=>
                                                <table className="table">
                                                    <tbody>
                                                    <tr>
                                                        <td className={"text-left"}><h3 style={{color:"orange"}} dangerouslySetInnerHTML={{__html: news.title}} /></td>
                                                    </tr>
                                                    <tr>
                                                        <td className={"text-left"}><h4 dangerouslySetInnerHTML={{ __html: news.description }} /></td>
                                                    </tr>
                                                    </tbody>
                                                </table>

                                            )
                                        }
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default NewsList;