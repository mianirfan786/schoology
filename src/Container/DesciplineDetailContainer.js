import React, {useEffect, useState} from 'react';
import { DesciplineDetailScreen, TicketDetailScreen } from "../Screens";
import {useDispatch, useSelector} from 'react-redux';
import {getDesciplineRecordDetail} from '../Store/Actions/getDesciplineRecord';
import {useToast} from 'react-native-toast-notifications';
import { Dimensions } from "react-native";

const DesciplineDetailContainer = ({route, navigation}) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const {desciplineId, studentId} = route?.params;
  const loginSelection = useSelector(
    state => state?.loginDataReducer?.loginData,
  );
  const {width, height} = Dimensions.get('window');
  const [loadingFullScreen, setLoadingFullScreen] = useState(false);
  const [desciplineDetailData, setDesciplineDetailData] = useState('');
  // const stateSelection = useSelector(state => state);


  useEffect(() => {
    const formDataDescipline = new FormData();
    formDataDescipline.append('_operation', 'FetchRecord');
    formDataDescipline.append('username', loginSelection?.userEmail);
    formDataDescipline.append('password', loginSelection?.userPassword);
    formDataDescipline.append('module', 'Discipline');
    formDataDescipline.append('portal_type', 'Accounts');
    formDataDescipline.append('studentId', studentId);
    formDataDescipline.append('recordId', desciplineId);

    
    dispatch(
      getDesciplineRecordDetail(
        setLoadingFullScreen,
        formDataDescipline,
        loginSelection?.Authentication,
        toast,
        setDesciplineDetailData
      ),
    );
  }, [desciplineId]);

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <DesciplineDetailScreen
      itemData={desciplineId}
      navigation={navigation}
      handleBack={handleBack}
      loadingFullScreen={loadingFullScreen}
      width={width}
      height={height}
      desciplineDetailData={desciplineDetailData?.record}

    />
  );
};

export default DesciplineDetailContainer;
