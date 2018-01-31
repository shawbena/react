import * as React from 'react';

interface CommentProps{
    comment: string;
    key: string | number;
}

export default function Comment(props:CommentProps){
    return (
        <div key={props.key}>{props.comment}</div>
    );
}
