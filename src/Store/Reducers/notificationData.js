import {actionTypes} from '../Actions/actionsTypes';

const initialState = {
    notificationData: [],
};

export default function notificationDataReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.NOTIFICATION_API:
      return {...state, ...action.payload};
    default:
      return state;
  }
}
