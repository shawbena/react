import * as React from 'react'

const ThemedContext = React.createContext('light');

// 使用 theme context 的一个按钮如：
function ThemedButton(props: any){
    return (
        <ThemedContext.Consumer>
            {(theme) => <button className={theme} {...props}></button> }
        </ThemedContext.Consumer>
    );
}

// 几个组件没有问题，如果你在很多地方都需要使用 theme context 呢？
// 我们可以创建一个高阶组件 withTheme