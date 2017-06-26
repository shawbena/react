import React from '../react'

function CustomerButton(props){
    return <button>{props.text ? props.text : 'button'}</button>   
}

export default CustomerButton;