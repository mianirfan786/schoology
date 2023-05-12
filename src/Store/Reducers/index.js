import {combineReducers} from 'redux';
import profileDataReducer from './profileData';
import loginDataReducer from './loginData';
import ticketsDataReducer from './ticketsData';
import parentStudentDataReducer from './parentStudentData';
import teachersListReducer from './teachersList';
import desciplineDataReducer from './desciplineData';
import announcementDataReducer from './announcementData';
import reportDataReducer from "./reportData";
import notificationDataReducer from "./notificationData";

const rootReducer = combineReducers({
  profileDataReducer: profileDataReducer,
  loginDataReducer: loginDataReducer,
  ticketsDataReducer: ticketsDataReducer,
  parentStudentDataReducer: parentStudentDataReducer,
  teachersListReducer: teachersListReducer,
  desciplineDataReducer: desciplineDataReducer,
  announcementDataReducer: announcementDataReducer,
  reportDataReducer: reportDataReducer,
  notificationDataReducer:notificationDataReducer,
});
export default rootReducer;
