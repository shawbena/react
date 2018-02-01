import * as React from 'react';

interface NameFormProps{

}

class NameForm extends React.Component<NameFormProps>{
    private input: HTMLInputElement | null;
    
    constructor(props: NameFormProps){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>){
        alert('A name was submitted: ' + (this.input && this.input.value));
        event.preventDefault();
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" ref={(input) => this.input = input}/>
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}