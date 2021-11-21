import * as types from '../actions/actionTypes';
import { fromJS } from 'immutable';

//reducer
const initialState = {
    openModalDeparture: false
}

const initialImmutableState = fromJS(initialState);

export default function departureReducer(state = initialImmutableState, action = {}) {
    switch (action.type) {
        case types.OPEN_MODAL_SUCCESS_DEPARTURE:
            return state.withMutations((mutableState) => {
                mutableState.set('openModalDeparture', action.payload);
            });
        default:
            return state;
    }
}