import * as React from 'react';
import CustomTextInput from '../CustomTextInput';
import bootstrap from 'bootstrap';

class AutoFocusTextInput extends React.Component{
    
    private textInput: React.RefObject<CustomTextInput>;

    constructor(props: any){
        super(props);
        this.textInput = React.createRef<CustomTextInput>();
    }
    
    componentDidMount(){
        this.textInput.current && this.textInput.current.focusTextInput();
    }
    
    loadHello = () => {
        var hello = require('../hello')
        hello();
    }
    render(){
        return(
            <div>
                <CustomTextInput ref={this.textInput} />
                <button onClick={this.loadHello}>Load Hello</button>
            </div>
        );
    }
}
bootstrap(AutoFocusTextInput);
