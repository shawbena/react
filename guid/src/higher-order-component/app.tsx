import * as React from 'react';
import * as ReactDOM from 'react-dom';
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

 例如，假设你有一个 `CommonentList` 组件订阅外部数据源渲染一个列表的评论：
*/
interface IDataSource {
    getComments : any;
    addChangeListener : any;
    removeChangeListener : any;
    getBlogPost : any;
}
interface IComment {
    id : string;
    value : string
}

let DataSource : IDataSource;
function Comment(props : {
    comment: string,
    key: string
}) {
    return (
        <p key={this.prop.key}>{this.props.value}</p>
    );
}
class CommonentList extends React.Component < any,
any > {
    constructor(props : any) {
        super(props);
        this.state = {
            //DataSource is some global data source
            comments: DataSource.getComments()
        };
    }
    componentDidMount() {
        //Subscribe to changes
        DataSource.addChangeListener(this.handleChange);
    }
    componentWillUnmount() {
        //clean up listener
        DataSource.removeChangeListener(this.handleChange);
    }
    handleChange = () => {
        //update component state whenever the data source changes
        this.setState({
            comments: DataSource.getComments()
        });
    }
    render() {
        return (
            <div>
                {this.state.comments.map((comment : IComment) => (<Comment comment={comment.value} key={comment.id}/>))}
            </div>
        );
    }
}
function TextBlock(props : {
    text: string
}) {
    return <div>{props.text}</div>;
}
class BlogPost extends React.Component < {
    id : string
}, {blogPost: string} > {
    constructor(props : {
        id: string
    }) {
        super(props);
        this.state = {
            blogPost: DataSource.getBlogPost(props.id)
        };
    }
    componentDidMount() {
        DataSource.addChangeListener(this.handleChange());
    }
    componentWillUnmount() {
        DataSource.removeChangeListener(this.handleChange);
    }
    handleChange() {
        this.setState({
            blogPost: DataSource.getBlogPost(this.props.id)
        });
    }
    render() {
        return <TextBlock text={this.state.blogPost}/>
    }
}
/*
 CommontList 和 BlogPost 不相同 - 他们调用 DataSource 上不同的方法，且渲染不同的输出。但他们的大部分实现是相同的：
 * 挂载时给 DataSource 添加变化侦听函数
 * 在侦听函数内部，数据源变化时调用 setState
 * 卸载时，移除变化侦听函数
 你可以想像下，在大型应用中，订阅数据源并调用 setState 这样的模式会一次次发生。我们需要这样一种抽像，在一个地方定义逻辑并跨组件共享。这是 higher-order components 出色的地方。
*/
/*
 我们可以写一个函数，创建订阅 DataSource 的如 CommentList 和 BlogPost 这样的组件。
*/
function withSubScription(WrappedComponent : any, selectData : (dataSource: IDataSource)) {
    return class extends React.Component < any, {
        data : string
    } > {
        constructor(props : any) {
            super(props);
            this.handleChange = this
                .handleChange
                .bind(this);
            this.state = {
                data: selectData(DataSource, props)
            };
        }
        componentDidMount() {
            //订阅
            DataSource.addChangeListener(this.handleChange);
        }
        componentWillUnmount() {
            DataSource.removeChangeListener(this.handleChange);
        }
        handleChange() {
            this.setState({
                data: selectData(DataSource, this.props)
            });
        }
        render() {
            return <WrappedComponent data={this.state.data} {...this.props}/>;
        }
    }
}
const CommentListWithSubscription = withSubScription(CommonentList, (dataSource : IDataSource) => dataSource.getComments());
const BlogPostWithSubScription = withSubScription(BlogPost, (dataSource, props) => dataSource.getBlogPost(props.id));
class App extends React.Component {
    constructor(props : any) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>higher order component</div>
        );
    }
}

function bootstrap() {
    ReactDOM.render(
        <App/>, document.getElementById('app'));
}
export {bootstrap};