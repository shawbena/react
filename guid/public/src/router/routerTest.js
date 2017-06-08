import React from '../react';
import { Router } from '../react-router';
import { createBrowserHistory } from '../history';

const customHistory = createBrowserHistory();
let routerTest = (
    <Router history={customHistory}>
        <div>lkjlsda</div>
    </Router>
);

export default routerTest;