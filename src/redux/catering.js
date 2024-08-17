import * as ActionTypes from './ActionTypes';

export const Catering = (state = { 
    isLoading: true,
    errMess: null,
    catering:[]
    }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_CATERING:
            return {...state, isLoading: false, errMess: null, catering: action.payload};

        case ActionTypes.CATERING_LOADING:
            return {...state, isLoading: true, errMess: null, catering: []}

        case ActionTypes.CATERING_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};

//sevarel things needed to be checked