import * as React from 'react';


class MyComponent extends React.Component{
    myRef: React.RefObject<HTMLDivElement>;
    constructor(props: any){
        super(props);
        this.myRef = React.createRef<HTMLDivElement>()
    }
    
    render(){
        return <div ref={this.myRef} />;
    }
}