import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

// favorites
export const postFavorite = (lapId) => (dispatch) => {
  dispatch(addFavorite(lapId));
};
const addFavorite = (lapId) => ({
  type: ActionTypes.ADD_FAVORITE,
  payload: lapId
});
export const deleteFavorite = (lapId) => ({
  type: ActionTypes.DELETE_FAVORITE,
  payload: lapId
});

// leaders
export const fetchLeaders = () => (dispatch) => {
  dispatch(leadersLoading());
  return fetch(baseUrl + 'leaders')
    .then((response) => {
      if (!response.ok) throw Error('Error ' + response.status + ': ' + response.statusText);
      else return response.json();
    })
    .then((leaders) => dispatch(addLeaders(leaders)))
    .catch((error) => dispatch(leadersFailed(error.message)));
};
const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING
});
const leadersFailed = (errmess) => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errmess
});
const addLeaders = (leaders) => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders
});

// comments
export const fetchComments = () => (dispatch) => {
  return fetch(baseUrl + 'comments')
    .then((response) => {
      if (!response.ok) throw Error('Error ' + response.status + ': ' + response.statusText);
      else return response.json();
    })
    .then((comments) => dispatch(addComments(comments)))
    .catch((error) => dispatch(commentsFailed(error.message)));
};
const commentsFailed = (errmess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errmess
});
const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments
});

//comment
export const postComment = (lapId, rating, author, comment) => (dispatch) => {
  var newcmt = { lapId: lapId, rating: rating, author: author, comment: comment, date: new Date().toISOString() };
  fetch(baseUrl + 'comments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newcmt)
  }).then((response) => {
    if (!response.ok) throw Error('Error ' + response.status + ': ' + response.statusText);
    else return response.json();
  })
    .then((cmt) => dispatch(addComment(cmt)))
    .catch((error) => dispatch(commentsFailed(error.message)));
};
const addComment = (newcmt) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: newcmt
});

// promotions
export const fetchPromos = () => (dispatch) => {
  dispatch(promosLoading());
  return fetch(baseUrl + 'promotions')
    .then((response) => {
      if (!response.ok) throw Error('Error ' + response.status + ': ' + response.statusText);
      else return response.json();
    })
    .then((promos) => dispatch(addPromos(promos)))
    .catch((error) => dispatch(promosFailed(error.message)));
};
const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING
});
const promosFailed = (errmess) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errmess
});
const addPromos = (promos) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos
});
// users
export const loginUser = (userinfo) => ({
  type: ActionTypes.LOGIN_USER,
  payload: userinfo
});
export const logoutUser = () => ({
  type: ActionTypes.LOGOUT_USER,
  payload: null
});
// laptops
export const fetchLaptops = () => (dispatch) => {
  dispatch(laptopsLoading());
  return fetch(baseUrl + 'laptops')
    .then((response) => {
      if (!response.ok) throw Error('Error ' + response.status + ': ' + response.statusText);
      else return response.json();
    })
    .then((laptops) => dispatch(addLaptops(laptops)))
    .catch((error) => dispatch(laptopsFailed(error.message)));
};
const laptopsLoading = () => ({
  type: ActionTypes.LAPTOPS_LOADING
});
const laptopsFailed = (errmess) => ({
  type: ActionTypes.LAPTOPS_FAILED,
  payload: errmess
});
const addLaptops = (laptops) => ({
  type: ActionTypes.ADD_LAPTOPS,
  payload: laptops
});
