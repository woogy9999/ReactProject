import {Fragment,useState,useEffect} from "react";
import axios from "axios";

/*
        Vue
          created() = mounted() *** = updated() = destroyed()
        react
          ComponentDidCreate()
          ComponentDidMount()  *** window.onload
               => useEffect()
          ComponentDidUpdate()

            => state가 변경될때 화면이 변경
               ------ data(){}

            react
            -------
            1. View에 관련된 개발 라이브러리
            2. 컴포넌트 단위로 화면이 구성
            3. 클라이언트 사이드 랜더링 (React)
               => 브라우저에서 HTML을 그리는 역할만 수행
               서버 사이드 랜더링 /
               => 전체를 HTML을 수행하게 만든 과정
            4. 재 랜더링(데이터 값이 변경될 경우, 해당 부분만 )

               HTML 전체 변경 / 데이터만 변경 / 골격은 그대로 있음 => 속도가 빠르다
            5. 가상돔 : 변경된 내용만
            6. 단뱡향 통신 => Redux

            JSX => javaScript+XML
            XML 문법
              1. 최상위 태그가 필요하다
                 ----------- 한개만 존재
              2. 여는 태그와 닫는 태그 일치
              3. 속성값은 반드시 ""
                 만약에 변수값 => {}
              4. 함수 , 클래스는 대문자로 시작
              5. 변수 출력 : {}
              6. 변수의 종류
                 지역변수 : let , const
                 state : 변수값을 그대로 유지 (변경시에는 변경 => 값 유지)
                  | 브라우저에 적용
                 props : 속성값을 받은 경우 처리 => 불변

                 useState => 변경되는 변수
                 useEffect => mounted

 */
function App3() {
    const [a,setA] = useState(100)
    // 이벤트 처리
    const btnPrevClick=()=>{
        alert("pre 버튼 클릭")
        setA(a-1)
    }
    const btnNextClick=()=>{
        alert("next 버튼 클릭")
        setA(a+1)
    }
    return (
        <Fragment>
            <h1>{a}</h1>
            <button onClick={btnPrevClick}>-</button>
            <button onClick={btnNextClick}>+</button>
        </Fragment>
    )

}
export default App3;