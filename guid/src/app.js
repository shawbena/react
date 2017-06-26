import React from './react';
import ReactDOM from './react-dom';
import {NewRolePop} from './pops';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    //新建角色弹窗
    newRolePop = () => {
        let newRoleCreated = (data) => {
            //不绑定 this 会报错的
            let roleName = data.roleName;
            roleName && this.setState({roleName});
        };

        ReactDOM.render(
            <NewRolePop newRoleCreated={newRoleCreated} />,
            document.getElementById('pop')
        );
    }
    newRoleCreatedHandler = (data) => {
        let roleName = data.roleName;
        roleName && this.state({roleName});
    }
    render(){
        return (
            <div>
                <div>
                    {this.state.roleName}
                </div>
                <div className="new-role">
                    <button className="new-role-btn" onClick={this.newRolePop}>新建角色</button>
                </div>
            </div>
        );
    }
}

export default App;