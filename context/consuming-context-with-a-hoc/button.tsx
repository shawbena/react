import * as React from 'react'
import { withTheme } from './withTheme';

function Button({ theme, ...rest}: {theme: string, [props: string]: any}){
    return <button className={theme} {...rest} />;
}

// 现在依赖 theme context 的任何组件都可以使用我们创建的 withTheme 函数轻易地订阅他：
const ThemedButton = withTheme(Button);
