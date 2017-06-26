import React from 'react';
import Utli from 'utli';
/**
 * 新增角色弹窗
 * props:{
 *  newRoleCreated: <Function>
 * }
 * @class NewRolePop
*/
class NewRolePop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    //创建角色
    createNewRole = (e) => {
        let roleName = 'new rolename';
        let _this = this;
        Utli.ajax({
            method: 'post',
            url: '/role/newRole',
            data: {
                roleName
            }
        }, function (res) {
            Utli.popo(res.msg);
            console.log('创建了一个新角色！');
            _this.canclePop();
            _this.props.newRoleCreated({
                roleName
            });
        });
    }
    //取消
    canclePop = () => {
        console.log('关闭新建角色弹窗');
    }
    render() {
        return (
            <div className="pop-box">
                <div className="pop-box-child">
                    <div className="pop-box-title-bar">
                        <div className="pop-box-title">新建角色</div>
                        <div className="pop-box-close-icon" onClick={this.canclePop}></div>
                    </div>
                    <div className="pop-box-content">
                        <div className="buttons">
                            <button onClick={this.createNewRole}>创建</button>
                            <button onClick={this.canclePop}>取消</button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export { NewRolePop };