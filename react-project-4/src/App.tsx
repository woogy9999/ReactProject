import React from "react"
import Counter from "./Counter";

/*
      1. 외부에서 데이터 읽기
         state :필요시마다 변경이 가능한 변수
         props : 변경이 불가능한 변수
 */


const App: React.FC=() =>{

  return (
    <Counter />
  );
}
export default App;
