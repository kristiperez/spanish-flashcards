import * as actionTypes from './actionTypes'

export const incrementCorrectCounter = () => {
    return {
        type: actionTypes.INC_COUNTER
    }
}

export const incrementIncorrectCounter = () => {
    return {
        type: actionTypes.INC_INC_COUNTER
    }
}