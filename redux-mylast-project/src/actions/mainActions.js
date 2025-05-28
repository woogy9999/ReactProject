
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
