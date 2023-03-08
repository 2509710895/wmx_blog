import React, { useEffect, useMemo } from "react";
import "./MainContent.less";
// import 'http://at.alicdn.com/t/font_3208145_wu3k6jfaa4f.js'
// import '../../iconSymbol'
import { useNavigate } from "react-router-dom";
import { createFromIconfontCN } from "@ant-design/icons";
import { useRequest } from "ahooks";
import axios from "axios";
import moment from "moment";

export const imgError = (e: any) => {
  const img = e.currentTarget;
  img.src = "https://www.z4a.net/images/2023/03/07/hui20230307-152106.jpg";
  img.onerror = null;
};

const IconFont = createFromIconfontCN({
  scriptUrl: [
    "//at.alicdn.com/t/c/font_3932102_kzx47y5koy.js",
    "//at.alicdn.com/t/font_1788044_0dwu4guekcwr.js",
  ],
});

const getBlogList: () => Promise<any> = async () => {
  return axios
    .get("/api/getBlogList")
    .then((res) => {
      console.log("wmxres", res);

      const { data, code } = res.data;
      if (code === 1200) {
        return data;
      } else {
        return null;
      }
    })
    .catch((e) => {
      console.log("wmx e", e);
      return null;
    });
};

export default function MainContent() {
  // const iconsRefs = [];
  // const iconsImgsRefs = [];

  //路由跳转
  const usenavigation = useNavigate();
  const clickBlog = (filename: string) => {
    return () => {
      usenavigation(`/share/Blog?filename=${filename}`);
    };
  };

  const { data } = useRequest(getBlogList);
  console.log("wmxdata", data);

  const list = useMemo(() => {
    return data?.map((obj: { filename: any; name: string }) => {
      obj.filename = obj.name.match(/mds\/(.*)\.md/)?.[1];
      return obj;
    });
  }, [data]);
  console.log("wmxdata", data, list);
  // const handleMouseOver = (index) => {
  //   return () => {
  //     // console.log(index);
  //     iconsImgsRefs[index].style.visibility = `inherit`;
  //     iconsImgsRefs[index].style.animation = `appear .5s ease-out 1`;
  //   };
  // };

  // const handleMouseOut = (index) => {
  //   return () => {
  //     // console.log(index);
  //     iconsImgsRefs[index].style.visibility = `hidden`;
  //     iconsImgsRefs[index].style.animation = `disappear .5s ease-in 1`;
  //   };
  // };

  React.useEffect(() => {
    // console.log(iconsRefs);
    // iconsRefs.forEach((icon, index) => {
    //   icon.addEventListener("mouseover", handleMouseOver(index));
    //   icon.addEventListener("mouseout", handleMouseOut(index));
    // });
  });

  return (
    <div className="mainContent">
      <div className="mainInfo">
        <div className="resume">
          <img
            className="avatar"
            alt=""
            src="https://static01.imgkr.com/temp/e0dcbfc9c0864764a07026bbaf060366.png"
            onError={imgError}
          />
          <div className="name">吴明轩</div>
          <div className="resume-middle">
            <div>
              <div>文章</div>
              <div className="resume-middle-num">12</div>
            </div>
            <div>
              <div>标签</div>
              <div className="resume-middle-num">10</div>
            </div>
            <div>
              <div>分类</div>
              <div className="resume-middle-num">5</div>
            </div>
          </div>
          <div className="icons">
            {/* <div className='iconDiv'>
                                <svg ref={(r) => { iconsRefs.push(r) }} className="icon iconSvg" aria-hidden="true">
                                    <use xlinkHref="#icon-qq"></use>
                                </svg>
                                <img ref={(r) => { iconsImgsRefs.push(r) }} alt='' className='icon-xx' src='https://static01.imgkr.com/temp/b57e83df404b4e69a8fc5f87cd5e8b79.png'></img>
                            </div>
                            <div className='iconDiv'>
                                <svg ref={(r) => { iconsRefs.push(r) }} className="icon iconSvg" aria-hidden="true">
                                    <use xlinkHref="#icon-wechat"></use>
                                </svg>
                                <img ref={(r) => { iconsImgsRefs.push(r) }} alt='' className='icon-xx' src='https://static01.imgkr.com/temp/b57e83df404b4e69a8fc5f87cd5e8b79.png'></img>
                            </div>
                            <div className='iconDiv'>
                                <svg ref={(r) => { iconsRefs.push(r) }} className="icon iconSvg" aria-hidden="true">
                                    <use xlinkHref="#icon-email"></use>
                                </svg>
                                <img ref={(r) => { iconsImgsRefs.push(r) }} alt='' className='icon-xx' src='https://static01.imgkr.com/temp/b57e83df404b4e69a8fc5f87cd5e8b79.png'></img>
                            </div> */}
            <IconFont className="icon" type="icon-weixin" />
            <IconFont className="icon" type="icon-QQ" />
            <IconFont className="icon" type="icon-GitHub" />
          </div>
        </div>

        {/* <div className='lastBlogs'>
                        <div className='lastBlogs-title'>
                            <span className='iconfont'>&#xe610; </span>
                            <span>最新文章</span>
                        </div>

                        <ul className='blogUl'>
                            <li className='blogLi'>
                                <img className='blogImg' alt='加载中' src='https://static01.imgkr.com/temp/b57e83df404b4e69a8fc5f87cd5e8b79.png' />
                                <div className='blogDiv'>
                                    <p className='blogtitle'>博客问s题总结</p>
                                    <p className='blogDate'>2022-2-26</p>
                                </div>
                            </li>
                            <li className='blogLi'>
                                <img className='blogImg' alt='加载中' src='https://static01.imgkr.com/temp/b57e83df404b4e69a8fc5f87cd5e8b79.png' />
                                <div className='blogDiv'>
                                    <p className='blogtitle'>博客问s题总结</p>
                                    <p className='blogDate'>2022-2-26</p>
                                </div>
                            </li>
                            <li className='blogLi'>
                                <img className='blogImg' alt='加载中' src='https://static01.imgkr.com/temp/b57e83df404b4e69a8fc5f87cd5e8b79.png' />
                                <div className='blogDiv'>
                                    <p className='blogtitle'>博客问s题总结</p>
                                    <p className='blogDate'>2022-2-26</p>
                                </div>
                            </li>
                            <li className='blogLi'>
                                <img className='blogImg' alt='加载中' src='https://static01.imgkr.com/temp/b57e83df404b4e69a8fc5f87cd5e8b79.png' />
                                <div className='blogDiv'>
                                    <p className='blogtitle'>博客问s题总结</p>
                                    <p className='blogDate'>2022-2-26</p>
                                </div>
                            </li>
                            <li className='blogLi'>
                                <img className='blogImg' alt='加载中' src='https://static01.imgkr.com/temp/b57e83df404b4e69a8fc5f87cd5e8b79.png' />
                                <div className='blogDiv'>
                                    <p className='blogtitle'>博客问s题总结博客问s题总结博客问</p>
                                    <p className='blogDate'>2022-2-26</p>
                                </div>
                            </li>
                        </ul>

                    </div>
                    <div className='classification'>
                        <div className='lastBlogs-title'>
                            <span className='iconfont' style={{ fontWeight: 700 }}>&#xe620; </span>
                            <span>分类</span>
                        </div>

                        <ul className='classUl'>
                            <li className='classLi'>
                                <span className='classtitle'>React</span>
                                <span className='classNum'>7</span>
                            </li>
                            <li className='classLi'>
                                <span className='classtitle'>React</span>
                                <span className='classNum'>7</span>
                            </li>
                            <li className='classLi'>
                                <span className='classtitle'>React</span>
                                <span className='classNum'>7</span>
                            </li>
                            <li className='classLi'>
                                <span className='classtitle'>React</span>
                                <span className='classNum'>7</span>
                            </li>
                        </ul>
                    </div> */}
      </div>
      <div className="mainDisplay">
        {list?.map(
          (obj: {
            name: string;
            etag: string;
            filename: string;
            lastModified: string;
            img: string;
          }) => (
            <div key={obj.etag} className="blogCard">
              {obj.img && (
                <img className="blogCard-img" alt="loading" src={obj.img}></img>
              )}
              <div className="blogInfo">
                <div className="blogInfo-title" onClick={clickBlog(obj.name)}>
                  {obj.filename}
                </div>
                <div className="blogInfo-detail iconfont">
                  &#xe61a; {moment(obj.lastModified).format("YYYY-MM-DD")} |
                  &#xe61d; <span>React</span>
                </div>
                <div className="blogInfo-content">
                  你的博客有什么问题吗dklfhaslkdaslkdjasl你的博客有什么问题吗dklfhaslkdaslkdjasl你的博客有什么问题吗dklfhaslkdaslkdjasl你的博客有什么问题吗dklfhaslkdaslkdjasl你的博客有什么问题吗dklfhaslkdaslkdjasl你的博客有什么问题吗dklfhaslkdaslkdjasl你的博客有什么问题吗dklfhaslkdaslkdjasl你的博客有什么问题吗dklfhaslkdaslkdjasl你的博客有什么问题吗dklfhaslkdaslkdjasl你的博客有什么问题吗dklfhaslkdaslkdjasl
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
