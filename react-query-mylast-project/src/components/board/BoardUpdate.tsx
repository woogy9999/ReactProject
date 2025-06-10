import {useEffect, useState, useRef, Fragment} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import apiClient from "../../http-commons";

interface BoardDetailData {
    no: number;
    name: string;
    subject: string;
    content: string;
    regdate: string;
    hit: number;
}

function BoardUpdate() {
    const {no} = useParams<{ no: string }>();
    const queryClient = useQueryClient();
    const nav = useNavigate();

    const nameRef = useRef<HTMLInputElement>(null);
    const subjectRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const pwdRef = useRef<HTMLInputElement>(null);

    const [name, setName] = useState<string>("");
    const [subject, setSubject] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [pwd, setPwd] = useState<string>("");

    const { data } = useQuery<BoardDetailData>({
        queryKey: ["board-update", no],
        queryFn: async () => (await apiClient.get(`/board/update/${no}`)).data,
    });

    useEffect(() => {
        if (data) {
            setName(data.name);
            setSubject(data.subject);
            setContent(data.content);
        }
    }, [data]);


    const {mutate: updateBoard} = useMutation({
        mutationFn: async () => {
            return await apiClient.put(`/board/update_ok/${no}?increase=false`, {

                no: Number(no),
                name,
                subject,
                content,
                pwd,
            });
        },
        onSuccess: (res) => {
            if (res.data.msg === "yes") {

                queryClient.refetchQueries({ queryKey: ["board-detail", no] });
                nav(`/board/detail/${no}?increase=false`);


            } else {
                alert("비밀번호가 틀립니다");
                setPwd("");
                pwdRef.current?.focus();
            }
        },
        onError: (err) => {
            console.error(err);
        },
    });

    const update = () => {
        if (name.trim() === "") {
            nameRef.current?.focus();
            return;
        }
        if (subject.trim() === "") {
            subjectRef.current?.focus();
            return;
        }
        if (content.trim() === "") {
            contentRef.current?.focus();
            return;
        }
        if (pwd.trim() === "") {
            pwdRef.current?.focus();
            return;
        }
        updateBoard();
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
                                        <h1>게시글 수정하기</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <section className="archive-area section_padding_80">
                <div className="container">
                    <div className="row">
                        <div className="col-10">
                            <table className="table">
                                <tbody>
                                <tr>
                                    <td className="text-center" width="15%">이름</td>
                                    <td width="85%">
                                        <input type="text" size={15} className="input-group-sm" ref={nameRef}
                                               value={name} onChange={(e) => setName(e.target.value)}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-center" width="15%">제목</td>
                                    <td width="85%">
                                        <input type="text" size={50} className="input-group-sm" ref={subjectRef}
                                               value={subject} onChange={(e) => setSubject(e.target.value)}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-center" width="15%">내용</td>
                                    <td width="85%">
                                        <textarea rows={10} cols={50} ref={contentRef} value={content}
                                                  onChange={(e) => setContent(e.target.value)}></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-center" width="15%">비밀번호</td>
                                    <td width="85%">
                                        <input type="password" size={15} className="input-group-sm" ref={pwdRef}
                                               value={pwd} onChange={(e) => setPwd(e.target.value)}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2} className="text-center">
                                        <button className="btn btn-primary btn-sm" onClick={update}>수정</button>
                                        <button className="btn btn-primary btn-sm" onClick={cancel}>취소</button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
}

export default BoardUpdate;
