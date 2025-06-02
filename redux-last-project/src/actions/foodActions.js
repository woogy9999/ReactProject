import {FETCH_FOOD_LIST, FETCH_FOOD_DETAIL, FETCH_FOOD_FIND} from "./types";
import axios from "axios";

export const fetchFoodList = (page) => dispatch => {
    // 서버에서 데이터를 읽어서 => reducer로 전송
    axios.get('http://localhost/food/list_react', {
        params: {
            page: page
        }

    }).then(res => {
        const action = {
            type: 'FETCH_FOOD_LIST',
            payload: res.data
        }
        dispatch(action);
    })

}

export const fetchFoodDetail = (fno) => dispatch => {
    // 서버에서 데이터를 읽어서 => reducer로 전송
    axios.get('http://localhost/food/detail_react', {
        params: {
            fno: fno
        }

    }).then(res => {
        const action = {
            type: 'FETCH_FOOD_DETAIL',
            payload: res.data
        }
        dispatch(action);
    })

}

export const fetchFoodFind = (fd) => dispatch => {
    axios.get('http://localhost:3355/food/find', {
        params: {
            fd: fd
        }
    }).then(res => {
        dispatch({
            type: FETCH_FOOD_FIND,
            payload: res.data
        })
    }).catch(err => {
        console.log(err)
    })
};
