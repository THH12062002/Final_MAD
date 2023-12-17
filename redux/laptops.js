import * as ActionTypes from './ActionTypes';

export const laptops = (state = { isLoading: true, errMess: null, laptops: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_LAPTOPS:
      return { ...state, isLoading: false, errMess: null, laptops: action.payload };
    case ActionTypes.LAPTOPS_LOADING:
      return { ...state, isLoading: true, errMess: null, laptops: [] }
    case ActionTypes.LAPTOPS_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };
    default:
      return state;
  }
};