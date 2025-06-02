import {FETCH_HOTEL_LIST,FETCH_HOTEL_DETAIL,FETCH_HOTEL_FIND} from "./types";
import axios from "axios";

export const fetchHotelList = (page) => dispatch => {
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

export const fetchHotelDetail = (no) => dispatch => {
    // 서버에서 데이터를 읽어서 => reducer로 전송
    axios.get('http://localhost/hotel/detail', {
        params: {
            no: no
        }

    }).then(res => {
        const action = {
            type: 'FETCH_HOTEL_DETAIL',
            payload: res.data
        }
        dispatch(action);
    })

}

export const fetchHotelFind =(fd) => dispatch => {
    axios.get('http://localhost:3355/hotel/find', {
        params: {
            fd: fd
        }
    }).then(res => {
        dispatch({
            type: FETCH_HOTEL_FIND,
            payload: res.data
        })
    }).catch(err => {
        console.log(err)
    })
};
