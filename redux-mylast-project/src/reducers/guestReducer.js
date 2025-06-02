import {FETCH_GUEST_LIST,FETCH_LOCATION_LIST,FETCH_SHOP_LIST,FETCH_NATURE_LIST} from "../actions/types"

// Map => {} , VO|Entity => {} , List =>[]
const guestState={
    guest_list:{},
    shop_list:{},
    location_list:{},
    nature_list:{}
}

export default function(state = guestState, action){
    switch(action.type){
        case FETCH_GUEST_LIST:
            return {
                ...state,
                guest_list:action.payload

            }
        case FETCH_LOCATION_LIST:
            return {
                ...state,
                location_list:action.payload
            }
        case FETCH_SHOP_LIST:
            return {
                ...state,
                shop_list:action.payload
            }
        case FETCH_NATURE_LIST:
            return {
                ...state,
                nature_list:action.payload
            }
        default:
            return state;

    }
}