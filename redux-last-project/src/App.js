import logo from './logo.svg';

import Home from './components/main/Home';
import Header from './components/main/Header';
import Footer from './components/main/Footer';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import store from './store/store';
import {Provider} from 'react-redux';
import FoodList from "./components/food/FoodList";
import FoodFind from "./components/food/FoodFind";
import FoodDetail from "./components/food/FoodDetail";
import YoutubeFind from "./components/youtube/YoutubeFind";
import InfoList from "./components/info/infoList";
import BoardList from "./components/board/BoardList";
import BoardInsert from "./components/board/BoardInsert";
import BoardDetail from "./components/board/BoardDetail";
import BoardDelete from "./components/board/BoardDelete";
import BoardUpdate from "./components/board/BoardUpdate";
import InfoDetail from "./components/info/infoDetail";
import InfoFind from "./components/info/infoFind";
import NewsList from "./components/news/NewsList";


// 모든 컴포넌트 => 반드시 return을 포함하고 있어야 한다 (return안에는 HTMl 포함)
/*
        리덕스 규칙
        1) ACTION 생성 : 실제 서버와 연결 => 데이터 읽기 , 수정
            => 구분자 FETCH_MAIN_DATA
            => axios / fetch => 서버 연결하는 함수 제작
        2) Reduce : Action에서 읽은 변수를 제작


 */
function App() {
    // store => 등록된 모든 컴포넌트가 사용이 가능
    return (
        <Provider store={store}>
            <Router>
                <Header/>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path={"/food/list"} element={<FoodList/>} />
                    <Route path={"/food/find"} element={<FoodFind/>} />
                    <Route path={"/food/detail/:fno"} element={<FoodDetail/>} />
                    <Route path={"/youtube/find"} element={<YoutubeFind/>} />
                    <Route path={"/info/list/:no"} element={<InfoList/>} />
                    <Route path={"/board/list"} element={<BoardList/>} />
                    <Route path={"/board/insert"} element={<BoardInsert/>} />
                    <Route path={"/board/detail/:no"} element={<BoardDetail/>} />
                    <Route path={"/board/delete/:no"} element={<BoardDelete/>} />
                    <Route path={"/board/update/:no"} element={<BoardUpdate/>} />
                    <Route path={"/info/detail/:no"} element={<InfoDetail/>} />
                    <Route path={"/info/find"} element={<InfoFind/>} />
                    <Route path={"/news/list"} element={<NewsList/>} />
                </Routes>
                <Footer/>
            </Router>
        </Provider>
    );
}

export default App;
