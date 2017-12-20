 # Conditional Rendering

 prev: handling-events
 next: lists-and-keys

 在 React 中，你可以创建不同的组件封装你需要的行为。然后你可以根据组件的状态部分渲染。

 React 中的条件渲染和 JavaScript 中的条件一样。使用 if 或[条件操作符](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)创建表示当前状态的元素，然后让 React 更新 UI 匹配他们。

 考虑下面两个组件：

 ```jsx
 function UserGreeting(props){
     return <h1>Welcome back!</h1>
 }

 function GuestGreeting(props){
     return <h1>Please sign up.</h1>;
 }
 ```

 我们将创建一个 `Greeting` 组件，展示哪个组件取决于用户是否登录：

 ```jsx
 function Greetign(props){
     const isLoggedIn = props.isLoggedIn;
     if(isLoggedIn){
         return <UserGreeting />;
     }
     return <GuestGreeting />;
 }

 // Try changing to isLoggedIn={true}
 ReactDOM.render(<Greeting isLoggedIn={false} />, document.getElementById('root'));
 ```

 根据属性值 `isLoggedIn` 主个示例渲染不同的欢迎语。

 ## Element Variables

 你可以用变量来存放元素。这可以帮助你渲染组件的一部分而其他输出不改变。

 考虑有两个表示 Logout 和 Login 按钮的组件：

 ```jsx
 function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );

 ```

下面的示例中，我们创建一个叫 `LoginControl` 的[状态化的组件](/state-and-lifecycle/)。他将根据当前状态 (state) 渲染 `<LoginButton />` 或 `<LogoutButton />`. 他也渲染之前例子中的 `<Greeting />`:

```jsx
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;

    let button = null;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

ReactDOM.render(
  <LoginControl />,
  document.getElementById('root')
);
```

## Inline if with Logical && Operator

你也可以[在JSX中嵌入任何 JSX 表达式](/introducing-jsx/#embedding-expressions-in-jsx)，只需将表达式包裹在曲括号中。这包括 JavaScript 逻辑 `&&` 操作符。对于有条件地加入一个元素，这样很便利。

```jsx
function Mailbox(props){
    const unreadMessage = props.unreadMessages;
    return (
        <div>Hello!</div>
        {unreadMessages.length > 0 && 
            <h2>
                You have {unreadMessages.length} unread messages.
            </h2>
        }
    );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);
```

这也是可以的，因为在 JavaScript 中，`true && expression` 总是求值为 `expression`, `false && expression` 总是求值为 `false`.

因此，如果条件为 `true`, `&&` 后的的元素将出现在输出中。如果是 `false`, React 将忽略并跳过他。

## Inline if-Else with Conditional Operator

条件性渲染元素的另一种方法是使用 JavaScript 条件操作符 [condition ? true : false](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator), 下面的示例中，我们使用他条件性地渲染一小块文本。

```jsx
render(){
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'} logged in.</b>
    </div>
  );
}
```

也可以用用大的表达式，虽然这样写不太明朗：

```jsx
render(){
  const isLoggedIn = this.state.isLoggedIn;
  return(
    <div>
      {isLoggedIn ? (
        <LogoutButton onClick={this.handleLogoutClick} />
      ) : (
        <LoginButton onClick={this.handleLoginClick} />
      )}
    </div>
  );
}
```

就像 JavaScript 中那样，取决于你选择一个你和你团队认为可读的合适的方式。当条件太复杂时，应该[提取出一个组件](/components-and-props#extracting-components)。

## Preventing Component from Rendering

你很少会让一个组件隐藏自己即使他被另一个组件渲染。要这样做，返回 `null` 而非渲染的输出。

下面的示例中，`<WarningBanner />` 取决于 `warn` 属性值被渲染。如果这个属性值是 `false`, 不渲染组件 `<WarningBanner />`:

```jsx
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true}
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(prevState => ({
      showWarning: !prevState.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
```

组件的 `render` 方法返回 `null` 并不影响组件生命周期函数的触发。如 `componentWillUpdate` 和 `componetDidUpdate` 仍然会被调用。