import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './store/reducer';
import { BrowserRouter } from 'react-router-dom';

// middleware for redux extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//middlware code behind the scences for reference
// const logger = store => {
//     return next => {
//         return action => {
//             console.log('middleware', action);
//             console.log('next state', store.getState())
//         }
//     }
// }

// applyMiddleware lets you dispatch a Promise async action, and dispatches a normal action when the Promise resolves.
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);


ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
