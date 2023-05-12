import {actionTypes} from '../Actions/actionsTypes';

const initialState = {
  parentStudentData: [],
};

export default function parentStudentDataReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.PARENT_STUDENT_DATA:
      return {...state, ...action.payload};
    default:
      return state;
  }
}
