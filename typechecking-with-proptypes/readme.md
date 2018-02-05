# Typechecking with PropTypes

[prev](/jsx-in-depth/)
[next](/static-type-checking/)

> Note:
> 从 React v15.5 开始 `React.PropTypes ` 已经移至不同包裹。请使用 [prop-types](https://www.npmjs.com/package/prop-types) 库。
>
> 我们提供 [a codemod script](/blog/2017/04/07/react-v15.5.0.html#migrating-from-react.proptypes) 来自动完成转换。
随着你应用增长，你可以用类型检查 (typechecking) 捕获到很多 bugs. 对于一些应用，你可以使用 JavaScript 扩展如 [Flow](https://flowtype.org/) 或 [TypeScript](https://www.typescriptlang.org/) 来类型检查你的整个应用。即使这些你都不用，React 有内置的类型检查能力。要运行组件属性的类型检查，你可以赋一个特殊的 `propTypes` 属性：

[index.tsx](./index.tsx)

```tsx
import * as React from 'react';
import * as PropTypes from 'prop-types';

interface GreetingProps{
    name: string;
}

class Greeting extends React.Component<GreetingProps>{
    static propTypes = {
        name: PropTypes.string.isRequired
    };

    render(){
        return(
            <h1>Hello, {this.props.name}</h1>
        );
    }
}
```

`PropTypes` 输出了一些检验器，可以用来确保你接收到的数据是有效的。这个示例中，我们使用 `PropTypes.string`. 当提供了一个无效的属性值时，JavaScript 控制台会出现一个警告。出于性能考虑，只在开发模式校验 `propTypes`.

## PropTypes

这个示例展示了提供的不同的验证器：

```jsx
import PropTypes from 'prop-types';
MyComponent.propTypes = {
    // You can declare that a prop is a specific JS primitive. By default, these are all optional.
    optionalArray: PropTypes.array,
    optionalBool: PropTypes.bool,
    optionalFunc: PropTypes.func,
    optionalNumber: PropTypes.number,
    optionalObject: PropTypes.object,
    optionalString: PropTypes.string,
    optionalSymbol: PropTypes.symbol,

    // Anything that can be rendered: numbers, strings, elements or an array (or fragment) containg these types
    optionalNode: PropTypes.node,
    // A React element
    optionalElement: PropTypes.element,

    // You can also declare that a prop is an instance of a class. This uses JS's instanceof operator
    optionalMessage: PropTypes.instanceOf(Message),

    // You can ensure that your prop is limited to specific values by treating it as an enum
    optionalEnum: PropTypes.oneOf(['News', 'Photos']),
    optionalUnion: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.instanceOf(Message)
    ]),

    // An array of certain type
    optionalArrarOf: PropTypes.arrayOf(PropTypes.number),
    // An object with property values of a certain type
    // ?
    optionalObjectOf: PropTypes.objectOf(PropTypes.number),

    // An object taking on a particular shape
    optionalObjectWithShape: PropTypes.shape({
        color: PropTypes.string,
        fontSize: PropTypes.number
    }),

    // You can chain any of the above with `isRequired` to make sure a warning is shown if the prop isn't provided
    requiredFunc: PropTypes.func.isRequired,

    // A value of any data type
    requiredAny: PropTypes.any.isRequired,

    // You can also specify a custom validator. It should return an Error object if the validaton fails. Don't `console.warn` or throw, as this won't work inside `oneOfType`.
    customProp: funciton(props, propName, componentName){
        if(!/matchme/.test(props[propName])){
            return new Error(
                'Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Validation failed.'
            );
        }
    },

    // You can also supply a custom validator to `arrayOf` and `objectOf`.
    // It should return an Error object if the validation fails. The validator will be called for each key in the array or object. The first two arguments of the validator are the array or object itself, and the current item's key
    customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName){
        if(!/matchme/.test(propValue[key])){
            return new Error(
                'Invalid prop `' + propFullName + '` supplied to' + ' `' + componentName + '`. Validation failed.';
            )
        }
    })
};
```

## Requiring Single Child

使用 `PropTypes.element` 你可以指定只能传递给组件单个子组件作为子组件 (children)。

[index.tsx](./single-child/index.tsx)

```tsx
import * as React from 'react';
import * as PropTypes from 'prop-types';

interface MyComponentProps{
    children: React.ReactNode;
}

class MyComponent extends React.Component<MyComponentProps>{
    static PropTypes = {
        children: PropTypes.element.isRequired
    }
    render(){
        // This must be exactly one element or it will warn
        const children = this.props.children;
        return(
            <div>
                {children}
            </div>
        );
    }
}

/**
 * [ts]
不能将类型“{}”分配给类型“IntrinsicAttributes & IntrinsicClassAttributes<MyComponent> & Readonly<{ children?: ReactNode; }>...”。
  不能将类型“{}”分配给类型“Readonly<MyComponentProps>”。
    类型“{}”中缺少属性“children”。
 */
// let m = <MyComponent />
```

## Default Prop Values

你可以为你的 `props` 定义默认值，只要赋给特殊的 `defaultProps` 属性就可以：

```jsx
class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

// Specifies the default values for props:
Greeting.defaultProps = {
  name: 'Stranger'
};

// Renders "Hello, Stranger":
ReactDOM.render(
  <Greeting />,
  document.getElementById('example')
);
```

如果你使用 Babel 转换如 [transform-class-properties](https://babeljs.io/docs/plugins/transform-class-properties/), 你可以在 React 组件类中声明 `defaultProps` 静态属性。这种语法还没有被敲定而你将需要一个编译阶段来用于浏览器中。更多信息，见 [class fields proposal](https://github.com/tc39/proposal-class-fields).

```jsx
class Greeting extends React.Component {
  static defaultProps = {
    name: 'stranger'
  }

  render() {
    return (
      <div>Hello, {this.props.name}</div>
    )
  }
}
```

如果父组件没有指定, `defaultProps` 将用来确保 `this.props.name` 有一个值。`propTypes` 类型检查发生在 `defaultProps` 解析之后，所以类型检查也将应用至 `defaultprops`.

