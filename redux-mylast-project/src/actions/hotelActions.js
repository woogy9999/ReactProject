import {FETCH_HOTEL_LIST} from "./types";
import axios from "axios";

export const fetchFoodList = (page) => dispatch => {
    // 서버에서 데이터를 읽어서 => reducer로 전송
    axios.get('http://localhost/hotel/list', {
        params: {
            page: page
        }

    }).then(res => {
        const action = {
            type: 'FETCH_HOTEL_LIST',
            payload: res.data
        }
        dispatch(action);
    })
}
