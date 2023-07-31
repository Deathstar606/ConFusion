import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import { Dishes } from './dishes';
import { Movies } from './movies';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';
import { Contents } from './contents';
import { Reviews } from './reviews';
import { Features } from './caritem';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { InitialFeedback } from './forms';

export const ConfigStore = () => {            //used in app.js
    const store = createStore(                //buit in function of redux
        combineReducers({
            dishes: Dishes,
            movies: Movies,
            comments: Comments,
            reviews: Reviews,
            promotions: Promotions,
            leaders: Leaders,
            contents: Contents,
            features: Features,
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)        //check explanation
    );

    return store;
}