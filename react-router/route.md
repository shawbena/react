# &lt;Route&gt;

Route 组件或许是 React Router 中要理解和学习用好的最重要的组件。

他最最基本的责任是当 [location](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/location.md) 匹配路由 (route) 的 `path` 时渲染一些 UI。

考虑以下代码：

```jsx
import { BrowserRouter as Router, Route } from 'react-router-dom';

<Router>
	<div>
		<Route exact path="/" component={Home} />
		<Route path="/news" component={NewsFeed} />
	</div>
</Router>
```

如果应用的地址 (location) 是 `/` 那 UI 层级将会是这样的：

```html
<div>
	<Home />
	<!-- react-empty: 2 -->
</div>
```
如果应用的地址 (location) 是 `/news` 那 UI 层级将会是：

```html
<div>
	<!-- react-empty: 1 -->
	<NewsFeed />
</div>
```

"react-empty" 注释只是 React 的 `null` 渲染的实现细节。但对于我们来说是增长知识的。技术上一个 Route 总是被渲染即使他渲染 `null`。一旦应用位置匹配路由路径，你的组件将会被渲染。

## Route render methods

一个 `<Route>` 有三种渲染的方式：

- `[<Route component>](#component)`

- `[<Route render>](#render-func)`

- `[<Route children>](#children)`

每个在不同的情形中是有用的。一个给定 `<Router>` 应该只用这些属性之一。见下面他们的解释理解为什么你有三个选项。大多时间你将用 工`component`.

## Route props

这三种[渲染方法](#router-render-methods)都将都将收到这三个路由属性。

- [match](/mach)

- [location](/location)

- [history](/history)

## component

仅当地址匹配时要渲染的 React 组件。组件将以 [route props](#route-props) 渲染。

```jsx
<Route path="/user/:username" component={User} />

const User = ({ match }) => {
	return <h1>Hello {match.params.username}</h1>;
};
```

当你使用 `component` (而非 `render` 或 `children`, 下面) router 使用 [React.createElement](https://facebook.github.io/react/docs/react-api.html#createelement) 从给定组件创建一个新的 [React element](https://facebook.github.io/react/docs/rendering-elements.html)。这意着如果你给 `component` 属性提供了一个内联函数，每次渲染都将创建一个新件。这造成现有组件卸载及新组件挂载而非只更新现有组件。当使用内联函数内联渲染时，使用下面的 `render` 或 `children` 属性。

## render: func

这允许便利的内联渲染和包装面不会造成上面解释的重挂载。

你可以传递当路径匹配时要调用的函数，而非使用 [component](#component) 属性创建一个 [React element](https://facebook.github.io/react/docs/rendering-elements.html). `render` 属性和 `component` 属性一样接同样的所有 [route props](#route-props).

```jsx
// convenient inline rendering
<Route path="/home" render{() => <div>Home</div>}>

// wrapping/composing
const FadingRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={props => (
		<FadeIn>
			<Component {...props} />
		<FadeIn>
	)} />
);

<FadingRoute path="/cool" component={Something} />
```

__Warning__: `<Route component>` 优先级高于 `<Route render>`，所以不要在 `<Route>` 中两者都用。

## children: func

有时不论路径是否匹配地址你都需要渲染。这种情形，你可以用 `children` 函数属性。他和 `render` 类似，区别是无论是否匹配都会调用他。

`children` 渲染属性和 `component` 和 `render` 方法接收同样的所有 [route props](#route-props)，只是在一个路由匹配 URL 失败时，`match` 是 `null`. 这使得你基于路由是否匹配动态调整你的 UI. 这里如果路由匹配我们添加一个 `active` 类。

```jsx
<ul>
	<ListItemLink to="/somewhere" />
	<ListItemLink to="/somewhere-else">
</ul>

const ListItemLink = ({ to, ...rest }) => (
	<Route path={to} children={({ match }) = > (
		<li className={match ? 'active' : ''}>
			<Link to={to} {...rest}/>	
		</li>
	)} />
);
```

## path: string

## exact: bool

## strict: bool

## location: object

## sensitive: bool