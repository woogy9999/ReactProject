import {useState, useEffect, useContext} from "react";
import {useNavigate,useParams} from "react-router";

function FoodDetail(){
    const {fno}= useParams()
    return (
        <div className="container">
            <div className="row">
                <h1>{fno}</h1>
            </div>
        </div>
    )
}
export default FoodDetail;
