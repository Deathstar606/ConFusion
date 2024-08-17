import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseurl';

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (dishId, rating, comment, author) => (dispatch) => {

    const newComment = {
        dish: dishId,
        rating: rating,
        comment: comment,
        author: author
    }
    console.log('Comment ', newComment);

    return fetch(baseUrl + 'comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error => { console.log('Post comments ', error.message);
        alert('Your comment could not be posted\nError: '+ error.message); })
}

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'dishes')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)));
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
}

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchSubscribers = () => (dispatch) => {

    return fetch(baseUrl + 'subscribe')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(subs => dispatch(addSubscribers(subs)))
        .catch(error => dispatch(subscribersFailed(error.message)));
}

export const subscribersFailed = (errmess) => ({
    type: ActionTypes.SUBSCRIBER_FAILED,
    payload: errmess
});

export const addSubscribers = (subs) => ({
    type: ActionTypes.ADD_SUBSCRIBER,
    payload: subs
});

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true));

    return fetch(baseUrl + 'promotions')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)));
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

export const fetchLeaders = () => (dispatch) => {
    
    dispatch(leadersLoading());

    return fetch(baseUrl + 'leaders')
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
    .then(response => response.json())
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(error => dispatch(leadersFailed(error.message)));
}

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});

////////////////////////////////////////

export const addOrders = (orders) => ({
    type: ActionTypes.ADD_ORDERS,
    payload: orders
});

export const addOrder = (order) => ({
    type: ActionTypes.ADD_ORDER,
    payload: order
});

export const orderFailed = (errMess) => ({
    type: ActionTypes.ORDERS_FAILED,
    payload: errMess
});

export const fetchOrders = () => (dispatch) => {
    try {
        const ordersFromStorage = JSON.parse(localStorage.getItem('orders')) || [];
        dispatch(addOrders(ordersFromStorage));
    } catch (error) {
        dispatch(orderFailed(error.message));
    }
};

export const addNewOrder = (order) => (dispatch) => {
    try {
        const ordersFromStorage = JSON.parse(localStorage.getItem('orders')) || [];
        ordersFromStorage.push(order);
        localStorage.setItem('orders', JSON.stringify(ordersFromStorage));
        dispatch(addOrder(order));
    } catch (error) {
        dispatch(orderFailed(error.message));
    }
};

export const removeExistingOrder = (order_id, quantity) => (dispatch) => {
    try {
        let ordersFromStorage = JSON.parse(localStorage.getItem('orders')) || [];
        ordersFromStorage = ordersFromStorage.filter(o => !(o._id === order_id && o.quantity === quantity));
        localStorage.setItem('orders', JSON.stringify(ordersFromStorage));
        dispatch(fetchOrders());
    } catch (error) {
        dispatch(orderFailed(error.message));
    }
};

export const giftsLoading = () => ({
    type: ActionTypes.GIFTS_LOADING
});

export const giftsFailed = (errmess) => ({
    type: ActionTypes.GIFTS_FAILED,
    payload: errmess
});

export const addgifts = (catering) => ({
    type: ActionTypes.ADD_GIFTS,
    payload: catering
});

export const fetchGifts = () => (dispatch) => {
    
    dispatch(giftsLoading());

    return fetch(baseUrl + 'giftcase')
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
    .then(response => response.json())
    .then(leaders => dispatch(addgifts(leaders)))
    .catch(error => dispatch(giftsFailed(error.message)));
}

export const headersLoading = () => ({
    type: ActionTypes.HEADERS_LOADING
});

export const headersFailed = (errmess) => ({
    type: ActionTypes.HEADERS_FAILED,
    payload: errmess
});

export const addheaders = (headers) => ({
    type: ActionTypes.ADD_HEADERS,
    payload: headers
});

export const fetchHeaders = () => (dispatch) => {
    
    dispatch(headersLoading());

    return fetch(baseUrl + 'headers')
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
    .then(response => response.json())
    .then(leaders => dispatch(addheaders(leaders)))
    .catch(error => dispatch(headersFailed(error.message)));
}

export const homeLoading = () => ({
    type: ActionTypes.HOME_LOADING
});

export const homeFailed = (errmess) => ({
    type: ActionTypes.HOME_FAILED,
    payload: errmess
});

export const addhome = (home) => ({
    type: ActionTypes.ADD_HOME,
    payload: home
});

export const fetchHome = () => (dispatch) => {
    
    dispatch(homeLoading());

    return fetch(baseUrl + 'home')
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
    .then(response => response.json())
    .then(leaders => dispatch(addhome(leaders)))
    .catch(error => dispatch(homeFailed(error.message)));
}

export const cateringLoading = () => ({
    type: ActionTypes.CATERING_LOADING
});

export const cateringsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addcaterings = (catering) => ({
    type: ActionTypes.ADD_CATERING,
    payload: catering
});

export const fetchCaterings = () => (dispatch) => {
    
    dispatch(cateringLoading());

    return fetch(baseUrl + 'catermenu')
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
    .then(response => response.json())
    .then(leaders => dispatch(addcaterings(leaders)))
    .catch(error => dispatch(cateringsFailed(error.message)));
}

export const seatLoading = () => ({
    type: ActionTypes.RESERVATION_LOADING
});

export const seatFailed = (errmess) => ({
    type: ActionTypes.RESERVATION_FAILED,
    payload: errmess
});

export const addseat = (seat) => ({
    type: ActionTypes.ADD_RESERVATION,
    payload: seat
});

export const fetchSeats = () => (dispatch) => {
    
    dispatch(seatLoading());

    return fetch(baseUrl + 'reservation/resseat')
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
    .then(response => response.json())
    .then(leaders => dispatch(addseat(leaders)))
    .catch(error => dispatch(seatFailed(error.message)));
}

export const eventsLoading = () => ({
    type: ActionTypes.EVENTS_LOADING
});

export const eventsFailed = (errmess) => ({
    type: ActionTypes.EVENTS_FAILED,
    payload: errmess
});

export const addevents = (catering) => ({
    type: ActionTypes.ADD_EVENTS,
    payload: catering
});

export const fetchEvents = () => (dispatch) => {
    
    dispatch(eventsLoading());

    return fetch(baseUrl + 'events')
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
    .then(response => response.json())
    .then(leaders => dispatch(addevents(leaders)))
    .catch(error => dispatch(eventsFailed(error.message)));
}

/* export const postFeedback = (feedback) => (dispatch) => {
        
    return fetch(baseUrl + 'feedback', {
        method: "POST",
        body: JSON.stringify(feedback),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(response => { console.log('Feedback', response); alert('Thank you for your feedback!\n'+JSON.stringify(response)); })
    .catch(error =>  { console.log('Feedback', error.message); alert('Your feedback could not be posted\nError: '+error.message); });
}; */

/* export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}
  
export const receiveLogin = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token
    }
}
  
export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

export const alsoAdmin = () => {
    return {
        type: ActionTypes.LOG_ADMIN
    }
}

export const loginUser = (creds) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return fetch('/users/login', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json',
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            // If login was successful, set the token in local storage
            localStorage.setItem('token', response.token);
            localStorage.setItem('creds', JSON.stringify(creds));
            if (response.admin) {
                dispatch(alsoAdmin())
            }
            // Dispatch the success action
            dispatch(fetchFavorites());
            dispatch(receiveLogin(response));
        }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(loginError(error.message)))
};

export const requestSign = (creds) => {
    return {
        type: ActionTypes.SIGN_REQUEST,
        creds
    }
}

export const errorSign = (message) => {
    return {
        type: ActionTypes.SIGN_ERROR,
        message
    }
}

export const signUser = (creds) => (dispatch) => {

    dispatch(requestSign(creds))
    return fetch('users/signup', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json',
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    }).then(data => {
        if (data.success) {
            dispatch(loginUser({ username: creds.username, password: creds.password }));
        } else {
            console.error('Server error:', data.error);
            dispatch(errorSign(data.error));
        }
    }).catch(error => {
        console.error('An error occurred:', error);
        dispatch(errorSign(error));
    });
};

export const requestLogout = () => {
    return {
      type: ActionTypes.LOGOUT_REQUEST
    }
}
  
export const receiveLogout = () => {
    return {
      type: ActionTypes.LOGOUT_SUCCESS
    }
}

// Logs the user out
export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    dispatch(favoritesFailed("Error 401: Unauthorized"));
    dispatch(receiveLogout())
} */

