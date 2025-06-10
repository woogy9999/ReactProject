import {Fragment,useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {AxiosResponse} from "axios";
import apiClient from "../../http-commons";
import {Link} from "react-router-dom";
import PagePrint from "../commons/PagePrint";
/*
"no": 1,
      "goods_discount": 61,
      "hit": 28,
      "likecount": 0,
      "replycount": 0,
      "goods_name": "홈쇼핑 완판 켄트 초미세모 칫솔 6개",
      "goods_sub": "초미세모로 연약한 잇몸을 지켜주세요!",
      "goods_price": "19,900원",
      "goods_first_price": "18,905원",
      "goods_delivery": "무료배송",
      "goods_poster": "https://recipe1.ezmember.co.kr/cache/data/goods/19/06/24/1000001822/1000001822_detail_034.jpg",
      "num": 0
 */
interface Goods{
    no: number;
    goods_discount: number;
    hit: number;
    likecount: number;
    replycount: number;
    goods_name: string;
    goods_sub: string;
    goods_price: string;
    goods_first_price: string;
    goods_delivery: string;
    goods_poster: string;
    num: number;

}
interface GoodsListProps{
    list:Goods[];
    totalpage:number;
    curpage:number;
    startPage:number;
    endPage:number;
}


function GoodsList() {
    const [curpage, setCurpage] = useState<number>(1);
    const {isLoading,isError,error,data}=useQuery<AxiosResponse<GoodsListProps>,Error>({
        queryKey:["goods-list",curpage], // 키 변경 => 서버연결
        queryFn: async ()=>{
            return await apiClient.get(`/goods/list/${curpage}`);
        }
    })
    if(isLoading){
        return <h3 className={"text-center"}>Loading...</h3>
    }
    if(isError)
        return <h3 className={"text-center"}>{error?.message}</h3>;

    console.log(data?.data)
    return (
        <Fragment>
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
                                    <h1>상품 목록</h1>
                                    <p className="text-center" style={{height: "300px"}}>페이지를 선택하여 상품을 찾아보세요</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div id="fh5co-work-section">
                <div className="container">
                    <div className="row text-center">
                        {
                            data?.data.list.map((goods:Goods,index:number)=>

                                <div className="col-md-4 col-sm-6" key={index}>
                                    <div className="fh5co-grid-work">
                                        <div className="work-holder">
                                            <Link to={`/goods/detail/${goods.no}`}><img src={goods.goods_poster} alt="Work" style={{width:"340px",height:"260px"}}/></Link>
                                            <Link to={`/goods/detail/${goods.no}`} className="inner-overlay inner-overlay-2"><i className="icon-plus"></i></Link>
                                        </div>
                                        <div className="desc">
                                            <h3><a href={`/goods/detail/${goods.no}`}><p style={{margin:"0px"}}>{goods.goods_name}</p></a></h3>
                                            <p >{goods.goods_price}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        <div className="col-md-12 text-center">
                            <nav aria-label="Page navigation" className="pagination-container">
                                {data && <PagePrint data={data.data} setCurpage={setCurpage} />}
                            </nav>
                            <p className="text-muted">
                                Page {curpage} of {data?.data.totalpage} results
                            </p>
                        </div>


                    </div>

                </div>
            </div>


        </Fragment>
    )
}

export default GoodsList;