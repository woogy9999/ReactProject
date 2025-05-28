import {combineReducers} from 'redux'

// combineReducer : reduce 여러개를 모아서 한번에 저장
import mainReducer from './mainReducer';
import foodReducer from './foodReducer';
import youtubeReducer from './youtubeReducer';
import infoReducer from './infoReducer';
// mains.main_data
export default combineReducers({
    mains: mainReducer,
    foods: foodReducer,
    youtubes: youtubeReducer,
    infos: infoReducer,

})