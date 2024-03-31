import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware,compose } from 'redux';
import  thunk from 'redux-thunk';
import DateAdapter from '@mui/lab/AdapterMoment';
import reducers from './reducers';

import App from './App';
import './index.css';

const store = createStore(reducers,compose(applyMiddleware(thunk)));

ReactDOM.render(
        <Provider store={store} dateAdapter={DateAdapter}>
            <App />
        </Provider>, document.getElementById('root'));