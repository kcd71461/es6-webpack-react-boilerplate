/**
 * Created by kimch on 2017-04-21.
 */

import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from 'containers/App';

export default (
    <Route>
        <Route path="/" component={App}>
            {/*{<IndexRoute component={}/>}*/}
        </Route>
    </Route>
);
