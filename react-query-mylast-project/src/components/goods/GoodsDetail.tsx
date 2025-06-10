import {Fragment} from "react";
import {useQuery} from "@tanstack/react-query";
import {useNavigate,useParams} from "react-router-dom";
import apiClient from "../../http-commons";
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
interface GoodsDetailData{
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
interface GoodsResponse{
    data:GoodsDetailData;
}
function GoodsDetail() {
    const {no}=useParams<{no:string}>();
    const nav=useNavigate();

    const{isLoading,isError,error,data}=useQuery<GoodsResponse,Error>({
        queryKey:["goods-detail",no],
        queryFn:async ()=>{
            return await apiClient.get(`/goods/detail/${no}`);

        }

    })
    if(isLoading){
        return <h3 className={"text-center"}>Loading...</h3>
    }
    if(isError)
        return <h3 className={"text-center"}>{error?.message}</h3>;

    const goods=data?.data
    console.log(goods)
    return (
        <Fragment>
            <div id="fh5co-services-section">
                <div className="container">
                    <div className="heading-section text-center">
                        <h2>상품 상세정보</h2>
                    </div>
                    <div className="row" >


                        <div className="col-md-4 text-center" style={{marginLeft:"180px"}}>
                            <div className="fhco-hero2">
                                <img className="img-responsive" src={goods?.goods_poster} alt="iphone6"/>
                            </div>
                        </div>

                        <div className="col-md-4 col-sm-6">
                            <div className="fh5co-services">
                                <div className="fh5co-table2 fh5co-table2-color-4 text-center">
                                    <div className="fh5co-table-cell2">
                                        <i className="icon-mobile"></i>
                                    </div>
                                </div>
                                <div className="holder-section">
                                    <h3>{goods?.goods_name}</h3>
                                </div>
                            </div>
                            <div className="fh5co-services">
                                <div className="fh5co-table2 fh5co-table2-color-5 text-center">
                                    <div className="fh5co-table-cell2">
                                        <i className="icon-gears"></i>
                                    </div>
                                </div>
                                <div className="holder-section">
                                    <h3>할인율 : {goods?.goods_discount} %</h3>
                                    <p><s>{goods?.goods_price}</s>  /  {goods?.goods_first_price}</p>
                                </div>
                            </div>
                            <div className="fh5co-services">
                                <div className="fh5co-table2 fh5co-table2-color-6 text-center">
                                    <div className="fh5co-table-cell2">
                                        <i className="icon-piechart"></i>
                                    </div>
                                </div>
                                <div className="holder-section">
                                    <h3>배송 타입 : {goods?.goods_delivery}</h3>
                                    <p>상품 조회수 : {goods?.hit}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                        <h2 style={{textAlign:"center"}}>{goods?.goods_sub}</h2>

                </div>
            </div>
        </Fragment>
    )
}

export default GoodsDetail;