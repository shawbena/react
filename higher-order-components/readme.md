# Higher Order Components

高阶组件 (higher-order component) 是 React 中重用组件逻辑的高级技术。HOC 本质上并非 React API 的一部分，他们是一种来自 React 编辑性的模式。

实际上，一个高阶组件是一个接收一个组件并返回一个新组件的函数。

```jsx
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

一个组件转换属性成 UI，而一个高阶组件转换一个组件为另一个组件。

HOCs 常见于第三方 React 库，如 Redux 的 [connect](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options) 及 Relay 的 [createContainer](https://facebook.github.io/relay/docs/api-reference-relay.html#createcontainer-static-method)

在这篇文章中，我们将讨论为什么高阶组件是有有用的，及怎样写高阶组件。

## Use HOCs For Cross-Cutting Concerns

> Note
>
> 我们之前推荐 mixins 的方式处理 cross-cutting concerns. 我们已经意识到了 mixin 带来的价值不比起问题多。[更多](/blog/2016/07/13/mixins-considered-harmful.html)关于为什么我们移除了 mixins 及你怎样转换现有组件。

组件是 React 中基本的代码重用单元。然而，你会发现一些模式并不符合传统组件。

例如，假设你有一个 `CommentList` 组件，订阅外部数据源来渲染评论列表：

[CommentList.tsx](./CommentList.tsx)

```tsx
import * as React from 'react';
import Comment from './Comment';
import DataSource from './DataSource';

interface CommentListProps {

}

interface CommentListState {
    comments: string[];
}

class CommentList extends React.Component<CommentListProps, CommentListState>{
    constructor(props: CommentListProps){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            comments: DataSource.getComments()
        };
    }

    componentDidMount(){
        DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount(){
        DataSource.removeChangeListener(this.handleChange);
    }

    handleChange(){
        this.setState({
            comments: DataSource.getComments()
        })
    }

    render(){
        return(
            <div>
                {this.state.comments.map((comment, index) =>(
                    <Comment comment={comment} key={index} />
                ))}
            </div>
        );
    }
}
```

稍后，你写了一个订阅单个博客 (blog) 推送的组件，有以下类似模式：

[BlogPost.tsx](./BlogPost.tsx)

```jsx
import * as React from 'react';
import TextBlock from './TextBlock';
import DataSource from './DataSource';

interface BlogPostProps{
    id: string;
}

interface BlogPostState{
    blogPost: string;
}

class BlogPost extends React.Component<BlogPostProps, BlogPostState>{
    constructor(props: BlogPostProps){
        super(props);
        this.state = {
            blogPost: DataSource.getBlogPost(props.id)
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        DataSource.addChangeListener(this.handleChange)
    }

    componentWillUnmount(){
        DataSource.removeChangeListener(this.handleChange);
    }

    handleChange(){
        this.setState({ blogPost: DataSource.getBlogPost(this.props.id)});
    }

    render(){
        return <TextBlock text={this.state.blogPost} />;
    }
}
```

`CommentList` 和 `BlogPost` 不是一样的——他们调用 `DataSource` 不同的方法，而且渲染不同的输出。但大部分实现是相同的：

- 挂载时，给 `DataSource` 添加一个变化侦听函数。

- 在侦听函数中，当数据源变化时调用 `setState`。

- 卸载时，移除事件侦听函数。

你可以想像下，在大型应用中，这种订阅 `DataSource` 并调用 `setState` 将多次出现。我们想要一个抽像，使得我们在一个单个地方定义逻辑并多组件共享。这就是高阶组件优秀 (excel) 的地方。

我们可以写一个函数创建 `CommentList` 及 `BlogPost` 这样的订阅 `DataSource` 的组件。函数将接收一个接收定阅的数据为属性之一的子组件为参数。让我们调用 `withSubScription`:

higher-ordered [CommentList.tsx](./higher-ordered/CommentList.tsx), [BlogPost.tsx](./higher-ordered/BlogPost.tsx)

```jsx
// 或者 withSubscription 函数接收一个选项参数，然后返回一个接收组件作为参数的函数
const CommentListWithSubscription = withSubscription(
  CommentList,
  (DataSource) => DataSource.getComments()
);

const BlogPostWithSubscription = withSubscription(
  BlogPost,
  (DataSource, props) => DataSource.getBlogPost(props.id)
);
```

第一个参数是要包装的组件。第二个参数接收我们感兴趣的数据，给定 `DataSource` 及当前 props.

当 `CommentListWithSubscription` 和 `BlogPostWithSubscription` 渲染时，当前从 `DataSource` 获取到的数据作为一个 `data` 属性传递给 `CommentListWithSubscription` 和 `BlogPostWithSubscription`.

[withSubscription.tsx](./withSubscription)

```tsx
import * as React from 'react';
import DataSource, { IDataSource } from './DataSource';

interface SubscriptionState{
    data: any;
}

/**
 * 包裹后组件接收的属性。
 */
interface SubscriptionProps{
    [prop: string]: any;
}

/**
 * 对包裹组件属性的要求。
 */
interface ComponentProps extends SubscriptionProps{
    data: any;
}

export default function withSubscription(Component: React.ComponentType<ComponentProps>, selectData: (dataSource: IDataSource, props?: SubscriptionProps) => any){
    // SubScriptionComponent 与 Subscription 接收相同的属性
    return class Subscription extends React.Component<SubscriptionProps, SubscriptionState>{
        constructor(props: SubscriptionProps){
            super(props);
            this.handleChange = this.handleChange.bind(this);
            this.state = {
                data: selectData(DataSource, props)
            };
        }
        componentDidMount(){
            DataSource.addChangeListener(this.handleChange);
        }
        componentWillUnmount(){
            DataSource.removeChangeListener(this.handleChange);
        }

        handleChange(){
            this.setState({
                data: selectData(DataSource, this.props)
            });
        }

        render(){
            // 。。。renders the wrapped component with the fresh data!
            // Notice that we pass through any additional props
            return <Component data={this.state.data} {...this.props} />
        }
    }
}
```

注意 HOC 不修改输入组件，也不使用继承拷贝其行为。而是 HOC 编辑 (compose) 原始组件，将其包裹在一个容器组件中。HOC 是零负作用的纯 (pure) 函数。

啊，就是这样！包裹的组件接收容器的所有属性，及用来渲染输出的新属性， `data`。HOC 不关心怎么使用使用数据, 及为什么这样使用，被包裹的组件也不关以数据是从哪里来的。

因为 `withSubscription` 是一个正常函数，你添加多少参数都可以。例如，你可能想使 `data` 属性名可配置，以使 HOC 与包裹的组件更数的独立。或你想接收用来配置 `shouldComponentUpdate` 的参数，或者配置数据源。这些都是可能的，因为 HOC 对组件定义有完全的控制。

像组件一样，`withSubscription` 和包裹的组件之间的契约完全基于属性 (props-based). 这使得将一个 HOC 换成另一个很容易。假如你想更换数据获取库这很有用。

## Don't Mutate the Original Component. Use Composition

忍住在 HOC 中修改组件原型的诱惑。

```jsx
function logProps(InputComponent){
    InputComponent.prototype.componentWillReceiveProps = function(nextProps){
        console.log('Current props: ', this.props);
        console.log('Next props: ', nextProps);
    }

    return InputComponent;
}

// EnhancedComponent will log whenever props are received
const EnhancedComponent = logProps(InputComponent);
```

这样做有一些问题。一是输入组件不能与强化组件分开重用。

更严重的是，如果对 `EnhancedComponent` 应用也修改 `componentWillReceiveProps` 的另一个 HOC，第一个 HOC 的功能将被覆盖！这个 HOC 也不能用于函数组件，函数组件没有生命周期方法。Mutating HOCs 是泄漏封装法必须知道人他们是怎样实现的以避免与其他 HOC 冲突。

应该使用编译而非修改的 HOC，将输入组件封闭在一个容器组件中：

```jsx
function logProps(WrappedComponent) {
  return class extends React.Component {
    componentWillReceiveProps(nextProps) {
      console.log('Current props: ', this.props);
      console.log('Next props: ', nextProps);
    }
    render() {
      // Wraps the input component in a container, without mutating it. Good!
      return <WrappedComponent {...this.props} />;
    }
  }
}
```

HOC 有修改版本的同样功能而也避免潜在的冲突。他同样好地适用类和函数组件。因为他是一个单纯的函数，对其他 HOCs 而言是可编辑的，或者对其本身也是这样。

你可能注意到了 HOCs 与包含组件 (container components) 模式的相似性。容器组件是分离高层次及低层次组件责任的一种策略。容器管理如订阅和状态，并传递属性给处理渲染 UI 的组件。HOCs 使用容器作为其实现的部分。你可以把 HOCs 认作为参数化的容器组件定义。

## Convention: Pass Unrelated Props Through to the Wrapped Component

HOCs 给一个组件添加特色。不应该修改其契约。期望从 HOC 返回的组件有与包裹组件相似的接口。

HOCs 应传递与其不相关的属性。大多 HOCs 包含一个如这样的渲染方法：

```jsx
render(){
  // Filter out extra props that are specific to this HOC and shouldn't be passed through
  const { extraProp, ...passThroughProps } = this.props;

  // Inject props into the wrapped component. These are usually state values or instance methods.
  const injectedProp = someStateOrInstanceMethod; 

  return (
    <WrappedComponent injectedProp={injectedProp} {...passThroughProps} />
  );
}
```

这种习俗使得 HOCs 尽可能灵活和可重用。


## Convention: Maximizing Composability

并非所有的 HOCs 都看起来一样。有时他们只接收一个参数，要包裹的组件：

```jsx
const NavbarWithRouter = withRouter(Navbar);
```

HOCs 常常接收额外的参数。这个来自 Relay 的示例中，使用一个配置对象指定组件的数据依赖：

```jsx
cosnt CommentWithRelay = Relay.createContainer(Comment, config);
```

大多常见的 HOCs 签名如此：

```jsx
// React Redux's `connect`
const ConnectedComment = connect(commentSelector, commentActions)(CommentList);
```
What?! 如果你将其分开，很容易明白发生了什么。

```jsx
// connect is a function that returns another function
const enhance = connect(commentListSelector, commentListActions);

// The returned funciton is an HOC, which returns a component that is connected to the Redux store
const ConnectedComment = enhance(CommentList);
```

换句话说，`connect` 是一个高阶函数，他返回一个高阶组件！

这种形式可能看起来困惑或不必要，但有其用处。单个参数的 HOCs 如 `connect` 函数返回的有 `Component => Component` 这样的签名。输入类型和输出类型相同的函数很容易编辑。//?

```jsx
// Instead of doing this...
const EnhancedComponent = withRouter(connect(commentSelector)(WrappedComponent));

//... you can use a function composition utility
// compose(f, g, h) is the same as (...args) => f(g(h(...args)))
// compose(f, g), (...args) => f(g(...args))
// compose() 函数这种写法很直观
const enhance = compose(
  // These are both single-argument HOCs
  withRouter,
  connect(commentSelector)
);

const EnhancedComponent = enhance(WrappedComponent);
```

(This same property also allows `connect` and other enhancer-style HOCs to be used as decorators, an experimental JavaScript proposal.)

`compose` 工具函数，大多第三方库包括 lodash 提供 ([lodash.flowRight](https://lodash.com/docs/#flowRight)), [Redux](http://redux.js.org/docs/api/compose.html), [Ramda](http://ramdajs.com/docs/#compose))

## Convention: Wrap the Display Name for Easy Debugging

HOCs 创建的容器组件在 [React Developer Tools](https://github.com/facebook/react/react-devtools) 中的显示和其他组件类似。要调试容易些，选择一个显示名传达那是 HOC 的结果。

大多常见技术是包括包裹的组件的显示名 (dispaly name)。所以如果高阶组件命名为 `withSubscription`, 包裹的组件的显示名称是 `CommentList`，使用显示名 `WithSubscription(CommentList)`


```jsx
function withSubscription(WrappedComponent){

  class WithSubscription extends React.Component{/* ... */}

  WithSubscription.displayName = `WithSubScription(${getDisplayName(WrappedComponent)})`

  return WithSubscription;
}

function getDisplayName(){
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
```

## Caveats

高阶组件有一些注意示项，如果你是 React 新手，那你可能不会立刻注意到他。

## Don't Use HOCs Inside the render Method

Reacg 差异算法 (diffing algorithm) (叫作 reconciliation) 使用组件身份来确定是否应更新现有子树或扔掉并挂载一个新的。如果从 `render` 返回的组件等于 (`===`) 之前渲染的组件，React 比较与新组件的差异，递归更新子树。如果不相等，之前的子树会被完全卸载。

正常情况下，你不需要考虑这个问题。但对 HOCs 来说是重要的，因为他意味着你不能在一个组件的渲染方法中将一个 HOC 应用至一个组件：

```jsx
render(){
  // A new version of EnhancedComponent is created on every render
  // EnhancedComponent1 != EnhancedComponent2
  const EnhancedComponent = enhance(MyComponent);
  //
  return <EnhancedComponent />;
}
````

这里不仅是性能的问题——重新挂载组件使得一个组件及其所有子组件全部丢失。

而是应该在结果组件定义外创建 HOCs，这亲结果组件只创建一次。然后其身份将在多次渲染中保持一致。不管怎样，这通常是你想要的。

很少有情形你需要动态应用一个 HOC, 那样也是在一个组件的生命周期方法或其构造函数中完成。

## Static Methods Must Be Copied Over

有时，在 React 组件上定义一个静态方法也是有用的。如，Relay 容器暴露一个静态方法 `getFragment` 使 GraphQL 片段更好编辑。

当你对一个组件应用 HOC 时，然而，原组件被包裹在一个容器组件中。这意味着新组件没有原组件的任何静态方法。

```jsx
// Define a static method
WrappedComponent.staticMethod = function(){/*...*/}

// Now apply an HOC
const EnhancedComponent = enhance(WrappedComponent);

// The enhanced component has no static method
type EnhancedComponent.staticMethod === 'undefined'; // true
```

要解决这个问题，你可以在返回组件前将静态方法拷贝到容器上：

```jsx
function enhance(WrappedComponent){
  class Enhance extends React.Component{/*...*/}
  // Must know exactly which method(s) to copy :(
  Enhance.staticMethod = WrappedComponent.staticMethod;
  return Enhance;
}
```

然而，你需要明确地知道要拷贝哪些方法。你可以使用 [hoist-non-react-statics](https://github.com/mridgway/hoist-non-react-statics) 自动拷贝所有非 React 静态方法：

```jsx
import hoistNonReactStatic from 'hoist-non-react-statics';

function enhance(WrappedComponent){
  class Enhance(WrappedComponent){
    /*...*/
  }
  hoistNonReactStatic(Enhance, WrappedComponent);
  return Enhance;
}
```

另一个解决方法是将静态方法与组件本身分开输出。

```jsx
// Instead of...
MyComponent.someFunction = someFunction;
export default MyComponent;

// ...export the method separately...
export { someFunction };

// ...and in the consuming module, import both
import MyComponent, { someFunction } from './MyComponent.js';
```

## Refs Aren't Passed Through

虽然习惯上高阶组件给包裹组件传递所有属性，但不能传递 refs. 那是因为 `ref` 如 `key` 一样不是真正的属性，他由 React 特殊处理。如果你给一个组件是 HOC 结果的元素添加一个 ref, ref 将是对外层容器组件实例的引用，而不是包裹的组件。

如果你发现自己面临这样的问题，理想的解决方法是计算出怎样避免使用 `ref`. 有时，对 React 模式生的新手某种情形依赖 refs 而用属性反而会更好。

尽管如此，也有 refs 作必要的应急措施的情形——React 不支持他们的情况除外。例如聚焦输入域，你可能想强制性控制一个组件。这种情形，解决方法之一个将 ref 回调作为正常属性，以不同的名称传递：

```jsx
function Field({ inputRef, ...rest }) {
  return <input ref={inputRef} {...rest} />;
}

// Wrap Field in a higher-order component
const EnhancedField = enhance(Field);

// Inside a class component's render method...
<EnhancedField
  inputRef={(inputEl) => {
    // This callback gets passed through as a regular prop
    this.inputEl = inputEl
  }}
/>

// Now you can call imperative methods
this.inputEl.focus();
```

不管怎样这都不是一个好的解决方法。我们倾向 refs 保留在库关系 (concern) 中，而非需要你手动处理他们。我们在探索解决这种问题的方式，所以使用 HOC 是不可观测的。