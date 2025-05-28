import {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
/*

    Map / List /VO
    {}     []    {}
    {
        list:[],
        curpage:1,
        totappage:100
    }
 */
function App4(){
    const [music,setMusic] = useState([]);
   // const [total,setTotal] = useState(0);
    //const [curpage,setCurpage] = useState(1);
    const [fd,setFd] = useState("비");

    // 변경시마다 HTML에 적용
    // 데이터 읽기 => mounted() => componentDidMount()
    // deps가 변경이 되는 경우
    useEffect(()=>{
        axios.get("http://localhost/music/music_find",{
            params:{
                //page:curpage
                fd:fd
            }
        }).then(res=>{
            console.log(res.data);
            setMusic(res.data);
            //setCurpage(res.data.curpage);
            //setTotal(res.data.totalpage);
        })
    },[fd]) // 현재 페이지가 변경되면 다시 수행
    // Javascript사용 => for [{},{}....]
    /*
            music={
              list:[]
              curpage:1,
              totalpage:0
            }
     */
    let html=music.map((m,idx)=>
        <div className="col-md-3" key={idx}> {/* 주석 */}
            <div className="thumbnail">
                <a href="#">
                    <img src={'http:'+m.poster} style={{width: "230px", height: "120px"}}/>
                    <div className="caption">
                        <p>{m.title}</p>
                    </div>
                </a>
            </div>
        </div>
    )
    return (
        <Fragment>
            <div className="row">
                <input type={"text"} className={"input-sm"} size="20" value={fd} onChange={(e)=>setFd(e.target.value)}/>
                <input type={"button"} className={"btn-sm btn-primary"} value={"검색"} onClick={()=>setFd()}/>
            </div>
            <div style={{height:"10px"}}></div>
            <div className={"row"}>
                {html}
            </div>
           {/*
           <div style={{height:"10px"}}></div>
            <div className={"row text-center"}>
                <button className={"btn-sm btn-danger"} onClick={() => setCurpage(curpage>1?curpage-1:curpage)}>이전</button>
                {curpage} page/ {total} pages
                <button className={"btn-sm btn-danger"} onClick={()=>setCurpage(curpage<total?curpage+1:curpage)}>다음</button>
            </div>
            */}
        </Fragment>
    )
}
export default App4;