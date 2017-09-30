import React from 'react';
import ReactDOM from 'react-dom';
import Transition from 'react-transition-group/Transition';

const duration = 300;

const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0
};

const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 }
}

//??
const Fade = ({ in: inProp }) => {
    console.log();
    return (
        <Transition in={inProp} timeout={duration}>
            {
                (state) => (
                    <div style={{
                        ...defaultStyle,
                        ...transitionStyles[state]
                    }}>
                        I'm A fade Transition
            </div>
                )
            }
        </Transition>
    );
}

class FadeInOut extends React.Component {
    constructor(props) {
        super(props);
        this.state = { in: false };
    }
    toggleTransition = () => {
        this.setState({ in: !this.state.in });
    }
    render() {
        return (
            <div>
                <button onClick={this.toggleTransition}>Toggle</button>
                <Fade in={this.state.in} />
            </div>
        );
    }
}

let div = document.createElement('div');
div.id = 'app';
document.body.appendChild(div);

ReactDOM.render(<FadeInOut />, div);