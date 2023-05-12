import {postgeneralApi} from '../../Api/submitLoginApi';
import {actionTypes} from './actionsTypes';
import {values} from 'lodash';
import {Linking} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

export const getReportRecord = (
  setLoadingFullScreen,
  formDataReport,
  Authentication,
  toast,
  setDataSave,
  dataSave,
  setDataCount,
  pageCheck,
) => {
  return async dispatch => {
    try {
      setLoadingFullScreen(true);

      // const {data} = await postgeneralApi(formDataReport, Authentication);
      const options = {
        method: 'POST',
        headers: {
          Authorization: Authentication,
        },
        body: formDataReport,
      };
      debugger;
      fetch('http://156.200.117.187/modules/CustomerPortal/api.php', options)
        .then(response => response.json())
        .then(data => {
          if (data?.success === true) {
            debugger;

            const dataResultStudents = values(data?.result);
            console.log(dataResultStudents, 'datarest_________');
            if (dataResultStudents === 0 || dataResultStudents?.length === 0) {
              toast.show('No Record Found', {type: 'success'});

              dispatch({
                type: actionTypes.REPORT_LIST,
                payload: {
                  reportData: 0,
                },
              });
            } else {
              debugger;
              const dataCount =
                dataResultStudents[dataResultStudents?.length - 1];
              setDataCount(dataCount);
              dataResultStudents?.pop();

              const finalData = {
                dataCount,
                dataResultStudents,
              };
              if (
                dataResultStudents[0]?.cf_5478 ||
                dataResultStudents[0]?.name !== ''
              ) {
                if (dataResultStudents?.length > 0) {
                  if (dataSave?.length > 0) {
                    if (pageCheck === 0) {
                      setDataSave(dataResultStudents);
                    } else {
                      setDataSave([...dataSave, ...dataResultStudents]);
                    }
                  } else {
                    setDataSave(dataResultStudents);
                  }
                } else {
                  toast.show('No Record Found', {type: 'success'});
                }
              } else {
                toast.show('No Record Found', {type: 'success'});
              }

              dispatch({
                type: actionTypes.REPORT_LIST,
                payload: {
                  reportData: finalData,
                },
              });
            }
          }

          setLoadingFullScreen(false);
        })
        .catch(error => {
          toast.show('Something Went Wrong', {type: 'danger'});
          setLoadingFullScreen(false);
          console.log(error);
        });
    } catch (error) {
      toast.show('Something Went Wrong', {type: 'danger'});
      setLoadingFullScreen(false);
      console.log(error);
    }
  };
};

export const getReportRecordDetail = (
  setLoadingFullScreen,
  formDataReportDetail,
  Authentication,
  toast,
  setReportDetail,
  formDataReportDetailDocument,
  setDocumentReportDetail,
  reportId,
  loginSelection,
) => {
  return async dispatch => {
    try {
      setLoadingFullScreen(true);
      debugger;
      // const {data} = await postgeneralApi(formDataReportDetail, Authentication);

      const options = {
        method: 'POST',
        headers: {
          Authorization: Authentication,
        },
        body: formDataReportDetail,
      };

      fetch('http://156.200.117.187/modules/CustomerPortal/api.php', options)
        .then(response => response.json())
        .then(data => {
          if (data?.success === true) {
            debugger;

            setReportDetail(data?.result?.record);

            dispatch(
              getReportDocumentDetail(
                setLoadingFullScreen,
                formDataReportDetailDocument,
                setDocumentReportDetail,
                toast,
                Authentication,
              ),
            );
          }
          setLoadingFullScreen(false);
        })
        .catch(error => {
          debugger;
          toast.show('Something Went Wrong', {type: 'danger'});
          setLoadingFullScreen(false);
          console.log(error);
        });
    } catch (error) {
      toast.show('Something Went Wrong', {type: 'danger'});
      setLoadingFullScreen(false);
      console.log(error);
    }
  };
};

export const getReportDocumentDetail = (
  setLoadingFullScreen,
  formDataReportDetailDocument,
  setDocumentReportDetail,
  toast,
  Authentication,
) => {
  return async dispatch => {
    try {
      debugger;
      setLoadingFullScreen(true);
      // const {data} = await postgeneralApi(
      //   formDataReportDetailDocument,
      //   Authentication,
      // );

      const options = {
        method: 'POST',
        headers: {
          Authorization: Authentication,
        },
        body: formDataReportDetailDocument,
      };

      fetch('http://156.200.117.187/modules/CustomerPortal/api.php', options)
        .then(response => response.json())
        .then(data => {
          if (data?.success === true) {
            debugger;
            const dataArray = values(data?.result);
            dataArray?.pop();
            if (dataArray[0]?.id === '' || !dataArray[0]?.id) {
              setDocumentReportDetail([]);
            } else {
              setDocumentReportDetail(dataArray);
            }
          }
          setLoadingFullScreen(false);
        })
        .catch(error => {
          debugger;
          setLoadingFullScreen(false);
          toast.show('Something Went Wrong', {type: 'danger'});
          console.log(error);
        });
    } catch (error) {
      setLoadingFullScreen(false);
      toast.show('Something Went Wrong', {type: 'danger'});
      console.log(error);
    }
  };
};

//
//
// const formDataReportDetailDocument = new FormData();
// formDataReportDetailDocument.append('_operation', 'DownloadFile');
// formDataReportDetailDocument.append(
//   'username',
//   loginSelection?.userEmail,
// );
// formDataReportDetailDocument.append(
//   'password',
//   loginSelection?.userPassword,
// );
// formDataReportDetailDocument.append('module', 'Documents');
// formDataReportDetailDocument.append('portal_type', 'Accounts');
// formDataReportDetailDocument.append('moduleLabel', 'Documents');
// formDataReportDetailDocument.append('recordId', reportId);

export const getReportDocument = (
  setLoadingFullScreen,
  formDataReportDetailDocument,
  setDocumentDownloadReport,
  toast,
  Authentication,
  itemType,
  itemName
) => {
  return async dispatch => {
    try {
      debugger;

      setLoadingFullScreen(true);
      // const {data} = await postgeneralApi(
      //   formDataReportDetailDocument,
      //   Authentication,
      // );

      const options = {
        method: 'POST',
        headers: {
          Authorization: Authentication,
        },
        body: formDataReportDetailDocument,
      };

      fetch('http://156.200.117.187/modules/CustomerPortal/api.php', options)
        .then(response => response.json())
        .then(data => {
          debugger;
          if (data?.success === true) {
            debugger;

            if (data?.result?.fileid === null) {
              setDocumentDownloadReport('');
            } else {
              setDocumentDownloadReport(data?.result);
              if (data?.result.filecontents) {
                console.log(RNFetchBlob.fs);
                const {dirs} = RNFetchBlob.fs;
                // const extension = itemType ? `.${itemType.split('.')[1]}` : '';
                const extension = itemName.match(/\.\w+$/)[0];
                const path = `${dirs.DownloadDir}/${itemName}${
                  extension === 'application/pdf' ? 'pdf' : extension
                }`;
                // const path = `${dirs.DownloadDir}/file.pdf`;
                // const path = `${dirs.DownloadDir}/${fileUri?.type}`;
                RNFetchBlob.config({
                  fileCache: true,
                  addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: true,
                    path: path,
                    description: 'PDF downloaded from DownloadFile.js',
                  },
                })
                  .fetch(
                    'GET',
                    `http://156.200.117.187/${data?.result.filecontents}`,
                  )
                  .then(res => console.log('PDF downloaded: ', res));
              }
              // const urlMake = `data:image/png;base64,${data?.result?.filecontents}`;
              // console.log(urlMake, "urlmake_____________-")
              // const supported =  Linking.canOpenURL(urlMake);

              // if (supported) {
              //   await Linking.openURL('https://google.com');
              // } else {
              //   console.log('not linking working');
              // }
            }
          }
          setLoadingFullScreen(false);
        })
        .catch(error => {
          debugger;
          setLoadingFullScreen(false);
          toast.show('Something Went Wrong', {type: 'danger'});
          console.log(error);
        });
    } catch (error) {
      setLoadingFullScreen(false);
      toast.show('Something Went Wrong', {type: 'danger'});
      console.log(error);
    }
  };
};
