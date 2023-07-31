import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseurl';

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {           //why use dispatch thunk

    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    };
    newComment.date = new Date().toISOString();
    
    return fetch(baseUrl + 'comments', {
        method: "POST",
        body: JSON.stringify(newComment),
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
    .then(response => dispatch(addComment(response)))
    .catch(error =>  { console.log('post comments', error.message);
     alert('Your comment could not be posted\nError: '+error.message); });
};

export const postFeedback = (firstname, lastname, telnum, email, agree, contactType, message, id) => {           //why use dispatch thunk

    const newFeedback = {
        firstname: firstname,
        lastname: lastname,
        telnum: telnum,
        email: email,
        agree: agree,
        contactType: contactType,
        message: message,
        id: id
    };
    newFeedback.date = new Date().toISOString();
    
    return fetch(baseUrl + 'feedback', {
        method: "POST",
        body: JSON.stringify(newFeedback),
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
    .catch(error =>  { console.log('post feedback', error.message);
     alert('Your feedback could not be posted\nError: '+error.message); });
};
                                                        //check out export const
export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));
    
    return fetch(baseUrl + 'dishes')
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            throw error
        }
    },
    error => {
        var errmess = new Error(error.message)
        throw errmess;
    })
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(error => dispatch(dishesFailed(error.message)))
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
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            throw error
        }
    },
    error => {
        var errmess = new Error(error.message)
        throw errmess;
    })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromos = () => (dispatch) => {
    
    dispatch(promosLoading());

    return fetch(baseUrl + 'promotions')
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            throw error
        }
    },
    error => {
        var errmess = new Error(error.message)
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
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            throw error
        }
    },
    error => {
        var errmess = new Error(error.message)
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

export const fetchContents = () => (dispatch) => {
    
    dispatch(contentsLoading());

    return fetch(baseUrl + 'contents')
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            throw error
        }
    },
    error => {
        var errmess = new Error(error.message)
        throw errmess;
    })
    .then(response => response.json())
    .then(contents => dispatch(addContents(contents)))
    .catch(error => dispatch(contentsFailed(error.message)));
}

export const contentsLoading = () => ({
    type: ActionTypes.CONTENTS_LOADING
});

export const contentsFailed = (errmess) => ({
    type: ActionTypes.CONTENTS_FAILED,
    payload: errmess
});

export const addContents = (contents) => ({
    type: ActionTypes.ADD_CONTENTS,
    payload: contents
});

export const fetchMovies = () => (dispatch) => {
    
    dispatch(moviesLoading());

    return fetch(baseUrl + 'movies')
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            throw error
        }
    },
    error => {
        var errmess = new Error(error.message)
        throw errmess;
    })
    .then(response => response.json())
    .then(movies => dispatch(addMovies(movies)))
    .catch(error => dispatch(moviesFailed(error.message)));
}

export const moviesLoading = () => ({
    type: ActionTypes.MOVIES_LOADING
});

export const moviesFailed = (errmess) => ({
    type: ActionTypes.MOVIES_FAILED,
    payload: errmess
});

export const addMovies = (movies) => ({
    type: ActionTypes.ADD_MOVIES,
    payload: movies
});

export const postReviews = (dishId, rating, author, comment) => (dispatch) => {           //why use dispatch thunk

    const newReviews = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    };
    newReviews.date = new Date().toISOString();
    
    return fetch(baseUrl + 'reviews', {
        method: "POST",
        body: JSON.stringify(newReviews),
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
    .then(response => dispatch(addReviews(response)))
    .catch(error =>  { console.log('post reviews', error.message);
     alert('Your review could not be posted\nError: '+ error.message); });
};

export const fetchReviews = () => (dispatch) => {    
    return fetch(baseUrl + 'reviews')
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            throw error
        }
    },
    error => {
        var errmess = new Error(error.message)
        throw errmess;
    })
    .then(response => response.json())
    .then(reviews => dispatch(addReviews(reviews)))
    .catch(error => dispatch(reviewsFailed(error.message)));
};

export const reviewsFailed = (errmess) => ({
    type: ActionTypes.REVIEWS_FAILED,
    payload: errmess
});

export const addReviews = (reviews) => ({
    type: ActionTypes.ADD_REVIEWS,
    payload: reviews
});

export const fetchFeatured = () => (dispatch) => {
    
     return fetch(baseUrl + 'features')
    .then(response => {
        if (response.ok) {
            return response;
        }
    })
    .then(response => response.json())
    .then(featured => dispatch(addFeatured(featured)));
};

export const addFeatured = (featured) => ({
    type: ActionTypes.ADD_FEATURES,
    payload: featured
});