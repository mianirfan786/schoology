import React, {useEffect} from 'react';
import AuthNavigator from './src/Utils/Navigation/routes';
import {ToastProvider} from 'react-native-toast-notifications';
import {getProfileAction} from './src/Store/Actions/submitLoginAction';
import {useDispatch} from 'react-redux';
import base64 from 'react-native-base64';
import DownloadFile from './TestingComponent/DownloadFile';

const App = () => {
  return (
    <ToastProvider offsetTop={80}>
      {/*<DownloadFile/>*/}

      <AuthNavigator />
    </ToastProvider>
  );
};

export default App;
