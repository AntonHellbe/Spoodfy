import "regenerator-runtime/runtime"; // eslint-disable-line
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import '../node_modules/normalize.css/normalize.css';
import './styles/styles.scss';
import initalStore, { sagaMiddleware } from './store/configure_store';
import rootSaga from './sagas/rootsaga';
import Routes from './approuter/approuter';

export const store = initalStore();

sagaMiddleware.run(rootSaga);

export const portalContainer = document.getElementById('modal-root');

ReactDOM.render(
    <Provider store={ store }>
        <Routes />
    </Provider>,
     document.getElementById('app'));