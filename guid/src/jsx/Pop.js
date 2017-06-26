import React from '../react';
import Utli from '../utli';

//所有弹窗的父元素
/**
 * props{
 *  id: <String>,
 *  title: <String>,
 *  childPop: <Function> | <Class>
 * }
 * props down{
 *  closePopHandler: <Function>
 * }
 * @class Pop
*/
class Pop extends React.Component{
    constructor(props){
        super(props);
    }
    closePopHandler = (e) =>{
        //关闭弹窗
        console.log('pop-closed');
    }
    render(){
        let ChildPop = this.props.childPop;
        return (
            <div className="pop-box">
                <div className="pop-box-child" id={this.props.id}>
                    <div className="pop-box-title-bar">
                        <div className="pop-box-title">{this.props.title}</div>
                        <div className="pop-box-close-icon" onClick={this.closePopHandler}></div>
                    </div>
                    <ChildPop closePopFun={this.closePopHandler} />
                </div>
            </div>
        );
    }
}

/**
 * 新增角色弹窗
 * 
 * @class NewRolePop
*/
class NewRolePop extends React.Component{
    constructor(props){
        super(props);
        this.state = {roleName: ''};
    }
    //创建角色
    createRoleHandler = (e) =>{
        let roleName = 'new role name';
        let _this = this;
        this.setState({roleName});
        Utli.ajax({
            method: 'post',
            url: '/role/newRole',
            data: {
                roleName
            }
        }, function(res){
            Utli.popo(res.msg);
            _this.props.closePopFun();
            console.log('创建了一个新角色！');
        });
    }
    render(){
        return (
            <div className="pop-box-content">
                <div></div>
                <div className="buttons">
                    <button onClick={this.createRoleHandler}>创建</button>
                    <button onClick={this.props.closePopFun}>取消</button>
                </div>
            </div>
        );
    }
}

export {Pop, NewRolePop};