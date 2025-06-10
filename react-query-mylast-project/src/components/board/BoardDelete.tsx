import {useParams, useNavigate} from "react-router-dom";
import apiClient from "../../http-commons";
import {useMutation} from "@tanstack/react-query";
import {Fragment, useRef, useState} from "react";

function BoardDelete() {
    const {no} = useParams<{ no: string }>();
    const nav = useNavigate();
    const pwdRef = useRef<HTMLInputElement>(null);
    const [pwd, setPwd] = useState("");

    const {mutate: boardDelete} = useMutation({
        mutationFn: async () => {
            // 서버에서 { msg: "yes" | "no" } 형식으로 온다고 가정
            return await apiClient.delete(`/board/delete/${no}/${pwd}?increase=false`);
        },
        onSuccess: (res) => {
            if (res.data.msg === "yes") {
                window.location.href = "/board/list";
            } else {
                alert("비밀번호가 틀립니다");
                setPwd("");
                pwdRef.current?.focus();
            }
        },
        onError: (error) => {
            console.error("삭제 요청 중 오류 발생:", error);
        },
    });

    const boardDeleteOk = () => {
        if (!pwd.trim()) {
            pwdRef.current?.focus();
            return;
        }
        boardDelete();
    };

    const cancel = () => {
        nav(`/board/detail/${no}?increase=false`);
    };
    return (
        <Fragment>
        <div className="fh5co-parallax"
             style={{backgroundImage: 'url(/images/hero-1.jpg)', height: "300px"}}
             data-stellar-background-ratio="0.5">
            <div className="overlay"></div>
            <div className="container">
                <div className="row">
                    <div
                        className="col-md-8 col-md-offset-2 col-sm-12 col-sm-offset-0 col-xs-12 col-xs-offset-0 text-center fh5co-table">
                        <div className="fh5co-intro fh5co-table-cell">
                            <div className="text-center" style={{height: "300px"}}>
                                <h1>게시글 삭제</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="container">
            <div className={"row"} style={{width: "350px", margin: "0 auto"}}>
                <h3>비밀번호 입력 후 삭제버튼 클릭</h3>
                <table className={"table"}>
                    <tbody>
                    <tr>
                        <td className={"text-center"}>
                            비밀번호 : <input type={"password"} size={20} className={"input-sm"}
                                          ref={pwdRef}
                                          onChange={(e) => setPwd(e.target.value)}
                                          value={pwd}
                                      />
                        </td>
                    </tr>
                    <tr>
                        <td className={"text-center"}>
                            <button className={"btn btn-danger"} onClick={boardDeleteOk}>삭제</button>
                            <button className={"btn btn-warning"} onClick={cancel}>취소</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </Fragment>
    )
}


export default BoardDelete;