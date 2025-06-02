import {BOARD_LIST,BOARD_DELETE,BOARD_INSERT,BOARD_UPDATE,BOARD_UPDATE_OK,BOARD_DETAIL,RESET_RESULT} from "./types";


/*

        React : 화면 구현 => View 기능만 수행
                |
            dispatch(boardList(1)) => 사용자 요청


               => action 함수에서 처리
                    |
                    reducer
                        |
                        state에 저장
                           |
                           store에 저장 => 공용 데이터를 모아서 관리
                               |
                               모든 reat에서 사용이 가능
                                    |
                                   필요한 데이터만 사용
                                    useSelector()
                          |store를 사용하는 목적
                            => 단방향 통신

         Redux :사용이 복잡 => 분석이 어렵다
                분업화 => 데이터 관리 / 화면 출력
                재사용이 좋아
                ------------------------------- + 사용 편리
                | react -query
                --------------- 사용이 많다 => facebook에 open source
                => tanStack-query : typescript

 */
import axios from "axios";
export const boardList = (page) => dispatch => {
    axios.get(`http://localhost/board/list_react/${page}`)
        .then(response => {
        const action={
            type:BOARD_LIST, // board_list:[] 얘를 찾아오는거임
            payload:response.data
        }
        dispatch(action)
    })
}

export const boardInsert = (insertData) => dispatch => {
    axios({
        method: 'post',
        baseURL: 'http://localhost',
        url:'/board/insert_react',
        data:insertData,
        headers: {
            'Content-Type': 'application/json'
        }

    }).then(response => {
        const action={
            type:BOARD_INSERT,
            payload:response.data
        }
        dispatch(action)
    })
}

//detail

export const boardDetail = (no) => async (dispatch) => {
    const res = await axios.get(`http://localhost/board/detail_react/${no}`);
    dispatch({
        type: 'BOARD_DETAIL',
        payload: res.data,
    });
};
//update-data
export const boardUpdate = (no) => async (dispatch) => {
    axios.get(`http://localhost/board/update_react/${no}`)
        .then(response => {
            const action={
                type:BOARD_UPDATE,
                payload:response.data
            }
            dispatch(action)
        })
}
//update
export const boardUpdateOk=(params) => async (dispatch) => {
    const { no, ...upDateData } = params;
    axios({
        method: 'put',
        baseURL: 'http://localhost',
        url:`/board/update_react_ok/${no}`,
        data:upDateData,
        headers: {
            'Content-Type': 'application/json'
        }

    }).then(response => {
        const action={
            type:BOARD_UPDATE_OK,
            payload:response.data

        }
        dispatch(action)
    })
}
//delete
export const boardDelete = (no,pwd) =>(dispatch) => {
    axios.delete(`http://localhost/board/delete_react/${no}/${pwd}`)
     .then(response => {
        const action={
            type:BOARD_DELETE,
            payload:response.data
        }
        dispatch(action)

    })
}

export const resetResult = () => ({
    type: RESET_RESULT
});