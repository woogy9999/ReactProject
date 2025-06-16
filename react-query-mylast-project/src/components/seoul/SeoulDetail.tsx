import {Fragment, useRef, useState} from "react";
import {useMutation, useQuery} from "@tanstack/react-query";
import {useNavigate,useParams} from "react-router-dom";
import apiClient from "../../http-commons";
import SeoulMap from "./SeoulMap";
import {AxiosError} from "axios";
/*
 "sno": 1,
  "hit": 0,
  "likecount": 0,
  "replycount": 0,
  "title": "하늘공원",
  "poster": "https://korean.visitseoul.net/data/POST/20211012//202110121703032151",
  "msg": "하늘공원은 2002년 제17회 월드컵축구대회를 기념하며 난지도 쓰레기매립장을 복원하기 위해 개원한 월드컵경기장 일대 5대 공원 중 하나이다.",
  "address": "03900 서울 마포구 하늘공원로 95 (탐방객안내소)"
 */
interface SeoulDetailData{
    sno: number;
    hit: number;
    likecount: number;
    replycount: number;
    title: string;
    poster: string;
    msg: string;
    address: string;
}
interface CommentData{
    no:number;
    sno:number;
    name:string;
    id:string;
    msg:string;
    dbday:string;
}
interface SeoulResponse{
    data:{
        seouls:SeoulDetailData;
        comments:CommentData[]
    };
}
function SeoulDetail() {
    const {sno}=useParams<{sno:string}>();
    const nav=useNavigate();
    const [msg,setMsg]=useState<string>("")
    const [no,setNo]=useState<number>(0)
    const [editMode, setEditMode] = useState<number | null>(null); // 수정 중인 댓글 번호
    const [editMsg, setEditMsg] = useState<string>("");            // 수정할 메시지

    const msgRef=useRef<HTMLTextAreaElement|null>(null)

    const{isLoading,isError,error,data}=useQuery<SeoulResponse,Error>({
        queryKey:["seoul-detail",sno],
        queryFn:async ()=>{
            return await apiClient.get(`/seoul/detail/${sno}`);

        }

    })


    const {mutate:commentInsert} =useMutation<SeoulResponse, AxiosError>({
        mutationKey:['comment-insert'],
        mutationFn: async()=>await apiClient.post(`/comment/insert`,{
            sno:sno,
            id:sessionStorage.getItem("id"),
            name:sessionStorage.getItem("name"),
            msg:msg
        }),
        onSuccess:(data:SeoulResponse)=>{

        },
        onError:(error:AxiosError)=>{
            console.log(error)
        }
    })
    //삭제
    const {mutate:commentDelete}=useMutation<SeoulResponse, AxiosError, number>({
        mutationKey:['comment-delete'],
        mutationFn:async (no:number)=>await apiClient.delete(`/comment/delete/${no}/${sno}`,{

        }),
        onSuccess:(data:SeoulResponse)=>{

        },
        onError:(error)=>{
            console.log(error)
        }
    })


    //수정
    const { mutate: commentUpdate } = useMutation<SeoulResponse, AxiosError, { no: number; msg: string }>({
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

    const seoul=data?.data.seouls
    console.log(seoul)
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
            <div id="fh5co-services-section">
                <div className="container">
                    <div className="heading-section text-center">
                        <h2>자연 상세정보</h2>
                    </div>
                    <div className="row" >


                        <div className="col-md-4 text-center" style={{marginLeft:"180px"}}>
                            <div className="fhco-hero2">
                                <img className="img-responsive" src={seoul?.poster} style={{width:"1000px",height:"340px"}}/>
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
                                    <h3 style={{paddingTop:"20px"}}>{seoul?.title}</h3>
                                    <p>　</p>
                                </div>
                            </div>
                            <div className="fh5co-services">
                                <div className="fh5co-table2 fh5co-table2-color-5 text-center">
                                    <div className="fh5co-table-cell2">
                                        <i className="icon-gears"></i>
                                    </div>
                                </div>
                                <div className="holder-section">
                                </div>
                            </div>
                            <div className="fh5co-services">
                                <div className="fh5co-table2 fh5co-table2-color-6 text-center">
                                    <div className="fh5co-table-cell2">
                                        <i className="icon-piechart"></i>
                                    </div>
                                </div>
                                <div className="holder-section">
                                    <h3>주소 : {seoul?.address}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h2 style={{textAlign:"center"}}>{seoul?.msg}</h2>

                    <div style={{marginTop:"20px"}}>
                        <table className="table">
                            <tbody>
                            <tr>
                                <td className={"text-center"}>
                                    {
                                        seoul &&
                                        <SeoulMap address={seoul?.title}/>
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
            </div>
        </Fragment>
    )
}

export default SeoulDetail;