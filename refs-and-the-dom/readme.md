# Refs and the DOM

[prev](/static-type-checking/)
[next](/uncontrolled-components/)

Refs 提供访问 DOM 节点或者 render 方法中创建的 React 元素的方法。

在典型的 React 数据流中，[props](/components-and-props/) 是父子组件交互的唯一方式。要修改子组件，你用新属性渲染。而有一些情形中，你需要在典型的数据流之外修改子组件。要修改的子组件可以是 React 组件实例或是一个 DOM 元素。对于这两种情形，React 都准备了应急措施 (escape hatch).

## When to Use Refs

对于 refs 有几种好的使用情形：

- 管理聚焦、文本选择，或媒体播放。

- 触发强制动画。

- 与第三方 DOM 库集成。

如果能声明式地实现就避免使用 refs.

例如，与其暴露一个 `Dialog` 组件的 `open()` 和 `close()` 方法，不如给他传递一个 `isOpen` 属性。

## Don't Overuse Refs

你的第一倾向可能是在应用中使用 refs “使事情发生”。如果是这种情形，花点时间思考一下组件层级中是否应拥有状态。常常高层级组件中恰当地放置状态清晰一些。这种示例见 [Lift State Up](/lifting-state-up/) 指南。

> Note
> 下面的示例已经更新到了使用 React 16.3 中的 `React.createRef()` API。如果你还在使用之前版本的 React, 我们建议使用 [callback refs]()。

## Creating Refs

```js
class MyComponent extends React.Component{
    constructo(props){
        super(props);
        this.myRef = React.createRef();
    }

    render(){
        return <div ref={this.myRef};
    }
}
```

## Accessing Refs

当 ref 传递给了 render 中的一个元素，可以通过 ref 的 current 访问 ref 引用的节点了。

```js
const node = this.myRef.current;
```

ref 的值根据节点的类型有所不同：

- 当 `ref` 属性用用 HTML 元素时，在构造函数中创建的 `ref` 接收底层的 DOM 元素放置在 `current` 属性中。

- 当 `ref` 属性用于自定义类组件时，`ref` 对象接收挂载的组件实例在其 `current` 属性中。

- 不能对函数组件使用 `ref` 因为函数组件没有实例。

## Adding a Ref to a DOM Element

这段代码使用一个 `ref` 存储对 DOM 节点的引用：

__CustomTextInput.tsx__

```tsx
```

在组件挂载时，将赋给 `current` 属性 DOM 元素，当组件卸载时赋 `null`。`ref` 在 `componentDidMount` 或 `componentDidUpdate` 生命周期钩子前发生。

使用 `ref` 回调只设置一个类的属性是用来访问 DOM 元素的常见模式。首选方式是像上面示例在 `ref` 回调中设置这个属性。有更洁的方式：`ref={input => this.textInput = inpu}`.

## Add a Ref to a Class Component

如果你想包括 上面的 `CustomTextInput` 模拟挂载组件立即被点击，我们可以使用一个 ref 访问这个自定义 input 并在 `focusTextInput` 方法中手动调用他：

当 `ref` 属性用于一个声明为类的自定义组件时，`ref` 回调挂载的组件实例为其参数。例如，假如我们想包裹上面的 `CustomTextInput` 模拟下他在挂载后立即被点击：

__./add-a-ref-to-a-class-component/index.tsx__

```tsx
```

注意只有当 `CustomTextInput` 声明为类时才起作用：

```jsx
class CustomTextInput extends React.Component{
    // ...
}
```

## Refs and Functional Components

不能给函数功能的组件添加 `ref`, 因为函数没有实例：

```jsx
function MyFunctionalComponent() {
  return <input />;
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }
  render() {
    // This will *not* work!
    return (
      <MyFunctionalComponent ref={this.textInput} />
    );
  }
}
```

如果你真的想引用函数组件的话你要把他转换为类组件，就像当你需要状态或生命周期方法那样做。

不过，你可以在函数组件内使用 `ref`, 只要是你引用一个 DOM 元素或类组件就可以：

[index.tsx](./refs-and-functional-component/index.tsx)

```tsx
function CustomTextInput(props) {
  // textInput must be declared here so the ref can refer to it
  let textInput = React.createRef();

  function handleClick() {
    textInput.current.focus();
  }

  return (
    <div>
      <input
        type="text"
        ref={textInput} />

      <input
        type="button"
        value="Focus the text input"
        onClick={handleClick}
      />
    </div>
  );
}
```

## Exposing DOM Refs to Parent Components

在父组件中访问子组件中的 DOM 节点是罕见的。通常不推荐这样做，因为这破坏了组件封装，偶尔用着，如触发子 DOM 节点焦点或测量其大小或位置。

虽然你可以给子组件添加一个[引用 (ref)](#add-a-ref-to-the-child-component), 但这并不是理想的解决办法，因为这样做你将得到一个组件实例而非一个 DOM 节点。而且，这也不能用于函数功能组件。

如果你使用的是 React 16.3+，我们推荐你使用 ref forwarding。

如果你使用 React 16.2- 你可以明确地将 ref 作为一个其他名称的属性传递。

我们尽可能反对暴露 DOM 节点，但这也许会是有用的。这种方法需要向子组件添加一些方法。如果你对子组件实现没有控制，你最后的选择是使用 findDOMNode(), 但不推荐这样做。

## Callback Refs

React 也支持设置 refs 的另一种方式叫 "callback refs", 使得在设置或重置 refs 有更多控制。

这使用一个函数而非 `createRef()` 来创建 ref。这个函数接收 React 组件实例或 HTML DOM 元素作为第一个参数，你可以把他存在什么地方。

下面示例是一个常用模式的实现：使用 `ref` 回调将对一个 DOM 节点的引用存储在实例属性上。

```jsx
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);

    this.textInput = null;

    this.setTextInputRef = element => {
      this.textInput = element;
    };

    this.focusTextInput = () => {
      // Focus the text input using the raw DOM API
      if (this.textInput) this.textInput.focus();
    };
  }

  componentDidMount() {
    // autofocus the input on mount
    this.focusTextInput();
  }

  render() {
    // Use the `ref` callback to store a reference to the text input DOM
    // element in an instance field (for example, this.textInput).
    return (
      <div>
        <input
          type="text"
          ref={this.setTextInputRef}
        />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
```

当组件挂载时 React 以 DOM 元素调用这个 `ref` 回调，组件卸载时以 `null` 调用。`ref` 回调在 `componentDidMount` 或 `componentDidUpdate` 前调用。

你可以像 `React.createRef()` 创建的对象那样在组件间传递 refs 回调。

```jsx
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}

class Parent extends React.Component {
  render() {
    return (
      <CustomTextInput
        inputRef={el => this.inputElement = el}
      />
    );
  }
}
```

上面示例中，`Parent` 传递其 ref 回调在 `inputRef` 属性中给 `CustomTextInput`, `CustomTextInput` 将同样的函数传递给了 `<input>` 的 `ref` 属性。结果，`Parent` 的 `this.inputElement` 将会是 `CustomTextInput` 中的 `<input>` 元素。

## Caveats

如果 `ref` 回调定义为一个内联函数，在更新期间他将调用两次，第一次以 `null` 调用，再次以 DOM 元素调用。这是因为每次渲染都会创建新的函数实例，所以 React 需要清除旧的 ref 并设置新的。你以把 `ref` 回调绑定至类的方法来避免这个问题，但大多情形这不会有什么问题。

# build files

```
tsc
```