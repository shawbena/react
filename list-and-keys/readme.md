# Lists and Keys

[prev](/conditional-rendering/): conditional-rendering

[next](/forms/): forms

首先，让我们回顾下怎样在 JavaScript 中转换数组。

给定以下代码，我们使用 [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) 函数接收一个 `numbers` 数组并两倍他们的值。我们将 `map()` 返回的新数组赋给了变量 `doubled` 并打印他：

```js
cosnt numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);
```

这段代码在按制台打印 `[2, 4, 6, 8, 10]`.

在 React 中，转换数组为[元素](/rendering-elements/)列表几乎是相同的。

## Rendering Multiple Components

你可以构建一个元素集合用曲括号 `{}` [把他们放在 JSX 中](/introducing-jsx/)。

下面我们使用 JavaScript [map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)函数遍历 `numbers`，每项元素返回 `<li>` 元素。最后将返回的数组元素赋值给 `listItems`:

```jsx
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) => <li><number></li>);
```

我们将整个 `listItems` 数组放在一个 `<ul>` 元素中，并将他们[渲染到 DOM 中](/rendering-elements/):

```jsx
ReactDOM.render(
	<ul>{listItems}</ul>,
	document.getElementById('root')
);
```

## Basic list Component

你经常会在一个[组件](/components-and-props/)中渲染列表。

我们可以重构之前的例子为一个组件，接收一 `numbers` 数组并输出一个无序列表元素。

```jsx
function NumberList(props){
	const numbers = [1, 2, 3, 4, 5];
	const listItems = props.numbers.map((number) => <li>{number}</li>);
	return(
		<ul>{listItems}</ul>
	);
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
	<NumberList numbers={numbers} />,
	document.getElementById('root')
);
```

当你运行这段代码时，你会收到一个警告说，应该为每个列表项提供键 (key). "key" 是一个特殊的属性，当你创建元素列表时你需要把他加进来。下节我们将讨论下为什么他是很重要的。

我们先给 `numbers.map()` 中的元素列表赋个 `key` 修复缺失键的问题。

```jsx
function NumberList(props){
	const numbers = props.numbers;
	const listItems = numbers.map((number) => 
		<li key={number.toString()}>
			{number}
		</li>
	);
	return (
		<ul>{listItems}</ul>
	);
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

## Keys

键帮助 React 辨别变化的，添加的，或移除的项。键应该给数组中的元素给他们一个稳定的标识。

```js
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) => 
	<li key={number.toString()}>{number}</li>
);
```

挑选 key 的最好方式是能在区别元素与其史弟姐妹元素的独一无二的标识符。通常你会使用数据中的 IDs 作为 keys:

```jsx
const todoItems = todos.map((todo) => 
	<li key={todo.id}>
		{todo.text}
	</li>
);
```

当你没有稳定的 IDs 标识渲染的元素，你可使用项索引做为键为最后中的去处。

```jsx
const todoItems = todos.map((todo, index) => 
	// Only to this if items have no stable IDs
	<li key={index}>
		{todo.text}
	</li>
);
```

如果元素会重排我们不推荐用索引作为键，这样会慢。如果你感兴趣，你可以读下 [in-depth explanation about why keys are necessary](/reconciliation/#recursing-on-children).


## Extracting Componetns with Keys

键只在包含数组的语境中有意义。

例如，如果你[提取](/components-and-props/#extracting-components) 一个 `ListItem` 组件，键应该放在数组中的 `<ListItem />` 元素上，而不是 `ListItem` 的根元素 `<li>` 元素上。

__Example: Incorrect Key Usage__

```jsx
function ListItem(props){
	const value = props.value;
	return (
		// Wrong! There is no need to specify the key here:
		<li key={value.toString()}>
			{value}	
		</li>
	);
}

function NumberList(props){
	const numbers = props.numbers;
	cosnt listItems = numbers.map((number) => 
		<ListItem value={number} />
	);
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(<NumberList number={numbers} />, document.getElementByid('root'));
```

__Example: Correct Key Usage__

```jsx
function ListItem(props){
	// Correct! There is no need to specify the key here:
	return <li>{props.value}</li>;
}

function NumberList(props){
	const numbers = props.numbers;
	const listItems = numbers.map((number) => 
		// Correct! Key should be specified inside the array.
		<ListItem key={number.toString()} value={number} />
	);

	return(<ul>{listItems}</ul>);
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
	<NumberList numbers={numbers} />,
	document.getElementById('root')
);

一个好的经验就是 `map()` 调用中的元素需要键。
```

## Keys Must Only Be Unique Among Siblings

用在数组中的键在兄弟姐妹中应是唯一的。而不需要全局唯一。当生成两个不同的数组时可以使用同样的键。

```jsx
function Blog(props){
	const sidebar = (
		<ul>
			{props.posts.map(post =>
				<li key={post.id}>
					{post.title}
				</li>
			)}	
		</ul>
	);
	const content = props.posts.map(post => 
		<div key={post.id}>
			<h3>{post.title}</h3>
			<p>{post.content}</p>
		</div>
	);
	return(
		<div>
			{sidebar}	
			<hr />
			{content}
		</div>
	);
}

const posts = [{
	id: 1,
	title: 'Hello World',
	content: 'Welcome to learning React!'
}, {
	id: 2,
	title: 'Installation',
	content: 'You can install React from npm.'
}];
ReactDOM.render(
	<Blog posts={posts} />,
	document.getElementById('root')
);
```

## Embedding map() in JSX

在上面的示例中我们声明了一个独立的 `listItems` 变量并放在了 JSX 中：

```jsx
function NumberList(props){
	const numbers = props.numbers;
	const listItems = numbers.map(number => <ListItem key={numbers.tosString()} value={number} />);
	return (<ul>{listItems}</ul>);
}
```

JSX 允许在曲括号中 [嵌入任何表达式](/introducing-jsx/#embedding-expressions-in-jsx)，所以我们可以内联 `map()` 结果：

```jsx
function NumberList(props){
	const numbers = props.numbers;
	return (
		<ul>{numbers.map(number => 
			<ListItem key={number.toString()}>
		)}
		<ul>
	);
}
```

有时这会造成清晰的代码，但这种风格也会被滥用。像 JavaScript 中一样，你来决定为了可读性提取出变量是否值得。记住如果 `map()` 体嵌套太深，[提取出一个组件](/components-and-props/#extracting-components)可能正合时机。