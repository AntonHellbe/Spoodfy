import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from '../reducers/index';

export const sagaMiddleware = createSagaMiddleware();

export default () => {
    return createStore(reducers,
        window.__REDUX_DEVTOOLS_EXTENSION__ && 
        window.__REDUX_DEVTOOLS_EXTENSION__(),
        applyMiddleware(sagaMiddleware)); //Enables Redux-dev-tools in webbrowser
};
