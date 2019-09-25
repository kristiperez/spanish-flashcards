import * as actionTypes from '../actions/actionTypes'

// global state

const initialState = {
    counter: 0,
    incorrectCounter: 0
}

const reducer = (state = initialState,action) => {
    switch(action.type) {
        case actionTypes.INC_COUNTER:
            return {
                ...state,
                counter: state.counter + 1
            }

        case actionTypes.INC_INC_COUNTER:
            return {
                ...state,
                incorrectCounter: state.incorrectCounter + 1
            }
    }
    
    return state
}

export default reducer