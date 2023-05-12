import {actionTypes} from '../Actions/actionsTypes';

const initialState = {
  loginData: [],
};

export default function loginDataReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_DATA:
      return {...state, ...action.payload};
    default:
      return state;
  }
}
