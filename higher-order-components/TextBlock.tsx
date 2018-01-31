import * as React from 'react';

interface TextBlockProps {
    text: string;
}
export default function TextBlock(props: TextBlockProps){
    return <textarea value={props.text}/>
}