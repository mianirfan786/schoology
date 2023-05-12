import {actionTypes} from '../Actions/actionsTypes';

const initialState = {
  ticketsData: [],
};

export default function ticketsDataReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.TICKETS_DATA:

      return {...state, ...action.payload};
    default:
      return state;
  }
}
