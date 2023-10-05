import './App.scss';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import {nanoid} from "nanoid";

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path="/:id" element={<Home/>}/>
                    <Route path="*" element={<Navigate to={`/${nanoid()}`} replace/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;
