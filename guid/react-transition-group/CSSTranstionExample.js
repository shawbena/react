import React from 'react';
import ReactDOM from 'react-dom';
import CSSTransition from 'react-transition-group/CSSTransition';
import './style.scss';

const Fade = ({ children, ...props }) => (
    <CSSTransition {...props} timeout={500} classNames="fade">{children}</CSSTransition>
);

class FadeInOut extends React.Component{
    constructor(props){
        super(props);
        this.state = { show: false };
        setInterval(() => {
            this.setState({ show: !this.state.show });
        }, 5000);
    }
    render(){
        return (
            <Fade in={this.state.show}>
                <div>Hello world</div>
            </Fade>
        );
    }
}
let app = document.createElement('div');
app.id = 'app';
document.body.appendChild(app);

ReactDOM.render(
    <FadeInOut />,
    app
);
