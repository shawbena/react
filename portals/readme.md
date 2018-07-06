# Portals

Portals 提供在一个在父组件DOM层级外的DOM节点中渲染子组件的最佳方式。

```js
ReactDOM.createPortal(child, container)
```

第一个参数 `child` 是一个可渲染的 React 子组件，如元素，字符串或片段。第五个参数 `container` 是一个 DOM 元素。

## Usage

通常，当你从一个组件的 render 方法中返回一个元素时，这个元素被挂载为最近父节点的子节点：

```js
render() {
  // React mounts a new div and renders the children into it
  return (
    <div>
      {this.props.children}
    </div>
  );
}
```

然而，有时候在 DOM 中别的位置插入一个子节点也是有用的。

```js
render() {
  // React does *not* create a new div. It renders the children into `domNode`.
  // `domNode` is any valid DOM node, regardless of its location in the DOM.
  return ReactDOM.createPortal(
    this.props.children,
    domNode
  );
}
```

portals 的典型用法是当一个父组件有 `overflow: hidden` 或 `z-index` 样式时，但你需要子组在在其容器外可见。如，弹窗，悬浮卡片，提示。

## Event Bubbling Through Portals