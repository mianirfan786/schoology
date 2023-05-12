import React, {useEffect, useState} from 'react';
import {NAVIGATION_ROUTES} from '../Utils/Navigation/NavigationRoutes';
import {NotificationScreen, ReportScreen} from '../Screens';
import {Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getAnnouncementRecord} from '../Store/Actions/getAnnouncementRecord';
import {useToast} from 'react-native-toast-notifications';
import {getNotification} from '../Store/Actions/getNotification';

const NotificationContainer = ({navigation}) => {
  const parentAndChildDataSelection = useSelector(
    state => state?.parentStudentDataReducer,
  );

  const loginSelection = useSelector(
    state => state?.loginDataReducer?.loginData,
  );

  const notificationSelection = useSelector(
    state => state?.notificationDataReducer?.notificationData,
  );
  console.log('notificationSelection : ', notificationSelection.length);

  const dispatch = useDispatch();
  const toast = useToast();
  const [studentArray, setStudentArray] = useState([]);
  const {width, height} = Dimensions.get('window');

  const [loadingFullScreen, setLoadingFullScreen] = useState(false);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [notificationArray, setNotificationArray] = useState([]);

  const handleViewMore = (reportId, studentId) => {
    // navigation.navigate(NAVIGATION_ROUTES.REPORT_DETAIL);
    // navigation.navigate(NAVIGATION_ROUTES.REPORT_DETAIL, {
    //   reportId: reportId,
    //   studentId: value,
    // });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refreshControlApi();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    setStudentArray([]);
    parentAndChildDataSelection?.parentStudentData?.dataResultStudents?.map(
      item => {
        setStudentArray(prevState => {
          const latestState = [
            ...prevState,
            {
              label: item?.firstname,
              value: item?.contactid,
            },
          ];
          return latestState;
        });
      },
    );
  }, [parentAndChildDataSelection]);

  useEffect(() => {
    const firstData = parentAndChildDataSelection?.parentStudentData;

    if (firstData?.dataResultStudents?.length > 0) {
      const firstFilter =
        parentAndChildDataSelection?.parentStudentData?.dataResultStudents[0]
          ?.contactid;
      setValue(firstFilter);

      debugger;
      const formDataNotification = new FormData();
      formDataNotification.append('_operation', 'FetchRecords');
      formDataNotification.append('module', 'Notification');
      formDataNotification.append('username', loginSelection?.userEmail);
      formDataNotification.append('password', loginSelection?.userPassword);
      formDataNotification.append('portal_type', 'Accounts');

      formDataNotification.append('label', 'Notification');
      formDataNotification.append('page', '0'); //Teacher ID - Please check the Get ticket module teachers name
      formDataNotification.append('pageLimit', '20');
      formDataNotification.append('student_id', firstFilter);
      debugger;
      dispatch(
        getNotification(
          setLoadingFullScreen,
          formDataNotification,
          loginSelection?.Authentication,
          toast,
        ),
      );
    }
  }, [parentAndChildDataSelection, loginSelection]);

  //   const handleSelect = itemValue => {

  //     const formDataReport = new FormData();
  //     formDataReport.append('_operation', 'FetchRelatedRecords');
  //     formDataReport.append('username', loginSelection?.userEmail);
  //     formDataReport.append('password', loginSelection?.userPassword);
  //     formDataReport.append('module', 'Contacts');
  //     formDataReport.append('portal_type', 'Accounts');
  //     formDataReport.append(
  //       'relatedModule',
  //       'MYPReport', //Logedin parent id
  //     );
  //     formDataReport.append('page', '0'); //Teacher ID - Please check the Get ticket module teachers name
  //     formDataReport.append('pageLimit', '10');
  //     formDataReport.append('student_id', itemValue);
  //     formDataReport.append('relatedModuleLabel', 'MYPReport');
  //     formDataReport.append('parentId', itemValue); //Student ID
  //     formDataReport.append('recordId', itemValue); //Student ID

  //     dispatch(
  //       getReportRecord(
  //         setLoadingFullScreen,
  //         formDataReport,
  //         loginSelection?.Authentication,
  //         toast,
  //       ),
  //     );
  //   };

  const refreshControlApi = () => {
    const formDataNotification = new FormData();
    formDataNotification.append('_operation', 'FetchRecords');
    formDataNotification.append('module', 'Notification');
    formDataNotification.append('username', loginSelection?.userEmail);
    formDataNotification.append('password', loginSelection?.userPassword);
    formDataNotification.append('portal_type', 'Accounts');

    formDataNotification.append('label', 'Notification');
    formDataNotification.append('page', '0'); //Teacher ID - Please check the Get ticket module teachers name
    formDataNotification.append('pageLimit', '20');
    formDataNotification.append('student_id', value);

    dispatch(
      getNotification(
        setLoadingFullScreen,
        formDataNotification,
        loginSelection?.Authentication,
        toast,
      ),
    );
  };

  // const response = JSON.parse();
  // const response =
  //   '{&quot;modifiedBy&quot;:&quot;Waleed Magdy&quot;,&quot;recordStatus&quot;:&quot;Updated&quot;,&quot;moduleName&quot;:&quot;Tickets - Test&quot;}';
  // const response = notificationSelection[0]?.notejson;
  //
  // const decodedResponse = response.replace(/&quot;/g, '"');
  // const responseObject = JSON.parse(decodedResponse);
  //
  // notificationSelection?.map((data) => {
  //   setNotificationArray([{accountid: data?.accountid}]);
  // });

  // notificationSelection[0]?.notejson
  // console.log(decodedResponse, 'RESPPPP_______', responseObject);

  useEffect(() => {
    debugger;
    const notifications = [];
    if (notificationSelection?.length > 0) {
      // console.log('notification slection: ' , notificationSelection);
      notificationSelection?.forEach(data => {
        const decodedResponse = data?.notejson?.replace(/&quot;/g, '"');
        if (decodedResponse) {
          const responseObject = JSON.parse(decodedResponse);
          console.log('notifiSelection: ', data?.datetime);
          let notification = {
            accountid: data?.accountid,
            relatedid: data?.relatedid,
            status: data?.status,
            module: data?.module,
            contact_id: data?.contact_id,
            datetime: data?.datetime,
            notejson: responseObject,
          };
          notifications.push(notification);
        }
      });
    }
    setNotificationArray(notifications);
    // setNotificationArray(prevNotifications => [...prevNotifications, ...notifications])
    // setNotificationArray(prevNotifications => [...prevNotifications, ...notifications])
  }, [notificationSelection]);
  const handleJson = ({text}) => {
    debugger;
    const decodedResponse = text.replace(/&quot;/g, '"');
    const responseObject = JSON.parse(decodedResponse);
    return responseObject;
  };

  return (
    <NotificationScreen
      navigation={navigation}
      width={width}
      height={height}
      handleViewMore={handleViewMore}
      notificationArray={notificationArray}
      loadingFullScreen={loadingFullScreen}
      notificationSelection={notificationSelection}
      refreshing={refreshing}
      onRefresh={onRefresh}
      handleJson={handleJson}
    />
  );
};

export default NotificationContainer;
