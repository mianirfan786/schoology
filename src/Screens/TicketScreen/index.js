import React, {useState, useEffect, useRef} from 'react';
import {
  ActivityIndicator,
  Button,
  Dimensions,
  FlatList,
  Image,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
// import DocumentPicker from 'react-native-document-picker';
import {Field, Formik} from 'formik';
import * as yup from 'yup';
import {ScaledSheet} from 'react-native-size-matters';
import PlusIcon from '../../Assets/Icons/PlusIcon';
import {SafeAreaView} from 'react-native-safe-area-context';
import TicketIcon from '../../Assets/Icons/TicketIcon';
import {Dropdown} from 'react-native-element-dropdown';

const TicketScreen = ({
  width,
  height,
  navigation,
  ticketScreenLoader,
  handleViewMore,
  ticketsSelection,
  loginValidationSchema,
  handleSubmitTicket,
  openSheet,
  refRBSheet,
  TeacherListSelection,
  setTeacher_Key,
  value,
  setIsFocus,
  isFocus,
  setValue,
  studentArray,
  valueParent,
  setValueParent,
  isFocusParent,
  setIsFocusParent,
  onRefresh,
  refreshing,
  fileUri,
  pickDocument,
  LoadMoreRandomData,
  ticketCreateLoader,
}) => {
  console.log('fileUri in TicketScreen :', fileUri);
  console.log(
    'TeacherListSelection?.assignedUser :',
    TeacherListSelection?.assignedUser,
  );

  // const display = () => {
  //   if (fileUri.type === 'image/jpeg' || fileUri.type === 'image/heic') {
  //     return <Image source={{uri: fileUri.uri}} style={styles.image} />;
  //   } else if (fileUri.type === 'application/pdf') {
  //     return (
  //       <View style={styles.pdfContainer}>
  //         <Text style={styles.pdfText}>File name: {fileUri.name}</Text>
  //         <Text style={styles.pdfText}>File type: {fileUri.type}</Text>
  //         <Text style={styles.pdfText}>File size: {fileUri.size}</Text>
  //         <Text style={styles.pdfText}>File uri: {fileUri.uri}</Text>
  //       </View>
  //     );
  //   } else {
  //     console.log('No file');
  //   }
  // };

  const renderItem = ({item}) => (
    <View style={styles.cardBox}>
      <View style={styles.cardBoxInner}>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.boldText}>Ticket Number</Text>
          <Text style={styles.subText}> {item?.ticket_no} </Text>
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
              item?.ticketstatus === 'Open'
                ? styles.colorOpenBg
                : item?.ticketstatus === 'Closed'
                ? styles.colorClosedBg
                : item?.ticketstatus === 'Wait For Response'
                ? styles.colorPendingBg
                : null,
            ]}>
            <Text
              style={[
                styles.subText,
                item?.ticketstatus === 'Open'
                  ? styles.colorOpen
                  : item?.ticketstatus === 'Closed'
                  ? styles.colorClosed
                  : item?.ticketstatus === 'Wait For Response'
                  ? styles.colorpending
                  : null,
              ]}>
              {item?.ticketstatus === 'Wait For Response'
                ? 'Pending'
                : item?.ticketstatus}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.cardBoxInner}>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.boldText}>Assigned To</Text>
          <Text style={styles.subText}>{item?.assigned_user_id?.label}</Text>
        </View>
      </View>
      <View style={styles.cardBoxInner}>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.boldText}>School year</Text>
          <Text style={styles.subText}>{item?.cf_5236}</Text>
        </View>
      </View>

      <View style={styles.hrWrapper} />
      <View style={styles.descWrapper}>
        <Text style={styles.boldText}>Title:</Text>
        <Text style={styles.textTitle}>{item?.ticket_title}</Text>
      </View>

      <View style={styles.hrWrapper} />
      <View style={styles.viewBtnWrapper}>
        <TouchableOpacity
          style={styles.viewBtnTouchWrapper}
          onPress={() => handleViewMore(item)}
          activeOpacity={0.5}>
          <Text style={styles.viewBtnTextStyle}>View More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      {ticketScreenLoader && (
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
        <StatusBar translucent barStyle="light-content" />
      </View>
      <View style={styles.innerContainer}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#fff',
              borderRadius: 20,
              // width: '42%',
              borderWidth: 3,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginRight: 20,
              paddingHorizontal: 20,
            }}
            onPress={() => openSheet()}
            activeOpacity={0.5}>
            <PlusIcon width={22} height={22} color={'#253658'} />
            <Text
              style={{
                paddingVertical: 10,
                paddingLeft: 20,
                fontSize: 16,
                fontWeight: 'bold',
                color: '#253658',
              }}>
              Add Ticket
            </Text>
          </TouchableOpacity>
        </View>

        {ticketsSelection ? (
          <FlatList
            data={ticketsSelection}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={item => item?.id}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            onEndReached={() => {
              console.log('endreached finally');
              LoadMoreRandomData();
            }}
            onEndReachedThreshold={1}
          />
        ) : (
          <Text>no flatlist</Text>
        )}
      </View>

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={height / 1.3}
        // height={ action === "share" ? Dimensions.get("screen").height / 3 : Dimensions.get("screen").height / 1.5 }
        closeOnPressBack={true}
        openDuration={50}
        customStyles={{
          wrapper: {
            // backgroundColor: '#e2f6fa',
          },
          draggableIcon: {
            backgroundColor: 'grey',
          },
          container: {
            borderRadius: 15,
            // backgroundColor: theme.backgroundColor,
          },
        }}>
        <View>
          <View style={styles.rbsheetMainWrapper}>
            <Text style={styles.rbSheetTicketStyle}>Create Ticket</Text>

            <View style={styles.formFieldsWrapper}>
              <Formik
                validationSchema={loginValidationSchema}
                initialValues={{title: '', teacher_name: '', description: ''}}
                onSubmit={values => handleSubmitTicket(values)}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  isValid,
                }) => (
                  <View style={{height: '95%'}}>
                    <Text
                      style={{
                        color: '#000',
                        fontSize: 15,
                        marginLeft: '4%',
                        marginBottom: 10,
                      }}>
                      Title
                    </Text>
                    <TextInput
                      name="title"
                      placeholder="Enter Title"
                      style={{
                        ...styles.textInput,
                        backgroundColor: 'white',
                        opacity: 1,
                        padding: 15,
                        borderRadius: 15,
                        color: '#253658',
                        borderWidth: 1,
                        borderColor: '#253658',
                      }}
                      placeholderTextColor={'#ccc'}
                      onChangeText={handleChange('title')}
                      onBlur={handleBlur('title')}
                      value={values.title}
                    />
                    {errors.title && (
                      <Text
                        style={{
                          fontSize: 14,
                          marginTop: 10,
                          marginLeft: 10,
                          color: 'red',
                        }}>
                        {errors.title}
                      </Text>
                    )}
                    <Text
                      style={{
                        color: '#000',
                        fontSize: 15,
                        marginLeft: '4%',
                        top: '2%',
                      }}>
                      Description
                    </Text>
                    <TextInput
                      name="description"
                      placeholder="Enter your Description"
                      style={{
                        ...styles.textInput,
                        backgroundColor: 'white',
                        opacity: 1,
                        padding: 15,
                        borderRadius: 15,
                        color: '#253658',
                        borderWidth: 1,
                        borderColor: '#253658',
                        marginTop: 20,
                        resize: 'none',
                        height: 100,
                      }}
                      multiline={true}
                      placeholderTextColor={'#ccc'}
                      onChangeText={handleChange('description')}
                      onBlur={handleBlur('description')}
                      value={values.description}
                    />
                    {errors.description && (
                      <Text style={{fontSize: 10, color: 'red'}}>
                        {errors.description}
                      </Text>
                    )}
                    <View style={{marginVertical: 10}}>
                      <Text
                        style={{
                          color: '#000',
                          fontSize: 15,
                          marginLeft: '4%',
                          marginBottom: 10,
                        }}>
                        Select a teacher
                      </Text>
                      <Dropdown
                        style={[
                          styles.dropdown,
                          {
                            backgroundColor: '#fff',
                            borderColor: '#253658',
                            borderWidth: 1,
                            borderRadius: 12,
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            color: '#253658',
                          },
                          isFocus && {borderColor: '#253658', color: '#253658'},
                        ]}
                        placeholderStyle={[
                          styles.placeholderStyle,
                          {color: '#253658'},
                        ]}
                        selectedTextStyle={[
                          styles.selectedTextStyle,
                          {color: '#253658'},
                        ]}
                        inputSearchStyle={[
                          styles.inputSearchStyle,
                          {color: '#253658'},
                        ]}
                        iconStyle={styles.iconStyle}
                        itemTextStyle={{color: '#253658'}}
                        data={TeacherListSelection?.assignedUser}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Select Teacher' : '...'}
                        searchPlaceholder="Search..."
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        defaultNull={true}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                          setValue(item.value);
                          setTeacher_Key(item);
                          setIsFocus(false);
                        }}
                        renderLeftIcon={() => (
                          <View style={{marginRight: 10}}>
                            <TicketIcon
                              color={'#253658'}
                              width={23}
                              height={23}
                            />
                          </View>
                        )}
                      />
                    </View>
                    {/*<View style={styles.dropdownStudentWrapper}>*/}
                    {/*  <Dropdown*/}
                    {/*    style={[*/}
                    {/*      styles.dropdown,*/}
                    {/*      {*/}
                    {/*        backgroundColor: '#fff',*/}
                    {/*        borderColor: '#253658',*/}
                    {/*        borderWidth: 1,*/}
                    {/*        borderRadius: 12,*/}
                    {/*        paddingHorizontal: 10,*/}
                    {/*        paddingVertical: 5,*/}
                    {/*        color: '#253658',*/}
                    {/*      },*/}
                    {/*      isFocusParent && {*/}
                    {/*        borderColor: '#253658',*/}
                    {/*        color: '#253658',*/}
                    {/*      },*/}
                    {/*    ]}*/}
                    {/*    placeholderStyle={[*/}
                    {/*      styles.placeholderStyle,*/}
                    {/*      {color: '#253658'},*/}
                    {/*    ]}*/}
                    {/*    selectedTextStyle={[*/}
                    {/*      styles.selectedTextStyle,*/}
                    {/*      {color: '#253658'},*/}
                    {/*    ]}*/}
                    {/*    inputSearchStyle={[*/}
                    {/*      styles.inputSearchStyle,*/}
                    {/*      {color: '#253658'},*/}
                    {/*    ]}*/}
                    {/*    iconStyle={styles.iconStyle}*/}
                    {/*    data={studentArray}*/}
                    {/*    itemTextStyle={{color: '#253658'}}*/}
                    {/*    search*/}
                    {/*    maxHeight={300}*/}
                    {/*    labelField="label"*/}
                    {/*    valueField="value"*/}
                    {/*    placeholder={!isFocusParent ? 'Select Student' : '...'}*/}
                    {/*    searchPlaceholder="Search..."*/}
                    {/*    value={valueParent}*/}
                    {/*    onFocus={() => setIsFocusParent(true)}*/}
                    {/*    onBlur={() => setIsFocusParent(false)}*/}
                    {/*    onChange={item => {*/}
                    {/*      setValueParent(item.value);*/}
                    {/*      setIsFocusParent(false);*/}
                    {/*    }}*/}
                    {/*    renderLeftIcon={() => (*/}
                    {/*      <View style={{marginRight: 10}}>*/}
                    {/*        <TicketIcon*/}
                    {/*          color={'#253658'}*/}
                    {/*          width={23}*/}
                    {/*          height={23}*/}
                    {/*        />*/}
                    {/*      </View>*/}
                    {/*    )}*/}
                    {/*  />*/}
                    {/*</View>*/}
                    <Text
                      style={{
                        color: '#000',
                        fontSize: 15,
                        marginLeft: '4%',
                        marginBottom: 4,
                      }}>
                      Upload
                    </Text>
                    <TouchableOpacity
                      style={{
                        borderWidth: 1,
                        borderRadius: 10,
                        padding: 15,
                        marginTop: 10,
                      }}
                      onPress={pickDocument}>
                      <Text style={{color: '#000', fontWeight: '600'}}>
                        {fileUri ? fileUri?.name : 'Upload Document'}
                      </Text>
                    </TouchableOpacity>
                    <View style={{position: 'absolute', bottom: 0}}>
                      <TouchableOpacity
                        onPress={handleSubmit}
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 10,
                          width: width - 40,
                          height: 50,
                          backgroundColor: '#253658',
                        }}
                        activeOpacity={0.5}>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: 18,
                            fontWeight: 'bold',
                          }}>
                          {ticketCreateLoader ? (
                            <ActivityIndicator color={'#fff'} />
                          ) : (
                            'Submit'
                          )}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </Formik>
            </View>
          </View>
        </View>
      </RBSheet>
    </View>
  );
};

const styles = ScaledSheet.create({
  safeWrapper: {
    flex: 1,
  },
  container: {
    backgroundColor: '#253658',
    flex: 1,
    paddingBottom: 50,
  },
  innerContainer: {
    paddingHorizontal: 10,
    marginTop: 0,
    paddingVertical: 10,
  },
  cardBox: {
    margin: 10,
    marginBottom: '3%',
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
    marginTop: 10,
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
    marginHorizontal: 20,
    color: '#3d3c3c',
  },
  hrWrapper: {
    marginVertical: 20,
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5,
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
    color: '#253658',
  },

  rbsheetMainWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  rbSheetTicketStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#253658',
    textAlign: 'center',
  },
  formFieldsWrapper: {
    backgroundColor: 'transparent',
    marginTop: 20,
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
  image: {
    width: 200,
    height: 200,
  },
  pdfContainer: {
    height: '50%',
    width: '100%',
    padding: 20,
    overflow: 'hidden',
  },
  pdfText: {
    fontSize: 15,
  },
});

export default TicketScreen;

// import React, {useState, useEffect, useRef} from 'react';
// import {
//   ActivityIndicator,
//   Button,
//   Dimensions,
//   FlatList,
//   Image,
//   StatusBar,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   RefreshControl,
// } from 'react-native';
// import RBSheet from 'react-native-raw-bottom-sheet';
// // import DocumentPicker from 'react-native-document-picker';
// import {Field, Formik} from 'formik';
// import * as yup from 'yup';
// import {ScaledSheet} from 'react-native-size-matters';
// import PlusIcon from '../../Assets/Icons/PlusIcon';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import TicketIcon from '../../Assets/Icons/TicketIcon';
// import {Dropdown} from 'react-native-element-dropdown';
//
// const TicketScreen = ({
//   width,
//   height,
//   navigation,
//   ticketScreenLoader,
//   handleViewMore,
//   ticketsSelection,
//   loginValidationSchema,
//   handleSubmitTicket,
//   openSheet,
//   refRBSheet,
//   TeacherListSelection,
//   setTeacher_Key,
//   value,
//   setIsFocus,
//   isFocus,
//   setValue,
//   studentArray,
//   valueParent,
//   setValueParent,
//   isFocusParent,
//   setIsFocusParent,
//   onRefresh,
//   refreshing,
//   fileUri,
//   pickDocument,
//   LoadMoreRandomData,
//   ticketCreateLoader,
// }) => {
//   console.log('fileUri in TicketScreen :', fileUri);
//
//   // const display = () => {
//   //   if (fileUri.type === 'image/jpeg' || fileUri.type === 'image/heic') {
//   //     return <Image source={{uri: fileUri.uri}} style={styles.image} />;
//   //   } else if (fileUri.type === 'application/pdf') {
//   //     return (
//   //       <View style={styles.pdfContainer}>
//   //         <Text style={styles.pdfText}>File name: {fileUri.name}</Text>
//   //         <Text style={styles.pdfText}>File type: {fileUri.type}</Text>
//   //         <Text style={styles.pdfText}>File size: {fileUri.size}</Text>
//   //         <Text style={styles.pdfText}>File uri: {fileUri.uri}</Text>
//   //       </View>
//   //     );
//   //   } else {
//   //     console.log('No file');
//   //   }
//   // };
//
//   const renderItem = ({item}) => (
//     <View style={styles.cardBox}>
//       <View style={styles.cardBoxInner}>
//         <View style={{flexDirection: 'column'}}>
//           <Text style={styles.boldText}>Ticket Number</Text>
//           <Text style={styles.subText}> {item?.ticket_no} </Text>
//         </View>
//
//         <View
//           style={{
//             flexDirection: 'column',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}>
//           <Text style={styles.boldText}>status</Text>
//           <View
//             style={[
//               item?.ticketstatus === 'Open'
//                 ? styles.colorOpenBg
//                 : item?.ticketstatus === 'Closed'
//                 ? styles.colorClosedBg
//                 : item?.ticketstatus === 'Wait For Response'
//                 ? styles.colorPendingBg
//                 : null,
//             ]}>
//             <Text
//               style={[
//                 styles.subText,
//                 item?.ticketstatus === 'Open'
//                   ? styles.colorOpen
//                   : item?.ticketstatus === 'Closed'
//                   ? styles.colorClosed
//                   : item?.ticketstatus === 'Wait For Response'
//                   ? styles.colorpending
//                   : null,
//               ]}>
//               {item?.ticketstatus === 'Wait For Response'
//                 ? 'Pending'
//                 : item?.ticketstatus}
//             </Text>
//           </View>
//         </View>
//       </View>
//
//       <View style={styles.cardBoxInner}>
//         <View style={{flexDirection: 'column'}}>
//           <Text style={styles.boldText}>Assigned To</Text>
//           <Text style={styles.subText}>{item?.assigned_user_id?.label}</Text>
//         </View>
//       </View>
//       <View style={styles.cardBoxInner}>
//         <View style={{flexDirection: 'column'}}>
//           <Text style={styles.boldText}>School year</Text>
//           <Text style={styles.subText}>{item?.cf_5236}</Text>
//         </View>
//       </View>
//
//       <View style={styles.hrWrapper} />
//       <View style={styles.descWrapper}>
//         <Text style={styles.boldText}>Title:</Text>
//         <Text style={styles.textTitle}>{item?.ticket_title}</Text>
//       </View>
//
//       <View style={styles.hrWrapper} />
//       <View style={styles.viewBtnWrapper}>
//         <TouchableOpacity
//           style={styles.viewBtnTouchWrapper}
//           onPress={() => handleViewMore(item)}
//           activeOpacity={0.5}>
//           <Text style={styles.viewBtnTextStyle}>View More</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
//   return (
//     <View style={styles.container}>
//       {ticketScreenLoader && (
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
//         <StatusBar translucent barStyle="light-content" />
//       </View>
//       <View style={styles.innerContainer}>
//         <View
//           style={{
//             width: '100%',
//             flexDirection: 'row',
//             justifyContent: 'flex-end',
//           }}>
//           <TouchableOpacity
//             style={{
//               backgroundColor: '#fff',
//               borderRadius: 20,
//               // width: '42%',
//               borderWidth: 3,
//               flexDirection: 'row',
//               justifyContent: 'flex-end',
//               alignItems: 'center',
//               marginRight: 20,
//               paddingHorizontal: 20,
//             }}
//             onPress={() => openSheet()}
//             activeOpacity={0.5}>
//             <PlusIcon width={22} height={22} color={'#253658'} />
//             <Text
//               style={{
//                 paddingVertical: 10,
//                 paddingLeft: 20,
//                 fontSize: 16,
//                 fontWeight: 'bold',
//                 color: '#253658',
//               }}>
//               Add Ticket
//             </Text>
//           </TouchableOpacity>
//         </View>
//
//         {ticketsSelection ? (
//           <FlatList
//             data={ticketsSelection}
//             showsVerticalScrollIndicator={false}
//             renderItem={renderItem}
//             keyExtractor={item => item?.id}
//             refreshControl={
//               <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//             }
//             onEndReached={() => {
//               console.log('endreached finally');
//               LoadMoreRandomData();
//             }}
//             onEndReachedThreshold={1}
//           />
//         ) : (
//           <Text>no flatlist</Text>
//         )}
//       </View>
//
//       <RBSheet
//         ref={refRBSheet}
//         closeOnDragDown={true}
//         closeOnPressMask={true}
//         height={height / 1.3}
//         // height={ action === "share" ? Dimensions.get("screen").height / 3 : Dimensions.get("screen").height / 1.5 }
//         closeOnPressBack={true}
//         openDuration={50}
//         customStyles={{
//           wrapper: {
//             // backgroundColor: '#e2f6fa',
//           },
//           draggableIcon: {
//             backgroundColor: 'grey',
//           },
//           container: {
//             borderRadius: 15,
//             // backgroundColor: theme.backgroundColor,
//           },
//         }}>
//         <View>
//           <View style={styles.rbsheetMainWrapper}>
//             <Text style={styles.rbSheetTicketStyle}>Create Ticket</Text>
//
//             <View style={styles.formFieldsWrapper}>
//               <Formik
//                 validationSchema={loginValidationSchema}
//                 initialValues={{title: '', teacher_name: '', description: ''}}
//                 onSubmit={values => handleSubmitTicket(values)}>
//                 {({
//                   handleChange,
//                   handleBlur,
//                   handleSubmit,
//                   values,
//                   errors,
//                   isValid,
//                 }) => (
//                   <View style={{height: '95%'}}>
//                     <TextInput
//                       name="title"
//                       placeholder="Enter Title"
//                       style={{
//                         ...styles.textInput,
//                         backgroundColor: 'white',
//                         opacity: 1,
//                         padding: 15,
//                         borderRadius: 15,
//                         color: '#253658',
//                         borderWidth: 1,
//                         borderColor: '#253658',
//                       }}
//                       placeholderTextColor={'#ccc'}
//                       onChangeText={handleChange('title')}
//                       onBlur={handleBlur('title')}
//                       value={values.title}
//                     />
//                     {errors.title && (
//                       <Text
//                         style={{
//                           fontSize: 14,
//                           marginTop: 10,
//                           marginLeft: 10,
//                           color: 'red',
//                         }}>
//                         {errors.title}
//                       </Text>
//                     )}
//                     <TextInput
//                       name="description"
//                       placeholder="Enter your Description"
//                       style={{
//                         ...styles.textInput,
//                         backgroundColor: 'white',
//                         opacity: 1,
//                         padding: 15,
//                         borderRadius: 15,
//                         color: '#253658',
//                         borderWidth: 1,
//                         borderColor: '#253658',
//                         marginTop: 20,
//                         resize: 'none',
//                         height: 100,
//                       }}
//                       multiline={true}
//                       placeholderTextColor={'#ccc'}
//                       onChangeText={handleChange('description')}
//                       onBlur={handleBlur('description')}
//                       value={values.description}
//                     />
//                     {errors.description && (
//                       <Text style={{fontSize: 10, color: 'red'}}>
//                         {errors.description}
//                       </Text>
//                     )}
//                     <View style={{marginVertical: 10}}>
//                       <Dropdown
//                         style={[
//                           styles.dropdown,
//                           {
//                             backgroundColor: '#fff',
//                             borderColor: '#253658',
//                             borderWidth: 1,
//                             borderRadius: 12,
//                             paddingHorizontal: 10,
//                             paddingVertical: 5,
//                             color: '#253658',
//                           },
//                           isFocus && {borderColor: '#253658', color: '#253658'},
//                         ]}
//                         placeholderStyle={[
//                           styles.placeholderStyle,
//                           {color: '#253658'},
//                         ]}
//                         selectedTextStyle={[
//                           styles.selectedTextStyle,
//                           {color: '#253658'},
//                         ]}
//                         inputSearchStyle={[
//                           styles.inputSearchStyle,
//                           {color: '#253658'},
//                         ]}
//                         iconStyle={styles.iconStyle}
//                         itemTextStyle={{color: '#253658'}}
//                         data={TeacherListSelection?.assignedUser}
//                         search
//                         maxHeight={300}
//                         labelField="label"
//                         valueField="value"
//                         placeholder={!isFocus ? 'Select Teacher' : '...'}
//                         searchPlaceholder="Search..."
//                         value={value}
//                         onFocus={() => setIsFocus(true)}
//                         onBlur={() => setIsFocus(false)}
//                         onChange={item => {
//                           setValue(item.value);
//                           setTeacher_Key(item);
//                           setIsFocus(false);
//                         }}
//                         renderLeftIcon={() => (
//                           <View style={{marginRight: 10}}>
//                             <TicketIcon
//                               color={'#253658'}
//                               width={23}
//                               height={23}
//                             />
//                           </View>
//                         )}
//                       />
//                     </View>
//                     <View style={styles.dropdownStudentWrapper}>
//                       <Dropdown
//                         style={[
//                           styles.dropdown,
//                           {
//                             backgroundColor: '#fff',
//                             borderColor: '#253658',
//                             borderWidth: 1,
//                             borderRadius: 12,
//                             paddingHorizontal: 10,
//                             paddingVertical: 5,
//                             color: '#253658',
//                           },
//                           isFocusParent && {
//                             borderColor: '#253658',
//                             color: '#253658',
//                           },
//                         ]}
//                         placeholderStyle={[
//                           styles.placeholderStyle,
//                           {color: '#253658'},
//                         ]}
//                         selectedTextStyle={[
//                           styles.selectedTextStyle,
//                           {color: '#253658'},
//                         ]}
//                         inputSearchStyle={[
//                           styles.inputSearchStyle,
//                           {color: '#253658'},
//                         ]}
//                         iconStyle={styles.iconStyle}
//                         data={studentArray}
//                         itemTextStyle={{color: '#253658'}}
//                         search
//                         maxHeight={300}
//                         labelField="label"
//                         valueField="value"
//                         placeholder={!isFocusParent ? 'Select Student' : '...'}
//                         searchPlaceholder="Search..."
//                         value={valueParent}
//                         onFocus={() => setIsFocusParent(true)}
//                         onBlur={() => setIsFocusParent(false)}
//                         onChange={item => {
//                           setValueParent(item.value);
//                           setIsFocusParent(false);
//                         }}
//                         renderLeftIcon={() => (
//                           <View style={{marginRight: 10}}>
//                             <TicketIcon
//                               color={'#253658'}
//                               width={23}
//                               height={23}
//                             />
//                           </View>
//                         )}
//                       />
//                     </View>
//                     <TouchableOpacity
//                       style={{
//                         borderWidth: 1,
//                         borderRadius: 10,
//                         padding: 15,
//                         marginTop: 10,
//                       }}
//                       onPress={pickDocument}>
//                       <Text style={{color: '#000', fontWeight: '600'}}>
//                         {fileUri ? fileUri?.name : 'Upload Document'}
//                       </Text>
//                     </TouchableOpacity>
//                     <View style={{position: 'absolute', bottom: 0}}>
//                       <TouchableOpacity
//                         onPress={handleSubmit}
//                         style={{
//                           justifyContent: 'center',
//                           alignItems: 'center',
//                           borderRadius: 10,
//                           width: width - 40,
//                           height: 50,
//                           backgroundColor: '#253658',
//                         }}
//                         activeOpacity={0.5}>
//                         <Text
//                           style={{
//                             color: '#fff',
//                             fontSize: 18,
//                             fontWeight: 'bold',
//                           }}>
//                           {ticketCreateLoader ? (
//                             <ActivityIndicator color={'#fff'} />
//                           ) : (
//                             'Submit'
//                           )}
//                         </Text>
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                 )}
//               </Formik>
//             </View>
//           </View>
//         </View>
//       </RBSheet>
//     </View>
//   );
// };
//
// const styles = ScaledSheet.create({
//   safeWrapper: {
//     flex: 1,
//   },
//   container: {
//     backgroundColor: '#253658',
//     flex: 1,
//     paddingBottom: 50,
//   },
//   innerContainer: {
//     paddingHorizontal: 10,
//     marginTop: 0,
//     paddingVertical: 10,
//   },
//   cardBox: {
//     margin: 10,
//     marginBottom: '3%',
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
//   cardBoxInner: {
//     marginTop: 10,
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
//     marginHorizontal: 20,
//     color: '#3d3c3c',
//   },
//   hrWrapper: {
//     marginVertical: 20,
//     borderBottomColor: '#ccc',
//     borderBottomWidth: 0.5,
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
//     color: '#253658',
//   },
//
//   rbsheetMainWrapper: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//   },
//   rbSheetTicketStyle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#253658',
//     textAlign: 'center',
//   },
//   formFieldsWrapper: {
//     backgroundColor: 'transparent',
//     marginTop: 20,
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
//   image: {
//     width: 200,
//     height: 200,
//   },
//   pdfContainer: {
//     height: '50%',
//     width: '100%',
//     padding: 20,
//     overflow: 'hidden',
//   },
//   pdfText: {
//     fontSize: 15,
//   },
// });
//
// export default TicketScreen;
