import { reducer as form } from 'redux-form/immutable';
import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';
import history from 'utilities/history';

// import agentsReducer from './modules/agents/reducers/agents-reducer';

export default function createReducer(injectedReducers = {}){
    const appReducer = combineReducers({
        // agentsReducer,
        form,
        router: connectRouter(history),
        ...injectedReducers
    });

    const rootReducer = (state, action) => {
        // when a logout action is dispatched it will reset redux state
        if (action.type === 'USER_LOGGED_OUT_SUCCESS') {
          state = undefined;
        }

        return appReducer(state, action);
    };

    // Wrap the root reducer and return a new root reducer with router state
    const mergeWithRouterState = connectRouter(history);
    return mergeWithRouterState(rootReducer);
}