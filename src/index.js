import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './home';
import Signup from './signup';
import Login from './login';

function App() {
    return (
      <BrowserRouter basename="/fake-twitter">
        <Routes>
            <Route path="/fake-twitter" index element={<Home />} />
            <Route path="fake-twitter/signup" element={<Signup />} />
            <Route path="/fake-twitter/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    );
}

ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
);