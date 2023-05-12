import React, {useState} from 'react';
import { DesciplineScreen, DocumentsScreen } from "../Screens";
import {Dimensions} from 'react-native';
import {useDispatch} from 'react-redux';
import {useToast} from 'react-native-toast-notifications';

const DocumentsContainer = ({navigation}) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const {width, height} = Dimensions.get('window');

  const [loadingFullScreen, setLoadingFullScreen] = useState(false);

  return (
    <DocumentsScreen
      width={width}
      height={height}
      loadingFullScreen={loadingFullScreen}

    />
  );
};

export default DocumentsContainer;
