import React, { useState } from 'react';
import { CalendarScreen } from '../Screens';
import { Dimensions, Linking, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { useToast } from 'react-native-toast-notifications';

const CalendarContainer = ({ navigation }) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const { width, height } = Dimensions.get('window');

  const [loadingFullScreen, setLoadingFullScreen] = useState(false);
  const supportedURL = 'https://teamup.com/ks1rqqbvzm3y6jehn6';

  const handleOpenUrl = async () => {
    await Linking.openURL(supportedURL);
  };
  return (
    <CalendarScreen
      width={width}
      height={height}
      loadingFullScreen={loadingFullScreen}
      handleOpenUrl={handleOpenUrl}
    />
  );
};

export default CalendarContainer;
