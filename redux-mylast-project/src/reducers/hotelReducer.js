import {FETCH_HOTEL_DETAIL, FETCH_HOTEL_LIST,FETCH_HOTEL_FIND} from "../actions/types"

// Map => {} , VO|Entity => {} , List =>[]
const hotelState={
    hotel_list:{},
    hotel_find:[]
}

export default function(state = hotelState, action){
    switch(action.type){
        case FETCH_HOTEL_LIST:
            return {
                ...state,
                hotel_list:action.payload
            }
        case FETCH_HOTEL_DETAIL:
            return {
                ...state,
                hotel_detail:action.payload
            }
        case FETCH_HOTEL_FIND:
            return {
                ...state,
                hotel_find:action.payload
            }
        default:
            return state;

    }
}