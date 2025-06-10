import React from 'react';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from "./components/main/Home";
import Header from "./components/main/Header";
import Footer from "./components/main/Footer";
import GoodsList from "./components/goods/GoodsList";
import GoodsDetail from "./components/goods/GoodsDetail";
import BoardList from "./components/board/BoardList";
import BoardInsert from "./components/board/BoardInsert";
import BoardDetail from "./components/board/BoardDetail";
import BoardDelete from "./components/board/BoardDelete";
import BoardUpdate from "./components/board/BoardUpdate";

function App() {
  return (
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/goods/list" element={<GoodsList/>}/>
          <Route path="/goods/detail/:no" element={<GoodsDetail/>}/>
          <Route path="/board/list" element={<BoardList/>} />
          <Route path={"/board/insert"} element={<BoardInsert/>}/>
          <Route path={"/board/detail/:no"} element={<BoardDetail/>}/>
          <Route path={"/board/delete/:no"} element={<BoardDelete/>}/>
          <Route path={"/board/update/:no"} element={<BoardUpdate/>}/>

        </Routes>
        <Footer/>
      </Router>
  );
}

export default App;