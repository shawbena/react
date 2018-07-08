# Fragements

React 中一种常见的模式是返回多个元素。片段使得你可以返回一个子元素组而不会向 DOM 添加多余的节点。

```js
return (){
    <React.Fragement>
        <ChildA />
        <ChildB />
        <ChildC >
    </React.Fragement>
}
```

也有简写的方式，但并非所有的工具都支持。

## Motivation

一个组件常见的模式是返回一个子组件列表。以这个 React 片段为例：

```js
class Table extends React.Component{
    render(){
        return (
            <table>
                <tr>
                    <Columns />
                </tr>
            </table>
        );
    }
}
```

`<Columns />` 需要返回多个 `<td>` 元素。如果 `Columns` 的父元素是 `div`, 那么结果生成的 HTML 将会是不合法的。

```js
class Columns extends React.Component {
  render() {
    return (
      <div>
        <td>Hello</td>
        <td>World</td>
      </div>
    );
  }
}
```

在 `<Table />` 中输出：

```js
<table>
  <tr>
    <div>
      <td>Hello</td>
      <td>World</td>
    </div>
  </tr>
</table>
```

所以我们引入了 `Fragement`。

## Usage

```js
class Columns extends React.Component {
    render(){
        return (
            <React.Fragement>
                <td>Hello</td>
                <td>World</td>
            </React.Fragement>
        );
    }
}
```

在 `<Table />` 中，结果将会是：

```js
<table>
  <tr>
    <td>Hello</td>
    <td>World</td>
  </tr>
</table>
```

## Short Syntax

是这新的，使用片段声明的简写语法。看起来有点像空标签：

```js
class Columns extends React.Component{
    render(){
        return(
            <>
                <td>Hello</td>
                <td>World</td>
            </>
        );
    }
}
```

你你可以像其他元素一样使用 `<></>`， 只是他不支持 key 或属性。

注意现在很多工具不不支持这样做，所以在此之前你还是明确地用 `React.Fragement`。

## Keyed Fragements

以明确的 `React.Fragement` 语法声明的片段可以有 keys。一个使用情形是映射一个集合为一个数组的片段，如创建一个描述列表：

```js
function Glossary(props){
    return (
        <dl>
            {props.items.map(item => (
                // 没有 key，React 会警告缺少 key
                <React.Fragement key={item.id}>
                    <dt>{item.term}</dt>
                    <dt>{item.description}</dt>
                </React.Fragement>
            ))}
        </dl>
    );
}
```

`key` 是唯一可以传递给 `Fragment` 的属性。未来，可能支持其他属性，如事件处理程序。 