import {useState,useEffect} from "react";
import axios from "axios";


//<Home> => HTML을 호출 (return 값을 받아서 출력)
function Home(){
    const [locations,setLocation]=useState([]);
    const [shops,setShops]=useState([]);
    const [foods,setFoods]=useState([]);

    useEffect(()=>{
        axios.get("http://localhost/main_react")
        .then((res)=>{
            setLocation(res.data.list1);
            setFoods(res.data.list2);
            setShops(res.data.list3);
        })
    },[]) // 한번만 수행 => Detail
    // 출력준비
    return (
        <div className="container">
            <div className="row">
                <h3 className="text-center">명소</h3>
                {
                    locations.map((loc) =>
                        <div className="col-md-3">
                            <div className="thumbnail">
                                <a href="#">
                                    <img src={loc.poster} alt="Lights" style={{width:"230px",height:"130px"}}/>
                                    <div className="caption">
                                        <p>{loc.title}</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    )
                }
            </div>
            <hr/>
            <div className="row">
                <h3 className="text-center">쇼핑</h3>
                {
                    shops.map((shop) =>
                        <div className="col-md-3">
                            <div className="thumbnail">
                                <a href="#">
                                    <img src={shop.poster} alt="Lights" style={{width:"230px",height:"130px"}}/>
                                    <div className="caption">
                                        <p>{shop.title}</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    )
                }
            </div>
            <hr/>
            <div className="row">
                <h3 className="text-center">음식</h3>
                {
                    foods.map((food) =>
                        <div className="col-md-3">
                            <div className="thumbnail">
                                <a href="#">
                                    <img src={food.poster} alt="Lights" style={{width:"230px",height:"130px"}}/>
                                    <div className="caption">
                                        <p>{food.title}</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>        
    )
}
export default Home;