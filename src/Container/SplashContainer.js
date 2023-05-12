import React, {useState} from 'react';
import { DocumentsScreen, SplashScreen } from "../Screens";
import {Dimensions} from 'react-native';
import { NAVIGATION_ROUTES } from '../Utils/Navigation/NavigationRoutes';

const SplashContainer = ({navigation}) => {
  const {width, height} = Dimensions.get('window');

  const handleNavigation= () => {
    navigation.navigate(NAVIGATION_ROUTES.LOGIN_SCREEN_ROUTE);
  }
  return (
    <SplashScreen
      width={width}
      height={height}
      handleNavigation={handleNavigation}
    
    />
  );
};

export default SplashContainer;
