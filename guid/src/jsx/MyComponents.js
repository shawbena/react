import React from '../react'

/*
 Using Dot Notation for JSX Type
 在 JSX 中你可以用点表示法引用一个 Reac 组件。如果你有一个单一模块输出很多 React 组件，那么这样做是很有用的。如，MyComponents.DatePicker 是一个组件，你可以直接在 JSX 中这样使用他：
*/
let MyComponents = {
    DatePicker: function DatePicker(props){
        return <div>Imaging a {props.color} datepicker here.</div>;
    }
};

function BlueDatePicker(){
    return <MyComponents.DatePicker color="blue" />
}