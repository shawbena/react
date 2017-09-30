import React from 'react';
import ReactDOM from 'react-dom';

import TransitionGroup from 'react-transition-group/TransitionGroup';

class TodoList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            item: ['heloo', 'world', 'click', 'me']
        };
    }
    handleAdd(){
        const newItems = this.state.items.concat([
            prompt('Enter some text')
        ]);
        this.setState({ items: newItems });
    }
    handleRemove(i){
        let newItems = this.state.items.slice();
        newItems.splice(i, 1);
        this.state.setState({ items: newItems });
    }
    render(){
        return(
            <div>
                <button onClick={() => this.handleAdd()}>Add Item</button>
                <TransitionGroup>
                    {this.state.items.map((item, i) => (
                        <FadeTransitionGroup>
                            
                        </FadeTransitionGroup>
                    ))}
                </TransitionGroup>
            </div>
        );
    }
}