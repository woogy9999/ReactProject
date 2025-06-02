import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchFoodFind } from "../../actions/foodActions";

function FoodFind() {
    const dispatch = useDispatch();
    const [fd, setFd] = useState("부산"); // 검색어 상태

    const foodList = useSelector(state => state.foods.food_find);

    useEffect(() => {
            dispatch(fetchFoodFind(fd));
    }, []);

    // 검색 버튼 클릭 또는 Enter 입력 시
    const handleSearch = () => {
            dispatch(fetchFoodFind(fd));
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };
    return (
        <>
            <div className="breadcumb-area" style={{"backgroundImage": "url(/img/bg-img/breadcumb.jpg)"}}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12">
                            <div className="bradcumb-title text-center">
                                <h2>맛집 검색</h2>
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
                    <div className="row" style={{"marginTop":"10px"}}>
                        {
                            foodList && foodList.map((food) =>
                                <div className="col-12 col-md-6 col-lg-4">
                                    <div className="single-post wow fadeInUp" data-wow-delay="0.1s">

                                        <div className="post-thumb">
                                            <Link to={"/food/detail/"+food.FNO}>
                                                <img src={"https://www.menupan.com" + food.POSTER}/>
                                            </Link>
                                        </div>

                                        <div className="post-content">
                                            <div className="post-meta d-flex">
                                                <div className="post-author-date-area d-flex">

                                                    <div className="post-author">
                                                        <a href="#">{food.TYPE}</a>
                                                    </div>

                                                    <div className="post-date">
                                                        <a href="#">{food.SCORE}</a>
                                                    </div>
                                                </div>

                                                <div className="post-comment-share-area d-flex">

                                                    <div className="post-favourite">
                                                        <a href="#"><i className="fa fa-heart-o"
                                                                       aria-hidden="true"></i> {food.LIKECOUNT}</a>
                                                    </div>

                                                    <div className="post-comments">
                                                        <a href="#"><i className="fa fa-comment-o"
                                                                       aria-hidden="true"></i> {food.HIT}</a>
                                                    </div>

                                                    <div className="post-share">
                                                        <a href="#"><i className="fa fa-share-alt"
                                                                       aria-hidden="true"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <Link to={"/food/detail/"+food.FNO}>
                                                <h4 className="post-headline">{food.NAME}</h4>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        }


                    </div>
                </div>
            </section>
        </>
    )
}

export default FoodFind;