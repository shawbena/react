import * as React from 'react'

interface FancyButtonProps{

}
const FancyButton = React.forwardRef<HTMLButtonElement, FancyButtonProps>((props, ref) => (
    <button ref={ref} className="FancyButton">
        {props.children}
    </button>
));

// 直接获取 DOM button 的 ref
const ref = React.createRef<HTMLButtonElement>();
<FancyButton ref={ref}>Click me!</FancyButton>;

export default FancyButton;
export { FancyButtonProps };