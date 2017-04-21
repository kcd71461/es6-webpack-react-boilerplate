import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import injectTapEventPlugin from 'react-tap-event-plugin';
require('./favicon.ico');
import './styles.scss';
import 'font-awesome/css/font-awesome.css';

import {Provider} from 'react-redux';
import axios from 'axios';
import {Consts} from 'constants';
import querystring from 'querystring';

import App from 'containers/App';

injectTapEventPlugin();

//////////////////////////////////////////////////////////////////////////////////
// AJAX Setting                                                                 //
//////////////////////////////////////////////////////////////////////////////////
//axios.defaults.baseURL = '';
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
axios.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
axios.defaults.headers.patch['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

axios.defaults.transformRequest = [function (data) {
    if (data instanceof FormData) return data;
    return querystring.stringify(data);
}];

render(
    <App/>, document.getElementById('app')
);