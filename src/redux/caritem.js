import * as ActionTypes from './ActionTypes';

export const Features = (state = { 
    features:[]
    }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_FEATURES:
            return {...state, leaders: action.payload};

        default:
            return state;
    }
};
