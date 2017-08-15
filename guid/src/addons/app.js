/*
 # addons
 
 React v15.5 废弃了 React.addons. add-ons 现在要么被废弃了要么移到了独立的模块。

 React add-ons 是用于构建 React 应用有用的工具集合。应该把这些视为试验性的，因为他们比内核变化的频繁。

 createFragement, 创建一个集合的外部键的子元素

 下面的  add-ons 仅在开发版 (unminified) 的 React:
 
    Perf, 发现最优机会的性能分析工具

    ReactTestUtils, 写测试情形的简单帮助工具
*/

/*
 # Legacy Add-ons

 下面的 add-ons 应该被视为传统的，不推荐使用

    PurRenderMixin，使用 React.PureComponent

    shallowCompare, 一个帮助函数，浅比较组件中的 props 和 state 以决定其是否应该更新

    update, 使用 kolodny/immutability-helper

    ReactDOMFactories, 预配置的 DOM 工厂使得使用 React 但不用 JSX 简单些

*/

/*
 # Deprecated Add-ons

 LinkedStateMixin 已废弃

 TransitionGroup 和 CSSTransitionGroup 已废弃
*/

/*
 # Using React with Add-ons
 
 你可以自个从 npm (如 npm install react-addons-create-fragment) 安装 add-ons 并引入他们：

 import createFragement from 'react-addons-create-fragement';
 //ES6

 var createFragement = require('react-addons-create-fragement');
 //ES5 with npm 

 当用 CDN 时你可以用 react-with-addons.js 而非 react.js

 <script src="https://unpkg.com/react@15/dist/react-with-addons.js"></script>

 add-on 将在全局 React.addons 可用 (如 React.addons.TestUtils)
*/