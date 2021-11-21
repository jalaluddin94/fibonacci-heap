import * as types from "./actionTypes";

export function addDataChart(theData){
    return {
        type: types.ADD_DATA_CHART_PORTION,
        payload: theData
    }
}

export function openModal(){
    return {
        type: types.OPEN_MODAL_SUCCESS_PORTION,
        payload: true
    }
}

export function openDiagram(){
    return {
        type: types.OPEN_MODAL_DIAGRAM_PORTION,
        payload: true
    }
}

export function closeDiagram(){
    return {
        type: types.OPEN_MODAL_DIAGRAM_PORTION,
        payload: false
    }
}

export function closeModal(){
    return {
        type: types.CLOSE_MODAL_SUCCESS_PORTION,
        payload: false
    }
}