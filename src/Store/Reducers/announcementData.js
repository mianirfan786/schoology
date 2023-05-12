import {actionTypes} from '../Actions/actionsTypes';

const initialState = {
  announcementData: [],
};

export default function announcementDataReducer(state = initialState,  action) {
  switch (action.type) {
    case actionTypes.ANNOUNCEMENT_LIST:
      debugger;
      console.log(action.payload, state, "actionpayload data")
      const dataA = action?.payload?.announcementData;
      return {...state, ...dataA};
    default:
      return state;
  }
}
