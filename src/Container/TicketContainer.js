import React, {useEffect, useRef, useState} from 'react';
import TicketScreen from '../Screens/TicketScreen';
import {NAVIGATION_ROUTES} from '../Utils/Navigation/NavigationRoutes';
import {
  addTicketAction,
  getTicketsAction,
} from '../Store/Actions/getTicketsAction';
import {useDispatch, useSelector} from 'react-redux';
import {Dimensions, Platform} from 'react-native';
import {useToast} from 'react-native-toast-notifications';
import * as yup from 'yup';
import DocumentPicker from 'react-native-document-picker';
// import DocumentPicker from 'react-native-document-picker';

const TicketContainer = ({navigation}) => {
  const dispatch = useDispatch();

  const refRBSheet = useRef();

  const {width, height} = Dimensions.get('window');
  const toast = useToast();

  const loginSelection = useSelector(
    state => state?.loginDataReducer?.loginData,
  );

  const parentAndChildDataSelection = useSelector(
    state => state?.parentStudentDataReducer?.parentStudentData,
  );

  const TeacherListSelection = useSelector(
    state => state?.teachersListReducer?.teacherList,
  );

  const ticketsSelection = useSelector(
    state => state?.ticketsDataReducer?.ticketsData,
  );

  const [ticketCreateLoader, setTicketCreateLoader] = useState(false);
  const [ticketScreenLoader, setTicketScreenLoader] = useState(false);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [teacher_Key, setTeacher_Key] = useState('');
  const [studentArray, setStudentArray] = useState([]);
  const [valueParent, setValueParent] = useState(null);
  const [isFocusParent, setIsFocusParent] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [fileUri, setFileUri] = useState(null);
  const [dataSave, setDataSave] = React.useState([]);
  const [pageNumberData, setpageNumberData] = React.useState(0);
  const [dataCount, setDataCount] = React.useState('');

  // useEffect(() => {
  //   setStudentArray([]);
  //   parentAndChildDataSelection?.dataResultStudents?.map(item => {
  //     setStudentArray(prevState => {
  //       const latestState = [
  //         ...prevState,
  //         {
  //           label: item?.firstname,
  //           value: item?.contactid,
  //         },
  //       ];
  //       return latestState;
  //     });
  //   });
  // }, [parentAndChildDataSelection]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refreshControlApi();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (loginSelection?.userEmail) {
      const formData = new FormData();
      formData.append('_operation', 'FetchRecords');
      formData.append('username', loginSelection?.userEmail);
      formData.append('password', loginSelection?.userPassword);
      formData.append('module', 'HelpDesk');
      formData.append('moduleLabeL', 'HelpDesk');
      formData.append('portal_type', 'Accounts');
      formData.append('page', '0');
      formData.append('pageLimit', '10');

      const formDataTeachersTickets = new FormData();
      formDataTeachersTickets.append('_operation', 'FetchPickListValues');
      formDataTeachersTickets.append('username', loginSelection?.userEmail);
      formDataTeachersTickets.append('password', loginSelection?.userPassword);
      formDataTeachersTickets.append('module', 'HelpDesk');
      formDataTeachersTickets.append('portal_type', 'Accounts');
      formDataTeachersTickets.append(
        'pickListFields[assigned_user_id]',
        'assigned_user_id',
      );
      formDataTeachersTickets.append('pickListFields[cf_5236]', 'cf_5236');
      const pageCheck = 0;
      setpageNumberData(0);
      dispatch(
        getTicketsAction(
          setTicketScreenLoader,
          formData,
          loginSelection?.Authentication,
          toast,
          formDataTeachersTickets,
          setDataSave,
          dataSave,
          setDataCount,
          setFileUri,
          pageCheck,
        ),
      );
    }
  }, []);

  // const pickDocument = async () => {
  //   debugger;
  //   try {
  //     const result = await DocumentPicker.pickSingle({
  //       type: [DocumentPicker.types.allFiles],
  //       allowMultiSelection: false,
  //     });
  //     console.log(result, 'result condsole');
  //     debugger;
  //     console.log(
  //       'URI: ',
  //       result.uri,
  //       'TYPE: ',
  //       result.type,
  //       'NAME: ',
  //       result.name,
  //       'SIZE: ',
  //       result.size,
  //     );
  //     setFileUri(result);
  //   } catch (err) {
  //     debugger;
  //     if (DocumentPicker.isCancel(err)) {
  //       console.log('User cancelled the picker');
  //     }
  //     console.log(err.message);
  //     console.log(err.code);
  //   }
  // };

  const openSheet = () => {
    refRBSheet.current.open();
  };

  const handleSubmitTicket = values => {
    debugger;

    if (loginSelection?.userEmail) {
      debugger;
      const formData = new FormData();
      formData.append('_operation', 'SaveRecord');
      formData.append('username', loginSelection?.userEmail);
      formData.append('password', loginSelection?.userPassword);
      formData.append('module', 'HelpDesk');
      formData.append('portal_type', 'Accounts');
      formData.append(
        'values[parent_id]',
        parentAndChildDataSelection?.otherData?.resultData?.account_id?.value,
      );
      formData.append('student_id', valueParent);
      formData.append('values[ticket_title]', values?.title);
      formData.append('values[assigned_user_id]', teacher_Key?.key);
      formData.append('values[ticketstatus]', 'Open');
      formData.append('values[ticketpriorities]', 'Low');
      formData.append('values[cf_5236]', '2022/2023');
      formData.append('values[description]', values?.description);

      debugger;

      const formDataGet = new FormData();
      formDataGet.append('_operation', 'FetchRecords');
      formDataGet.append('username', loginSelection?.userEmail);
      formDataGet.append('password', loginSelection?.userPassword);
      formDataGet.append('module', 'HelpDesk');
      formDataGet.append('moduleLabeL', 'HelpDesk');
      formDataGet.append('portal_type', 'Accounts');
      formDataGet.append('page', '0');
      formDataGet.append('pageLimit', '10');

      debugger;
      const formDataTeachers = new FormData();
      formDataTeachers.append('_operation', 'FetchPickListValues');
      formDataTeachers.append('username', loginSelection?.userEmail);
      formDataTeachers.append('password', loginSelection?.userPassword);
      formDataTeachers.append('module', 'HelpDesk');
      formDataTeachers.append('portal_type', 'Accounts');
      formDataTeachers.append(
        'pickListFields[assigned_user_id]',
        'assigned_user_id',
      );
      formDataTeachers.append('pickListFields[cf_5236]', 'cf_5236');

      debugger;
      setpageNumberData(0);
      console.log('fileUri: ', fileUri);
      const formDataTicketUpload = new FormData();
      formDataTicketUpload.append('_operation', 'SaveRecord');
      formDataTicketUpload.append('username', loginSelection?.userEmail);
      formDataTicketUpload.append('password', loginSelection?.userPassword);
      formDataTicketUpload.append('module', 'Documents');
      formDataTicketUpload.append('values[assigned_user_id]', teacher_Key?.key);
      formDataTicketUpload.append('file', {
        uri: fileUri?.uri,
        name: fileUri?.name,
        type: fileUri?.type,
      });
      formDataTicketUpload.append('portal_type', 'Accounts');
      // formDataTicketUpload.append('filename', 'test.png');
      formDataTicketUpload.append('filename', fileUri?.name);
      // formDataTicketUpload.append(
      //   'parentId',
      //   parentAndChildDataSelection?.otherData?.resultData?.account_id?.value,
      // );
      // formDataTicketUpload.append('file', {
      //   uri: fileUri ?.uri,
      //   type: fileUri?.type,
      //   name: Platform.OS === 'ios' ? fileUri?.name : fileUri?.name,

      // });

      // const formDataTicketUpload = new FormData();
      // formDataTicketUpload.append('_operation', 'SaveRecord');
      // formDataTicketUpload.append('username', 'codeebrain@gmail.com');
      // formDataTicketUpload.append('password', 'exi0eg5c');
      // formDataTicketUpload.append('module', 'Documents');
      // formDataTicketUpload.append('values[assigned_user_id]', '19x1');
      // formDataTicketUpload.append('parentId', '17x381597');
      // formDataTicketUpload.append('file', {
      //   uri: fileUri?.uri,
      //   name: 'test.png',
      //   type: 'image/png',
      // });

      const pageCheck = 0;

      debugger;
      dispatch(
        addTicketAction(
          setTicketCreateLoader,
          formData,
          loginSelection?.Authentication,
          toast,
          refRBSheet,
          formDataGet,
          formDataTeachers,
          setTicketScreenLoader,
          formDataTicketUpload,
          setDataSave,
          dataSave,
          setDataCount,
          fileUri,
          setFileUri,
          pageCheck,
        ),
      );
    }
  };

  const loginValidationSchema = yup.object().shape({
    title: yup.string().required('Title is Required'),
  });

  const handleViewMore = itemData => {
    navigation.navigate(NAVIGATION_ROUTES.TICKET_DETAIL, {
      itemData: itemData,
    });
    // navigation.navigate(NAVIGATION_ROUTES.TICKET_DETAIL);
  };

  const refreshControlApi = () => {
    const formData = new FormData();
    formData.append('_operation', 'FetchRecords');
    formData.append('username', loginSelection?.userEmail);
    formData.append('password', loginSelection?.userPassword);
    formData.append('module', 'HelpDesk');
    formData.append('moduleLabeL', 'HelpDesk');
    formData.append('portal_type', 'Accounts');
    formData.append('page', '0');
    formData.append('pageLimit', '10');

    const formDataTeachersTickets = new FormData();
    formDataTeachersTickets.append('_operation', 'FetchPickListValues');
    formDataTeachersTickets.append('username', loginSelection?.userEmail);
    formDataTeachersTickets.append('password', loginSelection?.userPassword);
    formDataTeachersTickets.append('module', 'HelpDesk');
    formDataTeachersTickets.append('portal_type', 'Accounts');
    formDataTeachersTickets.append(
      'pickListFields[assigned_user_id]',
      'assigned_user_id',
    );
    formDataTeachersTickets.append('pickListFields[cf_5236]', 'cf_5236');
    const pageCheck = 0;
    setpageNumberData(0);
    dispatch(
      getTicketsAction(
        setTicketScreenLoader,
        formData,
        loginSelection?.Authentication,
        toast,
        formDataTeachersTickets,
        setDataSave,
        dataSave,
        setDataCount,
        setFileUri,
        pageCheck,
      ),
    );
  };

  const pickDocument = async () => {
    try {
      console.log('pickhit');

      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
        allowMultiSelection: false,
      });
      console.log('file : ' + JSON.stringify(result));
      console.log(
        'URI: ',
        result.uri,
        'TYPE: ',
        result.type,
        'NAME: ',
        result.name,
        'SIZE: ',
        result.size,
      );
      if (result) {
        setFileUri(result);
      }
      // toast.show(`Data Check ${result?.ur} ${result?.type}`, {type: 'success'});
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
        toast.show('User cancelled the picker', {type: 'danger'});
      }
      console.log(err.message, '++++++');
      console.log(err.code, '_______');
      toast.show(err.message, {
        type: 'danger',
        placement: 'top',
        animationType: 'zoom-in',
      });
      toast.show(err.code, {
        type: 'danger',
        placement: 'top',
        animationType: 'zoom-in',
      });
    }
  };
  const display = () => {
    if (fileUri.type === 'image/jpeg' || fileUri.type === 'image/gif') {
      return <Image source={{uri: fileUri.uri}} style={styles.image} />;
    } else if (fileUri.type === 'application/pdf') {
      return (
        <View style={styles.pdfContainer}>
          <Text style={styles.pdfText}>File name: {fileUri.name}</Text>
          <Text style={styles.pdfText}>File type: {fileUri.type}</Text>
          <Text style={styles.pdfText}>File size: {fileUri.size}</Text>
          <Text style={styles.pdfText}>File uri: {fileUri.uri}</Text>
        </View>
      );
    } else {
      console.log('No file');
    }
  };

  const LoadRandomData = pageNumber => {
    const formData = new FormData();
    formData.append('_operation', 'FetchRecords');
    formData.append('username', loginSelection?.userEmail);
    formData.append('password', loginSelection?.userPassword);
    formData.append('module', 'HelpDesk');
    formData.append('moduleLabeL', 'HelpDesk');
    formData.append('portal_type', 'Accounts');
    formData.append('page', pageNumber);
    formData.append('pageLimit', '10');
    const formDataTeachersTickets = new FormData();
    formDataTeachersTickets.append('_operation', 'FetchPickListValues');
    formDataTeachersTickets.append('username', loginSelection?.userEmail);
    formDataTeachersTickets.append('password', loginSelection?.userPassword);
    formDataTeachersTickets.append('module', 'HelpDesk');
    formDataTeachersTickets.append('portal_type', 'Accounts');
    formDataTeachersTickets.append(
      'pickListFields[assigned_user_id]',
      'assigned_user_id',
    );
    formDataTeachersTickets.append('pickListFields[cf_5236]', 'cf_5236');

    dispatch(
      getTicketsAction(
        setTicketScreenLoader,
        formData,
        loginSelection?.Authentication,
        toast,
        formDataTeachersTickets,
        setDataSave,
        dataSave,
        setDataCount,
        setFileUri,
      ),
    );
  };

  console.log(dataSave, 'datasave');

  const LoadMoreRandomData = () => {
    console.log('callDone++++++++++');
    setpageNumberData(pageNumberData + 1);
    if (dataSave?.length === dataCount) {
      toast.show('No Record Found', {type: 'success'});
    } else {
      LoadRandomData(pageNumberData + 1);
    }
  };

  return (
    <TicketScreen
      navigation={navigation}
      width={width}
      height={height}
      ticketScreenLoader={ticketScreenLoader}
      handleViewMore={handleViewMore}
      ticketsSelection={dataSave}
      loginValidationSchema={loginValidationSchema}
      openSheet={openSheet}
      handleSubmitTicket={handleSubmitTicket}
      refRBSheet={refRBSheet}
      TeacherListSelection={TeacherListSelection}
      value={value}
      setValue={setValue}
      isFocus={isFocus}
      setIsFocus={setIsFocus}
      setTeacher_Key={setTeacher_Key}
      studentArray={studentArray}
      valueParent={valueParent}
      setValueParent={setValueParent}
      isFocusParent={isFocusParent}
      setIsFocusParent={setIsFocusParent}
      refreshing={refreshing}
      onRefresh={onRefresh}
      pickDocument={pickDocument}
      fileUri={fileUri}
      LoadMoreRandomData={LoadMoreRandomData}
      ticketCreateLoader={ticketCreateLoader}
    />
  );
};

export default TicketContainer;

// import React, {useEffect, useRef, useState} from 'react';
// import TicketScreen from '../Screens/TicketScreen';
// import {NAVIGATION_ROUTES} from '../Utils/Navigation/NavigationRoutes';
// import {
//   addTicketAction,
//   getTicketsAction,
// } from '../Store/Actions/getTicketsAction';
// import {useDispatch, useSelector} from 'react-redux';
// import {Dimensions, Platform} from 'react-native';
// import {useToast} from 'react-native-toast-notifications';
// import * as yup from 'yup';
// import DocumentPicker from 'react-native-document-picker';
// // import DocumentPicker from 'react-native-document-picker';
//
// const TicketContainer = ({navigation}) => {
//   const dispatch = useDispatch();
//
//   const refRBSheet = useRef();
//
//   const {width, height} = Dimensions.get('window');
//   const toast = useToast();
//
//   const loginSelection = useSelector(
//     state => state?.loginDataReducer?.loginData,
//   );
//
//   const parentAndChildDataSelection = useSelector(
//     state => state?.parentStudentDataReducer?.parentStudentData,
//   );
//
//   const TeacherListSelection = useSelector(
//     state => state?.teachersListReducer?.teacherList,
//   );
//
//   const ticketsSelection = useSelector(
//     state => state?.ticketsDataReducer?.ticketsData,
//   );
//
//   const [ticketCreateLoader, setTicketCreateLoader] = useState(false);
//   const [ticketScreenLoader, setTicketScreenLoader] = useState(false);
//   const [value, setValue] = useState(null);
//   const [isFocus, setIsFocus] = useState(false);
//   const [teacher_Key, setTeacher_Key] = useState('');
//   const [studentArray, setStudentArray] = useState([]);
//   const [valueParent, setValueParent] = useState(null);
//   const [isFocusParent, setIsFocusParent] = useState(false);
//   const [refreshing, setRefreshing] = React.useState(false);
//   const [fileUri, setFileUri] = useState(null);
//   const [dataSave, setDataSave] = React.useState([]);
//   const [pageNumberData, setpageNumberData] = React.useState(0);
//   const [dataCount, setDataCount] = React.useState('');
//
//   useEffect(() => {
//     setStudentArray([]);
//     parentAndChildDataSelection?.dataResultStudents?.map(item => {
//       setStudentArray(prevState => {
//         const latestState = [
//           ...prevState,
//           {
//             label: item?.firstname,
//             value: item?.contactid,
//           },
//         ];
//         return latestState;
//       });
//     });
//   }, [parentAndChildDataSelection]);
//
//   const onRefresh = React.useCallback(() => {
//     setRefreshing(true);
//     refreshControlApi();
//     setTimeout(() => {
//       setRefreshing(false);
//     }, 2000);
//   }, []);
//
//   useEffect(() => {
//     if (loginSelection?.userEmail) {
//       const formData = new FormData();
//       formData.append('_operation', 'FetchRecords');
//       formData.append('username', loginSelection?.userEmail);
//       formData.append('password', loginSelection?.userPassword);
//       formData.append('module', 'HelpDesk');
//       formData.append('moduleLabeL', 'HelpDesk');
//       formData.append('portal_type', 'Accounts');
//       formData.append('page', '0');
//       formData.append('pageLimit', '10');
//
//       const formDataTeachersTickets = new FormData();
//       formDataTeachersTickets.append('_operation', 'FetchPickListValues');
//       formDataTeachersTickets.append('username', loginSelection?.userEmail);
//       formDataTeachersTickets.append('password', loginSelection?.userPassword);
//       formDataTeachersTickets.append('module', 'HelpDesk');
//       formDataTeachersTickets.append('portal_type', 'Accounts');
//       formDataTeachersTickets.append(
//         'pickListFields[assigned_user_id]',
//         'assigned_user_id',
//       );
//       formDataTeachersTickets.append('pickListFields[cf_5236]', 'cf_5236');
//       const pageCheck = 0;
//       setpageNumberData(0);
//       dispatch(
//         getTicketsAction(
//           setTicketScreenLoader,
//           formData,
//           loginSelection?.Authentication,
//           toast,
//           formDataTeachersTickets,
//           setDataSave,
//           dataSave,
//           setDataCount,
//           setFileUri,
//           pageCheck,
//         ),
//       );
//     }
//   }, []);
//
//   // const pickDocument = async () => {
//   //   debugger;
//   //   try {
//   //     const result = await DocumentPicker.pickSingle({
//   //       type: [DocumentPicker.types.allFiles],
//   //       allowMultiSelection: false,
//   //     });
//   //     console.log(result, 'result condsole');
//   //     debugger;
//   //     console.log(
//   //       'URI: ',
//   //       result.uri,
//   //       'TYPE: ',
//   //       result.type,
//   //       'NAME: ',
//   //       result.name,
//   //       'SIZE: ',
//   //       result.size,
//   //     );
//   //     setFileUri(result);
//   //   } catch (err) {
//   //     debugger;
//   //     if (DocumentPicker.isCancel(err)) {
//   //       console.log('User cancelled the picker');
//   //     }
//   //     console.log(err.message);
//   //     console.log(err.code);
//   //   }
//   // };
//
//   const openSheet = () => {
//     refRBSheet.current.open();
//   };
//
//   const handleSubmitTicket = values => {
//     debugger;
//
//     if (loginSelection?.userEmail) {
//       debugger;
//       const formData = new FormData();
//       formData.append('_operation', 'SaveRecord');
//       formData.append('username', loginSelection?.userEmail);
//       formData.append('password', loginSelection?.userPassword);
//       formData.append('module', 'HelpDesk');
//       formData.append('portal_type', 'Accounts');
//       formData.append(
//         'values[parent_id]',
//         parentAndChildDataSelection?.otherData?.resultData?.account_id?.value,
//       );
//       formData.append('student_id', valueParent);
//       formData.append('values[ticket_title]', values?.title);
//       formData.append('values[assigned_user_id]', teacher_Key?.key);
//       formData.append('values[ticketstatus]', 'Open');
//       formData.append('values[ticketpriorities]', 'Low');
//       formData.append('values[cf_5236]', '2022/2023');
//       formData.append('values[description]', values?.description);
//
//       debugger;
//
//       const formDataGet = new FormData();
//       formDataGet.append('_operation', 'FetchRecords');
//       formDataGet.append('username', loginSelection?.userEmail);
//       formDataGet.append('password', loginSelection?.userPassword);
//       formDataGet.append('module', 'HelpDesk');
//       formDataGet.append('moduleLabeL', 'HelpDesk');
//       formDataGet.append('portal_type', 'Accounts');
//       formDataGet.append('page', '0');
//       formDataGet.append('pageLimit', '10');
//
//       debugger;
//       const formDataTeachers = new FormData();
//       formDataTeachers.append('_operation', 'FetchPickListValues');
//       formDataTeachers.append('username', loginSelection?.userEmail);
//       formDataTeachers.append('password', loginSelection?.userPassword);
//       formDataTeachers.append('module', 'HelpDesk');
//       formDataTeachers.append('portal_type', 'Accounts');
//       formDataTeachers.append(
//         'pickListFields[assigned_user_id]',
//         'assigned_user_id',
//       );
//       formDataTeachers.append('pickListFields[cf_5236]', 'cf_5236');
//
//       debugger;
//       setpageNumberData(0);
//       console.log('fileUri: ', fileUri);
//       const formDataTicketUpload = new FormData();
//       formDataTicketUpload.append('_operation', 'SaveRecord');
//       formDataTicketUpload.append('username', loginSelection?.userEmail);
//       formDataTicketUpload.append('password', loginSelection?.userPassword);
//       formDataTicketUpload.append('module', 'Documents');
//       formDataTicketUpload.append('values[assigned_user_id]', teacher_Key?.key);
//       formDataTicketUpload.append('file', {
//         uri: fileUri?.uri,
//         name: fileUri?.name,
//         type: fileUri?.type,
//       });
//       formDataTicketUpload.append('portal_type', 'Accounts');
//       // formDataTicketUpload.append('filename', 'test.png');
//       formDataTicketUpload.append('filename', fileUri?.name);
//       // formDataTicketUpload.append(
//       //   'parentId',
//       //   parentAndChildDataSelection?.otherData?.resultData?.account_id?.value,
//       // );
//       // formDataTicketUpload.append('file', {
//       //   uri: fileUri ?.uri,
//       //   type: fileUri?.type,
//       //   name: Platform.OS === 'ios' ? fileUri?.name : fileUri?.name,
//
//       // });
//
//       // const formDataTicketUpload = new FormData();
//       // formDataTicketUpload.append('_operation', 'SaveRecord');
//       // formDataTicketUpload.append('username', 'codeebrain@gmail.com');
//       // formDataTicketUpload.append('password', 'exi0eg5c');
//       // formDataTicketUpload.append('module', 'Documents');
//       // formDataTicketUpload.append('values[assigned_user_id]', '19x1');
//       // formDataTicketUpload.append('parentId', '17x381597');
//       // formDataTicketUpload.append('file', {
//       //   uri: fileUri?.uri,
//       //   name: 'test.png',
//       //   type: 'image/png',
//       // });
//
//       const pageCheck = 0;
//
//       debugger;
//       dispatch(
//         addTicketAction(
//           setTicketCreateLoader,
//           formData,
//           loginSelection?.Authentication,
//           toast,
//           refRBSheet,
//           formDataGet,
//           formDataTeachers,
//           setTicketScreenLoader,
//           formDataTicketUpload,
//           setDataSave,
//           dataSave,
//           setDataCount,
//           fileUri,setFileUri,
//           pageCheck,
//         ),
//       );
//     }
//   };
//
//   const loginValidationSchema = yup.object().shape({
//     title: yup.string().required('Title is Required'),
//   });
//
//   const handleViewMore = itemData => {
//     navigation.navigate(NAVIGATION_ROUTES.TICKET_DETAIL, {
//       itemData: itemData,
//     });
//     // navigation.navigate(NAVIGATION_ROUTES.TICKET_DETAIL);
//   };
//
//   const refreshControlApi = () => {
//     const formData = new FormData();
//     formData.append('_operation', 'FetchRecords');
//     formData.append('username', loginSelection?.userEmail);
//     formData.append('password', loginSelection?.userPassword);
//     formData.append('module', 'HelpDesk');
//     formData.append('moduleLabeL', 'HelpDesk');
//     formData.append('portal_type', 'Accounts');
//     formData.append('page', '0');
//     formData.append('pageLimit', '10');
//
//     const formDataTeachersTickets = new FormData();
//     formDataTeachersTickets.append('_operation', 'FetchPickListValues');
//     formDataTeachersTickets.append('username', loginSelection?.userEmail);
//     formDataTeachersTickets.append('password', loginSelection?.userPassword);
//     formDataTeachersTickets.append('module', 'HelpDesk');
//     formDataTeachersTickets.append('portal_type', 'Accounts');
//     formDataTeachersTickets.append(
//       'pickListFields[assigned_user_id]',
//       'assigned_user_id',
//     );
//     formDataTeachersTickets.append('pickListFields[cf_5236]', 'cf_5236');
//     const pageCheck = 0;
//     setpageNumberData(0);
//     dispatch(
//       getTicketsAction(
//         setTicketScreenLoader,
//         formData,
//         loginSelection?.Authentication,
//         toast,
//         formDataTeachersTickets,
//         setDataSave,
//         dataSave,
//         setDataCount,
//         setFileUri,
//         pageCheck,
//       ),
//     );
//   };
//
//   const pickDocument = async () => {
//     try {
//       console.log('pickhit');
//
//       const result = await DocumentPicker.pickSingle({
//         type: [DocumentPicker.types.allFiles],
//         allowMultiSelection: false,
//       });
//       console.log('file : ' + JSON.stringify(result));
//       console.log(
//         'URI: ',
//         result.uri,
//         'TYPE: ',
//         result.type,
//         'NAME: ',
//         result.name,
//         'SIZE: ',
//         result.size,
//       );
//       if (result) {
//         setFileUri(result);
//       }
//       // toast.show(`Data Check ${result?.ur} ${result?.type}`, {type: 'success'});
//     } catch (err) {
//       if (DocumentPicker.isCancel(err)) {
//         console.log('User cancelled the picker');
//         toast.show('User cancelled the picker', {type: 'danger'});
//       }
//       console.log(err.message, '++++++');
//       console.log(err.code, '_______');
//       toast.show(err.message, {
//         type: 'danger',
//         placement: 'top',
//         animationType: 'zoom-in',
//       });
//       toast.show(err.code, {
//         type: 'danger',
//         placement: 'top',
//         animationType: 'zoom-in',
//       });
//     }
//   };
//   const display = () => {
//     if (fileUri.type === 'image/jpeg' || fileUri.type === 'image/gif') {
//       return <Image source={{uri: fileUri.uri}} style={styles.image} />;
//     } else if (fileUri.type === 'application/pdf') {
//       return (
//         <View style={styles.pdfContainer}>
//           <Text style={styles.pdfText}>File name: {fileUri.name}</Text>
//           <Text style={styles.pdfText}>File type: {fileUri.type}</Text>
//           <Text style={styles.pdfText}>File size: {fileUri.size}</Text>
//           <Text style={styles.pdfText}>File uri: {fileUri.uri}</Text>
//         </View>
//       );
//     } else {
//       console.log('No file');
//     }
//   };
//
//   const LoadRandomData = pageNumber => {
//     const formData = new FormData();
//     formData.append('_operation', 'FetchRecords');
//     formData.append('username', loginSelection?.userEmail);
//     formData.append('password', loginSelection?.userPassword);
//     formData.append('module', 'HelpDesk');
//     formData.append('moduleLabeL', 'HelpDesk');
//     formData.append('portal_type', 'Accounts');
//     formData.append('page', pageNumber);
//     formData.append('pageLimit', '10');
//     const formDataTeachersTickets = new FormData();
//     formDataTeachersTickets.append('_operation', 'FetchPickListValues');
//     formDataTeachersTickets.append('username', loginSelection?.userEmail);
//     formDataTeachersTickets.append('password', loginSelection?.userPassword);
//     formDataTeachersTickets.append('module', 'HelpDesk');
//     formDataTeachersTickets.append('portal_type', 'Accounts');
//     formDataTeachersTickets.append(
//       'pickListFields[assigned_user_id]',
//       'assigned_user_id',
//     );
//     formDataTeachersTickets.append('pickListFields[cf_5236]', 'cf_5236');
//
//     dispatch(
//       getTicketsAction(
//         setTicketScreenLoader,
//         formData,
//         loginSelection?.Authentication,
//         toast,
//         formDataTeachersTickets,
//         setDataSave,
//         dataSave,
//         setDataCount,
//         setFileUri,
//       ),
//     );
//   };
//
//   console.log(dataSave, 'datasave');
//
//   const LoadMoreRandomData = () => {
//     console.log('callDone++++++++++');
//     setpageNumberData(pageNumberData + 1);
//     if (dataSave?.length === dataCount) {
//       toast.show('No Record Found', {type: 'success'});
//     } else {
//       LoadRandomData(pageNumberData + 1);
//     }
//   };
//
//   return (
//     <TicketScreen
//       navigation={navigation}
//       width={width}
//       height={height}
//       ticketScreenLoader={ticketScreenLoader}
//       handleViewMore={handleViewMore}
//       ticketsSelection={dataSave}
//       loginValidationSchema={loginValidationSchema}
//       openSheet={openSheet}
//       handleSubmitTicket={handleSubmitTicket}
//       refRBSheet={refRBSheet}
//       TeacherListSelection={TeacherListSelection}
//       value={value}
//       setValue={setValue}
//       isFocus={isFocus}
//       setIsFocus={setIsFocus}
//       setTeacher_Key={setTeacher_Key}
//       studentArray={studentArray}
//       valueParent={valueParent}
//       setValueParent={setValueParent}
//       isFocusParent={isFocusParent}
//       setIsFocusParent={setIsFocusParent}
//       refreshing={refreshing}
//       onRefresh={onRefresh}
//       pickDocument={pickDocument}
//       fileUri={fileUri}
//       LoadMoreRandomData={LoadMoreRandomData}
//       ticketCreateLoader={ticketCreateLoader}
//     />
//   );
// };
//
// export default TicketContainer;
