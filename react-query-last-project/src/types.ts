

export interface Recipe {
    title: string;
    hit: number;
    likecount: number;
    poster: string;
    no: number;
    chef: string;
    num: number;
}

export interface RecipeListData {
    list: Recipe[];
    curpage: number;
    totalpage: number;
    startPage: number;
    endPage: number;
}

export interface ListImageProps{
    recipe:Recipe;
    index:number;
}

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