import React, { useRef, useState } from 'react';
import { LoginScreen } from '../Screens';
import { useDispatch } from 'react-redux';
import { useToast } from 'react-native-toast-notifications';
import base64 from 'react-native-base64';
import {
  getForgetAction,
  submitLoginAction,
} from '../Store/Actions/submitLoginAction';
import { Dimensions } from 'react-native';
import * as yup from 'yup';

const LoginContainer = ({ navigation }) => {
  const dispatch = useDispatch();
  const forgetValidationSchema = yup.object().shape({
    email: yup
      .string()
      .required('Email is Required')
      .email('Please Enter Correct Email'),
  });

  const toast = useToast();
  const refRBSheetForget = useRef();
  const { width, height } = Dimensions.get('window');
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingForget, setLoadingforget] = useState(false);
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  // const [loginData, setLoginData] = useState({
  //   email: 'Mohamed.adel@notion-edu.com',
  //   password: 'w1fzr04t',
  // });
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    // email: 'codeebrain@gmail.com',
    // password: 'exi0eg5c',
  });
  const handleOnChange = (eventText, eventState) => {
    if (eventState === 'email') {
      setLoginData({ email: eventText, password: loginData.password });
    } else if (eventState === 'password') {
      setLoginData({ email: loginData.email, password: eventText });
    }
  };

  const handleForget = (values) => {
    let Authentication = 'Basic ' + base64.encode(`${values?.email}:`);

    const formDataForget = new FormData();
    formDataForget.append('_operation', 'ForgotPassword');
    formDataForget.append('email', values?.email);
    formDataForget.append('portal_type', 'Accounts');
    dispatch(
      getForgetAction(
        setLoadingforget,
        formDataForget,
        Authentication,
        toast,
        refRBSheetForget
      )
    );
  };
  const openSheetForget = () => {
    refRBSheetForget.current.open();
  };

  const handleSubmitLogin = () => {
    if (loginData?.email === '') {
      setErrorEmail('Please Enter your email');
      setErrorPassword('');
    } else if (loginData?.password === '') {
      setErrorEmail('');
      setErrorPassword('Please Enter your password');
    } else {
      setErrorEmail('');
      setErrorPassword('');
      let Authentication =
        'Basic ' + base64.encode(`${loginData?.email}:${loginData?.password}`);

      const formData = new FormData();
      formData.append('_operation', 'Ping');
      formData.append('username', loginData?.email);
      formData.append('password', loginData?.password);
      formData.append('portal_type', 'Accounts');
      dispatch(
        submitLoginAction(
          setLoadingLogin,
          Authentication,
          formData,
          toast,
          navigation,
          loginData?.email,
          loginData?.password
        )
      );
    }
  };
  return (
    <LoginScreen
      navigation={navigation}
      loadingLogin={loadingLogin}
      handleOnChange={handleOnChange}
      handleSubmitLogin={handleSubmitLogin}
      loginData={loginData}
      errorEmail={errorEmail}
      errorPassword={errorPassword}
      handleForget={handleForget}
      refRBSheetForget={refRBSheetForget}
      width={width}
      height={height}
      openSheetForget={openSheetForget}
      forgetValidationSchema={forgetValidationSchema}
      loadingForget={loadingForget}
    />
  );
};

export default LoginContainer;
