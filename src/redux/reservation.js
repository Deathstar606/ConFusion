import * as ActionTypes from './ActionTypes';

export const Seats = (state = { 
    isLoading: true,
    errMess: null,
    seats:[]
    }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_RESERVATION:
            return {...state, isLoading: false, errMess: null, seats: action.payload};

        case ActionTypes.RESERVATION_LOADING:
            return {...state, isLoading: true, errMess: null, seats: []}

        case ActionTypes.RESERVATION_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};

//sevarel things needed to be checked