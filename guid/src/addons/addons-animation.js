import React from 'react';
import ReactDOM from 'react-dom';
/*
 # addons-animation

 ReactTransitionGroup 和 ReactCSSTransitionGroup 在 React 15.5.0 已废弃。推荐使用来自 [react-transition-group](https://github.com/reactjs/react-transition-group) 的 TransitionGroup 和 CSSTransitionGroup.

 ReactTransitionGroup add-on 组件是一个用于动画的低层次的 API，ReactCSSTransitionGroup 是一个易于实现基本的 CSS 动画和过渡的 add-on 组件。
*/

/*
 # High-level API: ReactCSSTransitionGroup

 ReactCSSTransitionGroup 是一个基于 ReactTransitionGroup 的高层次的 API，容易实现 CSS 转换和动画，当一个 React 组件进入或离开 DOM 时。他受极好的 [ng-animate]() 库激励。
 
 import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
 //es6

 var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
 //es5 with npm

 对于 ReactCSSTransitionGroup 中的每个子元素都要给 key 属性，即使只有一项。React 据些决定哪个子元素进入，离开或停留

 当一个新元素被添加到 CSSTransitionGroup 时他将获得 example-enter css 类，example-enter-active CSS 类将被添加到下一个 tick 中。这是基于 transitionName 的约定。

 CSS 和 render 方法中都指定了 ainmation duration, 这告诉 React 何时从元素移除动画类，如果离开了，何时从 DOM 移除元素。
*/
const TransitionGroup = React.addons.TransitionGroup;
const CSSTransitionGroup = React.addons.CSSTransitionGroup;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: ['hello', 'world', 'click', 'me']
        };
    }
    handleAdd = () => {
        const newItems = this.state.items.concat([
            prompt('Enter some text')
        ]);
        this.setState({ items: newItems });
    }
    handleRemove(i) {
        let newItems = this.state.items.slice();
        newItems.splice(i, 1);
        this.setState({ items: newItems });
    }
    render() {
        const items = this.state.items.map((item, i) => {
            return (
                <div key={i} onClick={() => this.handleRemove(i)}>{item}</div>
            );
        });
        return (
            <div id="addon_animation">
                <button onClick={this.handleAdd}>Add Items</button>
                <CSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                    {items}
                </CSSTransitionGroup>
            </div>
        );
    }
}

/*
 # Animate Initial Mounting

 ReactCSSTransitionGroup 提供可选的属性 transitionAppear, 在组件挂载时添加额外的转换阶段。通常 transitionAppear 的 false 默认值是没有转换阶段的。以下例子传给 transitionAppear true 值

 挂载时 CSSTransition 将会获得 example-appear CSS 类，example-appear-active 类将会被添加至 next tick

 在最初挂载时，CSSTransitionGroup 中的子元素将 appear 而非 enter. 然而之后添加到存在的 CSSTransitionGroup 将是 enter 而非 appear.

 transitionAppear 是在 0.13 版加入的。为了维护兼容性，默论的值被设为 false.

 然而，transitionEnter 和 transitionLeave 默认为 true, 所以默认你必须指定 transitionEnterTimeout 和 transitionLeaveTimeout。如果你既不需要 enter 动画也不需要 leave 动画，传 transitionEnter={false} 或 transitionLeave={false}
*/

class InitialAppearTransition extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Fading at InitialMound'
        };
    }
    render() {

        return (
            <CSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={500} transitionEnter={false} transitionLeave={false}>
                <h1>{this.state.title}</h1>
            </CSSTransitionGroup>
        );
    }
}

/*
 # Custom Classes
 
 转换的每个阶段也可以使用自定义类名
 ...
*/

/*
 # Animation Group Must Be Mounted To Work

 为了对其子无素应用过渡，CSSTransitionGroup 必须要已经挂载进了 DOM 或者属性 `transitionAppear` 必须设置为 `true`.

 下面的示例不能工作，因为 CSSTransitionGroup 和新项一起挂载而非新项挂载进里面。

 render(){
    const items = this.state.items.map((item, i) => {
        <div key={item} onClick={() => this.handleRemove(i)}>
            <CSSTransitionGroup transitionName="example">
                {item}
            </CSSTransitionGroup>
        </div>
    });
    return (
        <div>
            <button onClick={this.handleAdd}>Add Item</button>
            {items}
        </div>
    );
 }
*/

/*
 # Animating One or Zero Items

 上面的例子，我们往 CSSTransitionGroup 渲染了一个列表。然而，CSSTransitionGroup 可以是一个或0项。这使得可以 animate 一个单一元素的进入或离开。同样你可以 animate 一个新元素替换当前元素。例如，我们可以实现一个 image carousel:
*/

function ImageCarousel(props) {
    return (
        <div>
            <CSSTransitionGroup transitionName="carousel" transitionEnterTimeout={1400} transitionLeaveTimeout={800}>
                <img src={props.imageSrc} key={props.imageSrc} alt="" />
            </CSSTransitionGroup>
        </div>
    );
}
class Carousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageSrc: '',
            imageList: []
        };
    }
    componentDidMount() {
        this.getImageList();
    }
    getImageList() {
        let imageList = [
            'images/owl1.jpg',
            'images/owl2.jpg',
            'images/owl3.jpg',
            'images/owl4.jpg',
            'images/owl5.jpg',
            'images/owl6.jpg',
            'images/owl7.jpg',
            'images/owl8.jpg'
        ];
        this.setState({ imageList, imageSrc: `${imageList[0]}` });
        this.switchImage();
    }
    switchImage() {
        setTimeout(() => {
            let imageSrc = this.state.imageSrc;
            let imageList = this.state.imageList;
            let index;
            if (!imageSrc || !imageList.length) {
                return;
            }
            index = imageList.indexOf(imageSrc);
            if(index >= imageList.length - 1 || index < 0){
                index = 0;
            }else{
                index++;
            }
            imageSrc = `${imageList[index]}`;
            this.setState({ imageSrc });
            this.switchImage();
        }, 3000);

    }
    render() {
        return (
            <ImageCarousel imageSrc={this.state.imageSrc} />
        );
    }
}

/*
 # 禁用动画

 如果你乐意的话，也可以禁 `leave` 或 `enter`。比如，有时乐想要 enter 动画但不想要 leave 动画，但是 CSSTransitionGroup 等着动画完成后移除元素。你可以添加 transitionEnter={false} 或 transitionLeave={false} 属性禁用动画

 当使用 CSSTransitionGroup 时，没法通知你的组件什么时候 transition 结束了，或者随 transition 执行一些复杂的逻辑。如果你想要细粒度的控制，你可以使用低层次的 TransitionGroup API, 他提供了自定义 transition 的钩子。
*/

/*
 # 低层次的 API: TransitionGroup

 引入
 import TransitionGroup from 'react-addons-transition-group'; //ES6
 var TransitionGroup = require('react-addons-transition-group'); //ES5 with npm

 TransitionGroup 是动画的基本。当子组件声明性地加入或从中移除, 会调用组件特写的生命周期钩子

 componentWillAppear()
 componentDidAppear()
 componentWillEnter()
 componentDidEnter()
 componentWillLeave()
 componentDidLeave()
*/

/*
 # 渲染一个不同的组件

 TransitionGroup 默认渲染一个 span. 你可以提供一个 component 属性改变默认的行为。例如，渲染一个 <ul>

 <TransitionGroup component="ul">
    {//}
 </TransitionGroup>

 React 可渲染的任何 DOM 组件都可以用。

 然面，component 不必是一个 DOM 组件。他可以是你想要的任何 React 组件；即使是你自己写的！
 只写一个 component={List} 你的组件将会收到 this.props.children
*/

/*
 # 渲染一个单一元素
 //?
 人们经常用 TransitionGroup 动画如可伸缩的面板的挂载和卸载。正常情形下 TransitionGroup 将其子元素包裹一个 span 中或者一个自定义 component 中。这是因为 React 组件必须返回一具单一的根元素，TransitionGroup 也不例外。

 然而如果你仅需要在 TransitionGroup 中渲染一个单一的子元素，你完全可以不将他包裹在 <span> 或其他 DOM 组件中。要这么做，直接创建一个渲染传递给他的第一个子元素自定义的组件
 ...
 ...
*/

/*
 # 参考

 ## componentWillAppear()

 ## componentDidAppear()

 ## componentWillEnter()

 ## componentDidEnter()

 ## componentWillLeave()

 ## componentDidLeave()
*/
export function bootstrap() {
    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
}
