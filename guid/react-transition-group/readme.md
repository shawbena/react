# React Transition Group

`name: react-transition-group`
`version 2.2.0`
`A react component toolset for managing animations`

## Gettng Started

npm
npm install react-transition-group --save

yarn
yarn add react-transition-group

CDN/External

## Transition

`Transition` 组件让你以简单的声明式的 API 描述从一种组件状态到另一种组件状态随时间变化的转换。最常用的是组件挂载和卸载动画，但也可用于就地描述 states 的变化。

默认 `Transition` 组件不改动他渲染的组件的行为，他只为组件追踪 "enter" 和 "exit" 状态。由你决定根据这些状态给组件意义和效果。如，我们可以在组件 enter 和 exit 时组他添加样式：

```js
import Transition from 'react-transition-group/Transition';

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 1 },
  entered:  { opacity: 1 },
};

const Fade = ({ in: inProp }) => (
  <Transition in={inProp} timeout={duration}>
    {(state) => (
      <div style={{
        ...defaultStyle,
        ...transitionStyles[state]
      }}>
        I'm A fade Transition!
      </div>
    )}
  </Transition>
);
```

注意 `Transition` 组件本身不对子组件做*任何事情*。他所做的就是追踪随时间变化的状态，所以当这些状态变化时你可以更新你的组件 (如添加样式或类).

`Trantion` 可以有4种主要状态：

- `ENTERRING`
- `ENTERED`
- `EXITING`
- `EXITED`

`Transition` 状态可通过 `in` 属性切换。当为 `true`, 组件开始 "enter" 阶段。在这个阶段，组件将从其当前转换状态转换至 `'entering'` 直到转换结束，一旦完成然后至 `'entered'` 阶段。让我们看下下面的例子：

```js
state= { in: false };

toggleEnterState = () => {
  this.setState({ in: true });
}

render() {
  return (
    <div>
      <Transition in={this.state.in} timeout={500} />
      <button onClick={this.toggleEnterState}>Click to Enter</button>
    </div>
  );
}
```

当点击按钮时组件将切换到 `'entering'` 状态，并在那停留 500ms (`timeout` 的值) 最终切换到 `'entered'`.

`in` 是 `false` 时也是一样的，只是状态是从 `'exiting'` 到 `'exited'`.

### Props

`children`

可以使用一个 `function` 而非 React 元素。以当前的转换状态 ('entering', 'entered', 'exiting', 'exited', 'unmounted') 调用该函数，可被用于对组件应用特写语境的属性。

```js
<Transition timeout={150}>
    {(status) => (
        <MyComponent className={`fade fade-${status}`} />
    )}
</Transition>
```

type: `Function` | `element`
required

`in`

显示组件；触发 enter 或 exit 状态

type: `boolean`
default: `false`

`mountOnEnter`

By default the child component is mounted immediately along with the parent `Transition` component. If you want to "lazy mount" the component on the first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay mounted, even on "exited", unless you also specify `unmountOnExit`.

type: `boolean`
default: `false`

`unmountOnExit`

By default the child component stays mounted after it reaches the `'exited'` state. Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.

type: `boolean`
default: `false`

`appear`

Normally a component is not transitioned if it shown when the `<Transition>` component mounts. If you want to transition on the first mount set `appear` to `true`, and the component will transition in as soon as the `<Transition>` mounts.

Note: there are no specific `"appear"` states. apprear only an additional `enter` transition.

type: `boolean`
default: `false`

`enter`

Enable or disable enter transitions.

type: `boolean`
default: `true`

`exit`

Enable or disable exit transitions.

type: `boolean`
default: `true`

`timeout`

The duration for the transition, in milliseconds.

You may specify a single timeout for all transitions like: `timeout={500}`, or individually like:

```js
timeout={{
 enter: 300,
 exit: 500,
}}
```

type: `number | { enter?: number, exit?: number }`

`addEndListener`

Add a custom transition end trigger. Called with the transitioning DOM node and a done callback. Allows for more fine grained transition end logic. Note: Timeouts are still used as a fallback.

```js
addEndListener={(node, done) => {
  // use the css transitionend event to mark the finish of a transition
  node.addEventListener('transitionend', done, false);
}}
```

type: `Function`

`onEnter`

Callback fired before the "entering" status is applied. An extra parameter `isAppearing` is supplied to indicate if the enter stage is occuring on the initial mount

type: `Function(node: HtmlElement, isAppearing: bool) -> void`
default: `function noop() {}`

`onEntering`

Callback fired after the "entering" status is applied. An extra parameter `isAppearing` is supplied to indicate if the enter stage is occuring on the initial mount

type: `Function(node: HtmlElement, isAppearing: bool)`
default: `function noop() {}`

`onEntered`

Callback fired after the "enter" status is applied. An extra parameter `isAppearing` is supplied to indicate if the enter stage is occuring on the initial mount

type: `Function(node: HtmlElement, isAppearing: bool) -> void`
default: `function noop() {}`

`onExit`

Callback fired before the "exiting" status is applied.

type: `Function(node: HtmlElement) -> void`
default: `function noop() {}`

`onExiting`

Callback fired after the "exiting" status is applied.

type: `Function(node: HtmlElement) -> void`
default: `function noop() {}`

`onExited`

Callback fired after the "exited" status is applied.

type: `Function(node: HtmlElement) -> void`
default: `function noop() {}`

## TransitionGroup

`<TransitionGroup>` 组件管理在一个列中管理一个集合的 `<Transition>` 组件。 类似 `<Transition>` 组件，`<TransitionGroup>` 组件是一个管理随时间变化组件挂载和卸载的状态机器。

考虑到下面例子用到了之间的 `Fade` 的 CSS. 当项从 TodoList 插入或移除时， `<TransitionGroup>` 自动切换 `in` 属性。你可以在 `<TransitionGroup>` 中使用作何 `<Transition>` 组件，而不仅是 css.

```js
```

## CSSTransition

使用 CSS transition 和 animation 的 `Transition` 组件。受优秀的 [ng-animate](http://www.nganimate.org/) 库激励。

`CSSTransition` 在变换的 `appear`, `enter`, `exit` 阶段应用一对类名。首先应用一个类，然后第二个应用 "active" 类以激活 css 动画。

当 `in` 属性切换为 `true` 组件将会获得 `example-enter` CSS 类名 `example-enter-active` 类名在下一个滴答将被加进来。这种约定基于 `className` 属性。



