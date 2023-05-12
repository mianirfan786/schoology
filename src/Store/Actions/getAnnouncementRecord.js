import {postgeneralApi} from '../../Api/submitLoginApi';
import {actionTypes} from './actionsTypes';
import {values} from 'lodash';

export const getAnnouncementRecord = (
  setLoadingFullScreen,
  formDataAnnouncement,
  Authentication,
  toast,
  setDataSave,
  dataSave,
  setDataCount,
  pageCheck
) => {
  return async dispatch => {
    try {
      // console.log("announcemnt")
      setLoadingFullScreen(true);
      // const {data} = await postgeneralApi(formDataAnnouncement, Authentication);
      const options = {
        method: 'POST',
        headers: {
          Authorization: Authentication,
        },
        body: formDataAnnouncement,
      };
      // console.log(formDataAnnouncement, "formDataAnnountcement")
    
      fetch('http://156.200.117.187/modules/CustomerPortal/api.php', options)
        .then(response => response.json())
        .then(data => {
          // console.log("checkfalse", data?.result)
          if (data?.success === true) {
            // console.log("checkfirst______", data?.result)
            const dataResultStudents = values(data?.result);
            const dataCount = dataResultStudents[dataResultStudents?.length - 1];
            setDataCount(dataCount);
            dataResultStudents?.pop();
            if (dataResultStudents === 0 || dataResultStudents?.length === 0) {
              toast.show('No Record Found', {type: 'success'});
              // console.log("announcementDoneddd______", dataResultStudents)
              // dispatch({
              //   type: actionTypes.ANNOUNCEMENT_LIST,
              //   payload: {
              //     announcementData: 0,
              //   },
              // });
            } else {
              debugger
             
              
        
              if(dataSave?.length > 0){
                if(dataResultStudents[0]?.date_start){
                if(pageCheck === 0){
                  setDataSave(dataResultStudents);
                }else{
                  setDataSave([...dataSave, ...dataResultStudents]);
                }
              }else{
                toast.show('No Record Found', {type: 'success'});
         
              }
             
             
  
              }else{
                setDataSave(dataResultStudents);
              }
           
            
        

              // dispatch({
              //   type: actionTypes.ANNOUNCEMENT_LIST,
              //   payload: {
              //     announcementData: dataResultStudents,
              //   },
              // });
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
      setLoadingFullScreen(false);
      toast.show('Something Went Wrong!!!', {type: 'danger'});
      console.log(error);
    }
  };
};

export const getAnnouncementRecordDetail = (
  setLoadingFullScreen,
  formDataAnnouncement,
  Authentication,
  toast,
  setAnnouncementDetail,
) => {
  return async dispatch => {
    try {
      debugger;
      setLoadingFullScreen(true);
      // const {data} = await postgeneralApi(formDataAnnouncement, Authentication);

      const options = {
        method: 'POST',
        headers: {
          Authorization: Authentication,
        },
        body: formDataAnnouncement,
      };
    
      fetch('http://156.200.117.187/modules/CustomerPortal/api.php', options)
        .then(response => response.json())
        .then(data => {
          if (data?.success === true) {
            debugger;
            setAnnouncementDetail(data?.result?.record);
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
