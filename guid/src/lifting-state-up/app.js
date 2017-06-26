import React from '../react';
/*
 # Listing State Up
 在 React 中，共享状态是将状态向上移动到最接近的需要他的组件的共同的祖先。这称为 "lifting state up" 我们从本地状态中移除 `TemperatureInput` 把他移动到 `Calculator`.

 如果 `Calculator` 拥有共享状态，他成为两个 input 中当前温度的 "source of truth". 共享的状态将指示现个 input 有彼此一致的值。由于 `TemperatureInput` 组件的属性来自同一父元素 `Calculator` 组件，两个 `input` 将会一直同步。

 React 应用中数据的变化应该是一个单一的 "source of truth". 通常，状态首先被添回到需要的组件。然后，如果其他组件也需要，可以将他提升至最近的共同祖先。你应当依赖自顶向下的数据流而非尝试同步不同组件的状态。

 如果可以从状态或属性中继承点什么，那他不应该是状态。我们仅存储了上次编辑过的 `temperature` 和其 `scale` 而非把 `celsiusValue` 和 `fahrenheitValue` 都存储起来。另一个 input 的值总是可以在 `render()` 方法中将计算出来。这使得我们清晰或对其他字段应用约进而不用丢失用户输入的精确度。

 当你发现 UI 中有错误时，你可以使用 [React Developer Tools](https://github.com/facebook/react-devtools) 视察属性并将其往树上面移直至你发现组件负责任地更新自已的状态。这使得你可以追踪至 bug 的源头。
*/
const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
}

class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     temperature: ''
        // };
    }
    handleChange = (e) => {
        // this.setState({temperature: e.target.value});
        //虽然我们改用组件属性中的函数处理表单事件，但表单事件仍然是在该组件的事件处理函数中处理的
        this.props.onTemperatureChange(e.target.value);
    }
    render() {
        // const temperature = this.state.temperature;
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        //没有在return 中直接使用属性和组件，之前没有，现在也没有
        return (
            <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}:</legend>
                <input value={temperature} onChange={this.handleChange}/>
            </fieldset>
        );
    }
}
class Caculator extends React.Component {
    constructor(props){
        super(props);
        this.state = {temperature: '', scale: 'c'};
    }
    handleCelsiusChange = (temperature) => {
        this.setState({scale: 'c', temperature});
    }
    handleFahrenheitChange = (temperature) => {
        this.setState({scale: 'f', temperature});
    }
    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius): temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
        return (
            <div>
                <TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange}/>
                <TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange}/>
                <BoilingVerdict celsius={parseFloat(celsius)}/>
            </div>
        );
    }
}

//indicator of boile state
function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return <p>The water would boil.</p>;
    }
    return <p>The water would not boil.</p>
}

//funs
//F -> C
function toCelsius(fahrenheit){
    return (fahrenheit - 32) / 1.8;
}
//C -> F
function toFahrenheit(celsius){
    return (celsius * 1.8) + 32;
}
//convert temperature to C or F
function tryConvert(temperature, convert){
    const input = parseFloat(temperature);
    if (Number.isNaN(input)){
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}
export default Caculator;