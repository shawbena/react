
# Event Bubbling Through Portals

即使一个 portal 可以在 DOM 树中的任何地方，其他方面他仍表现的像一个正常的 React 子组件一树。如语境 (context) 这样的特色仍然可用，因为 portal 仍然在 React 树中，面不论 portal 在 DOM 树中什么位置。

事件冒泡也是如此。portal 中触发的事件将冒泡到包含他的 React 树，即使他们在 DOM 树中不是 portal 的祖先节点。假设以下 HTML 结构：

```html
<html>
  <body>
    <div id="app-root"></div>
    <div id="modal-root"></div>
  </body>
</html>
```

`#app-root` 中的父组件可以捕获兄弟姐妹节点 `#modal-root` 中的未捕获的事件。

__app.tsx__

```jsx
```

# run

build

```
tsc
```

run

at react/
```
serve
```
open http://localhost:5000/portals/event-bubbling-through-portals/