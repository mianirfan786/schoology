import {postgeneralApi} from '../../Api/submitLoginApi';
import {actionTypes} from './actionsTypes';
import {values} from 'lodash';

export const getDesciplineRecord = (
  setLoadingFullScreen,
  formDataDescipline,
  Authentication,
  toast,
) => {
  return async dispatch => {
    try {

      setLoadingFullScreen(true);
      // const {data} = await postgeneralApi(formDataDescipline, Authentication);
      const options = {
        method: 'POST',
        headers: {
          Authorization: Authentication,
        },
        body: formDataDescipline,
      };
    
      fetch('http://156.200.117.187/modules/CustomerPortal/api.php', options)
        .then(response => response.json())
        .then(data => {
          if (data?.success === true) {
           
            const dataResultStudents = values(data?.result);
    
            if (dataResultStudents === 0 || dataResultStudents[0] === 0) {
              toast.show('No Record Found', {type: 'success'});
    
              dispatch({
                type: actionTypes.DESCIPLINE_LIST,
                payload: {
                  desciplineData: 0,
                },
              });
            } else {
              const dataCount = dataResultStudents[dataResultStudents?.length - 1];
              // const removePop = dataResultStudents;
              // const desciplineDataOriginal = removePop;
    
              const finalData = {
                dataResultStudents,
                dataCount,
              };
    
              dispatch({
                type: actionTypes.DESCIPLINE_LIST,
                payload: {
                  desciplineData: finalData,
                },
              });
            }
          }
    
          setLoadingFullScreen(false);

        })
        .catch(error => {
          setLoadingFullScreen(false);
          toast.show('Something Went Wrong!!!', {type: 'danger'});
          console.log(error);
        });

    
    } catch (error) {
      toast.show('Something Went Wrong!!!', {type: 'danger'});
      setLoadingFullScreen(false);
      console.log(error);
    }
  };
};

export const getDesciplineRecordDetail = (
  setLoadingFullScreen,
  formDataDescipline,
  Authentication,
  toast,
  setDesciplineDetailData,
) => {
  return async dispatch => {
    try {
  
      setLoadingFullScreen(true);
      // const {data} = await postgeneralApi(formDataDescipline, Authentication);
      const options = {
        method: 'POST',
        headers: {
          Authorization: Authentication,
        },
        body: formDataDescipline,
      };
    
      fetch('http://156.200.117.187/modules/CustomerPortal/api.php', options)
        .then(response => response.json())
        .then(data => {
          if (data?.success === true) {
            setDesciplineDetailData(data?.result);
          }
          setLoadingFullScreen(false);

        })
        .catch(error => {
          setLoadingFullScreen(false);
          toast.show('Something Went Wrong!!!', {type: 'danger'});
          console.log(error);

        });

    } catch (error) {
      setLoadingFullScreen(false);
      toast.show('Something Went Wrong!!!', {type: 'danger'});
      console.log(error);
    }
  };
};
