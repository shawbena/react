import * as React from 'react';
import CustomTextInput from '../CustomTextInput';
import bootstrap from '../../bootstrap';

class AutoFocusTextInput extends React.Component{
    
    private textInput: CustomTextInput | null;
    
    componentDidMount(){
        this.textInput && this.textInput.focusTextInput();
    }
    
    loadHello = () => {
        var hello = require('../hello')
        hello();
    }
    render(){
        return(
            <div>
                <CustomTextInput ref={(input) => this.textInput = input} />
                <button onClick={this.loadHello}>Load Hello</button>
            </div>
        );
    }
}

bootstrap(AutoFocusTextInput);
