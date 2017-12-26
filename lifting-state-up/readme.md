# Lifting State Up

[prev](/forms/): forms
[next](/compositon-vs-inheritance/): composition-vs-inheritance

常常，几个组件需要反映同一变化的数据。我们推荐将共享的状态提升至他们最近的共同祖先。让我们以实际行动看看这是如何作用的。

本节，我们将创建一个温度计算器计算水在指定的温度是否会开。

首先我们创建名为 `BoilingVerdict` 组件。他接收一个 `celsius` 属性，并打印温度是否能烧开水：

__./BoilingVerdict.js__

```jsx
export default (props) => {
	if(props.celsius >= 100){
		return <p>The water would boil.</p>;
	}

	return <p>The water would not boil.</p>
}
```

接下来我们创建 `Calculator` 组件。他渲染一个 `<input>` 你可以用来输入温度，并在 `this.state.temperature` 中保存值。

此外，他用 `BoilingVerdict` 渲染当前输入框的值。

__./index.js__

```jsx
import React, { Component } from 'react';
import bootstrap from '../bootstrap';
import BoilingVerdict from './BoilingVerdict';

class Calculator extends Component{
	state = {
		temperature: ''
	};

	constructor(props){
		super(props);
	}

	handleChange = (e) => {

	}

	render(){
		const temperature = this.state.temperature;
		return (
			<fieldset>
				<legend>
					Enter temperature in Celsius:
				</legend>
				<input 
					type="text"
					value={temperature}
					onChange={this.handleChange}/>
				<BoilingVerdict celsius={parseFloat(temperature)} />
			</fieldset>
		);
	}
}
```

## Adding a Second Input

我们的需求是，除了那个 Celsius 输入框, 我们提供了一个 Fahrenheit 输入框，并且保持他们同步。

我们从 `Calculator` 中提取出一个 `TemperatureInput`。我们将添加一个要么为 `"c"` 要么为 `"f"` 的 `scale` 属性：

__./TemperatureInput.js__

```jsx
import React, { Component } from 'react';

const scaleNames = {
	c: 'Celsius',
	f: 'Fahrenheit'
};

export default class TemperatureInput extends Component {
	state = {
		temperature: ''
	};

	constructor(props) {
		super(this);
	}

	handleChange = (e) => {
		this.setState({ temperature: e.target.value });
	}

	render() {
		const temperature = this.state.temperature;
		const scale = this.props.scale;
		return (
			<fieldset>
				<legend>
					Enter temperature in {scaleNames[scale]}:
				</legend>
				<input
					type="text"
					value={temperature}
					onChange={this.handleChange} />
			</fieldset>
		);
	}
}
```

现在我们可以改变 `Calculator` 渲染两个独立的输入：

```jsx
class Calculator extends React.Component {
  render() {
    return (
      <div>
        <TemperatureInput scale="c" />
        <TemperatureInput scale="f" />
      </div>
    );
  }
}
```

现在我们有两个输入框，但当在其中一个输入温度时，另一个不会更新。这与我们的需求矛盾：我们想要两者同步。

我们也无法在 `Calculator` 中展示 `BoilingVerdict`。当前温度是隐藏在 `TemperatureInput` 中，`Calculator` 无法知道。

## Writing Conversion Functions

首先，我们将写两具来回转换 Celsius 和 Fahrenheit 的函数：

```jsx
function toCelsius(fahrenheit){
	return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius){
	return (celsius * 9 / 5) + 32;
}
```

这两个函数转换函数。我们将写另一函数，接收 `temperature` 和转换函数为参数，返回字符串。我们将用他来计算一个输入框基于另一个输入框的值。

无效的 `temperature` 返回空字符串，并保持输出约进三位小数：

```jsx
function tryConvert(temperature, convert){
	const input = parseFloat(temperature);
	if(Number.isNaN(input)){
		return '';
	}
	const output = convert(input);
	const rounded = Math.round(output * 1000) / 1000;
	return rounded.toString();
}
```

例如，`tryConvert('abc', toCelsius)` 返回一个空字符串，`tryConvert('10.32', toFahrenheit)` 返回 `50.396`.

## Lifting State Up

当前，两个 `TemperatureInput` 组件独立地在本地状态中保存他们的值：

```jsx
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    // ...  
```

而我们想让这两个输入框彼此同步。当更新 Celsius 输入框时，Fahrenheit 输入框应返映轮换后的温度，相反也是。

在 React 中，共享状态是将状态移到需要他的最近的共同祖先祖件。这叫 "lifting state up". 我们将从 `TemperatureInput` 中移除本地状态，将他移至 `Calculator`.

如果 `Calculator` 拥有共享状态，他变成了当前两个温度输入框的 "source of truth"。他可以指示两个输入框有彼此一致的值。由于两个 `TemperatureInput` 组件来自同一父组件 `Calculator`，两个输入框将总是同步。

让我们一步步来看下这是怎么作用的。

首先把 `TemperatureInput` 组件中的 `this.state.temperature` 替换成 `this.props.temperature`. 当前，假装 `this.props.temperature` 总是存在，然而稍后我们将从 `Calculator` 传递：

```jsx
render(){
	// Before: const temperature = this.state.temperature;
	const temperature = this.props.temperature;
}
```

我们知道 [props are read-only](/components-and-props/#props-are-read-only). 当 `temperature` 在本地状态中时，`TemperatureInput` 只需要调用 `this.setState()` 就可以改变他。然而，现在 `temperature` 属性来自父组件，`TemperatureInput` 无法控制他。

在 React 中，解决这个问题常常要把一个组件变成 "controlled". 就像 DOM `<input>` 接收 `value` 和 `onChange` 属性，自定义的 `TemperatureInput` 也可接收来自父组件 `Calculator` 的 `temperature` 和 `onTemperatureChange` 属性。

现在，当 `TemperatureInput` 想更新温度，他调用 `this.props.onTemperatureChange`:

```jsx
handleChange = (e) => {
	// Before: this.setState({ temperature });
	this.props.onTemperatureChange(e.target.value);
}
```

> Note:
> 这里自定义组件上的无论是 `temperature` 还是 `onTemperatureChange` 属性名都没有特殊的含义。我们也可以叫他们别的，如常见习惯的 `value` 和 `onChange`.

`onTemperatureChange` 属性和 `temperature` 属性由父组件 `Calculator` 一同提供。`Calculator` 组件修改自已的本状态来反映变化，以此以新值再渲染两个输入框。我们不久将看看新的 `Calculator` 实现。

在深入 `Calculator` 的变化之前，让我们回顾下 `TemperatureInput` 组件的变化。我们从中移除了本地状态，我们现在读取 `this.props.temperature` 而不是 `this.state.temperature`。当我们想变化时，我们现在调用由 `Calculator` 提供的 `this.props.onTemperatureChange()` 而非 `this.setState()`：

__./TemperatureInput.js__

```jsx
import React, { Component } from 'react';

const scaleNames = {
	c: 'Celsius',
	f: 'Fahrenheit'
};

export default class TemperatureInput extends Component {
	state = {
		// temperature: ''
	};

	constructor(props) {
		super(props);
	}

	handleChange = (e) => {
		this.props.onTemperatureChange(e.target.value);
	}

	render() {
		const temperature = this.props.temperature;
		const scale = this.props.scale;
		return (
			<fieldset>
				<legend>
					Enter temperature in {scaleNames[scale]}:
				</legend>
				<input
					type="text"
					value={temperature}
					onChange={this.handleChange} />
			</fieldset>
		);
	}
}
```

现在让我们转向 `Calculator` 组件。我们将把当前组件的 `temperature` 和 `scale` 存储在他的状态中。这是我们从输入框中“提升上来”的状态，他将用作两个输入框的 "source of truth". 这是我们当前要渲染两个输入框需要知道的所有数据。

例如，如果我们在 Celsius 输入框中输入 37, `Calculator` 组件的状态将会是:

```js
{
	temperature: '37',
	scale: 'c'
}
```

如果稍后我们编辑 Fahrenheit 域为 212, `Calculator` 的状态将会是：

```js
{
	temperatue: '212',
	scale: 'f'
}
```

我们也可以两个输入框的值都存储，但这是不必要的。存储最近变化的输入框的值就足够了，及他表示的比例 (scale). 然后我们可以基于当前的 `temperature` 和 `scale` 推断出其他输入框的值。

输入框保持同步，因为他们的值是从同一状态计算而来：

__./index.js__

```js
import React, { Component } from 'react';
import bootstrap from '../bootstrap';
import BoilingVerdict from './BoilingVerdict';
import TemperatureInput from './TemperatureInput';

class Calculator extends Component{
	state = {
		temperature: '',
		scale: 'c'
	};

	constructor(props){
		super(props);
	}

	handleCelsiusChange = (temperature) => {
		this.setState({ temperature, scale: 'c' });
	}

	handleFahrenheitChange = (temperature) => {
		this.setState({ scale: 'f', temperature });
	}

	render(){
		const temperature = this.state.temperature;
		const scale = this.state.scale;
		const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
		const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
		return (
			<div>
				<TemperatureInput 
					scale="c"
					temperature={celsius}
					onTemperatureChange={this.handleCelsiusChange} />
				<TemperatureInput
					scale="f"
					temperature={fahrenheit}
					onTemperatureChange={this.handleFahrenheitChange} />
			</div>
		);
	}
}

function toCelsius(fahrenheit){
	return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius){
	return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert){
	const input = parseFloat(temperature);
	if(Number.isNaN(input)){
		return '';
	}
	const output = convert(input);
	const rounded = Math.round(output * 1000) / 1000;
	return rounded.toString();
}

bootstrap(Calculator);
```

现在，无论你编辑哪个输入框，`Calculator` 中的 `this.state.temperature` 和 `this.state.scale` 都会得到更新。一个输入框得原值，另一个输入框的值将总是基于原值重新计算。

让我们回顾一下当你编辑一个输入框时会发生的事情：

- React 调 DOM `<input>` 指定的 `onChange` 函数。这里是 `TemperatureInput` 组件的 `handleChange`.

- `TemperatureInput` 组件中的 `handleChange` 以期望的值调用 `this.props.onTemperatureChange()`, `TemperatureInput` 的属性，包括 `onTemperatureChange` 是由其父组件 `Calculator` 提供的。

- 渲染前，`Calculator` 指定了，`Calculator` 指定 Celsius 的 `TemperatureInput` 的 `onTemperatureChange` 为 `Calculator` 的 `handleCelsiusChange` 方法，Fahrenheit 的 `TemperatureInput` 的 `onTemperatureChange` 为 `handleFahrenheitChange` 方法。所以调用哪个 `Calculator` 方法取决于我们编辑哪个输入框。

- 在这些方法中，`Calculator` 组件要求 React 以输入框中我们刚编辑的值及当前的比例 (scale) 调用 `this.setState()` 重新渲染自已。

- React 调用 `Calculator` 组件的 `render` 方法了解 UI 是什么样的。两个输入框中的值是基于当前温度和活动的比例。温度转换是在这里执行的。

- React 以 `Calculator` 指定的新属性单个调用 `TemperatureInput` 组件的 `render` 方法。

- React DOM 更新 DOM 匹配期望的输入值。刚编辑的输入框收到当前值，哪一个输入框更新至转换后的温度。

每次更新经历了同样的步骤，所以输入框保持同步。

## Lessons Learned

React 应用中任何数据变化应该有一个单一的 "source of truth". 通常状态首先添加给需要用他来渲染的组件。然后，如果其他组件也需要，你可以把状态提升至最近的共同祖先。你应该依赖 [top down data flow](/state-and-lifecycle/#the-data-flows-down) 而不是尝试同步不同组件间的状态。

提升状态涉及写更多的 "boilerplate" 代码而不是双向数据绑定，受益的是查找和剔出 bugs 会容易些。由于任何状态 “居住” 在某个组件中，给件可以自已改变他，很大地减少了表面区域的 bugs. 此外，你也呆以实现任何自定义逻辑，注入或转换用户输入。

如果有什么可以从状态或属性继承，那他可能不应该出现在状态中。例如，我们只存储了上次编辑的 `celsiusValue` 和 `fahrenheitValue` 而不是存储 `celsiusValue` 和 `fahrenheitValue` 其他输入框的值可总是从 `render()` 方法计算而来。这使得我们清晰或对另一个域应用舍入而不丢失用户输入的精度。

当你在 UI 上看到错误时，你可以用 [React Developer Tool](https://github.com/facebook/react-devtools) 视察属性并将他向树上移直至你发现有组件负责任地更新状态。这使得你能追踪到 bugs 的源头。