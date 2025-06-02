import {FETCH_MAIN_DATA,FETCH_NEWS_LIST} from "../actions/types";

const mainState = {
    main_data: {},
    news_data: {}
}
// dispatch(action) => 자동 호출
// dispatch({type:찾기, payload:데이터}
// ... : 복제

export default function(state = mainState, action){
    switch(action.type){
        case FETCH_MAIN_DATA:
            return {
                ...state,
                main_data: action.payload
            }
        case FETCH_NEWS_LIST:
            return {
                ...state,
                news_data: action.payload
            }
        default:
            return state;
    }
}