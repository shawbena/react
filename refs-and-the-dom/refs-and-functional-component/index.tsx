import * as React from 'react';
import bootstrap from '../../bootstrap';

function CustomTextInput(){
    // txtInput must be declared here so the ref callback can refer to it
    let textInput: HTMLInputElement | null;

    function handleClick(){
        textInput && textInput.focus();
    }

    return(
        <div>
            <input type="text" ref={(input) => textInput = input }/>
            <input type="button"
                value="Focus the text input" 
                onClick={handleClick}
            />
        </div>
    );
}

bootstrap(CustomTextInput);