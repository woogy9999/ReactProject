import {Fragment, useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchHotelList} from "../../actions/hotelActions";

function HotelList() {


    const dispatch = useDispatch();
    const [curpage, setcurpage] = useState(1);
    useEffect(() => {
        // 리렌더링
        dispatch(fetchHotelList(curpage));

    }, [curpage]);

    const hotelList = useSelector(state => state.foods.hotel_list);
    if (!hotelList || !hotelList.list) return <div>Loading...</div>;


    return (
        <Fragment>

        </Fragment>
    )

}
export default HotelList;