import {FETCH_FOOD_DETAIL, FETCH_FOOD_LIST} from "./types";
import axios from "axios";
// reducer => store에 저장 => 저장된 데이터를 react(Componenet)에 읽어서 출력

export const fetchFoodList  = (page) => dispatch => {
    axios.get('http://localhost/food/list_react', {
        params: {
            page: page
        }
    }).then(res => {
        const action = {
            type: FETCH_FOOD_LIST,
            payload: res.data
        }
        //reducer를 통해서 store에 저장
        dispatch(action);
    })
}

export const fetchFoodDetail  = (fno) => dispatch => {
    axios.get('http://localhost/food/detail_react', {
        params: {
            fno:fno
        }
    }).then(res => {
        const action = {
            type: FETCH_FOOD_DETAIL,
            payload: res.data
        }
        //reducer를 통해서 store에 저장
        dispatch(action);
    })
}