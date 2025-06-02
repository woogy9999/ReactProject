import {Fragment, useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {Link} from 'react-router-dom';
import apiClient from "../http-commons";
import FindComponent from "./FindComponent";
import ListImage from "./ListImage";
import PagePrint from "./PagePrint";

/*
    React / Vue => 데이터 관리
    TanStack-Query(5) =>
      서버로부터 데이터 읽기 , 데이터 캐싱 , 캐시 제어 => 데이터를 쉽고 효율적 관리 => 라이브러리
      기능

    React-Query (3) => 4버전부터 => 확장된 라이브러리 => 이름이 변경 TanStack-Query

    기능
     1. 데이터 읽기 및 캐싱
     2. 동일 요청시에 중복 제거
     3. 새로운 데이터 유지
     4. 네트워크 재연결 , 요청 실페시에 자동 갱신

     useEffect(()=>{
     },[]);
     => queryKey: [curpage]
        queryFn:

 */
function RecipeList() {
    const [curpage, setCurpage] = useState(1);

    const {isLoading, data} = useQuery({
        queryKey: ["recipe-list", curpage],
        queryFn: async () => {
            const response = await apiClient.get(`/recipe/list/${curpage}`);
            return response.data;
        }
    });

    if (isLoading) return <h1 className="text-center">Loading...</h1>;


    //refetch
    return (
        <Fragment>
            <div className="container">
                <FindComponent/>
                <div className="row" style={{marginTop: "10px"}}>

                    {data.list && data.list.map((recipe, index) => (
                        <ListImage recipe={recipe} key={index} />
                    ))}
                    <PagePrint
                        data={data}
                        curpage={curpage}
                        setCurpage={setCurpage}
                    />
                </div>
            </div>
        </Fragment>
    );
}

export default RecipeList;
