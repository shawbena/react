import React from 'react';

/**
 * # thinking in react
 * 
 * React 以我们的观点，是以 JavaScript 构建大形，快速 Web 应用的重要方式。It has scaled very well for us at Facebook and Instagram
 * 
 * React 最好一点之一就是他使得你在构建你的应用时思考他。
 */

/**
 * ## start with a mock
 */

/*
 ## Step 1: 将 UI 分成组件层级
 single responsibility principle

 FilterableProductTable
    SearchBar
    ProductTable
        ProductCategoryRow
        ProductRow
*/

/*
 ## Step 2: 用 React 构建一个静态版本

 现在你已经有组件层级了，是时候来实现你的应用了。最简单的方式是构建一个接收你的数据模型并渲染 UI 但没有交互性的版本。最好解耦这些过程，因为构建一个静态版本需要键入很多而不用思考，添加交互性需要很多思考而非写很多代码。

 要构建一个静态版本的 app 渲染你的数据模型，你将构建重用其他组件的组件并用 props 传递数据, props 是父组件往子组件传递数据的一种方式。如果你熟悉 state 的概念，一点也不要用他来构建静态的版本。state 为交互性保留，即，data that changes over time. 因为这是个静态的 app, 不需要用 state.

 你可以自顶向下构建或者自下向顶构建。即，你可以从层级高的组件 (如从 FilterableProductTable) 开始构建或者从层级低的组件 (ProductRow) 开始构建。简单的例子通常 top-down 容易，大的项目，bottom-up 并构建时测试容易。

 在本步骤的结束时，你将有一个用于渲染你的数据模型的可重用的组件的库。因为这是个静态版的 app 这个组件将只有 render() 方法。顶层的组件 (FilterableProductTable) 将从 prop 接收你的数据模型。如果你改动了底层数据模型并再次调用 ReactDOM.render(), UI 将会更新。很容易理解 UI 是如何更新的及哪里发生了变化，没有什么复杂的东本。React 的单向数据流 (也叫单向数据绑写) 使一切模块化并快速。

 React 有两种模型的数据，props 和 state. 理解两者之间的区别是很重要的。如果你还不确定两者有什么区别，浏览一下 React 官方文档。
*/

/*
 ## Step 3: 识别 UI State 的最小化 (但是要完整) 表示

 要使 UI 有交互性，你需要对底层数据模型触发变化。React 用 state 使这变得简单。

 为了正确的构建应用，首先你要思考你 app 需要的可变 state 的最小化的集合。关键很明显：Don't Repeat Yourself. 计算出你应用程序需要的状态的最小化表示并根据需要计算出其他的一切。例如，你已经构建了一个 TODO 列表，仅保持一个 TODO 项列表就可以了；不需要一个独立的变量用于 count。当你想渲染一个 TODO count 时，仅仅使用 TODO 项数组的长度就好。

 思考一下我们应用程序中所有的数据片段。我们有：
    products 源始列表
        用户键入的搜索文本
        checkbox 的值
        过滤的 products 列表
 让我们一个排查，找出哪个是 state. 对于每条数据，问以下三个问题：
 1. 是通过 props 传递来自 parent 吗？如果是，不是 state
 2. 是否随时间变化不变化？如果是，不是 state
 3. 可以基于组件中的其他 state 或属性计算出来吗？如果是，不是 state

 products 源始列表是在 props 传递而来的，所以不是 state. 搜索文件和 checkbox 似乎是 state 因为他随时间变化并且不能从别处计算而来。最终，过滤的 products 列表不是 state 因为结合 products 源始列表和搜索文本及 checkbox 的值可以把他计算出来。

 最终，我们的 state 是：
    用户输入的搜索文本
        checkbox 的值

*/

/*
 # Step4: 识别 State 应该放哪
 
 我们已经识别了我们程序需要的最小化的 state。接下来我们需要识别哪个组件修改或者拥有这个 state.

 记住: React 是单向向下的数据流。哪个组件拥有什么 state 并非那么清晰。对于初学者来说这常常是最具挑战性的部分, 所以跟着下面几步来搞明白：

 对于你应用中每个 state 片段：

    识别基于 state 渲染的每个组件

        找到一个共同的所有者组件 (层级中需要这个 state 的一个单个组件)

        这个共同的所有者组件需要状态还是更高层级的组件应该拥有这个 state

        如果你找不到哪个组件应该拥有这个 state 合理，创建一个新的组件存放状态并将其添添加在这个共同的所有者组件层级之上。
。。。

 让我们对我们的应用运行策略：

 ProductTable 需要基于 state 过滤 product 列表，SearchBar 需要展示搜索文本和选中状态.

    其共同的所有者组件是 FilterableProductTable.

    过滤文本和选中值放在 FilterableProductTable 中概念上是合理的。

 太酷了，我们已经决定我们的 state 放在 FilterableProductTable 中，首先，往 FilterableProductTable 的 contructor 中添加一个实例属性 this.state = {filterText: '', inStockOnly: false}，以反映你应用程序的初始 state. 然后，将 filterText 和 inStockOnly 作为 props 传递给 ProductTable 和 SearchBar. 最后使用这些属性来过滤 ProductTable 中的行并设置 SearchBar 中的表单字段的值。

 你可以开始测试一下你应用程序的行为：将 filterText 设为 ball 并刷新你的应用。你会看到 data table 正确更新。
*/

/*
 # Step 5: 添加反向数据流

 目前，我们已经构建了一个 app, 正确渲染，props 和 state 沿层级向下流动。现在是时候支持另一个方向的数据流了：层级深处的表单组件需要在 FilterableProductTable 中更新 state.

 React 使这种数据流显示的使得容易理解程序是怎么工作的，但这样比着双向数据绑定需要键入更多的代码。

 如果在当前版本的例子中你试着键入或 check 盒子, 你会看到 React 忽略了你的输入。这是有意的，因为我们设置 input 的 value 属性总是与 FilterableProductTable 的 state 相等。

 让我们好好想下我们想到做什么。当用户更改表单时，我们更新状态以反映用户输入。由于组件应该只更新自己的状态，FilterableProductTable 将传递回调给 SearchBar, 当状态应该更新时触发回调。我们可以使用 input 上的 onChange 事件以获得通知。 FilterableProductable 传递的回调将调用 setState(), app 将会被更新。

 这虽然听着复杂，真的是几行代码的事。这也真的是非常清晰，数据怎么在 app 中流动。
*/

/*
 # 就是这样
 希望这能给你一些点子思考下怎样用 React 构建组件和应用。当你习惯时会少写代码，记住，这些代码读的比写的多，读这个模块，清晰的代码是极其容易的。当你开始构建组件库，你会喜欢上这样的明确性和模块化，加上代码重用，你的代码行数将会开缩减。:)
*/