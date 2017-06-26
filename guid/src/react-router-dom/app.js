/*
 # <HashRouter>
 使用 URL (如，window.location.hash) 哈希部分的 <Router> (react-router/docs/Router.md) 来将你的 UI 也 URL 同步。

 重要提示：Hash history 不支持 `location.key` 或 `location.state`. 上个版本中我们尝试着调整这个行为，但是遇到了无法解决的极端问题。需要这种行为的任何代码和插件都不能工作。由于这种技术仅支持老浏览器，我们鼓励你配置服务器来配合 
 <HashRouter>

     import { HashRouter } from 'react-router-dom';

     <HashRouter>
         <App />
     </HashRouter>
 //...未完，待续
*/

/*
 # <BrowserRouter>
 使用 HTML5 history API (pushState, replaceState 和 popstate 事件) 保持 UI 与 URL 同步的 <Router> (react-router/docs/Router.md)

     import { BroswerRouter } from 'react-router-dom';

     <BrowserRouter basename={optionalString} forceRefresh={optioalBool} getUserConfirmation={optionalFunc} keyLength={optionalNumber}>
         <App />
     </BrowserRouter>

 # basename: string
 用于所有 location 的基本 URL。如果你的 app 是在服务器上的一个子目录，你将把他设置为这个子目录。一个正式点的 basename 开头应该有斜杠，但结尾没有：

     <BrowserRouter basename="/calendar">
     <Link to="/today" />  // renders <a href="/calendar/today">

 # getUserConfirmation: func
 A function to use to confirm navigation. Defaults to using `window.confirm`

     //this is the default behavior
     const getConfirmation = (message, callback) => {
         const allowTransition = window.confirm(message);
         callback(allowTransition);
     }

     <BroserRouter getUserConfirmation={getConfirmation} />

 # froceRefresh: bool
 如果是 `true`, 当页面导航时路由器将使用整个页面刷新。你可能只想在不支持 HTML5 history API 的流览器中使用这个功能。

     const supportsHistory = 'pushState' in window.history;
     <BrowserRouter forceRefresh={!supportsHistory} />

 # keyLength: number
 `location.key` 的长度。默认为6.

      <BroserRouter keyLength={12}>
*/