import React, { useEffect } from "react";
import { marked } from "marked";
import { useLocation } from "react-router-dom";
import qs from "query-string";
import axios from "axios";
import { useRequest } from "ahooks";
// import showdown from "showdown"
// import hljs from 'highlight.js'
// import 'highlight.js/styles/monokai-sublime.css'
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import "./mdcss.css";
import "./BlogPage.css";

const getBlog: (filename: string) => Promise<any> = async (
  filename: string
) => {
  return axios
    .get(`/api/getBlog?filename=${filename}`)
    .then((res) => {
      const { code, data } = res.data;
      if (code === 1200) {
        return data;
      } else {
        return null;
      }
    })
    .catch((e) => {
      console.log(e);
      return null;
    });
};

export default function BlogPage() {
  const Location = useLocation();
  const { search } = Location;
  const { filename } = qs.parse(search);
  console.log("wmx", filename);
  const { data } = useRequest(() => getBlog(filename as string));
  marked.setOptions({
    renderer: new marked.Renderer(),
    // highlight: function (code) {
    //     return hljs.highlightAuto(code).value;
    // },
    gfm: true, // 允许 Git Hub标准的markdown.
    pedantic: false, // 不纠正原始模型任何的不良行为和错误（默认为false）
    sanitize: false, // 对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
    // tables: true, // 允许支持表格语法（该选项要求 gfm 为true）
    breaks: false, // 允许回车换行（该选项要求 gfm 为true）
    smartLists: true, // 使用比原生markdown更时髦的列表
    smartypants: false, // 使用更为时髦的标点
  });

  //   let mdStr = `# 搭建博客中遇到的困难

  // ## 渐变背景

  //         /* radial-gradient 径向渐变 以一个中心点开始渐变*/
  //         background: radial-gradient(200% 105% at top center, #1b2947 10%, #75517d 40%, #e96f92 65%, #f7feb6 100%);
  //             /* background: linear-gradient(-45deg, #1b2947 10%, #75517d 40%, #e96f92 65%, #f7f7b6 100%); */
  //             /* linear-gradient 线性渐变 从一个方向到一个方向（deg 角度倾斜）*/

  // ## map循环中如何分别绑定ref

  // \n先声明一个存放DOM节点的数组ref，然后在map函数中输入代码：

  //         ref={(r) => { if (r) refs.push(r) }}

  //     完整实践

  //         import React, { useRef } from 'react'
  //         import './Header.css'
  //         export default function Header() {

  //             const navigations = ['博客首页', '技术分享', '生活经历', '关于作者']

  //             const btns = []

  //             const clickBtn = () => {
  //                 console.log(btns);
  //             }
  //             return (
  //                 <div className='header'>
  //                     <div className='headerDiv' >
  //                         <div className='logoDiv'>
  //                             吴明轩个人博客
  //                         </div>
  //                         <div className='navigationBar'>
  //                             <div id='navigationDivs'>
  //                                 {
  //                                     navigations.map((navigation, index) => {
  //                                         return <span key={index} onClick={clickBtn} ref={(r) => { if (r) btns.push(r) }} className='navigation' > {navigation}</span>
  //                                     })
  //                                 }
  //                             </div>
  //                             <div id='search'>搜索图标</div>
  //                         </div>
  //                     </div>

  //                 </div >
  //             )
  //         }

  // ## 星空遮挡导航栏
  //     \n解决方法：将starts下移导航栏高度，这会导致导航栏没有星星显示，所以要将star上移相对高度

  //         #starSky {
  //             /* display: none; */
  //             width: 100vw;
  //             min-width: 1200px;
  //             /* height: 100vh; */
  //             margin: -5.5vw auto;
  //             margin-bottom: 0;
  //             /* background: radial-gradient(200% 100% at bottom center, #f7f7b6, #e96f92); */
  //             background: radial-gradient(150% 98% at top center, #1b2947 10%, #75517d 40%, #e96f92 65%, #f7feb6 95%, #fff 100%);
  //             /* background: linear-gradient(-45deg, #1b2947 10%, #75517d 40%, #e96f92 65%, #f7f7b6 100%); */
  //             /* background-attachment: fixed; */
  //             overflow: hidden;
  //             /* z-index: -2; */
  //         }

  //         @keyframes twinkle {
  //             10% {
  //                 opacity: 0;
  //                 box-shadow: 0px 0px 8px #dddf60;
  //             }

  //             90% {
  //                 opacity: 1;
  //                 box-shadow: 0px 0px 2px #dddf60;
  //             }
  //         }

  //         .stars {
  //             position: relative;
  //             margin-top: 5.5vw;
  //         }

  //         .star {
  //             width: 4px;
  //             height: 4px;
  //             border-radius: 50%;
  //             background-color: #f7f7b8;
  //             position: absolute;
  //             top: 0;
  //             left: 0;
  //             /* 当元素背向观察者时不可见 */
  //             /* backface-visibility: hidden; */
  //             animation: twinkle 2.5s ease-in infinite;
  //             box-shadow: 0px 0px 8px #dcdf2f;
  //         }

  // ## markdown转html

  // \n使用marked库解析markdown文件，和highlight.js对代码部分进行高亮，再从网上下载相关css样式进行渲染

  //         npm i marked
  //         npm i highlight.js
  //         import hljs from 'highlight.js';
  //         import { marked } from 'marked';
  //         import 'highlight.js/styles/monokai-sublime.css'
  //         import './mdcss.css'
  // import { useRequest } from 'ahooks';
  //         //下载来的css代码 https://cdn.bootcss.com/github-markdown-css/2.10.0/github-markdown.min.css
  //         //基本配置
  //         marked.setOptions({
  //             renderer: new marked.Renderer(),
  //             highlight: function (code) {
  //               return hljs.highlightAuto(code).value;
  //             },
  //             gfm: true, // 允许 Git Hub标准的markdown.
  //             pedantic: false, // 不纠正原始模型任何的不良行为和错误（默认为false）
  //             sanitize: false, // 对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
  //             tables: true, // 允许支持表格语法（该选项要求 gfm 为true）
  //             breaks: false, // 允许回车换行（该选项要求 gfm 为true）
  //             smartLists: true, // 使用比原生markdown更时髦的列表
  //             smartypants: false, // 使用更为时髦的标点
  //           })
  //         //   将双引号改为向右点号
  //           let mdStr = "
  //           ## 一、todoList案例相关知识点

  //     1.拆分组件、实现静态组件，注意：className、style的写法
  //     2.动态初始化列表，如何确定将数据放在哪个组件的state中？
  //                   ——某个组件使用：放在其自身的state中
  //                   ——某些组件使用：放在他们共同的父组件state中（官方称此操作为：状态提升）
  //     3.关于父子之间通信：
  //     1.【父组件】给【子组件】传递数据：通过props传递
  //     2.【子组件】给【父组件】传递数据：通过props传递，要求父提前给子传递一个函数
  //     4.注意defaultChecked 和 checked的区别，类似的还有：defaultValue 和 value
  //     5.状态在哪里，操作状态的方法就在哪里

  //         ## 二、github搜索案例相关知识点"

  //           let Html1 = marked(mdStr)
  //             console.log(Html1)

  //             //渲染
  //             <div className='markdown-body' dangerouslySetInnerHTML={{ __html: Html1 }}></div>

  // ## 使用js实现动画回滚顶部（无限丝滑）

  // \n使用计时器，每一小段时间滚回一部分

  //         let scrollToptimer = setInterval(function () {
  //               var top = document.body.scrollTop || document.documentElement.scrollTop;
  //               var speed = top / 30;
  //               document.documentElement.scrollTop -= speed;
  //               if (top == 0) {
  //                 clearInterval(scrollToptimer);
  //               }
  //             }, 5);

  // ## 给一个Dom对象绑定多个相同事件问题

  // \n使用onclick、onscroll等形式绑定多个相同事件，只有最后一个会生效

  // \n使用jQuery或addEventListener则会顺序执行事件

  // ## 下一个问题

  //         122
  //         123
  //         123

  //     ​	`;
  //   let returnStr =
  //     "# 搭建博客中遇到的困难\r\n\r\n## 渐变背景\r\n\r\n\r\n\r\n\t/* radial-gradient 径向渐变 以一个中心点开始渐变*/\r\n\tbackground: radial-gradient(200% 105% at top center, #1b2947 10%, #75517d 40%, #e96f92 65%, #f7feb6 100%);\r\n\t    /* background: linear-gradient(-45deg, #1b2947 10%, #75517d 40%, #e96f92 65%, #f7f7b6 100%); */\r\n\t    /* linear-gradient 线性渐变 从一个方向到一个方向（deg 角度倾斜）*/\r\n\r\n\r\n## map循环中如何分别绑定ref\r\n\r\n先声明一个存放DOM节点的数组ref，然后在map函数中输入代码：\r\n\r\n\tref={(r) => { if (r) refs.push(r) }}\r\n\r\n\r\n完整实践\r\n\r\n\timport React, { useRef } from 'react'\r\n\timport './Header.css'\r\n\texport default function Header() {\r\n\t\r\n\t    const navigations = ['博客首页', '技术分享', '生活经历', '关于作者']\r\n\t\r\n\t    const btns = []\r\n\t\r\n\t    const clickBtn = () => {\r\n\t        console.log(btns);\r\n\t    }\r\n\t    return (\r\n\t        <div className='header'>\r\n\t            <div className='headerDiv' >\r\n\t                <div className='logoDiv'>\r\n\t                    吴明轩个人博客\r\n\t                </div>\r\n\t                <div className='navigationBar'>\r\n\t                    <div id='navigationDivs'>\r\n\t                        {\r\n\t                            navigations.map((navigation, index) => {\r\n\t                                return <span key={index} onClick={clickBtn} ref={(r) => { if (r) btns.push(r) }} className='navigation' > {navigation}</span>\r\n\t                            })\r\n\t                        }\r\n\t                    </div>\r\n\t                    <div id='search'>搜索图标</div>\r\n\t                </div>\r\n\t            </div>\r\n\t\r\n\t        </div >\r\n\t    )\r\n\t}\r\n\r\n\r\n\r\n## 星空遮挡导航栏\r\n\r\n解决方法：将starts下移导航栏高度，这会导致导航栏没有星星显示，所以要将star上移相对高度\r\n\r\n\r\n\r\n\t#starSky {\r\n\t    /* display: none; */\r\n\t    width: 100vw;\r\n\t    min-width: 1200px;\r\n\t    /* height: 100vh; */\r\n\t    margin: -5.5vw auto;\r\n\t    margin-bottom: 0;\r\n\t    /* background: radial-gradient(200% 100% at bottom center, #f7f7b6, #e96f92); */\r\n\t    background: radial-gradient(150% 98% at top center, #1b2947 10%, #75517d 40%, #e96f92 65%, #f7feb6 95%, #fff 100%);\r\n\t    /* background: linear-gradient(-45deg, #1b2947 10%, #75517d 40%, #e96f92 65%, #f7f7b6 100%); */\r\n\t    /* background-attachment: fixed; */\r\n\t    overflow: hidden;\r\n\t    /* z-index: -2; */\r\n\t}\r\n\t\r\n\t@keyframes twinkle {\r\n\t    10% {\r\n\t        opacity: 0;\r\n\t        box-shadow: 0px 0px 8px #dddf60;\r\n\t    }\r\n\t\r\n\t    90% {\r\n\t        opacity: 1;\r\n\t        box-shadow: 0px 0px 2px #dddf60;\r\n\t    }\r\n\t}\r\n\t\r\n\t.stars {\r\n\t    position: relative;\r\n\t    margin-top: 5.5vw;\r\n\t}\r\n\t\r\n\t.star {\r\n\t    width: 4px;\r\n\t    height: 4px;\r\n\t    border-radius: 50%;\r\n\t    background-color: #f7f7b8;\r\n\t    position: absolute;\r\n\t    top: 0;\r\n\t    left: 0;\r\n\t    /* 当元素背向观察者时不可见 */\r\n\t    /* backface-visibility: hidden; */\r\n\t    animation: twinkle 2.5s ease-in infinite;\r\n\t    box-shadow: 0px 0px 8px #dcdf2f;\r\n\t}\r\n\r\n\r\n\r\n## markdown转html\r\n\r\n使用marked库解析markdown文件，和highlight.js对代码部分进行高亮，再从网上下载相关css样式进行渲染\r\n\r\n\r\n\r\n\tnpm i marked\r\n\tnpm i highlight.js\r\n\timport hljs from 'highlight.js';\r\n\timport { marked } from 'marked';\r\n\timport 'highlight.js/styles/monokai-sublime.css'\r\n\timport './mdcss.css'\r\n\t//下载来的css代码 https://cdn.bootcss.com/github-markdown-css/2.10.0/github-markdown.min.css\r\n\t//基本配置\r\n\tmarked.setOptions({\r\n\t    renderer: new marked.Renderer(),\r\n\t    highlight: function (code) {\r\n\t      return hljs.highlightAuto(code).value;\r\n\t    },\r\n\t    gfm: true, // 允许 Git Hub标准的markdown.\r\n\t    pedantic: false, // 不纠正原始模型任何的不良行为和错误（默认为false）\r\n\t    sanitize: false, // 对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）\r\n\t    tables: true, // 允许支持表格语法（该选项要求 gfm 为true）\r\n\t    breaks: false, // 允许回车换行（该选项要求 gfm 为true）\r\n\t    smartLists: true, // 使用比原生markdown更时髦的列表\r\n\t    smartypants: false, // 使用更为时髦的标点\r\n\t  })\r\n\t  \r\n\t  let mdStr = `\r\n\t  ## 一、todoList案例相关知识点\r\n\t\r\n\t    1.拆分组件、实现静态组件，注意：className、style的写法\r\n\t    2.动态初始化列表，如何确定将数据放在哪个组件的state中？\r\n\t          ——某个组件使用：放在其自身的state中\r\n\t          ——某些组件使用：放在他们共同的父组件state中（官方称此操作为：状态提升）\r\n\t    3.关于父子之间通信：\r\n\t        1.【父组件】给【子组件】传递数据：通过props传递\r\n\t        2.【子组件】给【父组件】传递数据：通过props传递，要求父提前给子传递一个函数\r\n\t    4.注意defaultChecked 和 checked的区别，类似的还有：defaultValue 和 value\r\n\t    5.状态在哪里，操作状态的方法就在哪里\r\n\t\r\n\t## 二、github搜索案例相关知识点`\r\n\t\r\n\t  let Html1 = marked(mdStr)\r\n\t    console.log(Html1)\r\n\t    \r\n\t    //渲染\r\n\t    <div className='markdown-body' dangerouslySetInnerHTML={{ __html: Html1 }}></div>\r\n\r\n\r\n\r\n## 使用js实现动画回滚顶部（无限丝滑）\r\n\r\n使用计时器，每一小段时间滚回一部分\r\n\r\n\r\n\r\n\r\n\tlet scrollToptimer = setInterval(function () {\r\n\t      var top = document.body.scrollTop || document.documentElement.scrollTop;\r\n\t      var speed = top / 30;\r\n\t      document.documentElement.scrollTop -= speed;\r\n\t      if (top == 0) {\r\n\t        clearInterval(scrollToptimer);\r\n\t      }\r\n\t    }, 5);\r\n\r\n\r\n\r\n\r\n## 给一个Dom对象绑定多个相同事件问题\r\n\r\n使用onclick、onscroll等形式绑定多个相同事件，只有最后一个会生效\r\n\r\n使用jQuery或addEventListener则会顺序执行事件\r\n\r\n## React中使用iconfont Symbol问题\r\n\r\n通常做法为\r\n\r\n\t<svg class=\"icon\" aria-hidden=\"true\">\r\n\t    <use xlink:href=\"#icon-xxx\"></use>\r\n\t</svg>\r\n\r\n但xlink:href在React中会报错，要写成xlinkHref，class不会，但还是写className\r\n\r\n解决办法\r\n\r\n\t//引入js\r\n\timport 'http://at.alicdn.com/t/font_3208145_wu3k6jfaa4f.js'\r\n\t//设置css\r\n\t.icon {\r\n\t      width: 1em;\r\n\t      height: 1em;\r\n\t      vertical-align: -0.15em;\r\n\t      fill: currentColor;\r\n\t      overflow: hidden;\r\n\t    }\r\n\t//放置icon\r\n\t<svg className=\"icon\" aria-hidden=\"true\">\r\n\t  <use xlinkHref=\"#icon-xxx\"></use>\r\n\t</svg>\r\n\r\n\r\n## 下一个问题\r\n\r\n\t122\r\n\t123\r\n\t123\r\n\r\n\r\n​\t";
  //   let htmlStr = marked(true ? returnStr : mdStr);
  let htmlStr = marked(data || "");
  useEffect(() => {
    document.querySelectorAll("pre code").forEach((el) => {
      hljs.highlightElement(el as HTMLElement);
    });
  });
  // let htmlStr = hljs.highlight(marked(mdStr), { language: 'javascript' }).value
  // console.log(htmlStr);
  // var converter = new showdown.Converter({ tables: true }),
  //     text = '# hello, markdown!',
  //     html = converter.makeHtml(text);
  // console.log(html, typeof html);
  return (
    <div
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: htmlStr }}
    ></div>
  );
}
