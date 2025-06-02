import logo from './logo.svg';

import Home from './components/main/Home';
import Header from './components/main/Header';
import Footer from './components/main/Footer';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import store from './store/store';
import {Provider} from 'react-redux';
import HotelList from "./components/hotel/hotelList";
import HotelDetail from "./components/hotel/hotelDetail";
import BoardList from "./components/board/BoardList";
import BoardInsert from "./components/board/BoardInsert";
import BoardDetail from "./components/board/BoardDetail";
import BoardDelete from "./components/board/BoardDelete";
import BoardUpdate from "./components/board/BoardUpdate";
import YoutubeFind from "./components/youtube/YoutubeFind";
import HotelFind from "./components/hotel/HotelFind";
import NewsList from "./components/news/NewsList";
import ShopList from "./components/guest/shopList";
import GuestList from "./components/guest/guestList";
import LocationList from "./components/guest/locationList";
import NatureList from "./components/guest/natureList";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Header/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/hotel/list" element={<HotelList/>}/>
                    <Route path="/board/list" element={<BoardList/>}/>
                    <Route path="/board/insert" element={<BoardInsert/>}/>
                    <Route path="/board/detail/:no" element={<BoardDetail/>}/>
                    <Route path="/board/delete/:no" element={<BoardDelete/>}/>
                    <Route path="/board/update/:no" element={<BoardUpdate/>}/>
                    <Route path="/youtube/find" element={<YoutubeFind/>}/>
                    <Route path="/hotel/detail/:no" element={<HotelDetail/>}/>
                    <Route path="/hotel/find" element={<HotelFind/>}/>
                    <Route path="/news/list" element={<NewsList />}/>
                    <Route path="/shop/list" element={<ShopList />}/>
                    <Route path="/location/list" element={<LocationList />}/>
                    <Route path="/nature/list" element={<NatureList />}/>
                    <Route path="/guest/list" element={<GuestList />}/>
                </Routes>
                <Footer/>
            </Router>
        </Provider>
    );
}

export default App;
