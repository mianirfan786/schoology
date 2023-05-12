import {postgeneralApi} from '../../Api/submitLoginApi';
import {actionTypes} from './actionsTypes';
import {values} from 'lodash';

export const getNotification = (
  setLoadingFullScreen,
  formDataNotification,
  Authentication,
  toast,
) => {
  return async dispatch => {
    try {
      debugger;
      setLoadingFullScreen(true);
      // const {data} = await postgeneralApi(formDataNotification, Authentication);
      const options = {
        method: 'POST',
        headers: {
          Authorization: Authentication,
        },
        body: formDataNotification,
      };

      fetch('http://156.200.117.187/modules/CustomerPortal/api.php', options)
        .then(response => response.json())
        .then(data => {
          if (data?.success === true) {
            debugger;
            // const dataResultStudents = values(data?.result);

            dispatch({
              type: actionTypes.NOTIFICATION_API,
              payload: {
                notificationData: data?.result,
              },
            });
          }

          setLoadingFullScreen(false);
        })
        .catch(error => {
          debugger;
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
