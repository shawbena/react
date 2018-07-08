
import * as React from 'react';
import logProps from './logProps';

interface FancyButtonProps {

}

const FancyButton = React.forwardRef<HTMLButtonElement, FancyButtonProps>(function FancyButton(props, ref) {
    return (
        <button ref={ref} className="FancyButton">
            {props.children}
        </button>
    )
});

// 直接获取 DOM button 的 ref
const ref = React.createRef<HTMLButtonElement>();
<FancyButton ref={ref}>Click me!</FancyButton>;

export { FancyButtonProps };
export default logProps<FancyButtonProps>(FancyButton);