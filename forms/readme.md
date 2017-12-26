# Forms

[prev](/lists-and-keys/): lists-and-keys:
[next](/lifting-state-up): lifting-state-up

在 React 中 HTML 表单元素有点不同于其他 DOM 元素，表单元素天生地保持着一h结内部状态。如下简单的 HTML 表单：

```html
<form>
	<label>
		Name:
		<input type="text" name="name" />
	</label>
	<input type="submit" value="Submit"/>
</form>
```

 这个表单有默认的 HTML 表单的行为，当用户提交时他会浏览一个新页面。在 React 中也呆以有这种默认行为。但大多情况下，用 JavaScript 函数处理表单提交，访问用户输入表单中的数据是很方便的。做这种事情的标准方式叫 "controlled components"。

## Controlled Components

在 HTML 中，form 元素如 `<input>`, `<textarea>` 和 `<select>` 通常维护他们自己的状态并且基于用户输入更新他们。在 React 中，可修改的状态通常保存在组件的 state 属性中，仅当调用 [setState()](/react-component/#setstate) 时更新。

我们可以将这两个方式结合起来使 React 状态成为 "single source of truth". 然后渲染表单的 React 组件响应后续用户输入。一个表单元素以这种方式被 React 控制叫 "controlled component".

例如，如果我们想让前面的例子在表单提交时打印用户名，我们可以把表单写成 controlled component 的表单：

__./index.js__

```jsx
import React, { Component } from 'react';
import { render } from 'react-dom';
import bootstrap from '../bootstrap';

class NameForm extends Component{
	state = {
		value: ''
	};

	constructor(props){
		super(props);
	}

	handleChange = (e) => {
		this.setState({ value: e.target.value });
	}

	handleSubmit = (e) => {
		alert('A name was submitted: ' + this.state.value);
		e.preventDefault();
	}

	render(){
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					<input type="text" value={this.state.value} onChange={this.handleChange} />
				</label>
				<input type="submit" value="Submit" />
			</form>
		);
	}
}

bootstrap(NameForm);
```

因为 `value` 属性是我们在表单元素上设置，显示的值将会总是 `this.state.value`, 使 React 状态是信任的来源. 由于 `handleChange` 响应每次键击来更新 React 状态，显示的值将随用户键入更新。

 有了 controlled component, 每次 state 修改都有一个相关的处理函数。这样使得修改或验证用户输入变得直接。例如，如果我们想把用户输入的名子变全部大写，我们可以将 `handleChange` 这样写：

```jsx
handleChange = () => {
	this.setState({value: event.target.value.toUppercase()});
}
```

## textarea 标签
 在 HTML 中， <textareg> 通过子元素定义自己的文本：

```html
<textarea>
	Hello there, this is some text in a text area.
</textarea>
```

在 React 中，`<textarea>` 使用 value 属性。这样使用 `<textarea>` 的表单可以写的非常类似 input.

__./easy-form/index.js__

```jsx
import React, { Component } from 'react';
import { render } from 'react-dom';
import bootstrap from '../../bootstrap';

class EasyForm extends Component {
	state = {
		value: 'Please write an essay about your favarite DOM element.'
	};

	constructor(props){
		super(props);
	}

	handleChange = (e) => {
		this.setState({ value: e.target.value });
	}

	handleSubmit = (e) => {
		alert('An essay was submitted: ' + this.state.value);
		event.preventDefault();
	}

	render(){
		return(
			<form onSubmit={this.handleSubmit}>
				<label>
					Name:
					<textarea value={this.state.value} onChange={this.handleChange} />
				</label>
				<input type="submit" value="Submit" />
			</form>
		);
	}
}
```

## The select Tag

在 HTML 中，`<select>` 创建一个下拉列表。如，这段 HTML 创建一个喜好下拉列表：

```html
<select>
	<option value="grapefruit">Grapefruit</option>
	<option value="lime">Lime</option>
	<option selected value="coconut">Coconut</option>
	<option value="mango">Mango</option>
</select>
```

注意 Coconut 选项最初是选定的，因为有 `selected` 属性。React 不使用 `selected` 属性，而是使用根 `select` 上的 `value` 属性。这在 controlled component 中是方便的，因为你只需要更新一个地方。例如：

__./flavor-form/index.js__

```jsx
import React, { Component } from 'react';
import { render } from 'react-dom';
import bootstrap from '../../bootstrap';

class FlavorForm extends Component {
	state = {
		value: 'coconut'
	};

	constructor(props){
		super(props);
	}

	handleChange = (e) => {
		this.setState({ value: e.target.value });
	}
	handleSubmit = (e) => {
		alert('Your favorite flavor is: ' + this.state.value);
		e.preventDefault();
	}

	render(){
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					Pick your favorite La Croix flavor:
					<select value={this.state.value} onChange={this.handleChange}>
						<option value="grapefruit">Grapefruit</option>
						<option value="lime">Lime</option>
						<option value="coconut">Coconut</option>
						<option value="mango">Mango</option>
					</select>
				</label>
				<input type="submit" value="Submit" />
			</form>
		);
	}
}
```

综合来说，这使得 `<input type="text">`, `<textarea>`, 及 `<select>` 非常相似 - 他们都接受一个 `value` 属性，你可以用他来实现 controlled component.

> Note
>
> 可以给 `value` 属性传递一个数组, 这使你选中 `select` 标签中的多个选项：
> ```jsx
> <select multiple={true} value={['B', 'C']} />
> ```

## Handling Multiple Inputs

当你需要处理多个 controlled `input` 元素时，你可以给每个元素添加一个 `name` 属性，让处理函数选择基于 `event.target.name` 的值做什么。

例如：

__./reservation/index.js__

```jsx
import React, { Component } from 'react';
import { render } from 'react-dom';
import bootstrap from '../../bootstrap';

class Reservation extends Component {
	state = {
		isGoing: true,
		numberOfGuests: 2
	};

	constructor(props){
		super(props);
	}

	handleChanges = (e) => {
		const target = e.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	render(){
		return(
			<form>
				<label>
					Is going:
					<input 
						name="isGoing"
						type="checkbox"
						checked={this.state.isGoing}
						onChange={this.handleChanges} />
				</label>
				<br />
				<label>
					Number of guests:
					<input 
						name="numberOfGuests" 
						type="number"
						value={this.state.numberOfGuests}
						onChange={this.handleChanges} />
				</label>
			</form>
		);
	}
}
```

注意，我们怎样使用 ES6 [computed property name](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names) 语法根据给定的 input name 更新 state 键：

```jsx
this.setState({
	[name]: value
});
```

等同于这段 ES5 代码：

```js
var partialState = {};
partialState[name] = value;
this.setState(partialState);
```

由于 `setState()` 自动地 [merges a partial state into the current state](/state-and-lifecycle/#state-updates-are-merged), 我们只需要以变化是部分调用他。

## Controlled Input Null Value

指定 [controlled component](#controlled-component) 的 value 属性防止用户改变输入框的值，除非你愿意。如果你指定了 `value` 便输入框仍然是可编辑的，你可能无意地设置 `value` 为 `undefined` 或 `null`.

下面的代码演示了这种现象 (输入框开始是锁定的，但延迟之后变得可编辑了).

__./null-value/index.js__

```jsx
import React, { Component } from 'react';
import bootstrap from '../../bootstrap';

bootstrap('input', { value: "h1" });

setTimeout(() => {
	render(<input value={null} />, document.getElementById('app'));
}, 1000);
```

## Alternatives to Controlled Components

有时使用 controlled components 是让人厌烦的，因为你需要写一个事件处理函数一路处理数据变化并 pipe 所有的输入框数据通过 React 组件。当你把先前代码库转换为 React 时或与非 React 库集成 React 时这会使你好烦。这种情形，你可能需要查看 [uncontrolled components](/uncontrolled-components/), 一种实现输入框表单的可选技术。