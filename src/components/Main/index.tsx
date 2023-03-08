import React from "react";
import { Route, Routes } from "react-router-dom";
// import ShareBar from '../ShareBar/ShareBar'
// import StarSky from '../../pages/StarSky/StarSky'
// import MainContent from '../../pages/MainContent/MainContent'
import BlogPage from "../../pages/BlogPage/BlogPage";
import IndexPage from "../../pages/IndexPage/IndexPage";
import MainContent from "../../pages/IndexPage/components/MainContent/MainContent";

import "./index.less";
const Main = () => {
  // const path = ''
  return (
    <div className="middle">
      <div className="main-content-container">
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/share" element={<MainContent />} />
          <Route path="/share/blog" element={<BlogPage />} />
        </Routes>
        {/* <IndexPage />
            <MainContent />
            <BlogPage /> */}
        {/* <ShareBar /> */}
      </div>
    </div>
  );
};

export default Main;
