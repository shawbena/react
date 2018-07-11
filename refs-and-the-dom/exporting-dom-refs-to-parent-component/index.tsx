import * as React from 'react';
import bootstrap from 'bootstrap';

interface CustomTextInputProps{
    inputRef?: React.RefObject<HTMLInputElement>;
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
        this.ref = React.createRef<HTMLInputElement>();
    }

    private ref: React.RefObject<HTMLInputElement>; //正如自我约束一样，添加 null 是一个良好的实践
    componentDidMount(){
        this.ref.current && this.ref.current.focus();
    }
    render(){
        return(
            <CustomTextInput inputRef={this.ref}/>
        );
    }
}

bootstrap(Parent);