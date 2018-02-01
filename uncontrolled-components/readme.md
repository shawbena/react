# Uncontrolled Components

大多情形，我们推荐使用 [controlled components](/forms/) 来实现表单。在控制的组件中，表单数据由 React 组件处理。非控制组件 (uncontrolled components) 是可选的，其表单数据由 DOM 自己处理。

写 uncontrolled component, 你可以使用 [ref](/refs-and-the-dom/) 从 DOM 中获取表单值而非写事件处理函数。

例如，这段代码接受 uncontrolled component 中的一个名称：

[index.tsx](./index.tsx)

```tsx
class NameForm extends React.Component<NameFormProps>{
    private input: HTMLInputElement | null;
    
    constructor(props: NameFormProps){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>){
        alert('A name was submitted: ' + (this.input && this.input.value));
        event.preventDefault();
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" ref={(input) => this.input = input}/>
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}
```

因为 uncontrolled component 将 DOM 作为信任来源，有时当使用 uncontrolled components 容易集成 React 和非 React 代码。如果你想 quick 和 dirty 的话代码也会少些。而，你通常应该使用 controlled components.

对于某种特殊情形，你要用哪种组件仍然不太明确，[这篇文章](http://goshakkk.name/controlled-vs-uncontrolled-inputs-react/)可能会对你有所帮助。

## Default Values

在 React 渲染生命周期中，表单元素的 `value` 属性将覆盖 DOM 中的值。对于 uncontrolled component, 你常常想让 React 指定一个初始值，但不要后续更新控制。要处理这种情形，你可以指定 `defaultValue` 属性而非 `value`.

```tsx
render() {
  return (
    <form onSubmit={this.handleSubmit}>
      <label>
        Name:
        <input
          defaultValue="Bob"
          type="text"
          ref={(input) => this.input = input} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
```

同样，`<input type="checkbox">` 及 `<input type="radio">` 支持 `defaultChecked`, `<select>` 及 `<textarea>` 支持 `defaultValue`.