import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchFoodList } from '../actions/foodActions';
import ReactPaginate from "react-paginate";
import {Link} from 'react-router-dom';

function FoodList() {
    const [curpage,setcurpage] = useState(1);
    const dispatch = useDispatch(); //Action호출하는 함수
    // dispatch(fetchFoodList(curpage))
    useEffect(() => {
        dispatch(fetchFoodList  (curpage)); // reducer를 거쳐서 store에 저장
    },[curpage]);


    const food_list=useSelector(state => state.foods.food_list.list);
    const count=useSelector(state => state.foods.food_list.count);
    const pageChange=(page)=>{
        setcurpage(page)
    }

    return (
        <div className="container">
            <div className="row">
                {
                    food_list && food_list.map((food) =>
                        <div className="col-md-4">
                            <div className="thumbnail">
                                <Link to={"/detail/"+food.fno}>
                                    <img src={"http://www.menupan.com"+food.poster} alt="Lights" style={{width:"230px", height:"120px"}} />
                                    <div className="caption">
                                        <p>{food.name}</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="row text-center" style={{marginTop:"10px"}}>
                <ReactPaginate
                    pageCount={Math.ceil(count / 12)}
                    pageRangeDisplayed={10}
                    marginPagesDisplayed={0}
                    previousLabel="<"
                    nextLabel=">"
                    onPageChange={({ selected }) => setcurpage(selected + 1)}
                    containerClassName="pagination"
                    activeClassName="active"
                />
            </div>
        </div>
    )

}

export default FoodList;