// Controller 저장 => 메소드 => 구분해서 처리..
/*
        Action : 데이터 읽기/쓰기 (CRUD) => 서버연결
        1) 어떤기능이 있는지 설계
            types.js
            => public final static int LOGIN=100
        2) Reducer : 데이터를 어떤 변수에 저장해 둘지 설정
                | 자동으로 store에 전송
        3) component는 store에 있는 데이터를 읽어서 출력



 */
import axios from "axios";
export const fetchMainData = () => dispatch => {
    // 서버에서 데이터를 읽어서 => reducer로 전송
    axios.get('http://localhost/main_react').then(res => {
        const action={
            type:'FETCH_MAIN_DATA',
            payload:res.data
        }
        dispatch(action);
    })
}
