import {NAVIGATION_ROUTES} from '../../Utils/Navigation/NavigationRoutes';
import {postgeneralApi} from '../../Api/submitLoginApi';

import {actionTypes} from './actionsTypes';
import {map, values} from 'lodash';
import {Linking} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
// import RNFS from 'react-native-fs';

export const getTicketsAction = (
  setTicketScreenLoader,
  params,
  Authentication,
  toast,
  formDataTeachersTickets,
  setDataSave,
  dataSave,
  setDataCount,
  setFileUri,
  pageCheck,
) => {
  return async dispatch => {
    try {
      setTicketScreenLoader(true);

      const options = {
        method: 'POST',
        headers: {
          Authorization: Authentication,
        },
        body: params,
      };

      fetch('http://156.200.117.187/modules/CustomerPortal/api.php', options)
        .then(response => response.json())
        .then(data => {
          if (data?.success === true) {
            debugger;
            const datanew = values(data?.result);
            const dataCountVar = datanew[datanew?.length - 1];
            setDataCount(dataCountVar);
            datanew?.pop();

            debugger;

            if (datanew === 0 || datanew?.length === 0) {
              toast.show('No Record Found', {type: 'success'});
            } else {
              if (dataSave?.length > 0) {
                if (pageCheck === 0) {
                  setDataSave(datanew);
                } else {
                  setDataSave([...dataSave, ...datanew]);
                }
              } else {
                setDataSave(datanew);
              }
            }
            setFileUri(null);
            dispatch(
              getTicketTeachers(
                formDataTeachersTickets,
                setTicketScreenLoader,
                Authentication,
                toast,
              ),
            );
          } else if (data?.success === false) {
            if (data?.error) {
              toast.show(data?.error?.message, {type: 'danger'});
            } else {
              toast.show('Something Went Wrong', {type: 'danger'});
            }
          }
        })
        .catch(error => {
          setTicketScreenLoader(false);
          console.log(error);
        });
    } catch (error) {
      setTicketScreenLoader(false);
      console.log(error);
    }
  };
};

export const getTicketTeachers = (
  params,
  setTicketScreenLoader,
  Authentication,
  toast,
) => {
  return async dispatch => {
    try {
      // const {data} = await postgeneralApi(params, Authentication);

      const options = {
        method: 'POST',
        headers: {
          Authorization: Authentication,
        },
        body: params,
      };

      fetch('http://156.200.117.187/modules/CustomerPortal/api.php', options)
        .then(response => response.json())
        .then(data => {
          if (data?.success === true) {
            const assignedUser = map(
              data?.result?.assigned_user,
              (value, key) => ({
                label: value,
                key,
              }),
            );

            const pickListYears = values(
              data?.result?.picklist_values?.cf_5236,
            );

            const finalData = {
              assignedUser,
              pickListYears,
            };

            dispatch({
              type: actionTypes.TEACHER_LIST,
              payload: {
                teacherList: finalData,
              },
            });
          } else if (data?.success === false) {
            if (data?.error) {
              toast.show(data?.error?.message, {type: 'danger'});
            } else {
              toast.show('Something Went Wrong', {type: 'danger'});
            }
          }

          setTicketScreenLoader(false);
        })
        .catch(error => {
          setTicketScreenLoader(false);
          console.log(error);
        });
    } catch (error) {
      setTicketScreenLoader(false);
      console.log(error);
    }
  };
};

export const addTicketAction = (
  setTicketCreateLoader,
  params,
  Authentication,
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
) => {
  return async dispatch => {
    try {
      console.log('params in addTicketAction: ', params);
      console.log('fileUri in addTicketAction: ', fileUri);

      setTicketCreateLoader(true);

      // const {data} = await postgeneralApi(params, Authentication);
      const options = {
        method: 'POST',
        headers: {
          Authorization: Authentication,
        },
        body: params,
      };

      fetch('http://156.200.117.187/modules/CustomerPortal/api.php', options)
        .then(response => response.json())
        .then(data => {
          // console.log(data, "data get _______ from ticket upload")
          if (data?.success === true) {
            console.log('data: ', data);
            console.log('parentId', data?.result?.record?.id);
            formDataTicketUpload.append('parentId', data?.result?.record?.id);

            if (fileUri) {
              console.log('fileUri in if : ', fileUri);
              dispatch(
                getTicketUpload(
                  setTicketCreateLoader,
                  formDataTicketUpload,
                  Authentication,
                  toast,
                  setTicketScreenLoader,
                  formDataGet,
                  formDataTeachers,
                  setDataSave,
                  dataSave,
                  setDataCount,
                  setFileUri,
                  fileUri,
                  pageCheck,
                ),
              );
            } else {
              console.log('fileUri in else : ', fileUri);
              dispatch(
                getTicketsAction(
                  setTicketScreenLoader,
                  formDataGet,
                  Authentication,
                  toast,
                  formDataTeachers,
                  setDataSave,
                  dataSave,
                  setDataCount,
                  setFileUri,
                  pageCheck,
                ),
              );
            }
          } else if (data?.success === false) {
            setTicketCreateLoader(false);
            if (data?.error) {
              toast.show(data?.error?.message, {type: 'danger'});
            } else {
              toast.show('Something Went Wrong', {type: 'danger'});
            }
          }

          refRBSheet.current.close();
        })
        .catch(error => {
          setTicketCreateLoader(false);
          console.log(error);
        });
    } catch (error) {
      setTicketCreateLoader(false);
      console.log(error);
    }
  };
};

export const getTicketUpload = (
  setTicketCreateLoader,
  formDataTicketUpload,
  Authentication,
  toast,
  setTicketScreenLoader,
  formDataGet,
  formDataTeachers,
  setDataSave,
  dataSave,
  setDataCount,
  setFileUri,
  fileUri,
  pageCheck,
) => {
  return async dispatch => {
    try {
      setTicketCreateLoader(true);
      // const {data} = await postgeneralApi(
      //   formDataTicketUpload,
      //   Authentication,
      // );

      const options = {
        method: 'POST',
        headers: {
          Authorization: Authentication,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          'Content-Disposition': `attachment; filename=${fileUri?.name}`,
        },
        body: formDataTicketUpload,
      };

      fetch('http://156.200.117.187/modules/CustomerPortal/api.php', options)
        .then(response => response.json())
        .then(data => {
          console.log('-===========================', data);
          if (data?.success === true) {
            console.log('actioncallget');
            dispatch(
              getTicketsAction(
                setTicketScreenLoader,
                formDataGet,
                Authentication,
                toast,
                formDataTeachers,
                setDataSave,
                dataSave,
                setDataCount,
                setFileUri,
                pageCheck,
              ),
            );
          }
          setTicketCreateLoader(false);
        })
        .catch(error => {
          setTicketCreateLoader(false);
          toast.show('Something Went Wrong', {type: 'danger'});
          console.log(error);
        });
    } catch (error) {
      console.log('+++++++++++++++++++', error);
      setTicketCreateLoader(false);
      toast.show('Something Went Wrong', {type: 'danger'});
      console.log(error);
    }
  };
};

export const getTicketDocumentDetail = (
  setLoadingFullScreen,
  formDataTicketDetailDocument,
  Authentication,
  toast,
  setDocumentTicketDetail,
) => {
  return async dispatch => {
    try {
      debugger;
      setLoadingFullScreen(true);
      // const {data} = await postgeneralApi(
      //   formDataTicketDetailDocument,
      //   Authentication,
      // );

      const options = {
        method: 'POST',
        headers: {
          Authorization: Authentication,
        },
        body: formDataTicketDetailDocument,
      };

      fetch('http://156.200.117.187/modules/CustomerPortal/api.php', options)
        .then(response => response.json())
        .then(data => {
          console.log('data?.result :', data?.result);

          debugger;
          if (data?.success === true) {
            if (data?.result?.count === 0) {
              toast.show('No Record Found', {type: 'success'});
            } else {
              const dataArray = values(data?.result);
              if (dataArray[0]?.fileid === null) {
                toast.show('No Record Found', {type: 'success'});
              } else {
                dataArray?.pop();
                setDocumentTicketDetail(dataArray);
              }
            }
          }
          setLoadingFullScreen(false);
        })
        .catch(error => {
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

export const getTicketDocument = (
  setLoadingFullScreen,
  formTicketDocumentDownlaod,
  setDownlaodTicketData,
  toast,
  Authentication,
  itemType,
  itemName,
) => {
  return async dispatch => {
    try {
      setLoadingFullScreen(true);
      // const {data} = await postgeneralApi(
      //   formTicketDocumentDownlaod,
      //   Authentication,
      // );

      const options = {
        method: 'POST',
        headers: {
          Authorization: Authentication,
        },
        body: formTicketDocumentDownlaod,
      };

      fetch('http://156.200.117.187/modules/CustomerPortal/api.php', options)
        .then(response => response.json())
        .then(data => {
          if (data?.success === true) {
            if (data?.result?.fileid === null) {
              setDownlaodTicketData('');
            } else {
              setDownlaodTicketData(data?.result);
              if (data?.result.filecontents) {
                const {dirs} = RNFetchBlob.fs;
                const extension = itemType ? `.${itemType.split('.')[1]}` : '';
                console.log('extension check: ', extension);
                const path = `${dirs.DownloadDir}/${
                  extension === '.pdf' ? 'Document' : 'Image'
                }${extension === 'application/pdf' ? 'pdf' : extension}`;
                RNFetchBlob.config({
                  fileCache: true,
                  addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: true,
                    path: path,
                    description: `${itemName} downloaded from DownloadFile.js`,
                  },
                })
                  .fetch(
                    'GET',
                    `http://156.200.117.187/${data?.result.filecontents}`,
                  )
                  .then(res => console.log('PDF downloaded: ', res));
              }
            }
          }
          setLoadingFullScreen(false);
        })
        .catch(error => {
          setLoadingFullScreen(false);
          toast.show('Something went wrong', {type: 'danger'});
          console.log(error);
        });
    } catch (error) {
      setLoadingFullScreen(false);
      toast.show('Something went wrong', {type: 'danger'});
      console.log(error);
    }
  };
};
