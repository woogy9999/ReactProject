import {combineReducers} from "redux";
import foodReducer from "./foodReduces";
// import boardReducer from "./boardReducer";

export default combineReducers({
    foods:foodReducer
})


