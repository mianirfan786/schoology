import React, {useEffect, useState} from 'react';
import {NAVIGATION_ROUTES} from '../Utils/Navigation/NavigationRoutes';
import {AnnouncementScreen, DesciplineScreen} from '../Screens';
import {Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getTicketsAction} from '../Store/Actions/getTicketsAction';
import {getDesciplineRecord} from '../Store/Actions/getDesciplineRecord';

import desciplineDataReducer from '../Store/Reducers/desciplineData';
import {useToast} from 'react-native-toast-notifications';
import {getAnnouncementRecord} from '../Store/Actions/getAnnouncementRecord';

const AnnouncementContainer = ({navigation}) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const parentAndChildDataSelection = useSelector(
    state => state?.parentStudentDataReducer,
  );

  const loginSelection = useSelector(
    state => state?.loginDataReducer?.loginData,
  );

  const announcementDataSelection = useSelector(
    state => state?.announcementDataReducer,
  );

  const {width, height} = Dimensions.get('window');

  const [loadingFullScreen, setLoadingFullScreen] = useState(false);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [studentArray, setStudentArray] = useState([]);
  const [recordAnnouncement, setRecordAnnouncement] = useState([1]);
  const [refreshing, setRefreshing] = React.useState(false);

  const [pageLimitData, setPageLimitData] = React.useState(0);

  const [dataSave, setDataSave] = React.useState([]);
  const [dataCount, setDataCount] = React.useState(null);

  // useEffect(() => {
  //   setRecordAnnouncement([]);

  //   if (announcementDataSelection?.length > 0) {
  //     announcementDataSelection?.pop();
  //     setRecordAnnouncement(announcementDataSelection);
  //   } else {
  //     setRecordAnnouncement([]);
  //   }
  // }, [announcementDataSelection]);


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refreshControlApi();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);


  // console.log("recordAnnountcement_______", recordAnnouncement?.announcementData);

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

      const formDataAnnouncement = new FormData();
      formDataAnnouncement.append('_operation', 'FetchRelatedRecords');
      formDataAnnouncement.append('username', loginSelection?.userEmail);
      formDataAnnouncement.append('password', loginSelection?.userPassword);
      formDataAnnouncement.append('module', 'Contacts');
      formDataAnnouncement.append('portal_type', 'Accounts');
      formDataAnnouncement.append(
        'relatedModule',
        'Emails', //Logedin parent id
      );
      formDataAnnouncement.append('page', '0'); //Teacher ID - Please check the Get ticket module teachers name
      formDataAnnouncement.append('pageLimit', '10');
      formDataAnnouncement.append('student_id', firstFilter);
      formDataAnnouncement.append('relatedModuleLabel', 'Emails');
      formDataAnnouncement.append('parentId', firstFilter); //Student ID
      formDataAnnouncement.append('recordId', firstFilter); //Student ID
      const pageCheck = 0;
      dispatch(
        getAnnouncementRecord(
          setLoadingFullScreen,
          formDataAnnouncement,
          loginSelection?.Authentication,
          toast,
          setDataSave,
          dataSave,
          setDataCount,
          pageCheck
        ),
      );
    }
  }, [parentAndChildDataSelection, loginSelection]);

  const handleSelectStudent = itemValue => {
    setDataSave([]);
    const formDataAnnouncement = new FormData();
    formDataAnnouncement.append('_operation', 'FetchRelatedRecords');
    formDataAnnouncement.append('username', loginSelection?.userEmail);
    formDataAnnouncement.append('password', loginSelection?.userPassword);
    formDataAnnouncement.append('module', 'Contacts');
    formDataAnnouncement.append('portal_type', 'Accounts');
    formDataAnnouncement.append(
      'relatedModule',
      'Emails', //Logedin parent id
    );
    formDataAnnouncement.append('page', '0'); //Teacher ID - Please check the Get ticket module teachers name
    formDataAnnouncement.append('pageLimit', '10');
    formDataAnnouncement.append('student_id', itemValue);
    formDataAnnouncement.append('relatedModuleLabel', 'Emails');
    formDataAnnouncement.append('parentId', itemValue); //Student ID
    formDataAnnouncement.append('recordId', itemValue); //Student ID

    const pageCheck = 0;

    dispatch(
      getAnnouncementRecord(
        setLoadingFullScreen,
        formDataAnnouncement,
        loginSelection?.Authentication,
        toast,
        setDataSave,
          dataSave,
          setDataCount,
          pageCheck
          

      ),
    );
  };

  const handleViewMore = (studentId, announcementId) => {

console.log(recordAnnouncement, "dffasfds=+++++++++");
    navigation.navigate(NAVIGATION_ROUTES.ANNOUNCEMENT_DETAIL, {
      announcementId: announcementId,
      studentId: studentId,
    });
  };





  const refreshControlApi = ()=>{
    console.log("call refres cn");
    setDataSave([]);
    const formDataAnnouncement = new FormData();
    formDataAnnouncement.append('_operation', 'FetchRelatedRecords');
    formDataAnnouncement.append('username', loginSelection?.userEmail);
    formDataAnnouncement.append('password', loginSelection?.userPassword);
    formDataAnnouncement.append('module', 'Contacts');
    formDataAnnouncement.append('portal_type', 'Accounts');
    formDataAnnouncement.append(
      'relatedModule',
      'Emails', //Logedin parent id
    );
    formDataAnnouncement.append('page', '0'); //Teacher ID - Please check the Get ticket module teachers name
    formDataAnnouncement.append('pageLimit', '10');
    formDataAnnouncement.append('student_id', value);
    formDataAnnouncement.append('relatedModuleLabel', 'Emails');
    formDataAnnouncement.append('parentId', value); //Student ID
    formDataAnnouncement.append('recordId', value); //Student ID

    const pageCheck = 0;
    dispatch(
      getAnnouncementRecord(
        setLoadingFullScreen,
        formDataAnnouncement,
        loginSelection?.Authentication,
        toast,
        setDataSave,
        dataSave,
        setDataCount,
        pageCheck
      ),
    );
    

  }




  console.log(
    announcementDataSelection,
    'annountcent detail data selection++++++++++',
  );

  const LoadRandomData = (pageNumberData) => {

    const formDataAnnouncement = new FormData();
    formDataAnnouncement.append('_operation', 'FetchRelatedRecords');
    formDataAnnouncement.append('username', loginSelection?.userEmail);
    formDataAnnouncement.append('password', loginSelection?.userPassword);
    formDataAnnouncement.append('module', 'Contacts');
    formDataAnnouncement.append('portal_type', 'Accounts');
    formDataAnnouncement.append(
      'relatedModule',
      'Emails', //Logedin parent id
    );
    formDataAnnouncement.append('page', pageNumberData); //Teacher ID - Please check the Get ticket module teachers name
    formDataAnnouncement.append('pageLimit', '10');
    formDataAnnouncement.append('student_id', value);
    formDataAnnouncement.append('relatedModuleLabel', 'Emails');
    formDataAnnouncement.append('parentId', value); //Student ID
    formDataAnnouncement.append('recordId', value); //Student ID

    dispatch(
      getAnnouncementRecord(
        setLoadingFullScreen,
        formDataAnnouncement,
        loginSelection?.Authentication,
        toast,
        setDataSave,
        setDataCount,
        dataSave
      ),
    );


  }

  const LoadMoreRandomData = () =>{
    // console.log("callDone")
    if(dataSave?.length === dataCount){
      // toast.show('No Record Found!!!', {type: 'Success'});
    }else{
    setPageLimitData(pageLimitData + 1);
    LoadRandomData(pageLimitData + 1);
  }
    }


    

    // console.log(dataSave, "++++++++++++++DATAASACE");

  return (
    <AnnouncementScreen
      studentArray={studentArray}
      width={width}
      height={height}
      isFocus={isFocus}
      setIsFocus={setIsFocus}
      setValue={setValue}
      value={value}
      navigation={navigation}
      handleViewMore={handleViewMore}
      loadingFullScreen={loadingFullScreen}
      desciptionDataSelection={announcementDataSelection?.dataFirst}
      recordAnnouncement={dataSave}
      handleSelectStudent={handleSelectStudent}
      refreshing={refreshing}
      onRefresh={onRefresh}
      LoadMoreRandomData={LoadMoreRandomData}

    />
  );
};

export default AnnouncementContainer;
