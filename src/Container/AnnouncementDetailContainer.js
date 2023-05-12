import React, {useEffect, useState} from 'react';
import { AnnouncementDetailScreen, DesciplineDetailScreen, TicketDetailScreen } from "../Screens";
import {useDispatch, useSelector} from 'react-redux';
import {getDesciplineRecordDetail} from '../Store/Actions/getDesciplineRecord';
import {useToast} from 'react-native-toast-notifications';
import { Dimensions } from "react-native";
import { getAnnouncementRecordDetail } from "../Store/Actions/getAnnouncementRecord";

const AnnouncementDetailContainer = ({route, navigation}) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const {announcementId, studentId} = route?.params;
  const loginSelection = useSelector(
    state => state?.loginDataReducer?.loginData,
  );
  const {width, height} = Dimensions.get('window');
  const [loadingFullScreen, setLoadingFullScreen] = useState(false);
  const [announcementDetail, setAnnouncementDetail] = useState('');
  console.log(announcementId, studentId, 'params data');

  useEffect(() => {
    debugger
    const formDataAnnouncement = new FormData();
    formDataAnnouncement.append('_operation', 'FetchRecord');
    formDataAnnouncement.append('username', loginSelection?.userEmail);
    formDataAnnouncement.append('password', loginSelection?.userPassword);
    formDataAnnouncement.append('module', 'Emails');
    formDataAnnouncement.append('portal_type', 'Accounts');
    formDataAnnouncement.append('parentId', studentId);
    formDataAnnouncement.append('student_id', studentId);
    formDataAnnouncement.append('recordId', announcementId);

    dispatch(
      getAnnouncementRecordDetail(
        setLoadingFullScreen,
        formDataAnnouncement,
        loginSelection?.Authentication,
        toast,
        setAnnouncementDetail
      ),
    );
  }, [announcementId]);

  const handleBack = () => {
    navigation.goBack();
  };

  console.log(announcementDetail, "afsd-_______________")
  return (
    <AnnouncementDetailScreen
      itemData={announcementId}
      navigation={navigation}
      handleBack={handleBack}
      loadingFullScreen={loadingFullScreen}
      width={width}
      height={height}
      announcementDetail={announcementDetail}

    />
  );
};

export default AnnouncementDetailContainer;
