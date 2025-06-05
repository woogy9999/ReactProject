import { useState, useEffect } from 'react'
import {useQuery} from "@tanstack/react-query"
import {Link} from "react-router-dom"
import apiClient from "../../http-commons"
import ListImage from "./ListImage";
import PagePrint from "./PagePrint";
import FoodMap from "./FoodMap";
import { getAll } from "../util/cookie"

/*
     3버전 : react-query
     4버전 : tabstack-query
            서버로부터 데이터 읽기 / 데이터 캐싱 , 캐시제어
            => 효율적으로 관리할 수 있게 만든 라이브러리

     기능
       1. 데이터 읽기 / 저장 기능 (캐싱)
       2. 동일 요청시에 중복 제거
       3. 새로운 데이터 유지
       4. 네트워크 재연결  , 요청 실패시 자동 갱싱


       => queryKey : []
          queryFn
          -------- 중복 제거 , 재사용, 컴포넌트 기반 Front

       => react 가능자  : react , redux , react-query , javascript
       => spring 가능자 : java , jsp , mybatis ...spring

       => return에 작성하는 HTML
                          ----
                          JSX => javascript + XML
                          문법 => XML
                          -----------
                          1. 한개의 Root 태그 사용
                             -------------------
                             CSS의 문제
                             --------- 임시 루트

                          2. 여는 태그 = 닫는 태그가 일치
                             계층 구조
                             단독태그 : <br/>
                          3. 속성값 : 반드시 ""
                          4. 태그는 소문자 사용
                          5. 함수명 / 클래스명 => 대문자 시작
         => 유지 변수 : useState
                      --------
                      const [변수 , set변수] = useState(초기값)

 */
function FoodList() {
    const [curpage, setCurpage] = useState(1);
    const [recentList, setRecentList] = useState([]);
    useEffect(() => {
        const allCookies = getAll();
        const foods = Object.entries(allCookies)
            .filter(([key]) => key.startsWith("food"))
            .reverse()
            .slice(0, 6)
            .map(([key, value]) => ({
                fno: key.replace("food", ""),
                poster: value
            }));
        setRecentList(foods);
    }, []);


    const {isLoading, isError, error, data} = useQuery({
        queryKey: ["food-list", curpage],
        queryFn: async () => {
            return await apiClient.get(`/food/list/${curpage}`);
        }
    });
    if (isLoading) {
        return <h3 className={"text-center"}>서버 데이터 전송 지연...</h3>
    }
    if (isError) {
        return <h3 className={"text-center"}>서버 에러 발생:{error}</h3>;
    }
    console.log(data)
    const food_list = data.data.list

    return (
        <div className="container">
            <div className="row">
                {
                    food_list.map((food,index) =>
                    <ListImage fno={food.fno} name={food.name} poster={"http://www.menupan.com"+food.poster} key={index} />

                    )
                }
            </div>
            <div className="row text-center" style={{marginTop: "10px"}}>
                <PagePrint data={data.data} setCurpage={setCurpage} />
            </div>


            <div className="row">
                <h4>최근 본 음식</h4>
                {
                    recentList.map((food) => (
                        <div key={food.fno} className="col-md-2">
                            <Link to={`/food/detail/${food.fno}`}>
                                <img
                                    src={"http://www.menupan.com" + food.poster}
                                    style={{ width: "100%", height: "100px", objectFit: "cover" }}
                                />
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>


    )
}
export default FoodList;

