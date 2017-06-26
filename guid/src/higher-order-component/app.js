import React from '../react';
/*
 a higher-order component (HOC) 是 React 中组重用组件逻辑的高级技术。HOCs 并非 React API 的部分，他们是 React 的可编辑的特色中生成的一种模式。

 具体地说，一个 higher-order 组件是一个接收一个组件并返回一个新组件的函数。

 ```js
 const EnhancedComponent = higherOrderComponent(WrappedComponent);
 ```

 一个组件将属性转换成 UI, 一个 higher-order 组件转换组件成另一个组件。

 HOC 在第三方 React 库中很常见，如 Redux's 的 connect 和 Realy 的 createContainer.

 本文我们将讨论为什么 higher-order 组件很有用，怎样写你自己的 higher-order 组件。

 # HOC 用于 Cross-Cutting Concerns

 之前我们推荐使用 mixins 来处理 cross-cutting concerns. 我们已经意识到了比其自身的价值而言，mixins 造成的麻烦更多。

 组件是 React 中基本的重用单元。然而你将发现一些模式不直接适合传统的组件。

 例如，假设你有一个 `CommonentList` 组件处理提交至外部数据源渲染一个列表的评论：
*/
/*
class CommonentList extends React.Component {
    construcor(props){
        super(props);
        this.state = {
            //DataSource is some global data source
            comments: DataSource.getComments()
        };
    }
    componentDidMount(){
        //Subscribe to changes
        DataSource.addChangeListener(this.handleChange);
    }
    componentWillUnmount(){
        //clean up listener
        DataSource.removeChangeListener(this.handleChange);
    }
    handleChange = () => {
        //update component state whenever the data source changes
        this.setState({
            comments: Data.DataSource.getComments()
        });
    }
    render(){
        return (
            <div>
                {this.state.comments.map((comment) => (
                    <Comment comment={comment} key={comment.id} />
                ))}
            </div>
        );
    }
}
*/