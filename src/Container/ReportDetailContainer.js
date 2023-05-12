import React, {useEffect, useState} from 'react';
import {ReportDetailScreen} from '../Screens';
import {useDispatch, useSelector} from 'react-redux';
import {useToast} from 'react-native-toast-notifications';
import {Dimensions} from 'react-native';
import {
  getReportDocument,
  getReportRecordDetail,
} from '../Store/Actions/getReportRecord';

const ReportDetailContainer = ({route, navigation}) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const {reportId, studentId, grade} = route?.params;
  const loginSelection = useSelector(
    state => state?.loginDataReducer?.loginData,
  );
  debugger;
  const {width, height} = Dimensions.get('window');
  const [loadingFullScreen, setLoadingFullScreen] = useState(false);
  const [reportDetail, setReportDetail] = useState('');
  const [documentReportDetail, setDocumentReportDetail] = useState('');
  const [documentDownloadReport, setDocumentDownloadReport] = useState('');

  useEffect(() => {
    debugger;
    const formDataReportDetail = new FormData();
    formDataReportDetail.append('_operation', 'FetchRecord');
    formDataReportDetail.append('username', loginSelection?.userEmail);
    formDataReportDetail.append('password', loginSelection?.userPassword);
    formDataReportDetail.append('module', grade);
    formDataReportDetail.append('portal_type', 'Accounts');
    formDataReportDetail.append('studentId', studentId);
    formDataReportDetail.append('recordId', reportId);

    const formDataReportDetailDocument = new FormData();
    formDataReportDetailDocument.append('_operation', 'FetchRelatedRecords');
    formDataReportDetailDocument.append('username', loginSelection?.userEmail);
    formDataReportDetailDocument.append(
      'password',
      loginSelection?.userPassword,
    );
    formDataReportDetailDocument.append('module', grade);
    formDataReportDetailDocument.append('portal_type', 'Accounts');
    formDataReportDetailDocument.append('relatedModule', 'Documents');
    formDataReportDetailDocument.append('relatedModuleLabel', 'Documents');
    formDataReportDetailDocument.append('page', '0');
    formDataReportDetailDocument.append('pageLimit', '30');
    formDataReportDetailDocument.append('studentId', studentId);
    formDataReportDetailDocument.append('recordId', reportId);

    dispatch(
      getReportRecordDetail(
        setLoadingFullScreen,
        formDataReportDetail,
        loginSelection?.Authentication,
        toast,
        setReportDetail,
        formDataReportDetailDocument,
        setDocumentReportDetail,
        reportId,
        loginSelection,
      ),
    );
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  console.log(
    documentReportDetail,
    'DocumentReport++++++++',
    reportDetail,
    'report',
  );

  const handleDownloadCertificate = (itemId, itemType, itemName) => {
    debugger;
    const formReportDocumentDownlaod = new FormData();
    formReportDocumentDownlaod.append('_operation', 'DownloadFile');
    formReportDocumentDownlaod.append('username', loginSelection?.userEmail);
    formReportDocumentDownlaod.append('password', loginSelection?.userPassword);
    formReportDocumentDownlaod.append('module', 'Documents');
    formReportDocumentDownlaod.append('portal_type', 'Accounts');
    formReportDocumentDownlaod.append('moduleLabel', 'Documents');
    formReportDocumentDownlaod.append('recordId', itemId);

    dispatch(
      getReportDocument(
        setLoadingFullScreen,
        formReportDocumentDownlaod,
        setDocumentDownloadReport,
        toast,
        loginSelection?.Authentication,
        itemType,
        itemName
      ),
    );
  };

  return (
    <ReportDetailScreen
      itemData={'announcementId'}
      navigation={navigation}
      handleBack={handleBack}
      loadingFullScreen={loadingFullScreen}
      width={width}
      height={height}
      reportDetail={reportDetail}
      documentReportDetail={documentReportDetail}
      handleDownloadCertificate={handleDownloadCertificate}
      grade={grade}
    />
  );
};

export default ReportDetailContainer;
