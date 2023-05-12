import {NAVIGATION_ROUTES} from '../../Utils/Navigation/NavigationRoutes';
import {postgeneralApi} from '../../Api/submitLoginApi';
import {actionTypes} from './actionsTypes';
import {values} from 'lodash';

export const submitLoginAction = (
  setLoadingLogin,
  Authentication,
  params,
  toast,
  navigation,
  userEmail,
  userPassword,
) => {
  return async dispatch => {
    try {
      setLoadingLogin(true);
    

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
            dispatch({
              type: actionTypes.LOGIN_DATA,
              payload: {
                loginData: {
                  userEmail: userEmail,
                  userPassword: userPassword,
                  Authentication: Authentication,
                },
              },
            });
    
            dispatch(getProfileAction(userEmail, userPassword, Authentication));
            toast.show('Login Successfully', {type: 'success'});
            navigation.navigate(NAVIGATION_ROUTES?.DRAWER);
          } else if (data?.success === false) {
            if (data?.error) {
              toast.show(data?.error?.message, {type: 'danger'});
            } else {
              toast.show('Something Went Wrong', {type: 'danger'});
            }
          }
          setLoadingLogin(false);
        })
        .catch(error => {
          toast.show('something went wrong!!!', {type: 'danger'})
          setLoadingLogin(false);
          console.log(error);
        });

     
    } catch (error) {
    
      toast.show('something went wrong!!!', {type: 'danger'})
      setLoadingLogin(false);
      console.log(error);
    }
  };
};

export const getProfileAction = (userEmail, userPassword, Authentication) => {
  return async dispatch => {
    try {
      const formData = new FormData();
      formData.append('_operation', 'FetchProfile');
      formData.append('username', userEmail);
      formData.append('password', userPassword);
      formData.append('portal_type', 'Accounts');
      
      // const {data} = await postgeneralApi(formData, Authentication);
      const options = {
        method: 'POST',
        headers: {
          Authorization: Authentication,
        },
        body: formData,
      };

      fetch('http://156.200.117.187/modules/CustomerPortal/api.php', options)
    .then(response => response.json())
    .then(data => {
      
      if (data?.success === true) {
        dispatch(
          getParentAndStudentDetailsAction(
            userEmail,
            userPassword,
            Authentication,
          ),
        );

        dispatch({
          type: actionTypes.PROFILE_DATA,
          payload: {
            profileData: data?.result,
          },
        });
      }
    })
    .catch(error => {
      toast.show('something went wrong!!!', {type: 'danger'})
      console.log(error);
    });

    } catch (error) {
      toast.show('something went wrong!!!', {type: 'danger'})
      console.log(error);
    }
  };
};

export const getParentAndStudentDetailsAction = (
  userEmail,
  userPassword,
  Authentication,
) => {
  return async dispatch => {
    try {
      const formData = new FormData();
      formData.append('_operation', 'FetchModules');
      formData.append('username', userEmail);
      formData.append('password', userPassword);
      formData.append('portal_type', 'Accounts');

      formData.append('language', 'en_us');
      
      // const {data} = await postgeneralApi(formData, Authentication);
      const options = {
      method: 'POST',
      headers: {
        Authorization: Authentication,
      },
      body: formData,
    };
  
    fetch('http://156.200.117.187/modules/CustomerPortal/api.php', options)
      .then(response => response.json())
      .then(data => {
        
        if (data?.success === true) {
          const dataResultStudents = values(data?.result?.students);
          const otherData = {resultData: data?.result};
  
          const finalData = {
            dataResultStudents,
            otherData,
          };
          
          dispatch({
            type: actionTypes.PARENT_STUDENT_DATA,
            payload: {
              parentStudentData: finalData,
            },
          });
        }
      })
      .catch(error => {
        toast.show('something went wrong!!!', {type: 'danger'})
        console.log(error);
      });

    } catch (error) {
      toast.show('something went wrong!!!', {type: 'danger'})
      console.log(error);
    }
  };
};

export const getForgetAction = (
  setLoadingforget,
  formDataForget,
  Authentication,
  toast,
  refRBSheetForget,
) => {
  return async dispatch => {
    try {
      
      setLoadingforget(true);
      // const {data} = await postgeneralApi(formDataForget, Authentication);

      // console.log(Authentication, "Authentication TEST");

      const options = {
        method: 'POST',
        headers: {
          Authorization: Authentication,
        },
        body: formDataForget,
      };
    
      fetch('http://156.200.117.187/modules/CustomerPortal/api.php', options)
        .then(response => response.json())
        .then(data => {
          
          if (data?.success === true) {
           
            toast.show(data?.result, {type: 'success'})
          }else if(data?.success === false){
            toast.show(data?.error?.message, {type: 'danger'})
          }
          setLoadingforget(false);
          refRBSheetForget.current.close();
        })
        .catch(error => {
          
          toast.show('something went wrong!!!', {type: 'danger'})
          setLoadingforget(false);
          refRBSheetForget.current.close();
          console.log(error);
        });



    } catch (error) {
      setLoadingforget(false);
      toast.show('something went wrong!!!', {type: 'danger'})
      refRBSheetForget.current.close();
      console.log(error);
    }
  };
};
