import React from '../react';

export default class FlavorForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {value: 'coconut'};
    }
    handleChange = (event) => {
        this.setState({value: event.target.value});
    }
    handleSubmit = (event) => {
        alert('You favorite flavor is: ' + this.state.value);
        event.preventDefault();
    }
    render(){
        return (
            <form onSubmit={this.handleSubmit} className="flavor-form">
                <label>
                    Pick your favorite La Croix flavor:
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value="Grapefruit">Grapefruit</option>
                        <option value="lime">Lime</option>
                        <option value="coconut">Coconut</option>
                        <option value="mango">Mango</option>
                    </select>
                </label>
                <input type="submit" value="Submit" />   
            </form>
        );
    }
}