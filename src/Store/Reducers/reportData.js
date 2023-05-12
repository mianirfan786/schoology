import {actionTypes} from '../Actions/actionsTypes';

const initialState = {
  reportData: [],
};

export default function reportDataReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.REPORT_LIST:
      return {...state, ...action.payload};
    default:
      return state;
  }
}
