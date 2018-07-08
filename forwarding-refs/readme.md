# Forwarding Refs

Ref forwarding 是自动将 ref 传递给一个组件的子组件的技术。大多组件通常不需要这么做。然而，对一些组件是有用的，尤其是重用的库组件。下面描述了最常见的情形。

## Forwarding refs to DOM components

考虑一个渲染原生 `button` DOM 元素的组件：

```js
function FancyButton(props){
    return (
        <button className="FancyButton">{props.children}</button>
    );
}
```

React 组件隐藏他们的实现细节，包括渲染的输出。使用 `FancyButton` 的其他组件通常不需要获取内部 `button` DOM 元素的 `ref`。这没错，因为这防止对 DOM 结构太依赖。

虽然这样的封装对 `FeedStory` 或 `Comment` 这样的应用层级的组件来说是理想的，但对于高度可用的叶子件如  `FancyButton` 或 `MyTextInput` 可能是不方便的。这些组件的使用倾向于贯穿整个应用以常规 DOM `button` 和 `input` 的形式，而且访问他们的 DOM 节点以管理焦点，选区或动画可能是不能避免的事情。

Ref forwarding 是可选的特色，使得一些组件接收接受到的 ref 并向下 ("forward") 传递给子组件。

这个示例中，`FanceButton` 使用 `React.forwardRef` 获得传递给他的 `ref`, 然后向前 (forward) 传递给他渲染的 DOM `button`。

__fancyButton.tsx__

```js
```

这样使用 `FancyButton` 的组件可得到至底层 `button` DOM 节点 的 ref，如果需要的话就访问他，就像直接使用 DOM `button` 一样。

这里是对上面示例的步步的解释：

1. 调用 `React.createRef` 并将他赋值给 `ref` 变量，这样创建了一个 `React ref`。

2. 通过 JSX 属性将 `ref` 通过 `<FancyButton ref={ref}>` 向下传递。

3. React 将 `ref` 传递给 `(props, res) => ...` 函数，`forwareRef` 为第二个参数。

4. 通常指定其 JSX 属性将 `ref` 参数传递给 `<button ref={ref}>`。

5. 当 ref 绑定好时，`ref.current` 指向 `<button>` DOM 节点。

> Note
> 只有当用 `React.forwardRef` 调用来定义组件时才会有第二个 `ref` 参数。常规的函数或类组件不会接收 `ref` 这个参数，其属性中也没有 ref。
> ref forwarding 不仅限于 DOM 组件。也可以用于类组件实例。

## Note for component library maintainers

当在组件库中使用 forwardRef 是，你应该把这当作一个重大变化并发布一个库的新版本。这是因为你的库有一个明显的不同的行为 (如 refs 是怎样赋值的，输出的是什么类型)，这可能破坏应用和其他依赖旧行为的库。

## Forwarding refs in higher-order components

这个技术对高阶组件 (HOCs) 尤其有用。这我们从一个向控制台打印组件属性的 HOC 示例开始：

```js
function logProps(WrappedComponent){
    return class LogProps extends React.Component{
        componentDidUpdate(prevProps){
            console.log('old props', prevProps);
            console.log('new props', this.props);
        }

        render(){
            return <WrappedComponent {...this.props} />;
        }
    }
}
```

"logProps" HOC 将所有的 `props` 传递给了他封装的组件，所以渲染的结果是一样的。例如，我们可以使用这个 HOC 打印传给组 "fance button" 组件的所有属性：

```js
class FancyButton extends React.Component{
    focus(){
        // ...
    }

    // ...
}

// 我们导出 LogProps 而非 FancyButton
// 不过他将渲染一个 FancyButton
export default logProps(FancyButton);
```

上面的例子有一个问题：refs 不会传递过去。这是因为 `ref` 不是属性。和 `key` 一样由 React 处理。如果你给 HOC 添加一个 ref, 这个 ref 将会引用最外层容器组件，而非封装的组件。// 仔细想想这并不吃惊，FancyButton 现在是子组件，没法接收传来的 ref

这意味着我们用于 `FancyButton` 组件的 refs 将附加到 `LogProps` 组件上：

```js
import FancyButton from './FancyButton';

const ref = React.createRef();

// 我们引入的 FancyButton 是 LogProps HOC.
// 尽管渲染组果是一样的，我们的 ref 将指向 LogProps
// 而非里面的 FancyButton 组件！
// 这意味着我们不能调用如 ref.current.focus()

<FancyButton
    label="Click Me"
    handleClick={handleClick}
    ref={ref}
/>;
```

幸运的是我们可以使用 React.forwardRef API 将 refs 传递给内部的 `FancyButton` 组件。`React.forwardRef` 接收一个渲染函数，这个函数接收 `props` 和 `ref` 参数，并返回一个 React 节点。如：// React.forwardRef() 在此处的作用是把我们传递给 LogProps 的 ref 属性拿出来，作为一个普通属性传递给 LogProps, 在 LogProps 我们再把传递下来充当 ref 的属性传递给封装的组件。这样就可以把创建的 ref 附加到正确的地方了！
__forwarding-refs-in-higher-order-components/logProps.tsx__
```tsx
```

## Displaying a custom name in DevTools

`React.forwardRef` 接受一个渲染函数。 React DevTools 使用这个函数决定这个 ref forwarding 组件的显示。

例如，下面这个组件在 DevTools 将会是 "ForwardRef":

```js
const WrappedComponent = React.forwardRef<HTMLButtonElement>((props, ref) =>{
    return <LogProps {...props} forwardedRef={ref} />;
});
```

如果你命名了渲染函数，DevTools 将会包含其名称 (如 "ForwardRef(myFunction)")。

```js
const WrappedComponent = React.forwardRef(
  function myFunction(props, ref) {
    return <LogProps {...props} forwardedRef={ref} />;
  }
);
```

甚至你可以设置函数的 `displayName` 属性来包含你封装的组件：

```js
function logProps(Component) {
  class LogProps extends React.Component {
    // ...
  }

  function forwardRef(props, ref) {
    return <LogProps {...props} forwardedRef={ref} />;
  }

  // Give this component a more helpful display name in DevTools.
  // e.g. "ForwardRef(logProps(MyComponent))"
  const name = Component.displayName || Component.name;
  forwardRef.displayName = `logProps(${name})`;

  return React.forwardRef(forwardRef);
}
```

# build

```
tsc
```


