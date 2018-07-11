import * as React from 'react';
import bootstrap from 'bootstrap'

function CustomTextInput(){
    // txtInput must be declared here so the ref callback can refer to it
    let textInput = React.createRef<HTMLInputElement>();

    function handleClick(){
        textInput.current && textInput.current.focus();
    }

    return(
        <div>
            <input type="text" ref={textInput}/>
            <input type="button"
                value="Focus the text input" 
                onClick={handleClick}
            />
        </div>
    );
}

bootstrap(CustomTextInput);