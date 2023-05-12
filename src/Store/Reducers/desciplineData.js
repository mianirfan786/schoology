import {actionTypes} from '../Actions/actionsTypes';

const initialState = {
  desciplineData: [],
};

export default function desciplineDataReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.DESCIPLINE_LIST:
      return {...state, ...action.payload};
    default:
      return state;
  }
}
