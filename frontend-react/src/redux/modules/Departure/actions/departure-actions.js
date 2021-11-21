import * as types from "./actionTypes";

export function openModal(value){
    return {
        type: types.OPEN_MODAL_SUCCESS_DEPARTURE,
        payload: value
    }
}