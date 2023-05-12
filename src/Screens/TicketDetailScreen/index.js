import React from 'react';
import {
  FlatList,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {ScaledSheet} from 'react-native-size-matters';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackArrow from '../../Assets/Icons/BackArrow';
import DownloadIcon from '../../Assets/Icons/DownloadIcon';
import {ScrollView} from 'react-native-gesture-handler';

const TicketDetailScreen = ({
                              navigation,
                              handleBack,
                              itemData,
                              documentTicketDetail,
                              loadingFullScreen,
                              handleDownloadCertificate,
                              downlaodTicketData,
                            }) => {
  console.log('Document Ticket Detail :', documentTicketDetail);
  const renderItem = ({item}) => (
    <View style={styles.cardBoxDocuments}>
      {/*<View style={styles.cardBoxInner}>*/}
      {/*  <View style={{flexDirection: 'column'}}>*/}
      {/*    <Text style={styles.boldText}>Document No</Text>*/}
      {/*    <Text style={styles.subText}>{item?.note_no}</Text>*/}
      {/*  </View>*/}

      {/*  <View style={{flexDirection: 'column'}}>*/}
      {/*    <Text style={styles.boldText}>Assigned To</Text>*/}
      {/*    <Text style={styles.subText}>{item?.assigned_user_id?.label}</Text>*/}
      {/*  </View>*/}
      {/*</View>*/}

      <View style={styles.hrWrapper} />
      <View style={styles.descWrapper}>
        <Text style={styles.boldText}>Title:</Text>
        <Text style={styles.textTitle}>{item?.filename}</Text>
      </View>
      <View style={styles.hrWrapper} />
      <View style={styles.viewBtnWrapper}>
        <Text style={styles.viewBtnTextStyle}>Action</Text>
        <TouchableOpacity
          style={styles.viewBtnTouchWrapper}
          activeOpacity={0.5}
          onPress={() => handleDownloadCertificate(item?.id, item?.type, item?.notes_title)}>
          <DownloadIcon color={'red'} height={20} width={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.StatusBar}>
          <StatusBar translucent barStyle="dark-content" />
        </View>

        <View style={styles.cardBox}>
          <View style={{width: '100%', position: 'relative', marginBottom: 0}}>
            <TouchableOpacity
              style={{position: 'absolute', left: 0, zIndex: 1}}
              onPress={handleBack}
              activeOpacity={0.5}>
              <BackArrow width={26} height={26} color={'#253658'} />
            </TouchableOpacity>

            <Text style={{textAlign: 'center', fontSize: 20, color: '#253658'}}>
              Tickets
            </Text>
          </View>
          <ScrollView style={{height: 400}}>
            <View>
              <View style={styles.hrWrapper} />

              <View style={styles.cardBoxInner}>
                <View style={{flexDirection: 'column'}}>
                  <Text style={styles.boldText}>Ticket Number</Text>
                  <Text style={styles.subText}>{itemData?.ticket_no}</Text>
                </View>

                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.boldText}>status</Text>

                  <View
                    style={[
                      itemData?.ticketstatus === 'Open'
                        ? styles.colorOpenBg
                        : itemData?.ticketstatus === 'Closed'
                          ? styles.colorClosedBg
                          : itemData?.ticketstatus === 'Wait For Response'
                            ? styles.colorPendingBg
                            : null,
                    ]}>
                    <Text
                      style={[
                        styles.subText,
                        itemData?.ticketstatus === 'Open'
                          ? styles.colorOpen
                          : itemData?.ticketstatus === 'Closed'
                            ? styles.colorClosed
                            : itemData?.ticketstatus === 'Wait For Response'
                              ? styles.colorpending
                              : null,
                      ]}>
                      {itemData?.ticketstatus === 'Wait For Response'
                        ? 'Pending'
                        : itemData?.ticketstatus}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.cardBoxInner}>
                <View style={{flexDirection: 'column'}}>
                  <Text style={styles.boldText}>Assigned To</Text>
                  <Text style={styles.subText}>
                    {itemData?.assigned_user_id?.label}
                  </Text>
                </View>
              </View>

              <View style={styles.cardBoxInner}>
                <View style={{flexDirection: 'column'}}>
                  <Text style={styles.boldText}>School year</Text>
                  <Text style={styles.subText}>{itemData?.cf_5236}</Text>
                </View>
              </View>

              <View style={styles.hrWrapper} />
              <View style={styles.descWrapper}>
                <Text style={styles.boldText}>Title:</Text>
                <Text style={styles.textTitle}>{itemData?.ticket_title}</Text>
              </View>
              <View style={styles.hrWrapper} />
              <View style={styles.descWrapper}>
                <Text style={styles.boldText}>Description:</Text>
                <Text style={styles.textTitle}>{itemData?.description}</Text>
              </View>

              <View style={styles.hrWrapper} />
              <View style={styles.descWrapper}>
                <Text style={styles.boldText}>Solution:</Text>
                <Text style={styles.textTitle}>{itemData?.solution}</Text>
              </View>
            </View>
          </ScrollView>
        </View>

        <View style={{...styles.cardBox, flex: 1}}>
          <View style={{width: '100%'}}>
            <Text style={{textAlign: 'center', fontSize: 20, color: '#253658'}}>
              Attachments
            </Text>
          </View>
          <View style={styles.hrWrapper} />
          <View style={styles.innerContainer}>
            <FlatList
              data={documentTicketDetail}
              showsVerticalScrollIndicator={false}
              renderItem={renderItem}
              keyExtractor={item => item}
            />
          </View>
        </View>
      </View>
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
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boldText: {
    color: '#253658',
    fontSize: 14,
    fontWeight: 'bold',
  },
  subText: {
    marginLeft: 3,
    marginTop: 10,
    color: '#3d3c3c',
  },
  textTitle: {
    marginTop: 10,
    marginHorizontal: 0,
    color: '#3d3c3c',
  },
  hrWrapper: {
    marginVertical: 20,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  descWrapper: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 0,
  },
  viewBtnWrapper: {
    width: '100%',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    color: '#253658',
  },
  colorOpenBg: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(51,222,24,0.15)',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 100,
  },
  colorClosedBg: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(204,15,30,0.15)',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 100,
  },
  colorPendingBg: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(224,129,21,0.15)',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 100,
  },
  colorOpen: {
    marginTop: 0,
    fontWeight: 'bold',
  },
  colorClosed: {
    marginTop: 0,
    fontWeight: 'bold',
  },
  colorpending: {
    marginTop: 0,
    fontWeight: 'bold',
  },
});

export default TicketDetailScreen;



// import React from 'react';
// import {
//   FlatList,
//   Image,
//   StatusBar,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
//
// import {ScaledSheet} from 'react-native-size-matters';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import BackArrow from '../../Assets/Icons/BackArrow';
// import DownloadIcon from '../../Assets/Icons/DownloadIcon';
// import {ScrollView} from 'react-native-gesture-handler';
//
// const TicketDetailScreen = ({
//   navigation,
//   handleBack,
//   itemData,
//   documentTicketDetail,
//   loadingFullScreen,
//   handleDownloadCertificate,
//   downlaodTicketData,
// }) => {
//   console.log('Document Ticket Detail :', documentTicketDetail);
//   const renderItem = ({item}) => (
//     <View style={styles.cardBoxDocuments}>
//       <View style={styles.cardBoxInner}>
//         <View style={{flexDirection: 'column'}}>
//           <Text style={styles.boldText}>Document No</Text>
//           <Text style={styles.subText}>{item?.note_no}</Text>
//         </View>
//
//         <View style={{flexDirection: 'column'}}>
//           <Text style={styles.boldText}>Assigned To</Text>
//           <Text style={styles.subText}>{item?.assigned_user_id?.label}</Text>
//         </View>
//       </View>
//
//       <View style={styles.hrWrapper} />
//       <View style={styles.descWrapper}>
//         <Text style={styles.boldText}>Title:</Text>
//         <Text style={styles.textTitle}>{item?.filename}</Text>
//       </View>
//       <View style={styles.hrWrapper} />
//       <View style={styles.viewBtnWrapper}>
//         <Text style={styles.viewBtnTextStyle}>Action</Text>
//         <TouchableOpacity
//           style={styles.viewBtnTouchWrapper}
//           activeOpacity={0.5}
//           onPress={() => handleDownloadCertificate(item?.id, item?.type, item?.notes_title)}>
//           <DownloadIcon color={'red'} height={20} width={20} />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <View style={styles.container}>
//         <View style={styles.StatusBar}>
//           <StatusBar translucent barStyle="dark-content" />
//         </View>
//
//         <View style={styles.cardBox}>
//           <View style={{width: '100%', position: 'relative', marginBottom: 0}}>
//             <TouchableOpacity
//               style={{position: 'absolute', left: 0, zIndex: 1}}
//               onPress={handleBack}
//               activeOpacity={0.5}>
//               <BackArrow width={26} height={26} color={'#253658'} />
//             </TouchableOpacity>
//
//             <Text style={{textAlign: 'center', fontSize: 20, color: '#253658'}}>
//               Tickets
//             </Text>
//           </View>
//           <ScrollView style={{height: 400}}>
//             <View>
//               <View style={styles.hrWrapper} />
//
//               <View style={styles.cardBoxInner}>
//                 <View style={{flexDirection: 'column'}}>
//                   <Text style={styles.boldText}>Ticket Number</Text>
//                   <Text style={styles.subText}>{itemData?.ticket_no}</Text>
//                 </View>
//
//                 <View
//                   style={{
//                     flexDirection: 'column',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                   }}>
//                   <Text style={styles.boldText}>status</Text>
//
//                   <View
//                     style={[
//                       itemData?.ticketstatus === 'Open'
//                         ? styles.colorOpenBg
//                         : itemData?.ticketstatus === 'Closed'
//                         ? styles.colorClosedBg
//                         : itemData?.ticketstatus === 'Wait For Response'
//                         ? styles.colorPendingBg
//                         : null,
//                     ]}>
//                     <Text
//                       style={[
//                         styles.subText,
//                         itemData?.ticketstatus === 'Open'
//                           ? styles.colorOpen
//                           : itemData?.ticketstatus === 'Closed'
//                           ? styles.colorClosed
//                           : itemData?.ticketstatus === 'Wait For Response'
//                           ? styles.colorpending
//                           : null,
//                       ]}>
//                       {itemData?.ticketstatus === 'Wait For Response'
//                         ? 'Pending'
//                         : itemData?.ticketstatus}
//                     </Text>
//                   </View>
//                 </View>
//               </View>
//
//               <View style={styles.cardBoxInner}>
//                 <View style={{flexDirection: 'column'}}>
//                   <Text style={styles.boldText}>Assigned To</Text>
//                   <Text style={styles.subText}>
//                     {itemData?.assigned_user_id?.label}
//                   </Text>
//                 </View>
//               </View>
//
//               <View style={styles.cardBoxInner}>
//                 <View style={{flexDirection: 'column'}}>
//                   <Text style={styles.boldText}>School year</Text>
//                   <Text style={styles.subText}>{itemData?.cf_5236}</Text>
//                 </View>
//               </View>
//
//               <View style={styles.hrWrapper} />
//               <View style={styles.descWrapper}>
//                 <Text style={styles.boldText}>Title:</Text>
//                 <Text style={styles.textTitle}>{itemData?.ticket_title}</Text>
//               </View>
//               <View style={styles.hrWrapper} />
//               <View style={styles.descWrapper}>
//                 <Text style={styles.boldText}>Description:</Text>
//                 <Text style={styles.textTitle}>{itemData?.description}</Text>
//               </View>
//
//               <View style={styles.hrWrapper} />
//               <View style={styles.descWrapper}>
//                 <Text style={styles.boldText}>Solution:</Text>
//                 <Text style={styles.textTitle}>{itemData?.solution}</Text>
//               </View>
//             </View>
//           </ScrollView>
//         </View>
//
//         <View style={{...styles.cardBox, flex: 1}}>
//           <View style={{width: '100%'}}>
//             <Text style={{textAlign: 'center', fontSize: 20, color: '#253658'}}>
//               Attachments
//             </Text>
//           </View>
//           <View style={styles.hrWrapper} />
//           <View style={styles.innerContainer}>
//             <FlatList
//               data={documentTicketDetail}
//               showsVerticalScrollIndicator={false}
//               renderItem={renderItem}
//               keyExtractor={item => item}
//             />
//           </View>
//         </View>
//       </View>
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
//     marginBottom: 20,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   boldText: {
//     color: '#253658',
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   subText: {
//     marginLeft: 3,
//     marginTop: 10,
//     color: '#3d3c3c',
//   },
//   textTitle: {
//     marginTop: 10,
//     marginHorizontal: 0,
//     color: '#3d3c3c',
//   },
//   hrWrapper: {
//     marginVertical: 20,
//     borderBottomColor: '#ccc',
//     borderBottomWidth: 1,
//   },
//   descWrapper: {
//     flexDirection: 'column',
//     justifyContent: 'flex-start',
//     marginTop: 0,
//   },
//   viewBtnWrapper: {
//     width: '100%',
//     backgroundColor: 'transparent',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
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
//     color: '#253658',
//   },
//   colorOpenBg: {
//     marginTop: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(51,222,24,0.15)',
//     paddingHorizontal: 20,
//     paddingVertical: 5,
//     borderRadius: 100,
//   },
//   colorClosedBg: {
//     marginTop: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(204,15,30,0.15)',
//     paddingHorizontal: 20,
//     paddingVertical: 5,
//     borderRadius: 100,
//   },
//   colorPendingBg: {
//     marginTop: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(224,129,21,0.15)',
//     paddingHorizontal: 20,
//     paddingVertical: 5,
//     borderRadius: 100,
//   },
//   colorOpen: {
//     marginTop: 0,
//     fontWeight: 'bold',
//   },
//   colorClosed: {
//     marginTop: 0,
//     fontWeight: 'bold',
//   },
//   colorpending: {
//     marginTop: 0,
//     fontWeight: 'bold',
//   },
// });
//
// export default TicketDetailScreen;
