import * as React from 'react';

interface CustomTextInputProps{
    ref?: (ref: CustomTextInput) => void;
}

export default class CustomTextInput extends React.Component{

    private textInput: HTMLInputElement | null;

    constructor(props: CustomTextInputProps){
        super(props);
        this.focusTextInput = this.focusTextInput.bind(this);
    }
    
    focusTextInput(){
        // Explicity focus the text input using the raw DOM API
        this.textInput && this.textInput.focus();
    }

    render(){
        // Use the `ref` callback to store a reference to the text input DOM
        // element in an intance field (for example, this.textInput).
        return(
            <div>
                <input type="text"
                    ref={(input) => {this.textInput = input;}}
                />
                <input type="button"
                    value="Focus the text input"
                    onClick={this.focusTextInput}
                />
            </div>
        );
    }
}