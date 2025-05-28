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

                    <article className="post">
                        <header>
                            <div className="title">
                                <h2><a href="single.html">Magna sed adipiscing</a></h2>
                                <p>Lorem ipsum dolor amet nullam consequat etiam feugiat</p>
                            </div>
                            <div className="meta">
                                <time className="published" dateTime="2015-11-01">November 1, 2015</time>
                                <a href="#" className="author"><span className="name">Jane Doe</span><img
                                    src="images/avatar.jpg" alt=""/></a>
                            </div>
                        </header>
                        <a href="single.html" className="image featured"><img src="images/pic01.jpg" alt=""/></a>
                        <p>Mauris neque quam, fermentum ut nisl vitae, convallis maximus nisl. Sed mattis nunc id lorem
                            euismod placerat. Vivamus porttitor magna enim, ac accumsan tortor cursus at. Phasellus sed
                            ultricies mi non congue ullam corper. Praesent tincidunt sed tellus ut rutrum. Sed vitae
                            justo
                            condimentum, porta lectus vitae, ultricies congue gravida diam non fringilla.</p>
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

                    <article className="post">
                        <header>
                            <div className="title">
                                <h2><a href="single.html">Ultricies sed magna euismod enim vitae gravida</a></h2>
                                <p>Lorem ipsum dolor amet nullam consequat etiam feugiat</p>
                            </div>
                            <div className="meta">
                                <time className="published" dateTime="2015-10-25">October 25, 2015</time>
                                <a href="#" className="author"><span className="name">Jane Doe</span><img
                                    src="images/avatar.jpg" alt=""/></a>
                            </div>
                        </header>
                        <a href="single.html" className="image featured"><img src="images/pic02.jpg" alt=""/></a>
                        <p>Mauris neque quam, fermentum ut nisl vitae, convallis maximus nisl. Sed mattis nunc id lorem
                            euismod placerat. Vivamus porttitor magna enim, ac accumsan tortor cursus at. Phasellus sed
                            ultricies mi non congue ullam corper.</p>
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

                    <article className="post">
                        <header>
                            <div className="title">
                                <h2><a href="single.html">Euismod et accumsan</a></h2>
                                <p>Lorem ipsum dolor amet nullam consequat etiam feugiat</p>
                            </div>
                            <div className="meta">
                                <time className="published" dateTime="2015-10-22">October 22, 2015</time>
                                <a href="#" className="author"><span className="name">Jane Doe</span><img
                                    src="images/avatar.jpg" alt=""/></a>
                            </div>
                        </header>
                        <a href="single.html" className="image featured"><img src="images/pic03.jpg" alt=""/></a>
                        <p>Mauris neque quam, fermentum ut nisl vitae, convallis maximus nisl. Sed mattis nunc id lorem
                            euismod placerat. Vivamus porttitor magna enim, ac accumsan tortor cursus at. Phasellus sed
                            ultricies mi non congue ullam corper. Praesent tincidunt sed tellus ut rutrum. Sed vitae
                            justo
                            condimentum, porta lectus vitae, ultricies congue gravida diam non fringilla. Cras vehicula
                            tellus eu ligula viverra, ac fringilla turpis suscipit. Quisque vestibulum rhoncus
                            ligula.</p>
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

                    {/* 이부분에 들어있었음 */}

                    <ul className="actions pagination">
                        <li><a href="" className="disabled button large previous">Previous Page</a></li>
                        <li><a href="#" className="button large next">Next Page</a></li>
                    </ul>

                </div>

                <section id="sidebar">

                    <section id="intro">
                        <a href="#" className="logo"><img src="images/logo.jpg" alt=""/></a>
                        <header>
                            <h2>Future Imperfect</h2>
                            <p>Another fine responsive site template by <a href="http://html5up.net">HTML5 UP</a></p>
                        </header>
                    </section>

                    <section>
                        <div className="mini-posts">
                            {mainData.list.map((hotel) => (
                                <article className="mini-post">
                                    <header>
                                        <h3><a href="single.html">{hotel.title}</a></h3>
                                        <time className="published" dateTime="2015-10-20">{hotel.address}</time>
                                        <a href="#" className="author"><img src={hotel.poster} alt=""/></a>
                                    </header>
                                    <a href="single.html" className="image"><img src={hotel.poster} alt=""/></a>
                                </article>
                            ))}

                        </div>
                    </section>

                    <section>
                        <ul className="posts">
                            <li>
                                <article>
                                    <header>
                                        <h3><a href="single.html">Lorem ipsum fermentum ut nisl vitae</a></h3>
                                        <time className="published" dateTime="2015-10-20">October 20, 2015</time>
                                    </header>
                                    <a href="single.html" className="image"><img src="images/pic08.jpg" alt=""/></a>
                                </article>
                            </li>
                            <li>
                                <article>
                                    <header>
                                        <h3><a href="single.html">Convallis maximus nisl mattis nunc id lorem</a></h3>
                                        <time className="published" dateTime="2015-10-15">October 15, 2015</time>
                                    </header>
                                    <a href="single.html" className="image"><img src="images/pic09.jpg" alt=""/></a>
                                </article>
                            </li>
                            <li>
                                <article>
                                    <header>
                                        <h3><a href="single.html">Euismod amet placerat vivamus porttitor</a></h3>
                                        <time className="published" dateTime="2015-10-10">October 10, 2015</time>
                                    </header>
                                    <a href="single.html" className="image"><img src="images/pic10.jpg" alt=""/></a>
                                </article>
                            </li>
                            <li>
                                <article>
                                    <header>
                                        <h3><a href="single.html">Magna enim accumsan tortor cursus ultricies</a></h3>
                                        <time className="published" dateTime="2015-10-08">October 8, 2015</time>
                                    </header>
                                    <a href="single.html" className="image"><img src="images/pic11.jpg" alt=""/></a>
                                </article>
                            </li>
                            <li>
                                <article>
                                    <header>
                                        <h3><a href="single.html">Congue ullam corper lorem ipsum dolor</a></h3>
                                        <time className="published" dateTime="2015-10-06">October 7, 2015</time>
                                    </header>
                                    <a href="single.html" className="image"><img src="images/pic12.jpg" alt=""/></a>
                                </article>
                            </li>
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