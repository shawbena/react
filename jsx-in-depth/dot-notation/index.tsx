import * as React from 'react';

interface MyComponentsProps {
    color: string;
}

const MyComponents = {
    DatePicker: function DatePicker(props: MyComponentsProps) {
        return <div>Image a {props.color} datepicker here.</div>
    }
};

function BlueDatePicker() {
    return <MyComponents.DatePicker color="blue" />;
}