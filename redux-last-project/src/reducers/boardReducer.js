import {BOARD_LIST,BOARD_DELETE,BOARD_INSERT,BOARD_UPDATE,BOARD_UPDATE_OK,BOARD_DETAIL,RESET_RESULT} from "../actions/types";

const boardState={
    board_list:{},
    board_detail:{},
    board_update:{},
    result:{}
}

export default function (state = boardState, action){
    switch(action.type){
        case BOARD_LIST:
            return {
                ...state,
                board_list:action.payload
            }
        case BOARD_INSERT:
            return {
                ...state,
                result:action.payload
            }
        case BOARD_DETAIL:
            return {
                ...state,
                board_detail:action.payload
            }
        case BOARD_DELETE:
            return {
                ...state,
                result:action.payload
            }
        case BOARD_UPDATE:
            return {
                ...state,
                board_update: action.payload
            }
        case BOARD_UPDATE_OK:
            return {
                ...state,
                result:action.payload
            }
        case RESET_RESULT:
            return {
                ...state,
                result: {}
            }
        default:
            return state;

    }
}