import {useParams, useNavigate} from "react-router-dom";
import apiClient from "../../http-commons";
import {useMutation} from "@tanstack/react-query";
import {useRef, useState} from "react";

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
        <div className="container">
            <div className={"row"} style={{width: "350px", margin: "0 auto"}}>
                <h3>삭제하기</h3>
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
    )
}


export default BoardDelete;