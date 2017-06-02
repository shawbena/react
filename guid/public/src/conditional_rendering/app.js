/*
 # Conditional Rendering
 在 React 中，你可以创建不同的组件包装你需要的行为。然后你可以根据组件的状态渲染他们中的一部分。

 React 中的条件渲染和 JavaScript 中的条件一样。使用 if 或条件操作符（https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional Operator）创建表示当前状态的元素，并让 React 更新 UI 匹配他们。
*/

function UserGreeting(props){
    return <h1>Welcome back!</h1>   
}

function GuestGreeting(props){
    return <h1>Please sign up.</h1>   
}

function Greeting(props){
    const isLoggedIn = props.isLoggedIn;
    if(isLoggedIn){
        return <UserGreeting />
    }
    return <GuestGreeting />
}
// 根据登陆状态渲染不同的欢迎页
ReactDOM.render(
    //改为 true 试试
    <Greeting isLoggedIn={true} />,
    document.getElementById('app')
);

/*
 # Element Variables
*/
function LoginButton(props){
    return(
        <button onClick={props.onClick}>
            Login
        </button>
    );
}
function LogoutButton(props){
    return(
        <button onClick={props.onClick}>
            Logout
        </button>
    );
}

class LoginControl extends React.Component{
    constructor(props){
        super(props);
        this.state = {isLoggedIn: false};
    }
    handleLoginClick = () => {
        this.setState({isLoggedIn: true});
    }
    handlerLogoutClick = () => {
        this.setState({isLoggedIn: false});
    }
    render(){
        const isLoggedIn = this.state.isLoggedIn;

        let button = null;
        if(isLoggedIn){
            button = <LogoutButton onClick={this.handlerLogoutClick} />
        }else{
            button = <LoginButton onClick={this.handleLoginClick}/>
        }

        return (
            <div>
                <Greeting isLoggedIn={isLoggedIn} />
                {button}
            </div>
        );
    }
}

ReactDOM.render(
    <LoginControl />,
    document.getElementById('app')
);