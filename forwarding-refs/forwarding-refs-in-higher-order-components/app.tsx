import * as React from 'react'
import * as ReactDOM from 'react-dom';
import FancyButton from './fancyButton';

if(document.readyState !== 'loading'){
    bootstrap();
}else{
    document.addEventListener('DOMContentLoaded', bootstrap);
}

function bootstrap(){
    // 创建一个 HTMLButtonElement 类型的 ref。
    const ref = React.createRef<HTMLButtonElement>();

    ReactDOM.render(<FancyButton ref={ref}>Fancy Button!</FancyButton>, document.getElementById('root'));

    setTimeout(() => {
        console.log('ref: ', ref);//// { current: button.FancyButton}
    }, 5000);
}