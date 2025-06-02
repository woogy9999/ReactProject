import {FETCH_GUEST_LIST,FETCH_LOCATION_LIST,FETCH_SHOP_LIST,FETCH_NATURE_LIST} from "./types";
import axios from "axios";


export const fetchShopList = (page) => dispatch => {
    // 서버에서 데이터를 읽어서 => reducer로 전송
    axios.get('http://localhost/shop/list', {
        params: {
            page: page
        }

    }).then(res => {
        const action = {
            type: FETCH_SHOP_LIST,
            payload: res.data
        }
        dispatch(action);
    })
}

export const fetchNatureList = (page) => dispatch => {
    axios.get('http://localhost/nature/list', {
        params: {
            page: page
        }
    }).then(res => {
         dispatch ({
            type: FETCH_NATURE_LIST,
            payload: res.data
        })
    })
}

export const fetchGuestList = (page) => dispatch => {
    axios.get('http://localhost/guest/list', {
        params: {
            page: page
        }
    }).then(res => {
        console.log("받은 데이터:", res.data);
        dispatch ({
            type: FETCH_GUEST_LIST,
            payload: res.data
        })
    })

}

export const fetchLocationList = (page) => dispatch => {
    axios.get('http://localhost/location/list', {
        params: {
            page: page
        }
    }).then(res => {
        dispatch({
            type: FETCH_LOCATION_LIST,
            payload: res.data
        })
    })
}