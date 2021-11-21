import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { fromJS } from 'immutable';
import createSagaMiddleware from 'redux-saga';

import createReducer from './reducers';
import rootSagas from './rootsaga';

function configStore(initialState = {}, history){
    let composeEnhancers = compose;
    let sagaMonitorOption = {};

    /* istanbul ignore next */
    if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
        /* eslint-disable no-underscore-dangle */
        if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
    /* eslint-enable */
    }

    const sagaMiddleware = createSagaMiddleware(sagaMonitorOption);
    const middlewares = [sagaMiddleware, routerMiddleware(history)];
    const applyMiddlewares = [applyMiddleware(...middlewares)];
    
    const store = createStore(
        createReducer(),
        fromJS(initialState),
        composeEnhancers(...applyMiddlewares)
    );

    // Extensions
    store.runSaga = sagaMiddleware.run(rootSagas);
    store.injectedReducers = {}; // Reducer registry
    store.injectedSagas = {}; // Saga registry

    // Make reducers hot reloadable, see http://mxs.is/googmo
    /* istanbul ignore next */
    if (module.hot) {
        module.hot.accept('./reducers', () => {
        store.replaceReducer(createReducer(store.injectedReducers));
        });
    }

    return store;
}

export default configStore;