import {actionTypes} from '../Actions/actionsTypes';

const initialState = {
  profileData: [],
};

export default function profileDataReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.PROFILE_DATA:

      return {...state, ...action.payload};
    default:
      return state;
  }
}
