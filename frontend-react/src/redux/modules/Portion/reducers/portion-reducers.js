import * as types from '../actions/actionTypes';
import { fromJS } from 'immutable';

//reducer
const initialState = {
    openModalSuccess: false,
    openDiagram: false,
}

const initialImmutableState = fromJS(initialState);

export default function portionReducer(state = initialImmutableState, action = {}) {
    switch (action.type) {
        case types.OPEN_MODAL_SUCCESS_PORTION:
            return state.withMutations((mutableState) => {
                mutableState.set('openModalSuccess', action.payload);
            });
        case types.OPEN_MODAL_DIAGRAM_PORTION:
            return state.withMutations((mutableState) => {
                mutableState.set('openDiagram', action.payload);
            });
        case types.CLOSE_MODAL_SUCCESS_PORTION:
            return state.withMutations((mutableState) => {
                mutableState.set('openModalSuccess', action.payload);
            });
        default:
            return state;
    }
}