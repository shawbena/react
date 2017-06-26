import React from '../react';
import ReactDOM from '../react-dom';
import { HashRouter as Router, Route } from '../react-router-dom';
import { createHashHistory } from '../history';
import Home from './home';
import NewsFeed from './newsFeed';
import Nav from './nav';

let history = createHashHistory();
function About(props) {
    return (
        <div id="about">About Page</div>
    );
}
function Inbox(props) {
    return (
        <div id="inbox">Inbox Page</div>
    );
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Router history={history}>
                <div className="react-root">
                    <Route component={Nav} />
                    <Route path="/" component={Home}>
                        <Route path="/about" component={About} />
                        <Route path="/inbox" component={Inbox} />
                    </Route>
                    <Route path="/news" component={NewsFeed} />
                </div>
            </Router>
        );
    }
}

function bootstrap() {
    ReactDOM.render(
        <App />,
        document.querySelector('#app')
    );
}
export { bootstrap };
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
 当为真时只有路径精确匹配 `location.pathname` 时才匹配。

     <Route exact path="/one" component={About} />

     path      location.pathname  exact    matches?
     /one      /one/two           true     no
     /one      /one/two           false    yes

 # strict: bool
  当为 `true` 一个以斜杠结尾的 `path` 仅匹配以斜杠结果 `location.pathname`。`location.pathname` 里即使有额外的 URL 片段也不受影响。

       <Route strict path="/one/" component={About} />

       path      location.pathname    matches?
       /one/     /one                 no
       /one/     /one/                yes
       /one/     /one/two             yes

       <Route exact strict path="/one" component={About} />

       path       location.pathname   matches?
       /one       /one                yes
       /one       /one/               no
       /one       /one/two            no

 # location: object
 <Route> 元素尽量将其 `path` 与当前历史路径匹配 (通常时当前的浏览器 URL)。然而有不同 `pathname` 的 location (location.md) 也可用于匹配。
 //。。。未完待续

 # history
 //... 未完待续

 # location
 location 表示你的应用现在在哪，你想去哪，甚至是这是哪。location 类似下面：

     {
         key: 'ac3df4', //no with HashHistory!
         pathname: '/somewhere',
         search: '?some=search-string',
         hash: '#howdy',
         state: {
             [userDefined]: true
         }
     }

 路由器在以下几个地方将会提供给你一个 location 对象：

     Route component (Route.md#component) 为 `this.props.location`
     Route render (Route.md#render-func) 为 `({ location }) => ()`
     Route children (Route.md#children-func) as `({ location }) => ()`
     withRouter as `this.props.location`

 你会发现 `history.location` 中也有，但你不应该使用，因为他是可修改的。你应该读读 history (history.md) 的文档。

 location 对象是不可修改的所以当导航发生时你可以在生命周期钩子中决定。这对获取数据和动画很有用：

     componentWillReceiveProps(nextProps){
         if(nextProps.location !== this.props.location){
             //navigated
         }
         //INCORRECT, 将会一直是 false 因为  history 是可修改的 //?
         //const locationChanged = nextProps.history.location !== this.props.history.location;
     }

 你可以为要导航的各种地方提供非字符串的 location:

     Web `Link to`(react-router-dom/docs/Link.md#to)
     Native `Link to` (react-router-native/docs/Link.md#to)
     `Redirect to` (Redirect.md#to)
     `history.push`
     `history.replace`

 正常情况下你使用一个字符串，但你也可以使用一个 location 对象，这样做你添加了一些 "location state", 当应用到达特定 location 时 "location state" 将会可用。这样做可以根据导航历史而非仅仅是路径来分支 UI。

     //usually all your need
     <Link to="/somewhere">

     //but you can use a location instead
     const location = {
         pathname: '/somewhere',
         state: {fromDashboard: true}
     };

     <Link to={location} />
     <Redirect to={location} />
     history.push(location);
     history.replace(location);

 最后你可以将 location 传递给下下列组件：

      Route
      Switch

 This will prevent them from using the actual location in the router's state. This is useful for animation and pending navigation, or any time you want to trick a component into rendering at a different location than the real one. //???
*/

/*
 #
 BroswerRouter 要和后台配合起来
*/

/*
 # match
 `match`对象包含 `Route path` 如何匹配 URL 的信息。`match` 对象包含以下属性
     `params` - (object) 转换自对应动态片段的 URL 的 key/value 对
        `isExact` - (boolean) 如果匹配整个为 true
        `path` - (string) 用于匹配的 path 模式。用于构建嵌套的
        `url` - (string) 匹配的 URL 部分。用于构建嵌套的 <Link>

 你将会在各种各样的地方访问 `match`:

     Route (Route.md#component) 为 `this.props.match`
     Route render 为 `({ match }) => ()`
     Route children (Route.md#chidren-func) 为 `({ match }) => ()`
     withRouter (withRouter.md) 为 `this.props.match`
     matchPath (matchPath.md) 为 返回值

 如果路由没有 `path`, 将会总是匹配，你将得到临近父匹配。`withRouter` 也一样。
*/
/*
 # matchPath
 这个让你使用 `<Route>` 使用的同样的匹配代码，只是他不是用于正常的渲染周期，像在服务器上渲染前收集数据依赖

     import { matchPath } from 'react-router';

     const match = matchPath('/users/123', {
         path: '/users/:id',
         exact: true,
         strict: false
     });

 # pathname
 第一个参数是你想要匹配的路径名。如果你是在 Node.js 的服务器上，他将会是 `req.url`.

 # props
 第二个参数是要匹配的属性，和 `Route` 接收的一样：

     {
         path,      //like /users/:id
         strict,    //optional, defaults to false
         exact      //optional, defaults to false
     }
*/