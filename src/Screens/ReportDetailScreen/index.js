import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {ScaledSheet} from 'react-native-size-matters';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackArrow from '../../Assets/Icons/BackArrow';
import ArrowDownIcon from '../../Assets/Icons/ArrowDownladIcon';
import DownloadIcon from '../../Assets/Icons/DownloadIcon';
import {ScrollView} from 'react-native-gesture-handler';

const ReportDetailScreen = ({
                              handleBack,
                              itemData,
                              loadingFullScreen,
                              width,
                              height,
                              reportDetail,
                              documentReportDetail,
                              handleDownloadCertificate,
                              grade,
                            }) => {
  const renderItem = ({item}) => (
    <View style={styles.cardBoxDocuments}>
      <View style={styles.cardBoxInner}>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.boldText}>Title</Text>
          <Text style={styles.subText}>{item?.notes_title}</Text>
        </View>
      </View>

      <View style={styles.hrWrapper} />
      <View style={styles.actionWrapper}>
        <Text style={styles.boldText}>Actions:</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            console.log('item check: ', item);
            handleDownloadCertificate(item?.id, item?.filetype, item?.filename);
          }}>
          <DownloadIcon width={20} height={20} color={'#253658'} />
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <SafeAreaView style={{flex: 1}}>
      {loadingFullScreen && (
        <View
          style={{
            position: 'absolute',
            justifyContent: 'center',
            opacity: 0.3,
            alignItems: 'center',
            backgroundColor: '#253658',
            width: width,
            height: height,
            zIndex: 99,
          }}>
          <View style={{marginTop: '-25%'}}>
            <ActivityIndicator size={'large'} color={'#fff'} />
          </View>
        </View>
      )}
      <View style={styles.StatusBar}>
        <StatusBar translucent barStyle="dark-content" />
      </View>
      {
        grade === 'MYPReport' ? (
          <View style={styles.container}>
            <View style={styles.cardBox}>
              <View
                style={{width: '100%', position: 'relative', marginBottom: 0}}>
                <TouchableOpacity
                  style={{position: 'absolute', left: 0, zIndex: 1}}
                  onPress={handleBack}
                  activeOpacity={0.5}>
                  <BackArrow width={26} height={26} color={'#253658'} />
                </TouchableOpacity>

                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 20,
                    color: '#253658',
                  }}>
                  Reports
                </Text>
              </View>
              <View style={styles.hrWrapper} />

              <View style={styles.cardBoxInner}>
                <View style={{flexDirection: 'column'}}>
                  <Text style={styles.boldText}>Student Grade Level</Text>
                  <Text style={styles.subText}>{reportDetail?.cf_5142}</Text>
                </View>
              </View>

              <View style={styles.cardBoxInner}>
                <View style={{flexDirection: 'column'}}>
                  <Text style={styles.boldText}>Class</Text>
                  <Text style={styles.subText}>{reportDetail?.cf_5608}</Text>
                </View>
              </View>

              <View style={styles.cardBoxInner}>
                <View style={{flexDirection: 'column'}}>
                  <Text style={styles.boldText}>Year</Text>
                  <Text style={styles.subText}>{reportDetail?.cf_5478}</Text>
                </View>
              </View>
            </View>
            <View style={{...styles.cardBox, flex: 1}}>
              <View style={{width: '100%'}}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 20,
                    color: '#253658',
                  }}>
                  Report Attachments
                </Text>
              </View>
              <View style={styles.hrWrapper} />
              <View style={styles.innerContainer}>
                <FlatList
                  data={documentReportDetail}
                  showsVerticalScrollIndicator={false}
                  scrollEnabled={true}
                  renderItem={renderItem}
                  keyExtractor={item => item?.id}
                />
              </View>
            </View>
          </View>
        ): (
          <View style={styles.container}>
            {/*<View style={styles.cardBox}>*/}
            {/*  <View*/}
            {/*    style={{width: '100%', position: 'relative', marginBottom: 0}}>*/}
            {/*    <TouchableOpacity*/}
            {/*      style={{position: 'absolute', left: 0, zIndex: 1}}*/}
            {/*      onPress={handleBack}*/}
            {/*      activeOpacity={0.5}>*/}
            {/*      <BackArrow width={26} height={26} color={'#253658'} />*/}
            {/*    </TouchableOpacity>*/}

            {/*    <Text*/}
            {/*      style={{*/}
            {/*        textAlign: 'center',*/}
            {/*        fontWeight: 'bold',*/}
            {/*        fontSize: 20,*/}
            {/*        color: '#253658',*/}
            {/*      }}>*/}
            {/*      Reports*/}
            {/*    </Text>*/}
            {/*  </View>*/}

            {/*  <ScrollView>*/}
            {/*    <View style={styles.hrWrapper} />*/}

            {/*    <View style={styles.cardBoxInner}>*/}
            {/*      <View style={{flexDirection: 'column'}}>*/}
            {/*        <Text style={styles.boldText}>Name</Text>*/}
            {/*        <Text style={styles.subText}>{reportDetail?.name}</Text>*/}
            {/*      </View>*/}
            {/*    </View>*/}
            {/*    <View style={styles.hrWrapper} />*/}
            {/*    <View style={styles.cardBoxInner}>*/}
            {/*      <View style={{flexDirection: 'column'}}>*/}
            {/*        <Text style={styles.boldText}>Student Name</Text>*/}
            {/*        <Text style={styles.subText}>*/}
            {/*          {reportDetail?.cf_contacts_id?.label}*/}
            {/*        </Text>*/}
            {/*      </View>*/}
            {/*    </View>*/}
            {/*    <View style={styles.hrWrapper} />*/}
            {/*    <View style={styles.cardBoxInner}>*/}
            {/*      <View style={{flexDirection: 'column'}}>*/}
            {/*        <Text style={styles.boldText}>Assigned To</Text>*/}
            {/*        <Text style={styles.subText}>*/}
            {/*          {reportDetail?.assigned_user_id?.label}*/}
            {/*        </Text>*/}
            {/*      </View>*/}
            {/*    </View>*/}
            {/*    <View style={styles.hrWrapper} />*/}
            {/*    <View style={styles.cardBoxInner}>*/}
            {/*      <View style={{flexDirection: 'column'}}>*/}
            {/*        <Text style={styles.boldText}>Year</Text>*/}
            {/*        <Text style={styles.subText}>{reportDetail?.cf_5643}</Text>*/}
            {/*      </View>*/}
            {/*    </View>*/}
            {/*    <View style={styles.hrWrapper} />*/}
            {/*    <View style={styles.cardBoxInner}>*/}
            {/*      <View style={{flexDirection: 'column'}}>*/}
            {/*        <Text style={styles.boldText}>Term</Text>*/}
            {/*        <Text style={styles.subText}>{reportDetail?.cf_5602}</Text>*/}
            {/*      </View>*/}
            {/*    </View>*/}
            {/*    <View style={styles.hrWrapper} />*/}
            {/*    <View style={styles.cardBoxInner}>*/}
            {/*      <View style={{flexDirection: 'column'}}>*/}
            {/*        <Text style={styles.boldText}>Grade Level </Text>*/}
            {/*        <Text style={styles.subText}>{reportDetail?.cf_5617}</Text>*/}
            {/*      </View>*/}
            {/*    </View>*/}
            {/*    <View style={styles.hrWrapper} />*/}
            {/*    <View style={styles.cardBoxInner}>*/}
            {/*      <View style={{flexDirection: 'column'}}>*/}
            {/*        <Text style={styles.boldText}>Class</Text>*/}
            {/*        <Text style={styles.subText}>{reportDetail?.cf_5600}</Text>*/}
            {/*      </View>*/}
            {/*    </View>*/}
            {/*    /!*<View style={styles.hrWrapper} />*!/*/}
            {/*    /!*<View style={styles.cardBoxInner}>*!/*/}
            {/*    /!*  <View style={{flexDirection: 'column'}}>*!/*/}
            {/*    /!*    <Text style={styles.boldText}>Type</Text>*!/*/}
            {/*    /!*    <Text style={styles.subText} />*!/*/}
            {/*    /!*  </View>*!/*/}
            {/*    /!*</View>*!/*/}
            {/*    /!*<View style={styles.hrWrapper} />*!/*/}
            {/*    /!*<View style={styles.cardBoxInner}>*!/*/}
            {/*    /!*  <View style={{flexDirection: 'column'}}>*!/*/}
            {/*    /!*    <Text style={styles.boldText}>Due Date</Text>*!/*/}
            {/*    /!*    <Text style={styles.subText} />*!/*/}
            {/*    /!*  </View>*!/*/}
            {/*    /!*</View>*!/*/}
            {/*    /!*<View style={styles.hrWrapper} />*!/*/}
            {/*    /!*<View style={styles.cardBoxInner}>*!/*/}
            {/*    /!*  <View style={{flexDirection: 'column'}}>*!/*/}
            {/*    /!*    <Text style={styles.boldText}>Graded Point</Text>*!/*/}
            {/*    /!*    <Text style={styles.subText} />*!/*/}
            {/*    /!*  </View>*!/*/}
            {/*    /!*</View>*!/*/}
            {/*  </ScrollView>*/}
            {/*</View> {/*<View style={styles.cardBox}>*/}
            {/*  <View*/}
            {/*    style={{width: '100%', position: 'relative', marginBottom: 0}}>*/}
            {/*    <TouchableOpacity*/}
            {/*      style={{position: 'absolute', left: 0, zIndex: 1}}*/}
            {/*      onPress={handleBack}*/}
            {/*      activeOpacity={0.5}>*/}
            {/*      <BackArrow width={26} height={26} color={'#253658'} />*/}
            {/*    </TouchableOpacity>*/}

            {/*    <Text*/}
            {/*      style={{*/}
            {/*        textAlign: 'center',*/}
            {/*        fontWeight: 'bold',*/}
            {/*        fontSize: 20,*/}
            {/*        color: '#253658',*/}
            {/*      }}>*/}
            {/*      Reports*/}
            {/*    </Text>*/}
            {/*  </View>*/}

            {/*  <ScrollView>*/}
            {/*    <View style={styles.hrWrapper} />*/}

            {/*    <View style={styles.cardBoxInner}>*/}
            {/*      <View style={{flexDirection: 'column'}}>*/}
            {/*        <Text style={styles.boldText}>Name</Text>*/}
            {/*        <Text style={styles.subText}>{reportDetail?.name}</Text>*/}
            {/*      </View>*/}
            {/*    </View>*/}
            {/*    <View style={styles.hrWrapper} />*/}
            {/*    <View style={styles.cardBoxInner}>*/}
            {/*      <View style={{flexDirection: 'column'}}>*/}
            {/*        <Text style={styles.boldText}>Student Name</Text>*/}
            {/*        <Text style={styles.subText}>*/}
            {/*          {reportDetail?.cf_contacts_id?.label}*/}
            {/*        </Text>*/}
            {/*      </View>*/}
            {/*    </View>*/}
            {/*    <View style={styles.hrWrapper} />*/}
            {/*    <View style={styles.cardBoxInner}>*/}
            {/*      <View style={{flexDirection: 'column'}}>*/}
            {/*        <Text style={styles.boldText}>Assigned To</Text>*/}
            {/*        <Text style={styles.subText}>*/}
            {/*          {reportDetail?.assigned_user_id?.label}*/}
            {/*        </Text>*/}
            {/*      </View>*/}
            {/*    </View>*/}
            {/*    <View style={styles.hrWrapper} />*/}
            {/*    <View style={styles.cardBoxInner}>*/}
            {/*      <View style={{flexDirection: 'column'}}>*/}
            {/*        <Text style={styles.boldText}>Year</Text>*/}
            {/*        <Text style={styles.subText}>{reportDetail?.cf_5643}</Text>*/}
            {/*      </View>*/}
            {/*    </View>*/}
            {/*    <View style={styles.hrWrapper} />*/}
            {/*    <View style={styles.cardBoxInner}>*/}
            {/*      <View style={{flexDirection: 'column'}}>*/}
            {/*        <Text style={styles.boldText}>Term</Text>*/}
            {/*        <Text style={styles.subText}>{reportDetail?.cf_5602}</Text>*/}
            {/*      </View>*/}
            {/*    </View>*/}
            {/*    <View style={styles.hrWrapper} />*/}
            {/*    <View style={styles.cardBoxInner}>*/}
            {/*      <View style={{flexDirection: 'column'}}>*/}
            {/*        <Text style={styles.boldText}>Grade Level </Text>*/}
            {/*        <Text style={styles.subText}>{reportDetail?.cf_5617}</Text>*/}
            {/*      </View>*/}
            {/*    </View>*/}
            {/*    <View style={styles.hrWrapper} />*/}
            {/*    <View style={styles.cardBoxInner}>*/}
            {/*      <View style={{flexDirection: 'column'}}>*/}
            {/*        <Text style={styles.boldText}>Class</Text>*/}
            {/*        <Text style={styles.subText}>{reportDetail?.cf_5600}</Text>*/}
            {/*      </View>*/}
            {/*    </View>*/}
            {/*    /!*<View style={styles.hrWrapper} />*!/*/}
            {/*    /!*<View style={styles.cardBoxInner}>*!/*/}
            {/*    /!*  <View style={{flexDirection: 'column'}}>*!/*/}
            {/*    /!*    <Text style={styles.boldText}>Type</Text>*!/*/}
            {/*    /!*    <Text style={styles.subText} />*!/*/}
            {/*    /!*  </View>*!/*/}
            {/*    /!*</View>*!/*/}
            {/*    /!*<View style={styles.hrWrapper} />*!/*/}
            {/*    /!*<View style={styles.cardBoxInner}>*!/*/}
            {/*    /!*  <View style={{flexDirection: 'column'}}>*!/*/}
            {/*    /!*    <Text style={styles.boldText}>Due Date</Text>*!/*/}
            {/*    /!*    <Text style={styles.subText} />*!/*/}
            {/*    /!*  </View>*!/*/}
            {/*    /!*</View>*!/*/}
            {/*    /!*<View style={styles.hrWrapper} />*!/*/}
            {/*    /!*<View style={styles.cardBoxInner}>*!/*/}
            {/*    /!*  <View style={{flexDirection: 'column'}}>*!/*/}
            {/*    /!*    <Text style={styles.boldText}>Graded Point</Text>*!/*/}
            {/*    /!*    <Text style={styles.subText} />*!/*/}
            {/*    /!*  </View>*!/*/}
            {/*    /!*</View>*!/*/}
            {/*  </ScrollView>*/}
            {/*</View>*/}
            <View style={{...styles.cardBox, flex: 1}}>
              <View style={{width: '100%'}}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 20,
                    color: '#253658',
                  }}>
                  Report Attachments
                </Text>
              </View>
              <View style={styles.hrWrapper} />
              <View style={styles.innerContainer}>
                <FlatList
                  data={documentReportDetail}
                  showsVerticalScrollIndicator={false}
                  renderItem={renderItem}
                  keyExtractor={item => item?.id}
                />
              </View>
            </View>
          </View>
        )
      }
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    backgroundColor: '#253658',
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 0,
    paddingVertical: 0,
    paddingBottom: 0,
  },
  cardBox: {
    margin: 10,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.84,
    elevation: 5,
    height: 350,
  },
  cardBoxDocuments: {
    margin: 5,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.84,
    elevation: 5,
  },

  cardBoxInner: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boldText: {
    color: '#253658',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subText: {
    marginLeft: 3,
    marginTop: 10,
    color: '#3d3c3c',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textTitle: {
    marginHorizontal: 0,
    marginVertical: 10,
    color: '#3d3c3c',
    fontSize: 16,
    fontWeight: 'bold',
  },
  hrWrapper: {
    marginVertical: 20,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  descWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 0,
  },
  viewBtnWrapper: {
    width: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'flex-end',
    // marginTop: '10%',
  },
  viewBtnTouchWrapper: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 0,
    paddingHorizontal: 0,
  },
  viewBtnTextStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingRight: 0,
  },
  actionWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default ReportDetailScreen;



// import React from 'react';
// import {
//   ActivityIndicator,
//   FlatList,
//   StatusBar,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
//
// import {ScaledSheet} from 'react-native-size-matters';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import BackArrow from '../../Assets/Icons/BackArrow';
// import ArrowDownIcon from '../../Assets/Icons/ArrowDownladIcon';
// import DownloadIcon from '../../Assets/Icons/DownloadIcon';
// import {ScrollView} from 'react-native-gesture-handler';
//
// const ReportDetailScreen = ({
//   handleBack,
//   itemData,
//   loadingFullScreen,
//   width,
//   height,
//   reportDetail,
//   documentReportDetail,
//   handleDownloadCertificate,
//   grade,
// }) => {
//   const renderItem = ({item}) => (
//     <View style={styles.cardBoxDocuments}>
//       <View style={styles.cardBoxInner}>
//         <View style={{flexDirection: 'column'}}>
//           <Text style={styles.boldText}>Title</Text>
//           <Text style={styles.subText}>{item?.notes_title}</Text>
//         </View>
//       </View>
//
//       <View style={styles.hrWrapper} />
//       <View style={styles.actionWrapper}>
//         <Text style={styles.boldText}>Actions:</Text>
//         <TouchableOpacity
//           activeOpacity={0.5}
//           onPress={() => {
//             console.log('item check: ', item);
//             handleDownloadCertificate(item?.id, item?.filetype, item?.filename);
//           }}>
//           <DownloadIcon width={20} height={20} color={'#253658'} />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
//   return (
//     <SafeAreaView style={{flex: 1}}>
//       {loadingFullScreen && (
//         <View
//           style={{
//             position: 'absolute',
//             justifyContent: 'center',
//             opacity: 0.3,
//             alignItems: 'center',
//             backgroundColor: '#253658',
//             width: width,
//             height: height,
//             zIndex: 99,
//           }}>
//           <View style={{marginTop: '-25%'}}>
//             <ActivityIndicator size={'large'} color={'#fff'} />
//           </View>
//         </View>
//       )}
//       <View style={styles.StatusBar}>
//         <StatusBar translucent barStyle="dark-content" />
//       </View>
//       {grade === 'MYPReport' ? (
//         <View style={styles.container}>
//           <View style={styles.cardBox}>
//             <View
//               style={{width: '100%', position: 'relative', marginBottom: 0}}>
//               <TouchableOpacity
//                 style={{position: 'absolute', left: 0, zIndex: 1}}
//                 onPress={handleBack}
//                 activeOpacity={0.5}>
//                 <BackArrow width={26} height={26} color={'#253658'} />
//               </TouchableOpacity>
//
//               <Text
//                 style={{
//                   textAlign: 'center',
//                   fontWeight: 'bold',
//                   fontSize: 20,
//                   color: '#253658',
//                 }}>
//                 Reports
//               </Text>
//             </View>
//             <View style={styles.hrWrapper} />
//
//             <View style={styles.cardBoxInner}>
//               <View style={{flexDirection: 'column'}}>
//                 <Text style={styles.boldText}>Student Grade Level</Text>
//                 <Text style={styles.subText}>{reportDetail?.cf_5142}</Text>
//               </View>
//             </View>
//
//             <View style={styles.cardBoxInner}>
//               <View style={{flexDirection: 'column'}}>
//                 <Text style={styles.boldText}>Class</Text>
//                 <Text style={styles.subText}>{reportDetail?.cf_5608}</Text>
//               </View>
//             </View>
//
//             <View style={styles.cardBoxInner}>
//               <View style={{flexDirection: 'column'}}>
//                 <Text style={styles.boldText}>Year</Text>
//                 <Text style={styles.subText}>{reportDetail?.cf_5478}</Text>
//               </View>
//             </View>
//           </View>
//           <View style={{...styles.cardBox, flex: 1}}>
//             <View style={{width: '100%'}}>
//               <Text
//                 style={{
//                   textAlign: 'center',
//                   fontWeight: 'bold',
//                   fontSize: 20,
//                   color: '#253658',
//                 }}>
//                 Report Attachments
//               </Text>
//             </View>
//             <View style={styles.hrWrapper} />
//             <View style={styles.innerContainer}>
//               <FlatList
//                 data={documentReportDetail}
//                 showsVerticalScrollIndicator={false}
//                 scrollEnabled={true}
//                 renderItem={renderItem}
//                 keyExtractor={item => item?.id}
//               />
//             </View>
//           </View>
//         </View>
//       ) : (
//         <View style={styles.container}>
//           <View style={styles.cardBox}>
//             <View
//               style={{width: '100%', position: 'relative', marginBottom: 0}}>
//               <TouchableOpacity
//                 style={{position: 'absolute', left: 0, zIndex: 1}}
//                 onPress={handleBack}
//                 activeOpacity={0.5}>
//                 <BackArrow width={26} height={26} color={'#253658'} />
//               </TouchableOpacity>
//
//               <Text
//                 style={{
//                   textAlign: 'center',
//                   fontWeight: 'bold',
//                   fontSize: 20,
//                   color: '#253658',
//                 }}>
//                 Reports
//               </Text>
//             </View>
//
//             <ScrollView>
//               <View style={styles.hrWrapper} />
//
//               <View style={styles.cardBoxInner}>
//                 <View style={{flexDirection: 'column'}}>
//                   <Text style={styles.boldText}>Name</Text>
//                   <Text style={styles.subText}>{reportDetail?.name}</Text>
//                 </View>
//               </View>
//               <View style={styles.hrWrapper} />
//               <View style={styles.cardBoxInner}>
//                 <View style={{flexDirection: 'column'}}>
//                   <Text style={styles.boldText}>Student Name</Text>
//                   <Text style={styles.subText}>
//                     {reportDetail?.cf_contacts_id?.label}
//                   </Text>
//                 </View>
//               </View>
//               <View style={styles.hrWrapper} />
//               <View style={styles.cardBoxInner}>
//                 <View style={{flexDirection: 'column'}}>
//                   <Text style={styles.boldText}>Assigned To</Text>
//                   <Text style={styles.subText}>
//                     {reportDetail?.assigned_user_id?.label}
//                   </Text>
//                 </View>
//               </View>
//               <View style={styles.hrWrapper} />
//               <View style={styles.cardBoxInner}>
//                 <View style={{flexDirection: 'column'}}>
//                   <Text style={styles.boldText}>Year</Text>
//                   <Text style={styles.subText}>{reportDetail?.cf_5643}</Text>
//                 </View>
//               </View>
//               <View style={styles.hrWrapper} />
//               <View style={styles.cardBoxInner}>
//                 <View style={{flexDirection: 'column'}}>
//                   <Text style={styles.boldText}>Term</Text>
//                   <Text style={styles.subText}>{reportDetail?.cf_5602}</Text>
//                 </View>
//               </View>
//               <View style={styles.hrWrapper} />
//               <View style={styles.cardBoxInner}>
//                 <View style={{flexDirection: 'column'}}>
//                   <Text style={styles.boldText}>Grade Level </Text>
//                   <Text style={styles.subText}>{reportDetail?.cf_5617}</Text>
//                 </View>
//               </View>
//               <View style={styles.hrWrapper} />
//               <View style={styles.cardBoxInner}>
//                 <View style={{flexDirection: 'column'}}>
//                   <Text style={styles.boldText}>Class</Text>
//                   <Text style={styles.subText}>{reportDetail?.cf_5600}</Text>
//                 </View>
//               </View>
//               {/*<View style={styles.hrWrapper} />*/}
//               {/*<View style={styles.cardBoxInner}>*/}
//               {/*  <View style={{flexDirection: 'column'}}>*/}
//               {/*    <Text style={styles.boldText}>Type</Text>*/}
//               {/*    <Text style={styles.subText} />*/}
//               {/*  </View>*/}
//               {/*</View>*/}
//               {/*<View style={styles.hrWrapper} />*/}
//               {/*<View style={styles.cardBoxInner}>*/}
//               {/*  <View style={{flexDirection: 'column'}}>*/}
//               {/*    <Text style={styles.boldText}>Due Date</Text>*/}
//               {/*    <Text style={styles.subText} />*/}
//               {/*  </View>*/}
//               {/*</View>*/}
//               {/*<View style={styles.hrWrapper} />*/}
//               {/*<View style={styles.cardBoxInner}>*/}
//               {/*  <View style={{flexDirection: 'column'}}>*/}
//               {/*    <Text style={styles.boldText}>Graded Point</Text>*/}
//               {/*    <Text style={styles.subText} />*/}
//               {/*  </View>*/}
//               {/*</View>*/}
//             </ScrollView>
//           </View>
//           <View style={{...styles.cardBox, flex: 1}}>
//             <View style={{width: '100%'}}>
//               <Text
//                 style={{
//                   textAlign: 'center',
//                   fontWeight: 'bold',
//                   fontSize: 20,
//                   color: '#253658',
//                 }}>
//                 Report Attachments
//               </Text>
//             </View>
//             <View style={styles.hrWrapper} />
//             <View style={styles.innerContainer}>
//               <FlatList
//                 data={documentReportDetail}
//                 showsVerticalScrollIndicator={false}
//                 renderItem={renderItem}
//                 keyExtractor={item => item?.id}
//               />
//             </View>
//           </View>
//         </View>
//       )}
//     </SafeAreaView>
//   );
// };
//
// const styles = ScaledSheet.create({
//   container: {
//     backgroundColor: '#253658',
//     flex: 1,
//   },
//   innerContainer: {
//     flex: 1,
//     paddingHorizontal: 10,
//     marginTop: 0,
//     paddingVertical: 0,
//     paddingBottom: 0,
//   },
//   cardBox: {
//     margin: 10,
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 0,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4.84,
//     elevation: 5,
//     height: 350,
//   },
//   cardBoxDocuments: {
//     margin: 5,
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 0,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4.84,
//     elevation: 5,
//   },
//
//   cardBoxInner: {
//     marginBottom: 10,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   boldText: {
//     color: '#253658',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   subText: {
//     marginLeft: 3,
//     marginTop: 10,
//     color: '#3d3c3c',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   textTitle: {
//     marginHorizontal: 0,
//     marginVertical: 10,
//     color: '#3d3c3c',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   hrWrapper: {
//     marginVertical: 20,
//     borderBottomColor: '#ccc',
//     borderBottomWidth: 1,
//   },
//   descWrapper: {
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
//     marginTop: 0,
//   },
//   viewBtnWrapper: {
//     width: '100%',
//     backgroundColor: 'transparent',
//     justifyContent: 'center',
//     alignItems: 'flex-end',
//     // marginTop: '10%',
//   },
//   viewBtnTouchWrapper: {
//     backgroundColor: '#fff',
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     marginRight: 0,
//     paddingHorizontal: 0,
//   },
//   viewBtnTextStyle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     paddingRight: 0,
//   },
//   actionWrapper: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
// });
//
// export default ReportDetailScreen;
