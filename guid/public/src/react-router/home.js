import React from '../react';

export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        let props = this.props;
        return (
            <div className="home">home</div>
        );
    }
}