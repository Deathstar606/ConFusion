import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';
import { Orders } from './orders';
import { Headers } from './headers';
import { Gifts } from './gifts';
import { Catering } from './catering';
import { Seats } from './reservation';
import { Home } from './home';
import { Events } from './events';
import { Subscribers } from './subscribers';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { InitialFeedback } from './forms';

export const ConfigStore = () => {            //used in app.js
    const store = createStore(                //buit in function of redux
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            subscribers: Subscribers, 
            orders: Orders,
            headers: Headers,
            home: Home,
            catering: Catering,
            seats: Seats,
            gifts: Gifts,
            events: Events,
            leaders: Leaders,
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)        //check explanation
    );

    return store;
}