import {useQuery} from "@tanstack/react-query";
import {useNavigate,useParams} from "react-router-dom"
import {getCookie,setCookie} from "../util/cookie";
import apiClient from "../../http-commons";
import FoodMap from "./FoodMap";

function FoodDetail() {
    const {fno} =useParams();

    const nav= useNavigate();

    // 서버에서 출력에 필요한 데이터 읽기

    const {isLoading,isError,error,data} =useQuery({
        queryKey:["food-detail",fno],
        queryFn: async () =>{
            return await apiClient.get(`/food/detail/${fno}`);
        }

    })
    if (isLoading) {
        return <h3 className={"text-center"}>서버 데이터 전송 지연...</h3>
    }
    if (isError) {
        return <h3 className={"text-center"}>서버 에러 발생:{error.message}</h3>;
    }
    console.log(data)
    console.log("fno 확인:", fno);
    setCookie("food" + fno, data.data.poster);

    return (
        <div className="container">
            <div className="row">
                <table className={"table"}>
                    <tbody>
                    <tr>
                        <td width={"30%"} rowSpan={"8"} className="text-center">
                            <img src={"http://www.menupan.com"+data.data.poster} style={{width:"320px",height:"430px"}} />

                        </td>
                        <td colSpan={"2"}>
                            <h3>{data.data.name}&nbsp;<span style={{color:"orange"}}>{data.data.score}</span> </h3>
                        </td>

                    </tr>
                    <tr>
                        <td width={"20%"} style={{color:"gray"}}>주소</td>
                        <td width={"50%"} >{data.data.address}</td>
                    </tr>
                    <tr>
                        <td width={"20%"} style={{color:"gray"}}>전화</td>
                        <td width={"50%"} >{data.data.phone}</td>
                    </tr>
                    <tr>
                        <td width={"20%"} style={{color:"gray"}}>음식종류</td>
                        <td width={"50%"} >{data.data.type}</td>
                    </tr>
                    <tr>
                        <td width={"20%"} style={{color:"gray"}}>가격대</td>
                        <td width={"50%"} >{data.data.price}</td>
                    </tr>
                    <tr>
                        <td width={"20%"} style={{color:"gray"}}>주차</td>
                        <td width={"50%"} >{data.data.parking}</td>
                    </tr>
                    <tr>
                        <td width={"20%"} style={{color:"gray"}}>영업시간</td>
                        <td width={"50%"} >{data.data.time}</td>
                    </tr>
                    <tr>
                        <td width={"20%"} style={{color:"gray"}}>테마</td>
                        <td width={"50%"} >{data.data.theme}</td>
                    </tr>

                    </tbody>
                </table>
                <table className={"table"}>
                    <tbody>
                    <tr>
                        <td>{data.data.content}</td>
                    </tr>
                    <tr>
                        <td className={"text-right"}>
                            <button className="btn-sm btn-danger" onClick={() => nav(-1)}>
                                목록
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <FoodMap address={data.data.address} name={data.data.name} />
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default FoodDetail;