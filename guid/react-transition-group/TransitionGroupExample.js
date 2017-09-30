import React from 'react';
import ReactDOM from 'react-dom';
import Transition from 'react-transition-group/Transition';
import TransitionGroup from 'react-transition-group/TransitionGroup';

import './style.scss';
const duration = {
    enter: 500,
    exit: 300
};

function FadeTransition(props){
    return (
        <Transition in={props.in} timeout={duration}>
            {
                (status) => {
                    
                    return (
                        <div className={`fade-${status}`}>
                            I'm A fade Transition
                        {props.children}
                        </div>
                    );

                }
            }
        </Transition>
    );
}

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }
    handleAdd() {
        const newItems = this.state.items;
        newItems.push('hahasdfasfasfsafsa');
        this.setState({ items: newItems });
    }
    handleRemove(i) {
        let newItems = this.state.items.slice();
        newItems.splice(i, 1);
        this.setState({ items: newItems });
    }
    render() {
        return (
            <div>
                <button onClick={() => this.handleAdd()}>Add Item</button>
                <TransitionGroup>
                    {this.state.items.map((item, i) => (
                        <FadeTransition key={i}>
                            {item}{' '}
                            <button onClick={() => this.handleRemove(i)}>remove</button>
                        </FadeTransition>
                    ))}
                </TransitionGroup>
            </div>
        );
    }
}
let div = document.createElement('div');
div.id = 'app';
document.body.appendChild(div);

ReactDOM.render(<TodoList />, div);