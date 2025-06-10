import {Fragment,useEffect} from "react";
import {useQuery} from "@tanstack/react-query";
import {useNavigate,useParams} from "react-router-dom";
import apiClient from "../../http-commons";
import FoodMap from "./FoodMap";
// react / vue => 화면 UI (HTML)
// 서버로부터 데이터를 어떻게 받을까? => 속도
// 같은 값을 가지고 오는 경우 => 어떻게 처리 : cache => 키
// => class형식 : function 형식 => 값을 유지할 수 있는 변수 => useState() => Hooks => 16버전
/*
      하위 태그에 전송 => props (태그의 속성값)
      -------- 많은 경우에 => 전송이 많다 ------- store => redux => 단순한 프로그램

      웹사이트 개발
      ----------- spring / db => 나올 수 있는 모든 내용이
                  ------------
                  | 유지보수 : Front (Jquery => Vue , react)
                  | 각 업체에서 서버 담당 : MSA
                    ------------------ NodeJS


 */
interface FoodDetailData {
    fno:number;
    hit:number;
    jjimcount:number;
    likecount:number;
    replycount:number;
    score:number;
    name:string;
    type:string;
    phone:string;
    address:string;
    theme:string;
    poster:string;
    images:string;
    time:string;
    parking:string;
    content:string;
    price:string;
    rdays:string;
}
interface FoodResponse{
    data:FoodDetailData;
}
function FoodDetail(){
    // FoodList에서 들어오는 값
    const {fno}=useParams<{fno:string}>()
    const nav = useNavigate();
    // link:PUSH , back:POP
    /*
          let a=10
          a=""

          let a:number=10
     */
    // 서버 연결
    const {isLoading,isError,error,data}=useQuery<FoodResponse,Error>({
        queryKey:['food-detail',fno],
        queryFn: async () => await apiClient.get(`/food/detail/${fno}`),
        enabled:!!fno // fno가 존재할때만 실행
    })

    if(isLoading){
        return <h3 className={"text-center"}>Loading...</h3>
    }
    if(isError)
        return <h3 className={"text-center"}>{error?.message}</h3>;

    const food=data?.data
    console.log(food)
    return (
        <Fragment>
            <div className="breadcumb-area" style={{"backgroundImage": "url(/img/bg-img/breadcumb.jpg)"}}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12">
                            <div className="bradcumb-title text-center">
                                <h2>맛집 상세보기</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="archive-area section_padding_80">
                <div className="container">
                    <div className="row">

                        <table className="table">
                            <tbody>
                            <tr>
                                <td width={"30%"} className="text-center" rowSpan={8}>
                                    <img src={`https://www.menupan.com${food?.poster}`} alt={""}
                                         style={{width:"350px",height:"300px"}}
                                    />
                                </td>
                                <td colSpan={2}><h3>{food?.name}&nbsp;<span style={{color:"orange"}}>{food?.score}</span></h3></td>
                            </tr>
                            <tr>
                                <td width={"15%"} className="text-center">주소</td>
                                <td width={"55%"}>{food?.address}</td>
                            </tr>
                            <tr>
                                <td width={"15%"} className="text-center">전화</td>
                                <td width={"55%"}>{food?.phone}</td>
                            </tr>
                            <tr>
                                <td width={"15%"} className="text-center">음식종류</td>
                                <td width={"55%"}>{food?.type}</td>
                            </tr>
                            <tr>
                                <td width={"15%"} className="text-center">가격대</td>
                                <td width={"55%"}>{food?.price}</td>
                            </tr>
                            <tr>
                                <td width={"15%"} className="text-center">영업시간</td>
                                <td width={"55%"}>{food?.time}</td>
                            </tr>
                            <tr>
                                <td width={"15%"} className="text-center">주차</td>
                                <td width={"55%"}>{food?.parking}</td>
                            </tr>
                            <tr>
                                <td width={"15%"} className="text-center">테마</td>
                                <td width={"55%"}>{food?.theme}</td>
                            </tr>
                            </tbody>
                        </table>
                        <table className="table">
                            <tbody>
                            <tr>
                                <td>{food?.content}</td>
                            </tr>
                            <tr>
                                <td className={"text-right"}>
                                    <button className={"btn-sm btn-primary"}
                                            onClick={()=>{nav(-1)}}
                                    >목록</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <table className="table">
                            <tbody>
                            <tr>
                                <td className={"text-center"}>
                                    {
                                        food &&
                                        <FoodMap address={food?.address} name={food?.name}/>
                                    }

                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}
export default FoodDetail;