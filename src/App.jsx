import React, { lazy, Suspense } from "react";
import { Link, Routes, Route } from "react-router-dom"
// import Home from "./pages/Home";
// import About from "./pages/About";
import { Button } from "antd"
import Footer from "./components/Footer/index.tsx";
import Header from "./components/Header";
import Main from "./components/Main"
import "./App.less"
const Home = lazy(() => import(/* webpackChunkName:"home" */"./pages/Home"))
const About = lazy(() => import(/* webpackChunkName:"about" */"./pages/About"))

function App() {
    return (
        <>
            {/* <h1>APP</h1>
            <Button type="primary">初始按钮</Button>
            <ul>
                <li>
                    <Link to="/home">HOME</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>
            <Suspense fallback={<div>loading...</div>}>
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </Suspense> */}
            <Header />
            <Main />
            <Footer />
        </>
    )
}

export default App