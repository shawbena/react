import React from '../react'
import ReactDOM from '../react-dom'
import CustomButton from './CustomerButton';

function WarningButton(){
    // return React.createElement(CustomButton, {color: 'red'}, null);
    return <CustomButton color="red" text="Waring Button" />;
}

export default WarningButton;