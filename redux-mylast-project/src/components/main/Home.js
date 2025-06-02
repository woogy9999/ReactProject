import {Fragment, useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchMainData} from "../../actions/mainActions";


function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchMainData());
    }, [])
    const mainData = useSelector(state => state.mains.main_data);

    // 데이터 안왔을경우
    if (!mainData || !mainData.list) {
        return <div>Loading...</div>;
    }
    return (
        <Fragment>

            <div id="wrapper" className="is-preload">
                <section id="menu">

                    <section>
                        <form className="search" method="get" action="#">
                            <input type="text" name="query" placeholder="Search"/>
                        </form>
                    </section>

                    <section>
                        <ul className="links">
                            <li>
                                <a href="#">
                                    <h3>Lorem ipsum</h3>
                                    <p>Feugiat tempus veroeros dolor</p>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <h3>Dolor sit amet</h3>
                                    <p>Sed vitae justo condimentum</p>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <h3>Feugiat veroeros</h3>
                                    <p>Phasellus sed ultricies mi congue</p>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <h3>Etiam sed consequat</h3>
                                    <p>Porta lectus amet ultricies</p>
                                </a>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <ul className="actions stacked">
                            <li><a href="#" className="button large fit">Log In</a></li>
                        </ul>
                    </section>

                </section>

                <div id="main">
                    {mainData.list.slice(8,12).map((hotel) => (
                    <article className="post">
                        <header>
                            <div className="title">
                                <h2><a href="single.html">{hotel.title}</a></h2>
                                <p>{hotel.address}</p>
                            </div>
                            <div className="meta">
                                <time className="published" dateTime="2015-11-01">November 2025</time>
                                <a href="#" className="author"><span className="name">Jane Doe</span><img
                                    src={hotel.poster} alt="" style={{width:"45px",height:"45px"}}/></a>
                            </div>
                        </header>
                        <a href="single.html" className="image featured"><img src={hotel.poster} alt=""/></a>

                        <footer>
                            <ul className="actions">
                                <li><a href="single.html" className="button large">Continue Reading</a></li>
                            </ul>
                            <ul className="stats">
                                <li><a href="#">General</a></li>
                                <li><a href="#" className="icon solid fa-heart">28</a></li>
                                <li><a href="#" className="icon solid fa-comment">128</a></li>
                            </ul>
                        </footer>
                    </article>
                        ))}


                    {/* 이부분에 들어있었음 */}


                </div>

                <section id="sidebar">

                    <section id="intro">
                        <a href="#" className="logo"><img src="images/logo.jpg" alt=""/></a>
                        <header>
                            <h2>추천 호텔 리스트</h2>
                            <p>호텔에서 누리는 재충전의 시간<br/>   내 마음에 드는 숙소에서 다같이 머물러 보세요</p>
                        </header>
                    </section>

                    <section>
                        <div className="mini-posts">
                            {mainData.list.slice(0,4).map((hotel) => (
                                <article className="mini-post">
                                    <header>
                                        <h3><a href="single.html">{hotel.title}</a></h3>
                                        <p>{hotel.address}</p>
                                        <a href="#" className="author"><img src={hotel.poster} style={{width:"45px",height:"45px"}}/></a>
                                    </header>
                                    <a href="single.html" className="image"><img src={hotel.poster} alt=""/></a>
                                </article>
                            ))}

                        </div>
                    </section>

                    <section>
                        <ul className="posts">

                            {mainData.list.slice(4,8).map((hotel) => (
                            <li>
                                <article>
                                    <header>
                                        <h3><a href="single.html">{hotel.title}</a></h3>
                                        <time className="published" dateTime="2015-10-20">{hotel.address}</time>
                                    </header>
                                    <a href="single.html" className="image"><img src={hotel.poster} style={{width:"70px",height:"70px"}}/></a>
                                </article>
                            </li>
                            ))}

                        </ul>
                    </section>

                    <section className="blurb">
                        <h2>About</h2>
                        <p>Mauris neque quam, fermentum ut nisl vitae, convallis maximus nisl. Sed mattis nunc id lorem
                            euismod amet placerat. Vivamus porttitor magna enim, ac accumsan tortor cursus at phasellus
                            sed
                            ultricies.</p>
                        <ul className="actions">
                            <li><a href="#" className="button">Learn More</a></li>
                        </ul>
                    </section>
                </section>
            </div>

        </Fragment>

    )

}

export default Home;