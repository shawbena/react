import React from 'react';
import ReactDOM from 'react-dom';
import CSSTransition from 'react-transition-group/CSSTransition';
import './style.scss';

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
            <CSSTransition in={this.state.show} timeout={1000} classNames="fade">
                <div>Hello world</div>
            </CSSTransition>
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
