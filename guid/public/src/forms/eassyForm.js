import React from '../react';

class EassyForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: 'Please write an essay about your favorite DOM element.'
        };
    }
    handleChange = (event) => {
        this.setState({value: event.target.value});
    }
    handleSubmit = (event) => {
        alert(`An eassy was submitted: ${this.state.value}`);
        event.preventDefault();
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit} className="eassy-form">
                <label>
                    Name:
                    <textarea value={this.state.value} onChange={this.handleChange}></textarea>
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default EassyForm;