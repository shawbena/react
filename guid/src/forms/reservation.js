import React from '../react';

export default class Reservation extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isGoing: true,
            numberOfGuests: 2
        };
    }
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value   //es6 computed property names, https://developer.mozila.org/en/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names
        });
    }
    render(){
        return(
            <form>
                <label>
                    Is going:
                    <input type="text" name="isGoing" type="checkbox" checked={this.state.isGoing} onChange={this.handleInputChange} />
                </label><br />
                <label>
                    Number of guests:
                    <input type="number" name="numberOfGuests" value={this.state.numberOfGuests} onChange={this.handleInputChange} />
                </label>
                <div>
                    {`${this.state.isGoing}, ${this.state.numberOfGuests}`}
                </div>
            </form>
        );
    }
}