import * as ActionTypes from './ActionTypes';

export const Gifts = (state = { 
    isLoading: true,
    errMess: null,
    gifts:[]
    }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_GIFTS:
            return {...state, isLoading: false, errMess: null, gifts: action.payload};

        case ActionTypes.GIFTS_LOADING:
            return {...state, isLoading: true, errMess: null, gifts: []}

        case ActionTypes.GIFTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};

//sevarel things needed to be checked