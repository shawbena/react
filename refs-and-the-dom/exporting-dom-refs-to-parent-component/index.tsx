import * as React from 'react';
import bootstrap from '../../bootstrap';

interface CustomTextInputProps{
    inputRef: (ref: HTMLInputElement) => void;
}

function CustomTextInput(props: CustomTextInputProps){
    return(
        <div>
            <input type="text" ref={props.inputRef}/>
        </div>
    );
}

class Parent extends React.Component{
    constructor(props:any){
        super(props);
    }

    private inputElement: HTMLInputElement | null; //正如自我约束一样，添加 null 是一个良好的实践
    componentDidMount(){
        this.inputElement && this.inputElement.focus();
    }
    render(){
        return(
            <CustomTextInput inputRef={el => this.inputElement = el}/>
        );
    }
}

bootstrap(Parent);