import React from '../react';
import { Router, Route, Switch } from '../react-router';
import { createBrowserHistory } from '../history';

const history = createBrowserHistory();

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Router history={history}>
                <div>app</div>
            </Router>
        );
    }
}

/*
 # <Router>
 用于所有路由组件的通用低级路由接口，通常应用会使用下面的高级路由：
  <BroswerRouter>
  <HashRouter>
  <MemoryRouter>
  <NativeRouter>
  <StaticRouter>

  The most common use-case for using the low-level <Router> is to

synchronize a custom history with a state management lib like Redux or Mobx. Note that this is not required to use state management libs alongside React Router, it's only for deep integration.

history 对象用于导航

*/
