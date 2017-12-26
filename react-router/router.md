## &lt;Router&gt;

常见的用于所有路由 (router) 组件的底层接口。通常应用会使用以下高层路由之一：

- [&lt;BrowserRouter&gt;](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/api/BrowserRouter.md)

- [&lt;HashRouter&gt;](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/api/HashRouter.md)

- [&lt;MemoryRouter&gt;](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/MemoryRouter.md)

- [&lt;NativeRouter&gt;](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-native/docs/api/NativeRouter.md)

- [&lt;StaticRouter&gt;](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/StaticRouter.md)

最常见的低层的 `<Router>` 的使用情形是将自定义 history 与像 Redux 或 Mobx 这样的状态管理库同步。注意和 React 一同使用这些状态管理库并不是必需的，只是用于深度集成罢了。

```jsx
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

<Router history={history}>
	<App />
<Router>
```

## history: object

[history](https://github.com/ReactTraining/history) 对象用于导航。

```jsx
import createBrowserHistory from 'history/createBrowserHistory'

const customHistory = createBrowserHistory()
<Router history={customHistory}/>
```

## children: node

要渲染的一个 [single child element](https://facebook.github.io/react/docs/react-api.html#react.children.only) 