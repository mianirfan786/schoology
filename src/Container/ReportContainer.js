import React, {useEffect, useState} from 'react';
import {NAVIGATION_ROUTES} from '../Utils/Navigation/NavigationRoutes';
import {ReportScreen} from '../Screens';
import {Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getAnnouncementRecord} from '../Store/Actions/getAnnouncementRecord';
import {useToast} from 'react-native-toast-notifications';
import {getReportRecord} from '../Store/Actions/getReportRecord';

const ReportContainer = ({navigation}) => {
  const parentAndChildDataSelection = useSelector(
    state => state?.parentStudentDataReducer,
  );

  const loginSelection = useSelector(
    state => state?.loginDataReducer?.loginData,
  );

  const reportSelection = useSelector(
    state => state?.reportDataReducer?.reportData,
  );

  const dispatch = useDispatch();
  const toast = useToast();
  const [studentArray, setStudentArray] = useState([]);
  const {width, height} = Dimensions.get('window');

  const [loadingFullScreen, setLoadingFullScreen] = useState(false);
  const [value, setValue] = useState(null);
  const [valueGrade, setValueGrade] = useState('MYPReport');
  const [isFocus, setIsFocus] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const [pageNumber, setPageNumber] = React.useState(0);

  const [dataSave, setDataSave] = React.useState([]);
  const [dataCount, setDataCount] = React.useState(null);

  const handleViewMore = (reportId, studentId) => {
    // navigation.navigate(NAVIGATION_ROUTES.REPORT_DETAIL);

    navigation.navigate(NAVIGATION_ROUTES.REPORT_DETAIL, {
      reportId: reportId,
      studentId: value,
      grade: valueGrade,
    });
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
              grade: item?.grade,
            },
          ];
          return latestState;
        });
      },
    );
  }, [parentAndChildDataSelection]);

  useEffect(() => {
    const firstData = parentAndChildDataSelection?.parentStudentData;
    debugger;

    if (firstData?.dataResultStudents?.length > 0) {
      const firstFilter =
        parentAndChildDataSelection?.parentStudentData?.dataResultStudents[0]
          ?.contactid;
      const firstFilterNew =
        parentAndChildDataSelection?.parentStudentData?.dataResultStudents[0]
          ?.grade;

      if (firstFilterNew?.includes('MYP')) {
        setValueGrade('MYPReport');
        const reportModule = 'MYPReport';
      } else if (firstFilterNew?.includes('PYP')) {
        setValueGrade('GradeBook');
      }

      setValue(firstFilter);

      const formDataReport = new FormData();
      formDataReport.append('_operation', 'FetchRelatedRecords');
      formDataReport.append('username', loginSelection?.userEmail);
      formDataReport.append('password', loginSelection?.userPassword);
      formDataReport.append('module', 'Contacts');
      formDataReport.append('portal_type', 'Accounts');
      formDataReport.append(
        'relatedModule',
        firstFilterNew?.includes('MYP')
          ? 'MYPReport'
          : firstFilterNew?.includes('PYP')
          ? 'GradeBook'
          : 'MYPReport', //Logedin parent id
      );
      formDataReport.append('page', '0'); //Teacher ID - Please check the Get ticket module teachers name
      formDataReport.append('pageLimit', '10');
      formDataReport.append('student_id', firstFilter);
      formDataReport.append('relatedModuleLabel', 'MYPReport');
      formDataReport.append('parentId', firstFilter); //Student ID
      formDataReport.append('recordId', firstFilter); //Student ID
      const pageCheck = 0;
      dispatch(
        getReportRecord(
          setLoadingFullScreen,
          formDataReport,
          loginSelection?.Authentication,
          toast,
          setDataSave,
          dataSave,
          setDataCount,
          pageCheck,
        ),
      );
    }
  }, [parentAndChildDataSelection, loginSelection]);

  // setStudentArray(data);

  const handleSelect = (itemValue, gradeValue) => {
    debugger;
    if (gradeValue?.includes('MYP')) {
      setValueGrade('MYPReport');
    } else if (gradeValue?.includes('PYP')) {
      setValueGrade('GradeBook');
    }
    setDataSave([]);

    const formDataReport = new FormData();
    formDataReport.append('_operation', 'FetchRelatedRecords');
    formDataReport.append('username', loginSelection?.userEmail);
    formDataReport.append('password', loginSelection?.userPassword);
    formDataReport.append('module', 'Contacts');
    formDataReport.append('portal_type', 'Accounts');
    formDataReport.append(
      'relatedModule',
      gradeValue?.includes('MYP')
        ? 'MYPReport'
        : gradeValue?.includes('PYP')
        ? 'GradeBook'
        : 'MYPReport', //Logedin parent id
    );
    formDataReport.append('page', '0'); //Teacher ID - Please check the Get ticket module teachers name
    formDataReport.append('pageLimit', '10');
    formDataReport.append('student_id', itemValue);

    formDataReport.append(
      'relatedModuleLabel',
      gradeValue?.includes('MYP')
        ? 'MYPReport'
        : gradeValue?.includes('PYP')
        ? 'GradeBook'
        : 'MYPReport', //Logedin parent id
    );
    formDataReport.append('parentId', itemValue); //Student ID
    formDataReport.append('recordId', itemValue); //Student ID
    const pageCheck = 0;
    dispatch(
      getReportRecord(
        setLoadingFullScreen,
        formDataReport,
        loginSelection?.Authentication,
        toast,
        setDataSave,
        dataSave,
        setDataCount,
        pageCheck,
      ),
    );
  };

  const refreshControlApi = () => {
    setDataSave([]);
    debugger;
    const formDataReport = new FormData();
    formDataReport.append('_operation', 'FetchRelatedRecords');
    formDataReport.append('username', loginSelection?.userEmail);
    formDataReport.append('password', loginSelection?.userPassword);
    formDataReport.append('module', 'Contacts');
    formDataReport.append('portal_type', 'Accounts');

    formDataReport.append(
      'relatedModule',
      valueGrade?.includes('MYP')
        ? 'MYPReport'
        : valueGrade?.includes('PYP')
        ? 'GradeBook'
        : 'MYPReport', //Logedin parent id
    );
    formDataReport.append('page', '0'); //Teacher ID - Please check the Get ticket module teachers name
    formDataReport.append('pageLimit', '10');
    formDataReport.append('student_id', value);
    formDataReport.append(
      'relatedModuleLabel',
      valueGrade?.includes('MYP')
        ? 'MYPReport'
        : valueGrade?.includes('PYP')
        ? 'GradeBook'
        : 'MYPReport', //Logedin parent id
    );
    formDataReport.append('parentId', value); //Student ID
    formDataReport.append('recordId', value); //Student ID
    const pageCheck = 0;
    dispatch(
      getReportRecord(
        setLoadingFullScreen,
        formDataReport,
        loginSelection?.Authentication,
        toast,
        setDataSave,
        dataSave,
        setDataCount,
        pageCheck,
      ),
    );
  };

  const LoadRandomData = pageNumberData => {
    const formDataReport = new FormData();
    formDataReport.append('_operation', 'FetchRelatedRecords');
    formDataReport.append('username', loginSelection?.userEmail);
    formDataReport.append('password', loginSelection?.userPassword);
    formDataReport.append('module', 'Contacts');
    formDataReport.append('portal_type', 'Accounts');

    formDataReport.append(
      'relatedModule',
      valueGrade?.includes('MYP')
        ? 'MYPReport'
        : valueGrade?.includes('PYP')
        ? 'GradeBook'
        : 'MYPReport', //Logedin parent id
    );
    formDataReport.append('page', pageNumberData); //Teacher ID - Please check the Get ticket module teachers name
    formDataReport.append('pageLimit', '10');
    formDataReport.append('student_id', value);
    formDataReport.append(
      'relatedModuleLabel',
      valueGrade?.includes('MYP')
        ? 'MYPReport'
        : valueGrade?.includes('PYP')
        ? 'GradeBook'
        : 'MYPReport', //Logedin parent id
    );
    formDataReport.append('parentId', value); //Student ID
    formDataReport.append('recordId', value); //Student ID

    dispatch(
      getReportRecord(
        setLoadingFullScreen,
        formDataReport,
        loginSelection?.Authentication,
        toast,
        setDataSave,
        dataSave,
        setDataCount,
      ),
    );
  };

  const LoadMoreRandomData = () => {
    setPageNumber(pageNumber + 1);
    if (dataSave?.length === dataCount) {
      toast.show('No Record Found', {type: 'success'});
    } else {
      LoadRandomData(pageNumber + 1);
    }
  };

  return (
    <ReportScreen
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
      handleSelect={handleSelect}
      reportSelection={dataSave}
      refreshing={refreshing}
      onRefresh={onRefresh}
      setValueGrade={setValueGrade}
      valueGrade={valueGrade}
      LoadMoreRandomData={LoadMoreRandomData}
    />
  );
};

export default ReportContainer;
