import * as React from 'react';

interface ItemProps {
    message: string;
}

function Item(props: ItemProps){
    return <li>{props.message}</li>
}

function TodoList(){
    const todos = ['finish doc', 'submit pr', 'nag da to review'];
    return (
        <ul>
            {
                todos.map(message => <Item key={message} message={message} />)
            }
        </ul>
    );
}