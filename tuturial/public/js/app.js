//React 是模块化，可组合性的组件。这个例子有以下组件结构
/*
- CommentBox
    - CommentList
        - Comment
    -CommentForm
*/

//props
/*
 Comment 组件接收来自父组件的数据，可以从子组件的 'property' 上获取父组件传递的数据，可使用 this.props 访问这些 'properties', 使用 props 我们便可读取从 CommentList 传递给 Comment 的数据。
在 JSX 中，通过将 JavaScript 表达式包括在花括号中（作为属性或 child），你可以往树中丢文本或 React 组件。可以通过 this.props 的键访问传递给组件的命名属性，通过 this.props.children 访问任何嵌套的元素。//此处不太好理解
*/
var Comment = React.createClass({
    rawMarkup: function(){
        var md = new Remarkable();
        var rawMarkup = md.render(this.props.children.toString());
        return {__html: rawMarkup};
    },
    render: function(){
        return (
            <div className="comment">
                <h2 className="comment-author">
                    {this.props.author}
                </h2>
                //--这个API 之所以这么长就是不想让你插入原始的 HTML，这样很危险，会造成 XSS 攻击
                <span dangerouslySetInnerHTML={this.rawMarkup()}></span>
            </div>
        );
    }
});

var CommentList = React.createClass({
    render: function(){
        var commentNodes = this.props.data.map(function(comment){
            //返回的东西好奇怪
            return (
                <Comment author={comment.author} key={comment.id}>
                    {comment.text}
                </Comment>
            );
        });
        return (
            <div className="comment-list">
                {commentNodes}
            </div>
        );
    }
});
var CommentForm = React.createClass({
    render: function(){
        return (
            <div className="comment-form">
                Hello, world! I am a CommentForm.
            </div>
        );
    }
});
//JSX 语法，React 组件
/*
 render 返回一个 React 组件树，最终渲染为 HTML, <div> 标签并不是真正的 DOM 节点。你可以把这些理解为 React 知道如何处理的标记或数据片段，React 是安全的。我们并没有生成 HTML 字符串，所以 XSS 保护是默认的。
 你不必返回基本的 HTML. 你可以返回一个你构建的组件树。这使得 React 有可组合性：可维护的前端的关键原则。
*/
/*Reactuve state
 基于这其 props, 每个组件渲染自己一次。props 是不可修改的：他们从父元素传递而来并为父元素所拥有。为了实现交互，我们为组件引入可修改的 state。this.state 私有于组件可以通过调用 this.setState() 更改他。当 state 更新时，组件重新渲染自己。
 render() 函数声明性地写为 this.props 和 this.state 的功能。框架保证 UI 总是和输入一致。
当获取到数据时，我们将更改我们所有的评论数据。让我们绘画 CommentBox 组件添加一个数组的评论数据组作为组件的 state.
*/
var CommentBox = React.createClass({
    //getInitialState()在组件的生命周期内只执行一次并设置组件的初始状态
    getInitialState: function(){
        return {data: []};
    },
	/*
	 组件第一次渲染时 React 会自动调用 componentDidMount，动态更新的关键是调用 this.setState().我们用从服务器获取到的新数组代替旧的数组，UI 自身也会自动更新，因为这些响应，动态更新仅需要添加很少的变化。
	*/
    componentDidMount: function(){
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data){
                this.setState({data: data});
            }.bind(this),
            eror: function(xhr, status, err){
                console.log(this.props.url, status, err.toStirng());
            }.bind(this)
        });
    },
	hangleCommentSubmit: function(Comment){
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			type: 'post',
			data: comment,
			success: function(data){
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err){
				console.log(this.props.url, status, err.toStirng());
			}.bind(this)
		});
	},
    render: function(){
        return (
            <div className="comment-box">
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
                <CommentForm />
            </div>
        );
    }
});
/*
ReactDOM.render() 实例化根组件，启动框架，将标记注入原生 DOM 元素（提供的第二个参数）。
ReactDOM 模块暴露特定 DOM 的方法，React 是不同平台（如, React Native） React 的共享的核心工具。
在组件定义后才可以调用 ReactDOM.render.
*/
/*
 移除 data 属性，改为从 url 获取。在服务器响应返回前，组件不会有任何数据。//返回的数据在哪里？
*/
ReactDOM.render(
    <CommentBox url="/api/comments" />,
    document.getElementById('content')
);