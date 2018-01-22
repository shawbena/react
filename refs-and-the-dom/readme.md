# Refs and the DOM

[prev](/static-type-checking/)
[next](/uncontrolled-components/)

在典型的 React 数据流中，[props](/components-and-props/) 是父子组件交互的唯一方式。要修改子组件，你用新属性渲染。而有一些情形中，你需要在典型的数据流之外修改子组件。要修改的子组件可以是 React 组件或是一个 DOM 元素。对于这两种情形，React 都准备了应急措施 (escape hatch).

## Whehn to Use Refs

对于 refs 有几种好的使用情形：

- 管理聚焦、文本选择，或媒体播放。

- 触发强制动画。

- 与第三方 DOM 库集成。

如果能声明式地实现就避免使用 refs.

例如，与其暴露一个 `Dialog` 组件的 `open()` 和 `close()` 方法，不如给他传递一个 `isOpen` 属性。

## Don't Overuse Refs

你的第一倾向可能是在应用中使用 refs “使事情发生”。如果是这种情形，花点时间思考一下组件层级中是否应拥有状态。常常高层级组件中恰当地放置状态清晰一些。这种示例见 [Lift State Up](/lifting-state-up/) 指南。

## Adding a Ref to a DOM Element

React 支持一个特殊的属性，你可以把他附加给任何组件。`ref` 属性接收一个回调函数，这个回调函数在组件挂载或卸载之后会立即执行。//卸载之后中执行？以 null 调用

当 `ref` 属性用于一个 HTML 元素，`ref` 回调接收底层 DOM 元素作为其参数。如，这段代码使用 `ref` 回调存储一个 DOM 节点的引用：

[CustomTextInput.tsx](./index.tsx)

```tsx
import * as React from 'react';

class CustomTextInput extends React.Component{

    private textInput: HTMLInputElement | null;

    constructor(props:any){
        super(props);
        this.focusTextInput = this.focusTextInput.bind(this);
    }
    
    focusTextInput(){
        // Explicity focus the text input using the raw DOM API
        this.textInput && this.textInput.focus();
    }

    render(){
        // Use the `ref` callback to store a reference to the text input DOM
        // element in an intance field (for example, this.textInput).
        return(
            <div>
                <input type="text"
                    ref={(input) => {this.textInput = input;}}
                />
                <input type="button"
                    value="Focus the text input"
                    onClick={this.focusTextInput}
                />
            </div>
        );
    }
}
```

在组件挂载时，React 将以 DOM 元素调用 `ref` 回调，当组件卸载时以 `null` 调用。

使用 `ref` 回调只设置一个类的属性是用来访问 DOM 元素的常见模式。首选方式是像上面示例在 `ref` 回调中设置这个属性。有更洁的方式：`ref={input => this.textInput = inpu}`.

## Add a Ref to a Class Component

当 `ref` 属性用于一个声明为类的自定义组件时，`ref` 回调挂载的组件实例为其参数。例如，假如我们想包裹上面的 `CustomTextInput` 模拟下他在挂载后立即被点击：

[index.tsx](./add-a-ref-to-a-class-component/index.tsx)

```tsx
import * as React from 'react';
import CustomTextInput from '../CustomTextInput';
import bootstrap from '../../bootstrap';

class AutoFocusTextInput extends React.Component{
    
    private textInput: CustomTextInput | null;
    
    componentDidMount(){
        this.textInput && this.textInput.focusTextInput();
    }
    
    render(){
        return(
            <CustomTextInput ref={(input) => this.textInput = input} />
        );
    }
}

bootstrap(AutoFocusTextInput);
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
  render() {
    // This will *not* work!
    return (
      <MyFunctionalComponent
        ref={(input) => { this.textInput = input; }} />
    );
  }
}
```

如果你真的想引用函数组件的话你要把他转换为类组件，就像当你需要状态或生命周期方法那样做。

不过，你可以在函数组件内使用 `ref`, 只要是你引用一个 DOM 元素或类组件就可以：

[index.tsx](./refs-and-functional-component/index.tsx)

```tsx
import * as React from 'react';
import bootstrap from '../../bootstrap';

function CustomTextInput(){
    // txtInput must be declared here so the ref callback can refer to it
    let textInput: HTMLInputElement | null;

    function handleClick(){
        textInput && textInput.focus();
    }

    return(
        <div>
            <input type="text" ref={(input) => textInput = input }/>
            <input type="button"
                value="Focus the text input" 
                onClick={handleClick}
            />
        </div>
    );
}

bootstrap(CustomTextInput);
```

## Exposing DOM Refs to Parent Components

在父组件中访问子组件中的 DOM 节点是罕见的。通常不推荐这样做，因为这破坏了组件封装，偶尔用用着，如触发子 DOM 节点焦点或测量其大小或位置。

虽然你可以给子组件添加一个[引用 (ref)](#add-a-ref-to-the-child-component), 但这并不是理想的解决办法，因为这样做你将得到一个组件实例而非一个 DOM 节点。而且，这也不能用于函数功能组件。

而是，这种情形我们建议给子组件暴露一个特殊属性。子组件接收一个任意名称的函数属性 (如 `inputRef`) 并将其添加到 DOM 节点上作为 `ref` 特性。这使得父组件通过中间组件将其 ref 回调传递给子组件的 DOM 节点。

这既可用于类组件也可用于函数功能的组件。

[index.tsx](./exporting-dom-refs-to-parent-component/index.tsx)

```tsx
import * as React from 'react';
import bootstrap from '../../bootstrap';

interface CustomTextInputProps{
    inputRef: (ref: HTMLInputElement) => void;
}

function CustomTextInput(props: CustomTextInputProps){
    return(
        <div>
            <input type="text" ref={props.inputRef}/>
        </div>
    );
}

class Parent extends React.Component{
    constructor(props:any){
        super(props);
    }

    private inputElement: HTMLInputElement | null; //正如自我约束一样，添加 null 是一个良好的实践
    componentDidMount(){
        this.inputElement && this.inputElement.focus();
    }
    render(){
        return(
            <CustomTextInput inputRef={el => this.inputElement = el}/>
        );
    }
}

bootstrap(Parent);
```

上面的示例中，`Parent` ref 回调作为 `inputRef` 属性传递给 `CustomTextInput`, `CustomTextInput` 传递同样的函数作为 `<input>` 的特殊的 `ref` 特性。结果，`Parent` 中的 `this.inputElement` 将被设置为 `CustomTextInput` 中的 `<input>` 元素对应的 DOM 节点。

注意，上面示例中的名称 `inputRef` 没有什么特殊含义，只是一个常规的组件属性而已。而在 `<input>` 本身上使用 `ref` 属性是重要的，因为他告诉 React 给其 DOM 节点添加 ref.

即使 `CustomTextInput` 是一个函数节点，这仍然起作用。

不像 `ref` 特性，只能[指定 DOM 元素或类组件](#refs-and-functional-components)，像 `inputRef` 这样常规的属性并没有限制。

这种模式的另一个好处是深入几个组件也可以。如，假设 `Parent` 不需要那个 DOM 节点，但渲染他 `Parent` 的组件 (让我们称他为 `Grandparent`) 需要访问他。那么我们可以让 `Grandparent` 指定给 `Parent` 指定 `inputRef` 属性，让 `Parent` 将其”前进“至 `CustomTextInput`:

```jsx
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}

function Parent(props) {
  return (
    <div>
      My input: <CustomTextInput inputRef={props.inputRef} />
    </div>
  );
}


class Grandparent extends React.Component {
  render() {
    return (
      <Parent
        inputRef={el => this.inputElement = el}
      />
    );
  }
}
```

这里，ref 回调首先被 `Grandparent` 指定。作为常规属性 `inputRef` 传递给 `Parent`, 然后 `Parent` 也将其作为一个属性传递给 `CustomTextInput`. 最终，`CustomTextInput` 读取 `inputRef` 属性，并将这个传递过来的函数附加到 `<input>` 的 `ref` 特性上。结果，`Grandparent` 中的 `this.inputElement` 将被设置为 `CustomTextInput` 中 `<input>` 元素对应的 DOM 节点。

就各方面而言，我们建议尽可能不赞成暴露 DOM 节点，但在一些应急情形中也是有用的。注意这种方法需要你给子组件添加一些代码。如果你对子组件完全没有控制权，你最后的选择是使用 [findDOMNode()](/react-dom/#finddomnode), 但不建议这样做。

## Legacy API: String Refs

如果你用过之前的 React, 你可能熟悉老的 API，其中 `ref` 属性是一个字符串，如 `"textInput"`, DOM 节点是通过 `this.refs.textInput` 访问。我们不建议这样做，因为字符串 ref [有一些问题](https://github.com/facebook/react/pull/8333#issuecomment-271648615)，字符串 `ref` 是遗留问题，有可能在未来的某个发布版本中移除。如果你当前使用 `this.refs.textInput` 访问 `refs`, 我们建议使用回调模式。

## Caveats

如果 `ref` 回调定义为一个内联函数，在更新期间他将调用两次，第一次以 `null` 调用，再次以 DOM 元素调用。这是因为每次渲染都会创建新的函数实例，所以 React 需要清除旧的 ref 并设置新的。你以把 `ref` 回调绑定至类的方法来避免这个问题，但大多情形这不会有什么问题。