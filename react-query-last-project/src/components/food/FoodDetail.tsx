import {Fragment, useEffect, useRef, useState} from "react";
import {useMutation, useQuery} from "@tanstack/react-query";
import {useNavigate,useParams} from "react-router-dom";
import apiClient from "../../http-commons";
import FoodMap from "./FoodMap";
import {AxiosError} from "axios";
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
interface CommentData{
    no:number;
    fno:number;
    name:string;
    id:string;
    msg:string;
    dbday:string;
}
interface FoodResponse{
    data:{
        foods:FoodDetailData,
        comments:CommentData[]
    };
}

function FoodDetail(){
    // FoodList에서 들어오는 값
    const {fno}=useParams<{fno:string}>()
    const nav = useNavigate();
    const [msg,setMsg]=useState<string>("")
    const [no,setNo]=useState<number>(0)
    const [editMode, setEditMode] = useState<number | null>(null); // 수정 중인 댓글 번호
    const [editMsg, setEditMsg] = useState<string>("");            // 수정할 메시지

    const msgRef=useRef<HTMLTextAreaElement|null>(null)

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


    const {mutate:commentInsert} =useMutation<FoodResponse, AxiosError>({
        mutationKey:['comment-insert'],
        mutationFn: async()=>await apiClient.post(`/comment/insert`,{
                fno:fno,
                id:sessionStorage.getItem("id"),
                name:sessionStorage.getItem("name"),
                msg:msg
        }),
        onSuccess:(data:FoodResponse)=>{

        },
        onError:(error:AxiosError)=>{
            console.log(error)
        }
    })
    //삭제
    const {mutate:commentDelete}=useMutation<FoodResponse, AxiosError, number>({
        mutationKey:['comment-delete'],
        mutationFn:async (no:number)=>await apiClient.delete(`/comment/delete/${no}/${fno}`,{

        }),
        onSuccess:(data:FoodResponse)=>{

        },
        onError:(error)=>{
            console.log(error)
        }
    })


    //수정
    const { mutate: commentUpdate } = useMutation<FoodResponse, AxiosError, { no: number; msg: string }>({
        mutationKey: ['comment-update'],
        mutationFn: async ({ no, msg }) =>
            await apiClient.put(`/comment/update`, { no, msg }),
        onSuccess: () => {
            setEditMode(null);
            setEditMsg("");
            window.location.reload();
        },
        onError: (error) => {
            console.log(error);
        }
    });

    if(isLoading){
        return <h3 className={"text-center"}>Loading...</h3>
    }
    if(isError)
        return <h3 className={"text-center"}>{error?.message}</h3>;



    const food:FoodDetailData|undefined=data?.data.foods
    console.log(food)
    const comments:CommentData[]|undefined=data?.data.comments
    console.log(comments)

    const insert=():void=>{
        if(msg==="")
        {
            msgRef.current?.focus()
            return;
        }
        commentInsert()
        window.location.reload();
    }

    const del=(no:number):void=>{
        commentDelete(no)
        window.location.reload();
    }

    const handleUpdate = (no: number): void => {
        if (editMsg.trim() === "") {
            alert("수정할 내용을 입력하세요");
            return;
        }
        commentUpdate({ no, msg: editMsg });
    };

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
                        <div className={"row"} style={{marginTop:"20px"}}>
                            <table className={"table"}>
                                <tbody>
                                    <tr>
                                        <td>
                                            {
                                                comments && comments.map((com:CommentData,index:number)=>
                                                    <table className={"table"} key={index}>
                                                        <tbody>
                                                            <tr>
                                                                <td width={"80%"} className={"text-left"}>
                                                                    👉{com.name}({com.dbday})
                                                                </td>
                                                                <td width={"20%"} className={"text-right"}>
                                                                    {
                                                                        com.id === sessionStorage.getItem("id") && (
                                                                            <span>
                                                                                {
                                                                                    editMode === com.no ? (
                                                                                        <>
                                                                                            <button className={"btn-sm btn-success"} onClick={() => handleUpdate(com.no)}>완료</button>&nbsp;
                                                                                            <button className={"btn-sm btn-secondary"} onClick={() => setEditMode(null)}>취소</button>
                                                                                        </>
                                                                                    ) : (
                                                                                        <>
                                                                                            <button className={"btn-sm btn-warning"} onClick={() => {
                                                                                                setEditMode(com.no);
                                                                                                setEditMsg(com.msg);
                                                                                            }}>수정</button>&nbsp;
                                                                                            <button className={"btn-sm btn-danger"} onClick={() => del(com.no)}>삭제</button>
                                                                                        </>
                                                                                    )
                                                                                }
                                                                            </span>
                                                                        )
                                                                    }
                                                                </td>
                                                            </tr>
                                                        <tr>
                                                            <td colSpan={2} valign={"top"}>
                                                                {
                                                                    editMode === com.no ? (
                                                                        <textarea
                                                                            className="form-control"
                                                                            rows={3}
                                                                            value={editMsg}
                                                                            onChange={(e) => setEditMsg(e.target.value)}
                                                                        ></textarea>
                                                                    ) : (
                                                                        <pre style={{ whiteSpace: "pre-wrap", backgroundColor: "white", border: "gray" }}>{com.msg}</pre>
                                                                    )
                                                                }
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
                            {
                                window.sessionStorage.getItem("id") &&

                                    <table className={"table"}>
                                        <tbody>
                                        <tr>
                                            <td>
                                                <textarea rows={4} cols={115} style={{"float":"left" , width:"90%"}}
                                                 ref={msgRef}
                                                 onChange={(e)=>setMsg(e.target.value)}
                                                ></textarea>
                                                <button className={"btn-primary"}
                                                 style={{"float":"left",width:"10%",height:"95px"}}
                                                 onClick={insert}
                                                >댓글쓰기</button>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>

                            }
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}
export default FoodDetail;