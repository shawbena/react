import * as React from 'react';

interface CustomTextInputProps{
    ref?: React.RefObject<CustomTextInput>;
}

export default class CustomTextInput extends React.Component<CustomTextInputProps>{

    private textInput: React.RefObject<HTMLInputElement>;

    constructor(props: CustomTextInputProps){
        super(props);
        // 创建一个 ref 存储 textInput DOM 元素
        this.textInput = React.createRef<HTMLInputElement>();
        this.focusTextInput = this.focusTextInput.bind(this);
    }
    
    focusTextInput(){
        // Explicity focus the text input using the raw DOM API
        // 访问 current 获取 DOM 节点
        this.textInput.current && this.textInput.current.focus();
    }

    render(){
        // 告诉 React 我们想要以我们在构造函数中创建的 `textInput` 关联 <input>
        return(
            <div>
                <input type="text"
                    ref={this.textInput}
                />
                <input type="button"
                    value="Focus the text input"
                    onClick={this.focusTextInput}
                />
            </div>
        );
    }
}
