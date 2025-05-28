
/*
   store : 실제 React화면에서 출력할 데이터 저장하는 곳
   reducer : React화면에서 전송된 데이터를 store에 보내주는 역할
   action : 사용자 보내는 이벤트
   dispatcher : store에서 데이터를 읽어와서 => 화면에 출력

   store ------ Component(HTML)
                      |
                  Action
                      |
                   Dispatch
                      |
                    Reduce
                      |
                    store
    Redux => (MVC) => 단수낳게 변경 (react-query)
                                                                              | 모델
                 dispatch                   dispatch
     사용자(UI) ----------------- action호출 ------------ reducer ---------- store
     component                      |                     |
     return (HTML)                서버연결                자동으로 store에 저장
        |                         요청 값 읽기
     화면 출력
     -----------                -----------------------------
      View(JSP)                       Controller
 */
import {Provider} from 'react-redux'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import store from './store/store'
import FoodList from './components/FoodList'
import FoodDetail from './components/FoodDetail'

function App() {
  {/* 모든 컴포넌에서 store에 있는 모든 데이터 사용이 가능  */}
  return (

  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<FoodList />} />
        <Route path="/detail/:fno" element={<FoodDetail/>}/>
      </Routes>
    </Router>
  </Provider>

  );
}

export default App;
