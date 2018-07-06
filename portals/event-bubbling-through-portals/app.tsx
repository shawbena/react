
import * as  ReactDOM from 'react-dom';
import * as React from 'react';

// 这两个容器在 DOM 中是同级的
const appRoot = document.getElementById('app-root');
const modalRoot = document.getElementById('modal-root');

interface ModalProps{

}
class Modal extends React.Component<ModalProps>{
    constructor(props: ModalProps){
        super(props);
    }

    private el = document.createElement('div');

    componentDidMount(){
        // The portal element is inserted in the DOM tree after
        // the Modal's children are mounted, meaning that children
        // will be mounted on a detached DOM node. If a child component
        // component requires to be attach to the DOM tree immediately
        // when mounted, for example to measuee the DOM node, or use
        // 'autoFocus' in a descendant, add state to Modal adn only
        // render the children when Modal is inserted in the DOM tree.
       modalRoot && modalRoot.appendChild(this.el);
    }

    componentWillUnmount(){
        modalRoot && modalRoot.removeChild(this.el);
    }

    render(){
        return ReactDOM.createPortal(this.props.children, this.el);
    }
}

interface ParentProps{}
interface ParentState {
    clicks: number;
}
class Parent extends React.Component<ParentProps, ParentState>{
    constructor(props: ParentProps){
        super(props);
    }
    state = {
        clicks: 0
    };

    handleClick(){
        // 当点击 Child 中的按钮时触发，更新 Parent 的状态，即使按钮在 DOM 不是直接子孙也没关系。
        this.setState(prevState => ({
            clicks: prevState.clicks + 1
        }));
    }

    render(){
        return (
            <div onClick={() => this.handleClick()}>
                <p>Number of clicks: {this.state.clicks}</p>
                <p>
                    Open up the browser DevTool to observe that the button is not a child of the div with th onClick handler.
                </p>
                <Modal>
                    <Child />
                </Modal>
            </div>
        );
    }
}

function Child(){
    // 按钮的 click 事件将会冒泡到父组件，因为这里并没有定义 'onClick' 属性
    return (
        <div className="modal">
            <button>Click</button>
        </div>
    );
}

if(document.readyState !== 'loading'){
    bootstrap();
}else{
    document.addEventListener('DOMContentLoaded', bootstrap);
}

function bootstrap(){
    ReactDOM.render(<Parent />, appRoot);
}