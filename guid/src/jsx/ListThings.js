import React from '../react';

//calls the children callback numTimes to produce a repeated component
function Repeat(props){
    let items = [];
    for (let i = 0; i < props.numTimes; i++){
        items.push(props.children(i));
    }
    // items 是数组，渲染时每项应该带 key
    return <div className="repeat-items">{items}</div>;  
}

function ListOfTenThings(){
    return (
        <Repeat numTimes={10}>
            {(index) => <div key={index}>This is item {index} in the list.</div>}
        </Repeat>
    );
}

export { Repeat, ListOfTenThings};