import {FC} from "react";
import {PagePrintProps} from "../../types";

const PagePrint:FC<PagePrintProps>=({data,setCurpage})=>{
    const{curpage,totalpage,startPage,endPage}=data;

    const pageArr=[]

    // 같은 키를 가지고 있는 경우 캐시에서 값을 가져옴.
    const prev=():void=>setCurpage(startPage-1)
    const next=():void=>setCurpage(endPage+1)
    const pageChange = (page: number): void => setCurpage(page);
    if(startPage>1)
    {
        pageArr.push(
            <li className={"page-item"}>
                <a className={"page-link nav-link"} onClick={prev}>&lt;</a>
            </li>
        )
    }

    for(let i=startPage;i<=endPage;i++)
    {
        pageArr.push(
            <li className={i===curpage?"page-item active":"page-item"}>
                <button className={"page-link nav-link"} onClick={() => pageChange(i)}>{i}</button>
            </li>
        )
    }

    if(endPage<totalpage)
    {
        pageArr.push(
            <li>
                <button className={"page-link nav-link"} onClick={next}>&gt;</button>
            </li>
        )
    }
    return(
        <ul className={"pagination"}>
            {pageArr}
        </ul>
    )
}

export default PagePrint;