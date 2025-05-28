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
                    <Route path="/" element={<Home/>}/>
                    <Route path="/food/list" element={<FoodList/>}/>
                    <Route path="/food/find" element={<FoodFind/>}/>
                    <Route path="/food/detail/:fno" element={<FoodDetail/>}/>
                    <Route path="/youtube/find" element={<YoutubeFind/>}/>
                    <Route path="/info/list/:cno" element={<InfoList/>}/>
                </Routes>
                <Footer/>
            </Router>
        </Provider>
    );
}

export default App;
