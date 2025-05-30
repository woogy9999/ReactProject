import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "../reducers/index";
import {logger} from "redux-logger/src";

const store =configureStore({

    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>getDefaultMiddleware().concat(logger),
    devTools: true

})

export default store;