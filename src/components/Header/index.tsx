import React from "react";
import "./index.less";
import "../../font_ind79stt3ye/iconfont.css";
import { Link, useLocation } from "react-router-dom";
import { imgError } from "../../pages/IndexPage/components/MainContent/MainContent";
const Header = () => {
  const navigations = ["博客首页", "技术分享", "生活经历", "关于作者"];
  const btns = [];
  let LogoRef: any;
  let headerRef: any;
  const location = useLocation();

  const clickLogo = () => {
    console.log(LogoRef);
  };

  const handleScroll = () => {
    if (location.pathname === "/" && headerRef !== null) {
      let currentOffset =
        document.documentElement.scrollTop || document.body.scrollTop;
      // console.log('handle', currentOffset)
      if (currentOffset > 200) {
        headerRef.classList.add("header-sticky");
      } else {
        headerRef.classList.remove("header-sticky");
      }
    }
  };

  React.useEffect(() => {
    console.log("header");
    // window.addEventListener("scroll", handleScroll)
  });
  return (
    <div
      className={
        location.pathname === "/" ? "header" : "header header-others-sticky"
      }
      ref={(r) => {
        headerRef = r;
      }}
    >
      <div className="headerDiv">
        <div
          className="logoDiv"
          onClick={clickLogo}
          ref={(r) => {
            LogoRef = r;
          }}
        >
          <img className="logoImg" alt="" src="" onError={imgError}></img>
          <div className="logoInfo">
            <div>吴明轩个人博客</div>
          </div>
        </div>
        <div className="navigationBar">
          <div id="navigationDivs">
            {navigations.map((navigation, index) => {
              return (
                <span
                  key={index + navigation}
                  ref={(r) => {
                    if (r) btns.push(r);
                  }}
                  className="iconfont navigation"
                >
                  &#xe60f;&nbsp;{navigation}
                </span>
              );
              // if (index === 0) {
              //     return <span key={index + navigation} ref={(r) => { if (r) btns.push(r) }}
              //         className='iconfont navigation' >&#xe611;&nbsp;{navigation}</span>
              // } else if (index === 1) {
              //     return <span key={index + navigation} ref={(r) => { if (r) btns.push(r) }}
              //         className='iconfont navigation' >&#xe60f;&nbsp;{navigation}</span>
              // } else if (index === 2) {
              //     return <span key={index + navigation} ref={(r) => { if (r) btns.push(r) }}
              //         className='iconfont navigation' >&#xe60a;&nbsp;{navigation}</span>
              // } else if (index === 3) {
              //     return <span key={index + navigation} ref={(r) => { if (r) btns.push(r) }}
              //         className='iconfont navigation' >&#xe617;&nbsp;{navigation}</span>
              // }
            })}
          </div>
          <div className="iconfont" id="search">
            &#xe61e;
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
