import {Fragment} from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router";
import Header from "./components/main/Header";
import Home from "./components/main/Home";
import InfoFind from "./components/busan/info_find";
import InfoList from "./components/busan/info_list";

function App() {
  return (
    <Fragment>
      <Router>
        <Header />
          <Routes>
                <Route path="/" element={<Home/>} />
              <Route path="/busan/info_list" element={<InfoList/>} />
              <Route path="/busan/info_find" element={<InfoFind/>} />
          </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
