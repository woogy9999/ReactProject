import { useEffect, Fragment } from "react";
import {useQuery} from "@tanstack/react-query";
import apiClient from "../../http-commons";
import {Link} from "react-router-dom";
/*
"no": 2,
      "goods_discount": 31,
      "hit": 4,
      "likecount": 0,
      "replycount": 0,
      "goods_name": "[만개특가] 영양간식 스트롱숏다리 1봉 20-32미(250g)",
      "goods_sub": "씹고 뜯고 맛보고 즐기고! 스트롱 숏다리",
      "goods_price": "8,900원",
      "goods_first_price": "8,455원",
      "goods_delivery": "무료배송",
      "goods_poster": "https://recipe1.ezmember.co.kr/cache/data/goods/21/07/28/1000021160/1000021160_detail_042.jpg",
      "num": 0
 */
interface MainData{
    list1:{
        no: number;
        poster: string;
        goods_name: string;
        goods_sub: string;
        goods_poster:string;
        num: number;
    }[];
}
function Home() {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "/js/main.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const {isLoading,isError,error,data}=useQuery<{data:MainData},Error>({
        queryKey:["main-data"],
        queryFn:async () => await apiClient.get("/main")
    })

    console.log(data?.data);




    return (
        <Fragment>
            <div className="owl-carousel owl-carousel1 owl-carousel-fullwidth fh5co-light-arrow animate-box"
                 data-animate-effect="fadeIn">
                <div className="item"><a href="images/featured-1.jpg" className="image-popup">
                    <img src="images/featured-1.jpg" alt="image" /></a></div>
                <div className="item"><a href="images/featured-2.jpg" className="image-popup">
                    <img src="images/featured-2.jpg" alt="image"/></a></div>
            </div>







            <div id="fh5co-blog-section">
                <div className="container">
                    <div className="heading-section text-center">
                        <h2>서울 자연</h2>
                    </div>
                    <div className="row">
                        {
                        data?.data.list1.map((goods, index:number) => (


                        <div className="col-md-4 blog-section">
                            <span>0{index+1} <small>June 2025</small></span>
                            <Link to={`/goods/detail/${goods.no}`}><img src={goods.goods_poster} alt="Work" style={{width:"340px",height:"260px"}}/></Link>
                                <h3><Link to={`/goods/detail/${goods.no}`}>{goods.goods_name}</Link></h3>

                        </div>

                        ))
                        }
                    </div>
                </div>
            </div>




            <div className="fh5co-parallax"
                 style={{backgroundImage: 'url(../images/hero-1.jpg)', height: "300px"}}
                 data-stellar-background-ratio="0.5">
                <div className="overlay"></div>
                <div className="container">
                    <div className="row">
                        <div
                            className="col-md-8 col-md-offset-2 col-sm-12 col-sm-offset-0 col-xs-12 col-xs-offset-0 text-center fh5co-table">
                            <div className="fh5co-intro fh5co-table-cell">
                                <div className="text-center" style={{height: "300px"}}>
                                    <h1>추천 장소</h1>
                                    <p className="text-center" style={{height: "300px"}}>선택하여 상세 페이지로 이동하세요</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="fh5co-featured-work-section">
                <div className="container-fluid">
                    <div className="heading-section text-center">
                    </div>
                    <div className="owl-carousel owl-carousel2">
                        <div className="item">
                            <img src="images/portfolio_pic1.jpg" alt="image"/>
                            <a href="#" className="pop-up-overlay text-center">
                                <div className="desc">
                                    <h3>Camera</h3>
                                    <span>Video</span>
                                </div>
                            </a>
                        </div>
                        <div className="item">
                            <img src="images/portfolio_pic2.jpg" alt="image"/>
                            <a href="#" className="pop-up-overlay pop-up-overlay-color-2 text-center">
                                <div className="desc">
                                    <h3>Workstation</h3>
                                    <span>Illustration</span>
                                </div>
                            </a>
                        </div>
                        <div className="item">
                            <img src="images/portfolio_pic3.jpg" alt="image"/>
                            <a href="#" className="pop-up-overlay pop-up-overlay-color-3 text-center">
                                <div className="desc">
                                    <h3>Mobile Phone</h3>
                                    <span>Web</span>
                                </div>
                            </a>
                        </div>
                        <div className="item">
                            <img src="images/portfolio_pic4.jpg" alt="image"/>
                            <a href="#" className="pop-up-overlay pop-up-overlay-color-4 text-center">
                                <div className="desc">
                                    <h3>Camera Lens</h3>
                                    <span>Illustration</span>
                                </div>
                            </a>
                        </div>
                        <div className="item">
                            <img src="images/portfolio_pic5.jpg" alt="image"/>
                            <a href="#" className="pop-up-overlay text-center">
                                <div className="desc">
                                    <h3>Card</h3>
                                    <span>Card</span>
                                </div>
                            </a>
                        </div>
                        <div className="item">
                            <img src="images/portfolio_pic6.jpg" alt="image"/>
                            <a href="#" className="pop-up-overlay pop-up-overlay-color-2 text-center">
                                <div className="desc">
                                    <h3>Shoes</h3>
                                    <span>Brand</span>
                                </div>
                            </a>
                        </div>
                        <div className="item">
                            <img src="images/portfolio_pic7.jpg" alt="image"/>
                            <a href="#" className="pop-up-overlay text-center">
                                <div className="desc">
                                    <h3>Magazine</h3>
                                    <span>Web</span>
                                </div>
                            </a>
                        </div>
                        <div className="item">
                            <img src="images/portfolio_pic8.jpg" alt="image"/>
                            <a href="#" className="pop-up-overlay pop-up-overlay-color-3 text-center">
                                <div className="desc">
                                    <h3>VCard</h3>
                                    <span>Card</span>
                                </div>
                            </a>
                        </div>
                        <div className="item">
                            <img src="images/portfolio_pic9.jpg" alt="image"/>
                            <a href="#" className="pop-up-overlay pop-up-overlay-color-4 text-center">
                                <div className="desc">
                                    <h3>Paper</h3>
                                    <span>Illustration</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>




        </Fragment>

    )
}

export default Home;