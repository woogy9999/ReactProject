import {Fragment} from "react";

function PagePrint({data, setCurpage}){
    const {totalpage, startPage, endPage} = data;

    const pageArr = [];

    if (startPage > 1) {
        pageArr.push(
            <li key="prev">
                <a href="#" onClick={() => setCurpage(startPage - 1)} className={"nav-link"}>&lt;</a>
            </li>
        );
    }

    for (let i = startPage; i <= endPage; i++) {
        pageArr.push(
            <li key={i} className={i === data.curpage ? "active" : ""}>
                <a href="#" onClick={() => setCurpage(i)} className={"nav-link"}>{i}</a>
            </li>
        );
    }

    if (endPage < totalpage) {
        pageArr.push(
            <li key="next">
                <a href="#" onClick={() => setCurpage(endPage + 1)} className={"nav-link"}>&gt;</a>
            </li>
        );
    }
    return(
        <div className="d-flex justify-content-center" style={{textAlign: "center"}}>
            <ul className="pagination">
                {pageArr}
            </ul>
        </div>
    )
}
export default PagePrint;