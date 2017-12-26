# State and Lifecycle

prev: components-and-props
next: handling-events

考虑下前面章节的 [ticking clock](/rending-elements#updating-the-rendered-element) 示例。

目前我们只学了一种更新 UI 的方式。我们调用 `ReactDOM.render()` 改变渲染的输出：

```js
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

本节，我们将学习怎样使 `Clock` 组件真正可重用并封装。这将建立自己的计时器并每秒自我更新。

我们先封装时钟：

```jsx
function Clock(props){
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick(){
  ReactDOM.render(
    <Clock date={new Date()} />
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

然而，这缺失了一个重要的需求：事是上 `Clock` 建立自己的 timer 并每秒更新 UI 应该是 `Clock` 的实现细节。

理想上，我们只想写此一次，让 `Clock` 自己更新：

```jsx
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

要实现这样的做法，我们需要给 `Clock` 组件添加 "state".

状态类似组件，但是私有的并由组件全权控制。

我们[之前](/components-and-props#functional-and-class-components)提到过定义为类的组件有额外的特色。本地状态就是只有类可用的特色。

## Converting a Function to a Class

你可以用5个步骤转换函数式组件如 `Clock` 为类组件：

1. 创建一个同样名称的 [ES6 类](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes)，继承 `React.Component`

2. 添加一个叫 `render()` 的方法

3. 将函数体移至 `render()` 方法中

4. 将 `render()` 体中的 `props` 替换为 `this.props`.

5. 删除余下的空函数声明

```jsx
class Clock extends Component{
    render(){
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
        </div>
    }
}
```

`Clock` 现在定义为一个类而非函数。

这让我们可能使用一些额外的特色如本地状态和生命周期钩子。

## Adding Local State to a Class

我们将用3个步骤将 `date` 从 props 移至 state:

1) 将 `render()` 方法中的 `this.props.date` 替换为 `this.props.date`:

```jsx
class Clock extends Component{
    render(){
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        </div>
    }
}
```

2) 添加一个 [class constructor]() 并赋值初始 `this.state`:

```jsx
class Clock extends Component{
    constructor(props){
      super(props);
      this.state = {date: new Date()};
    }
    render(){
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        </div>
    }
}
```

注意我们是如何将 `props` 传递给基类构造函数的：

```jsx
constructor(props){
  super(props);
  this.state = {date: new Date()};
}
```

类组件应该总是调用基类构造函数，传递 `props`.

3) 从 `<Clock />` 元素上移除 `date` 属性：

```jsx
ReactDOM.render(<Clock />, document.getElementById('root'));
```

稍后我们再给组件加定时器代码。

结果如下：

```jsx
class Clock extends Component{
    constructor(props){
      super(props);
      this.state = {date: new Date()};
    }
    render(){
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        </div>
    }
}

ReactDOM.render(<Clock />, document.getElementById('root'));
```

接下来，我们将使 `Clock` 建立自己的定时器并每秒更新自己。

## Addding Lifecycle Methods to a Class

在有许多组件的应用中，当组件被销毁时释放组件占用的资源是非常重要的。

我们想在 `Clock` 第一次渲染到 DOM 时建立[定时器]((https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval)。在 React 中这叫 "mounting".

当 `Clock` 生成的 DOM 被移除时我们想[清除定时器](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/clearInterval)。在 React 中这叫 "unmounting".

我们在类组件上声明特殊的方法，当组件挂载衙卸载时执行一些代码：

```jsx
class Clock extends Component{
    constructor(props){
      super(props);
      this.state = {date: new Date()};
    }

    componentDidMount(){

    }

    componentWillUnmount(){

    }

    render(){
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        </div>
    }
}

ReactDOM.render(<Clock />, document.getElementById('root'));
```

这些方法叫 "lifecycle hooks"

`componentDidMount()` 钩子在组件输出渲染到 DOM 后运行。这是设置定时器的好地方：

```jsx
componentDidMount(){
  this.timerId = setInterval(() => this.tick(), 1000);
}
```

注意我们是如何将定时器 ID 就保存在 `this` 上的。

`this.props` 是 React 设置的而 `this.state` 有特殊的意义，你有自由给类添加字段如果你要存储什么而不是用于视觉输出。

如果 `render()` 中不用，他就不应该出现在 state。

我们将在 `componentWillUnmount` 生命周期钩子中拆除定时器：

```jsx
componentWillUnmount(){
  clearInterval(this.timerID);
}
```

最后，我们实现了叫 `tick()` 的方法，`Clock` 组件每秒运行一次。

他将使用 `this.setState()` 来规划组件本地状态的更新：

```jsx
class Clock extends Component{
  state = {
    date: new Date()
  };

  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount(){
    clearInterval(this.timerID);
  }

  tick(){
    this.setState({ date: new Date() });
  }

  render(){
    return(
      <div>
        <h1>Hello, world!</h1> 
        <h2>It is {this.state.date.toLocalTimeString()}.</h2>
      </div>
    );
  }
}

render(<Clock />, root);
```

现在时间每秒滴答一下。

让我们快速回顾一下发生了什么及方法调用的顺序：

1) 当 `<Clock />` 传递给 `ReactDOM.render()` 时，React 调用 `Clock` 组件的构造函数。因为 `Clock` 需要显示当前时间，他用一个包含当前时间的对象初始化的 `this.state`。我们稍后将更新这个 state.

2) 然后 React 调用 `Clock` 组件的 `render()` 方法。React 通过 `render()` 方法了解要在屏幕上显示什么。然后 React 更新 DOM 匹配 `Clock` 渲染的输出。

3) 当 `Clock` 输出插入到 DOM 中时，React 调用 `componentDidMount()` 生命周期钩子。在这个生命周期钩子中，`Clock` 组件让浏览器建立一个定时器，每隔一秒调用组件的 `tick()` 方法。

4) 每秒浏览器调用一次 `tick()` 方法。在 `tick()` 方法中，`Clock` 组件以包含当前时间的对象调用 `setState()` 规划 UI 更新。由于 `setState()` 调用, React 得知 state 发生了变化，再次调用 `render()` 方法来了解屏幕上应该展示什么。时间, `render()` 方法中的 `this.state.date` 将会不同，所以渲染的输出将包括更新的时间。React 相应地更新 DOM.

5) 如果 `Clock` 组件从 DOM 中移除，React 调用 `componentWillunmount()` 周期钩子以停止定时器。

## Using State Correctly

关于 `setState()` 你要知道三件事。

### Do Not Modify State Directly

例如，这样不会重新渲染组件：

```jsx
// Wrong
this.state.comment = 'Hello';
```

而是使用 `setState()`:

```jsx
// Correct
this.setState({ comment: 'Hello' });
```

你可以赋值 `this.state` 的唯一地方是构造函数。// 如果 state 是放在构造函数中的话。。

### State Updates May Be Asynchronous

出于性能 React 可能批处理多个 `setState()` 调用成一个更新。

因为 `this.props` 和 `this.state` 可能异步更新，你不应依赖他的值计算下一个状态。

例如，这个代码可能会更新 counter 失败：

```jsx
// Wrong
this.setState({ counter: this.state.counter + this.props.increment });
```

要解决这个问题，使用 `setState()` 的第二种形式，他接收一个函数而非对象。这个函数的第一个参数是之前的 state, 第二个参数是更新时的 props:

```jsx
// Correct
this.setState({ prevState, props} => ({
  counter: prevState.counter + props.increment
}));
```

上面我们使用 [arrow function](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions), 但用常规函数也可以：

```jsx
// Correct
this.setState({ function(prevState, props){
  return {
    counter: prevState.counter + props.increment;
  };
}});
```

### State Updates are Merged

当你调用 `setState()` 时，React 将你提供的对象与当前 state 合并。

例如，你的 state 可能包含多个独立的变量：

```js
constructor(props){
  super(props);
  this.state = {
    posts: [],
    comments: []
  };
}
```

然后你用独立的 `setState()` 调用单独更新他们：

```jsx
componentDidMount(){
  fetchPosts().then(response => {
    this.setState({ posts: response.posts });
  });

  fetchComments().then(response => {
    this.setState({
      comments: response.comments
    });
  });
}
```

合并是浅的，所以 `this.setState({ comments })` 留下 `this.state.posts` 完好无损，但完全替换掉了 `this.state.comments`.

## The Data Flows Down

无论是父组件还是子组件都无法知道一个特定组件是有状态状还是无状态的，他们不应该关心父组件或子组件是函数或是类。

也正是如此 state 常常称为本地或封装的。除了拥有和设置 state 的组件，其他组件都是不可访问的其他组件的 state 的。

一个组件可选择将自己的 state 作为  props 向下传递给其子组件：

```jsx
<h2>It is {this.state.date.toLocalTimeString()}.</h2>
```

这也适用于用户定义的组件：

```jsx
<FormattedDate date={this.state.date} />
```

`FormattedDate` 组件将从自己的 props 中接收 `date`，而且将不知道他是来自 `Clock` 的 state, `Clock` 的 props, 还是 随手键入的：

```jsx
function FormattedDate(props){
  return <h2>It is {props.date.toLocalTimeString()}.</h2>;
}
```

这通常叫 "top-down" 或 "unidirectional" 数据流。任何 state 总是由特定的组件持有，继承那个 state 的任何数据或 UI 只影响下树下面的组件。

如果你把组件树想像为 props 的瀑布流，每个组件的状态就像一个额外的水源，在任意节点汇入但向下流动。

为了展示所有的组件都是完全孤立的，我们创建一个渲染三个 `<Clock>` 的 `APp` 组件:

```jsx
function App() {
  return (
    <div>
      <Clock />
      <Clock />
      <Clock />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

 每个 Clock 建立自己的计时器，并独立更新。
 
 在 React 应用中，无论一个组件是有状态的还是无状态的都被视为组件的实现细节，可能会随时间变化。你可以在无状态的组件中使用有状态的组件，反过来也可以。