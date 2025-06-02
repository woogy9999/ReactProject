import {FETCH_INFO_DETAIL, FETCH_INFO_LIST,FETCH_INFO_FIND} from "../actions/types";
// Map, VO => {} List=> []
const infoState = {
    info_data: {},
    info_detail: {},
    info_find:[]
}
// dispatch(action) => 자동 호출
// dispatch({type:찾기, payload:데이터}
// ... : 복제

export default function(state = infoState, action){
    switch(action.type){
        case FETCH_INFO_LIST:
            return {
                ...state,
                info_data: action.payload
            }
        case FETCH_INFO_DETAIL:
            return {
                ...state,
                info_detail: action.payload
            }
        case FETCH_INFO_FIND:
            return {
                ...state,
                info_find: action.payload
            }
        default:
            return state;
    }
}