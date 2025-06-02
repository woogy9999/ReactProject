import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../http-commons";
import ListImage from "./ListImage";
import PagePrint from "./PagePrint";

function RecipeFind() {
    const [title, setTitle] = useState("감자");
    const [curpage, setCurpage] = useState(1);

    // 🔁 데이터 요청
    const { isLoading, error, isError, data, refetch: recipeFindData } = useQuery({

        queryKey: ["recipe_find", curpage],
        queryFn: async () => {
            const response = await apiClient.get(`/recipe/find/${curpage}/${title}`);
            return response.data; // { list, totalpage, startPage, endPage }
        }
    });
    console.log("data 확인:", data);
    // 로딩 처리
    if (isLoading) {
        return <h1 className="text-center">서버 데이터 로딩중</h1>;
    }

    // 에러 처리
    if (isError) {
        return <h1 className="text-center">Error 발생: {error.message}</h1>;
    }

    const find=(e)=>{
        setTitle(e.target.value);
        // e.target.value => 입력값 읽기 => 반드시 onChange사용
    }
    const findBtn=()=>{
        recipeFindData() // useQuery를 다시 수행 => 속성 : refetch
    }
    return (
        <div className="container">
            <div className="row">
                <input
                    type="text"
                    size="20"
                    className="input-sm"
                    value={title}
                    onChange={find}
                />
                <button className="btn-sm btn-primary" onClick={findBtn}>
                    검색
                </button>
            </div>

            <div className="row" style={{ marginTop: "10px" }}>
                {data.rlist.map((recipe, index) => (
                    <ListImage recipe={recipe} key={index} />
                ))}
            </div>

            <div className="row text-center" style={{ marginTop: "10px" }}>
                <PagePrint
                    data={data}
                    curpage={curpage}
                    setCurpage={setCurpage}
                />
            </div>
        </div>
    );
}

export default RecipeFind;
