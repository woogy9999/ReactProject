import { Fragment, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import PagePrint from "../commons/PagePrint";

interface Recipe {
    NO: number;
    POSTER: string;
    TITLE: string;
    CHEF: string;
    HIT: number;
    LIKECOUNT: number;
    NUM: number;
}

function RecipeFind() {

    const [curpage, setCurpage] = useState<number>(1);
    const [title, setTitle] = useState<string>("간식");

    const { isLoading, isError, error, data, refetch } = useQuery({
        queryKey: ['recipe-find', curpage],
        queryFn: async () => {
            const res = await axios.get<Recipe[]>(`http://localhost:3355/recipe/find`, {
                params: { fd: title, page: curpage }
            });
            return res.data;
        },
        enabled: false
    });

    const findBtn = () => {
        if (!title.trim()) return;
        setCurpage(1);
        refetch();
    };

    useEffect(() => {
        if (curpage !== 1) {
            refetch();
        }
    }, [curpage]);


    return (
        <Fragment>
            <div className="breadcumb-area" style={{"backgroundImage": "url(/img/bg-img/breadcumb.jpg)"}}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12">
                            <div className="bradcumb-title text-center">
                                <h2>레시피 검색</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="archive-area section_padding_80">
                <div className="container">
                        <input
                            type="text"
                            className="input-sm"
                            size={20}
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                        <button className="btn-danger btn-sm" onClick={findBtn}>
                            검색
                        </button>
                    <div className="row" style={{marginTop:"20px"}}>
                        {
                            data?.map((recipe:Recipe,index:number)=>
                                <div className="col-12 col-md-6 col-lg-4" key={index}>
                                    <div className="single-post wow fadeInUp" data-wow-delay="0.1s">

                                        <div className="post-thumb">
                                            <Link to={`/recipe/detail/${recipe.NO}`}>
                                                <img src={recipe.POSTER} alt={""}/>
                                            </Link>
                                        </div>

                                        <div className="post-content">
                                            <div className="post-meta d-flex">
                                                <div className="post-author-date-area d-flex">

                                                    <div className="post-author">
                                                        <a href="#">{recipe.CHEF}</a>
                                                    </div>

                                                    <div className="post-date">
                                                        <a href="#"></a>
                                                    </div>
                                                </div>

                                                <div className="post-comment-share-area d-flex">

                                                    <div className="post-favourite">
                                                        <a href="#"><i className="fa fa-heart-o"
                                                                       aria-hidden="true"></i>{recipe.LIKECOUNT} </a>
                                                    </div>

                                                    <div className="post-comments">
                                                        <a href="#"><i className="fa fa-comment-o"
                                                                       aria-hidden="true"></i>{recipe.HIT} </a>
                                                    </div>

                                                    <div className="post-share">
                                                        <a href="#"><i className="fa fa-share-alt"
                                                                       aria-hidden="true"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <Link to={`/recipe/detail/${recipe.NO}`}>
                                                <h4 className="post-headline">{recipe.TITLE}</h4>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            </section>
        </Fragment>
    )
}
export default RecipeFind

/*
   export default RecipeFind(){
   }
 */