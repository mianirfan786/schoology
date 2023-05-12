import React, {useEffect, useState} from 'react';
import {NAVIGATION_ROUTES} from '../Utils/Navigation/NavigationRoutes';
import {AnnouncementScreen, DesciplineScreen} from '../Screens';
import {Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getTicketsAction} from '../Store/Actions/getTicketsAction';
import {getDesciplineRecord} from '../Store/Actions/getDesciplineRecord';

import desciplineDataReducer from '../Store/Reducers/desciplineData';
import {useToast} from 'react-native-toast-notifications';

const DesciplineContainer = ({navigation}) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const parentAndChildDataSelection = useSelector(
    state => state?.parentStudentDataReducer,
  );

  const loginSelection = useSelector(
    state => state?.loginDataReducer?.loginData,
  );

  const desciptionDataSelection = useSelector(
    state => state?.desciplineDataReducer?.desciplineData,
  );

  const {width, height} = Dimensions.get('window');

  const [loadingFullScreen, setLoadingFullScreen] = useState(false);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [studentArray, setStudentArray] = useState([]);
  const [recordsDescipline, setRecordsDescipline] = useState([1]);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    setRecordsDescipline([]);
debugger;
    if (desciptionDataSelection?.dataCount > 0) {
       desciptionDataSelection?.dataResultStudents?.pop();
      setRecordsDescipline(desciptionDataSelection?.dataResultStudents);
    } else {
      setRecordsDescipline([]);
    }
  }, [desciptionDataSelection]);
  


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

      const formDataDescipline = new FormData();
      formDataDescipline.append('_operation', 'FetchRelatedRecords');
      formDataDescipline.append('username', loginSelection?.userEmail);
      formDataDescipline.append('password', loginSelection?.userPassword);
      formDataDescipline.append('module', 'Contacts');
      formDataDescipline.append('portal_type', 'Accounts');
      formDataDescipline.append(
        'relatedModule',
        'Discipline', //Logedin parent id
      );
      formDataDescipline.append('page', '0'); //Teacher ID - Please check the Get ticket module teachers name
      formDataDescipline.append('pageLimit', '10');
      formDataDescipline.append('student_id', firstFilter);
      formDataDescipline.append('relatedModuleLabel', 'Discipline');
      formDataDescipline.append('parentId', firstFilter); //Student ID
      formDataDescipline.append('recordId', firstFilter); //Student ID

      dispatch(
        getDesciplineRecord(
          setLoadingFullScreen,
          formDataDescipline,
          loginSelection?.Authentication,
          toast,
        ),
      );
    }
  }, [parentAndChildDataSelection, loginSelection]);

  const handleSelectStudent = itemValue => {
    const formDataDescipline = new FormData();
    formDataDescipline.append('_operation', 'FetchRelatedRecords');
    formDataDescipline.append('username', loginSelection?.userEmail);
    formDataDescipline.append('password', loginSelection?.userPassword);
    formDataDescipline.append('module', 'Contacts');
    formDataDescipline.append('portal_type', 'Accounts');
    formDataDescipline.append(
      'relatedModule',
      'Discipline', //Logedin parent id
    );
    formDataDescipline.append('page', '0'); //Teacher ID - Please check the Get ticket module teachers name
    formDataDescipline.append('pageLimit', '10');
    formDataDescipline.append('student_id', itemValue);
    formDataDescipline.append('relatedModuleLabel', 'Discipline');
    formDataDescipline.append('parentId', itemValue); //Student ID
    formDataDescipline.append('recordId', itemValue); //Student ID

    dispatch(
      getDesciplineRecord(
        setLoadingFullScreen,
        formDataDescipline,
        loginSelection?.Authentication,
        toast,
      ),
    );
  };

  const handleViewMore = (id, stdId) => {

    navigation.navigate(NAVIGATION_ROUTES.DESCIPLINE_DETAIL, {
      desciplineId: id,
      studentId: stdId,
    });
  };





  const refreshControlApi = () => {
    const formDataDescipline = new FormData();
      formDataDescipline.append('_operation', 'FetchRelatedRecords');
      formDataDescipline.append('username', loginSelection?.userEmail);
      formDataDescipline.append('password', loginSelection?.userPassword);
      formDataDescipline.append('module', 'Contacts');
      formDataDescipline.append('portal_type', 'Accounts');
      formDataDescipline.append(
        'relatedModule',
        'Discipline', //Logedin parent id
      );
      formDataDescipline.append('page', '0'); //Teacher ID - Please check the Get ticket module teachers name
      formDataDescipline.append('pageLimit', '10');
      formDataDescipline.append('student_id', value);
      formDataDescipline.append('relatedModuleLabel', 'Discipline');
      formDataDescipline.append('parentId', value); //Student ID
      formDataDescipline.append('recordId', value); //Student ID

      dispatch(
        getDesciplineRecord(
          setLoadingFullScreen,
          formDataDescipline,
          loginSelection?.Authentication,
          toast,
        ),
      );
    

  }




  return (
    <DesciplineScreen
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
      desciptionDataSelection={desciptionDataSelection?.dataFirst}
      recordsDescipline={recordsDescipline}
      handleSelectStudent={handleSelectStudent}
      refreshing={refreshing}
      onRefresh={onRefresh}

    />
  );
};

export default DesciplineContainer;
