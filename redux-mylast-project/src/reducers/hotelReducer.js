import {FETCH_HOTEL_LIST} from "../actions/types"

// Map => {} , VO|Entity => {} , List =>[]
const foodState={
    hotel_list:{},
}

export default function(state = hotelState, action){
    switch(action.type){
        case FETCH_HOTEL_LIST:
            return {
                ...state,
                food_list:action.payload
            }
        default:
            return state;

    }
}