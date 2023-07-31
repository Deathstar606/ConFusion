import * as ActionTypes from './ActionTypes';

export const Contents = (state = { 
    isLoading: true,
    errMess: null,
    contents:[]
    }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_CONTENTS:
            return {...state, isLoading: false, errMess: null, contents: action.payload};

        case ActionTypes.CONTENTS_LOADING:
            return {...state, isLoading: true, errMess: null, contents: []}

        case ActionTypes.CONTENTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};

//sevarel things needed to be checked