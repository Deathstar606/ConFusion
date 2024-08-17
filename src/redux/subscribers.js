import * as ActionTypes from './ActionTypes';

export const Subscribers = (state = { 
    isLoading: true,
    errMess: null,
    subscribers:[]
    }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_SUBSCRIBER:
            return {...state, isLoading: false, errMess: null, Subscribers: action.payload};

        case ActionTypes.SUBSCRIBER_LOADING:
            return {...state, isLoading: true, errMess: null, Subscribers: []}

        case ActionTypes.SUBSCRIBER_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};

//sevarel things needed to be checked