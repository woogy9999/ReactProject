import {combineReducers} from 'redux'

// combineReducer : reduce 여러개를 모아서 한번에 저장
import mainReducer from './mainReducer';

import hotelReducer from './hotelReducer';
// mains.main_data
export default combineReducers({
    mains: mainReducer,
    hotels: hotelReducer

})