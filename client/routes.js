import React from 'react';
import {
    Router,
    Route,
    IndexRoute,
    hashHistory,
} from 'react-router';
import Layout from 'components';
import Home from 'containers';


// App routes
const Routes = (
    <Router history={hashHistory}>
        <Route path="/" component={Layout}>
            {/* IndexRoute renders Home container by default */}
        </Route>
    </Router>
);

export default Routes;