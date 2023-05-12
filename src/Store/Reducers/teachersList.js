import {actionTypes} from '../Actions/actionsTypes';

const initialState = {
  teacherList: [],
};

export default function teachersListReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.TEACHER_LIST:

      return {...state, ...action.payload};
    default:
      return state;
  }
}
