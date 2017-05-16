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
    rawMarkup: function () {
        var md = new Remarkable();
        var rawMarkup = md.render(this.props.children.toString());
        return { __html: rawMarkup };
    },
    render: function () {
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
    render: function () {
        //Array<ReactElement>
        var commentNodes = this.props.data.map(function (comment) {
            //返回的东西好奇怪
            return (
                <Comment author={comment.author} key={comment.id}>
                    {comment.text}
                </Comment>
            );
        });
        //React.createElement(string/ReractClass type,[object props],[children ...]);
        return (
            <div className="comment-list">
                {commentNodes}
            </div>
        );
    }
});
/*
 Controlled components
 These <input> elements with a value set are called controlled components. Read more about controlled components on the Forms article.
*/
/*
 事件
 React 用 camelCase 命名习惯为组件添加事件处理程序。我们给两个 <input> 元素添加 onChange 事件处理程序。现在，当用户往 <input> 中输入文本时，附加的 onChange 回调被触发并且组件的 state 被修改。接下来更新 input 元素的值来反映组件的 state.
*/
var CommentForm = React.createClass({
    getInitialState: function(){
        return {author: '', text: ''};
    },
    handleAuthorChange: function(e){
        this.setState({author: e.target.value});
    },
    handleTextChange: function(e){
        this.setState({text: e.target.value});
    },
    handleSubmit: function(e){
        e.preventDefault();
        let author = this.state.author.trim();
        let text = this.state.text.trim();
        if(!text || !author){
            return;
        }
        this.props.onCommentSubmit({author: author, text: text});
        this.setState({author: '', text: ''});
    },
    render: function () {
        return (
            <form className="comment-form" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Your name" value={this.state.author} onChange={this.handleAuthorChange} />
                <input type="text" placeholder="Say something..." value={this.state.text} onChange={this.handleTextChange}/>
                <input type="submit" value="Post"/>
            </form>
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
    loadCommentsFromServer: function(){
        let _this = this;
        G.ajax({
            url: this.props.url,
            // responseType: 'json'//默认值
        }, function(res){
            _this.setState({data: res.data});
        }, function(err){
            console.log('error');
        });
    },
    /*
     当用户提交评论时会调用 handleCommentSubmit(), 这样父组件就可以更新评论了
     子组件通过父组件提供的函数给父组件传递数据
    */
    handleCommentSubmit: function(comment){
        let comments = this.state.data;
        let _this = this;
        G.ajax({
            url: this.props.url,
            method: 'post',
            data: comment
        }, function(res){
            console.log(res.msg);
            comments.push(res.data);
            _this.setState(comments);
        this.setState(comments);
        }, function(){

        });
        // this.loadCommentsFromServer();
        
    },
    //getInitialState()在组件的生命周期内只执行一次并设置组件的初始状态
    getInitialState: function () {
        return { data: [] };
    },
	/*
	 组件第一次渲染时 React 会自动调用 componentDidMount，动态更新的关键是调用 this.setState().我们用从服务器获取到的新数组代替旧的数组，UI 自身也会自动更新，因为这些响应，动态更新仅需要添加很少的变化。
	*/
    componentDidMount: function () {
       this.loadCommentsFromServer();
       setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    render: function () {
        return (
            <div className="comment-box">
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
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
    <CommentBox url="/api/comments" poolInterval={2000} />,
    document.getElementById('content')
);
/*
Plain JavaScript
var CommentBox = React.createClass({displayName: 'CommentBox',
  render: function() {
    return (
      React.createElement('div', {className: "commentBox"},
        "Hello, world! I am a CommentBox."
      )
    );
  }
});
ReactDOM.render(
  React.createElement(CommentBox, null),
  document.getElementById('content')
);
*/