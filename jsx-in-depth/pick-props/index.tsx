import * as React from 'react';
import { render } from 'react-dom';

interface ButtonProps {
    kind: string;
    [prop: string]: any;
}

const Button = (props: ButtonProps) => {
    const { kind, ...other} = props;
    const className = kind === 'primary' ? 'PrimaryButton' : 'SecondaryButton';

    return <button className={className} {...other} />;
};

const App = () => {
    return (
        <div>
            <Button kind="primary" onClick={() => console.log('clicked!')}>Hello world!</Button>
        </div>
    );
}

let div = document.createElement('div');
document.body.appendChild(div);
render(<App />, div);
