import React, {useEffect, useState} from 'react';
import {TicketDetailScreen} from '../Screens';
import {NAVIGATION_ROUTES} from '../Utils/Navigation/NavigationRoutes';
import {useDispatch, useSelector} from 'react-redux';

import {
  getReportDocument,
  getReportRecordDetail,
} from '../Store/Actions/getReportRecord';
import {useToast} from 'react-native-toast-notifications';
import {
  getTicketDocument,
  getTicketDocumentDetail,
} from '../Store/Actions/getTicketsAction';

const TicketDetailContainer = ({route, navigation}) => {
  const {itemData} = route.params;
  const dispatch = useDispatch();
  const toast = useToast();
  const loginSelection = useSelector(
    state => state?.loginDataReducer?.loginData,
  );
  debugger;
  const [loadingFullScreen, setLoadingFullScreen] = useState(false);
  const [documentTicketDetail, setDocumentTicketDetail] = useState('');
  const [downlaodTicketData, setDownlaodTicketData] = useState('');

  // const stateSelection = useSelector(state => state);

  useEffect(() => {
    const formDataTicketDetailDocument = new FormData();
    formDataTicketDetailDocument.append('_operation', 'FetchRelatedRecords');
    formDataTicketDetailDocument.append('username', loginSelection?.userEmail);
    formDataTicketDetailDocument.append(
      'password',
      loginSelection?.userPassword,
    );
    formDataTicketDetailDocument.append('module', 'HelpDesk');
    formDataTicketDetailDocument.append('portal_type', 'Accounts');
    formDataTicketDetailDocument.append('relatedModule', 'Documents');
    formDataTicketDetailDocument.append('relatedModuleLabel', 'Documents');
    formDataTicketDetailDocument.append('page', '0');
    formDataTicketDetailDocument.append('pageLimit', '30');
    formDataTicketDetailDocument.append('recordId', itemData?.id);
    dispatch(
      getTicketDocumentDetail(
        setLoadingFullScreen,
        formDataTicketDetailDocument,
        loginSelection?.Authentication,
        toast,
        setDocumentTicketDetail,
      ),
    );
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleDownloadCertificate = (itemId, itemType, itemName) => {
    const formTicketDocumentDownlaod = new FormData();
    formTicketDocumentDownlaod.append('_operation', 'DownloadFile');
    formTicketDocumentDownlaod.append('username', loginSelection?.userEmail);
    formTicketDocumentDownlaod.append('password', loginSelection?.userPassword);
    formTicketDocumentDownlaod.append('module', 'Documents');
    formTicketDocumentDownlaod.append('portal_type', 'Accounts');
    formTicketDocumentDownlaod.append('moduleLabel', 'Documents');
    formTicketDocumentDownlaod.append('recordId', itemId);

    dispatch(
      getTicketDocument(
        setLoadingFullScreen,
        formTicketDocumentDownlaod,
        setDownlaodTicketData,
        toast,
        loginSelection?.Authentication,
        itemName,
        itemType,
      ),
    );
  };

  return (
    <TicketDetailScreen
      itemData={itemData}
      navigation={navigation}
      handleBack={handleBack}
      loadingFullScreen={loadingFullScreen}
      documentTicketDetail={documentTicketDetail}
      handleDownloadCertificate={handleDownloadCertificate}
      downlaodTicketData={downlaodTicketData}
    />
  );
};

export default TicketDetailContainer;
