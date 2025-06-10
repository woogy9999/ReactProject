

export interface PageData{
    curpage:number;
    totalpage:number;
    startPage:number;
    endPage:number;
}

export interface PagePrintProps{
    data:PageData;
    setCurpage:(page:number)=>void;

}