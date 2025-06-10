import {Fragment} from "react";
import apiClient from "../../http-commons";
import {useNavigate,useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
/*
"no": 45,
    "poster": "https://recipe1.ezmember.co.kr/cache/recipe/2021/05/09/690eee93772000f919b9a47c6dd962801.jpg",
    "title": "단무지 만들기! 집에서 김밥용 단무지 만들기, 천연재료로 건강한 단무지 쉽게 만들기.",
    "chef": "곰배밥상",
    "chef_poster": "https://recipe1.ezmember.co.kr/cache/rpf/2020/07/13/0ff52b558e9d68e482b13684c94274581.8f18d2d3db2fca10951484655149d7db",
    "chef_profile": "최고의 밥상! 집밥을 즐기는 평범한 주부입니다~^^ 유튜브 채널입니다 https://www.youtube.com/channel/UC3sHmNI9ugvzJ7XBPwlpxCw",
    "info1": "6인분 이상",
    "info2": "30분 이내",
    "info3": "아무나",
    "content": "아직은 김장용 제주 무가 가격도 저렴하면서 상태도 좋아서 장아찌 담가놓고 무김치 담가 놓고 그래도 아쉬워서 단무지를 만들어 봤어요~~ https://youtu.be/Dq7D2OWxJqQ 영상으로 조리과정을 확인하셔도 좋아요~",
    "foodmake" : "asd"
 */
interface RecipeDetailData{
    no:number;
    poster:string;
    title:string;
    chef:string;
    chef_poster:string;
    chef_profile:string;
    info1:string;
    info2:string;
    info3:string;
    content:string;
    foodmake:string;
    data:string;
}
interface RecipeDetailResponse{
    vo:RecipeDetailData;
    iList:[];
    dList:[];
    mList:[];
}

interface RealResponse{
    data:RecipeDetailResponse;
}



function RecipeDetail() {
    const {no}=useParams();
    const nav = useNavigate();
    const {isLoading,isError,error,data}=useQuery<RealResponse,Error>({
        queryKey:['recipe-detail',no],
        queryFn:async ()=> await apiClient.get(`/recipe/detail/${no}`)
    });


    if(isLoading){
        return <h3 className={"text-center"}>Loading...</h3>
    }
    if(isError)
        return <h3 className={"text-center"}>{error?.message}</h3>;

    const recipe=data?.data
    console.log(recipe)
    return(
        <Fragment>
            <div className="breadcumb-area" style={{"backgroundImage": "url(/img/bg-img/breadcumb.jpg)"}}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12">
                            <div className="bradcumb-title text-center">
                                <h2>레시피 상세보기</h2>
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
                                    <td colSpan={3} className={"text-center"}>
                                        <img src={recipe?.vo.poster} alt={""} style={{width:"600px",height:"250px"}}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3} className={"text-center"}>
                                        {recipe?.vo.title}
                                    </td>
                                </tr>

                                <tr>
                                    <td colSpan={3} className={"text-center"}>
                                        {recipe?.vo.content}
                                    </td>
                                </tr>
                                <tr>
                                    <td className={"text-center"}><img src={"/icon/a1.png"} /></td>
                                    <td className={"text-center"}><img src={"/icon/a2.png"} /></td>
                                    <td className={"text-center"}><img src={"/icon/a3.png"} /></td>
                                </tr>

                                <tr>
                                    <td className={"text-center"}>{recipe?.vo.info1}</td>
                                    <td className={"text-center"}>{recipe?.vo.info2}</td>
                                    <td className={"text-center"}>{recipe?.vo.info3}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td><h3>[재료]</h3></td>
                                </tr>
                                <tr>
                                    <td>
                                        <ul>
                                            {
                                                recipe?.dList.map((datas:string)=>{
                                                    return <li>{datas}</li>
                                                })
                                            }
                                        </ul>


                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table className={"table"}>
                            <tbody>
                            <tr>
                                <td>
                                    {
                                        recipe?.mList.map((fm:string,index:number)=>
                                            <table className={"table"}>
                                                 <tbody>
                                                 <tr>
                                                     <td className={"text-left"} width={"80%"}>{fm}</td>
                                                     <td className={"text-right"} width={"20%"}>
                                                         <img src={recipe.iList[index]} alt={""} style={{"width":"100px","height":"80px"}}/>
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
                        <table className={"table"}>
                            <tr>
                                <td colSpan={2}><h3>레시피 작성자</h3></td>
                            </tr>
                            <tr>
                                <td width={"30%"} className={"text-center"}>
                                    <img src={recipe?.vo.chef_poster} alt={""} style={{"width":"100px","height":"80px"}}/>
                                </td>
                                <td width={"70%"} >
                                    <h3 className={"text-left"} >{recipe?.vo.chef}</h3><br/>
                                    {recipe?.vo.chef_profile}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} className={"text-right"}>
                                    <button className={"btn-sm btn-danger"}
                                            onClick={()=>nav(-1)}
                                    >목록</button>
                                </td>
                            </tr>
                        </table>

                    </div>
                </div>
            </section>
        </Fragment>
    )
}
export default RecipeDetail;