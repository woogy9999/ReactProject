import {Fragment} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
// Switch => Routes변경
import BoardList from './components/board/BoardList';
import BoardInsert from "./components/board/BoardInsert";
import BoardDetail from "./components/board/BoardDetail";
import BoardUpdate from "./components/board/BoardUpdate";
import BoardDelete from "./components/board/BoardDelete";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Routes>
                    <Route path="/" element={<BoardList/>}/>
                    <Route path="/board/list" element={<BoardList/>}/>
                    <Route path="/board/insert" element={<BoardInsert/>}/>
                    <Route path="/board/detail/:no" element={<BoardDetail/>}/>
                    <Route path={"/board/update/:no"} element={<BoardUpdate/>}/>
                    <Route path="/board/delete/:no" element={<BoardDelete/>}/>
                </Routes>
            </Router>
        </QueryClientProvider>
    );
}

export default App;