import React from '../react';

class NameForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {value: ''};
    }
    handleChange = (event) => {
        this.setState({value: event.target.value});
    }
    handleSubmit = (event) => {
        alert('A man was submitted: ' + this.state.value);
        event.preventDefault();
    }
    render(){
        return (
            <form onSubmit={this.handleSubmit} className="name-form">
                <label>
                    Name:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>   
        );
    }
}

export default NameForm;