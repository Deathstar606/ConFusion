import * as ActionTypes from './ActionTypes';

export const Headers = (state = { 
    isLoading: true,
    errMess: null,
    headers:[]
    }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_HEADERS:
            return {...state, isLoading: false, errMess: null, headers: action.payload};

        case ActionTypes.HEADERS_LOADING:
            return {...state, isLoading: true, errMess: null, headers: []}

        case ActionTypes.HEADERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};

//sevarel things needed to be checked