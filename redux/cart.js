import * as ActionTypes from './ActionTypes';

export const cart = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.ADD_CART:
      if (state.some((el) => el === action.payload))
        return state;
      else
        return state.concat(action.payload);
    default:
      return state;
    case ActionTypes.DELETE_CART:
      return state.filter((cart) => cart !== action.payload);
  }
};