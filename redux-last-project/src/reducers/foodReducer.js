import {FETCH_FOOD_LIST,FETCH_FOOD_DETAIL} from "../actions/types"

// Map => {} , VO|Entity => {} , List =>[]
const foodState={
    food_list:{},
    food_detail:{},
    food_find:{}
}

/*
        1. types.js => 구분 (내부 프로토콜)
           export const FETCH_BOARD_LIST='FETCH_BOARD_LIST'
        2. action 함수
           export const fetchVOARDLIST=>()=>dispatch=>{
                axios...
                fetch...

                const action={
                    type : FETCH_BOARD_LIST,
                    data : es.data
              }
                // reducer에 값을 전송
                dispatch(action)
           }

         => 종류별로 처리
            types  종류별로
            action 함수는 따로 처리
            reducer 따로 처리 => index에서 한번에 모아서 처리
 */
export default function(state = foodState, action){
    switch(action.type){
        case FETCH_FOOD_LIST:
            return {
                ...state,
                food_list:action.payload
            }
        case FETCH_FOOD_DETAIL:
            return {
                ...state,
                food_detail:action.payload
            }
        default:
            return state;

    }
}