# When to Use Context

语境 (context) 用来共享在 React 组件树中被认为是“全局”的数据。如当前认证的用户，主题，或选择的语言。例如，下面代码中我们手动地在 prop 中穿起一个 “主题” 以便给 Button 组件添加样式：

```js
```

使用语境, 可以避免在中介元素中传递属性：

```js
```
