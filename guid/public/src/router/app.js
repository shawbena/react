import React from '../react';
import { BrowserRouter as Router, Route } from '../react-router-dom';
import Home from './home';
import NewsFeed from './newsFeed';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Router>
                <div>
                    <Route exat path="/" component={Home} />
                    <Route path="/news" component={NewsFeed} />
                </div>
            </Router>
        );
    }
}

/*
 # <Router>
 用于所有路由组件的通用低级路由接口，通常应用会使用下面的高级路由：
  <BroswerRouter>
  <HashRouter>
  <MemoryRouter>
  <NativeRouter>
  <StaticRouter>

  The most common use-case for using the low-level <Router> is to

synchronize a custom history with a state management lib like Redux or Mobx. Note that this is not required to use state management libs alongside React Router, it's only for deep integration.

     //参见 routerTest.js
history 对象用于导航

     import {Router} from 'react-router';
     import createBrowserHistory from 'history/createBrowserHistory';

     const customHistory = createBrowserHistory();
     <Router history={customHistory}>
     </Router>
*/

/*
 # Route
 Roter 负责当 location (location.md) 匹配 route 的 `path` 时渲染某个 UI.

  <Router>
      <div>
          <Route exact path="/" component={Home} />
          <Route path="/news" component={NewsFeed} />
      </div>
  </Router>

  如果应用的路径是 / 那么 UI 层级将会是:

     <div>
         <Home />
         <!-- react-empty: 2 -->
     </div>

 如果 app 的路径是 /news 那么 UI 层级将会是：

     <div>
         <!-- react-empty:1 -->
         <NewsFeed />
     </div>

 "react-empty" 注释是 React 的 `null` 渲染的实现细节。一个组件总是会被渲染即使使渲染为 `null`. 只要应用程序路径匹配 route 路径，你的组件就会被渲染。
*/

/*
 # Route
 # Route 的渲染方法
 有三种方式用 <Route> 渲染一些东西：

     <Route component>
     <Route render>
     <Route children>

 每个适用于相对就环境。对于一个给定 `<Route>` 你应该只使用其中一个。下面会解释为什么你有三种选择。大多情况下你将使用 `component`.

 # Route 的属性
 这三个渲染方法都将传递三个路由属性：

     match (match.md)
     location (location.md)
     history (history.md)

 # component
 只有 location 匹配时才会渲染一个 React 组件，组件会收到路由属性：

     <Router path="/user/:username" component={User} />

     const User = ({ match }) => {
         return <h1>Hello {match.params.username}</h1>;
     };
 
 当你使用 `component` (而非 `render` 或 `children`, 下面) 路由使用 React.createElement 用给定的组件创建一个新的 React 元素。这意味着如果你给 `component` 属性件提供了一个内联函数，每次渲染都将会创建一个新的组件。这会造成卸载现有组件，挂载新组件面非仅仅更新现有组件。当使用内联函数内联渲染时使用 `render` 或者是 `children` 属性。

 # render: func
 //...

 # children: func
 //...

 # path: string
 一个 path-to-regexp (https://www.npmjs.com/package/path-to-regexp) 可识别的有效字符串.

     <Route path="/users/:id" component={User} />
 
 没有 `path` 的 Route 总是匹配。

 # exact: bool
 # strict: bool
 # location: object
*/
