import {Link} from "react-router-dom";


const ListImage = ({fno, name, poster }) => {
    return (
        <div className="col-md-3">
            <div className="thumbnail">
                <Link to={"/food/detail/"+fno}>
                    <img src={poster} style={{width:"230px",height:"130px"}} />
                    <div className="caption">
                        <p>{name}</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default ListImage;