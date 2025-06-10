import {FC} from "react";
import {PagePrintProps} from "../../types";

const PagePrint:FC<PagePrintProps>=({data,setCurpage})=>{
    const{curpage,totalpage,startPage,endPage}=data;

    const pageArr=[]

    // 같은 키를 가지고 있는 경우 캐시에서 값을 가져옴.
    const prev=():void=>setCurpage(startPage-1)
    const next=():void=>setCurpage(endPage+1)
    const pageChange = (page: number): void => setCurpage(page);
    if (startPage > 1) {
        pageArr.push(
            <li key="prev">
                <a href="#" onClick={(e) => { e.preventDefault(); prev(); }}>
                    &lt;
                </a>
            </li>
        );
    }

    for (let i = startPage; i <= endPage; i++) {
        pageArr.push(
            <li key={i} className={i === curpage ? "active" : ""}>
                <a href="#" onClick={(e) => { e.preventDefault(); pageChange(i); }}>
                    {i}
                </a>
            </li>
        );
    }

    if (endPage < totalpage) {
        pageArr.push(
            <li key="next">
                <a href="#" onClick={(e) => { e.preventDefault(); next(); }}>
                    &gt;
                </a>
            </li>
        );
    }

    return (
        <ul className="pagination text-center">
            {pageArr}
        </ul>
    );
};

export default PagePrint;