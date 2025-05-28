import {FETCH_INFO_LIST,FETCH_INFO_DETAIL} from "./types";

import axios from "axios";

export const fetchInfoList = (cno,page) => dispatch =>{
    axios.get("http://localhost/info/list_react",{
        params:{
            cno:cno,
            page:page
        }

    }).then(res=>{

       dispatch({
           type:FETCH_INFO_LIST,
           payload:res.data
        })
    }).catch(err=>{
        console.log(err)
    })
}