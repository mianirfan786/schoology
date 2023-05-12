import React, { useState, useEffect } from 'react';
import {
  Image,
  ImageBackground,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import notionLogo from '../../Assets/Images/logo.png';
import pexelBG from '../../Assets/Images/notionLogo-removebg-preview.png';
import artCheck from '../../Assets/Images/artcheck.jpg';
import loginIllustration from '../../Assets/Images/handPic-removebg-preview.png';
import backImage from '../../Assets/Images/abstract.jpg';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Formik } from 'formik';
import { Dropdown } from 'react-native-element-dropdown';
import TicketIcon from '../../Assets/Icons/TicketIcon';
import RingIcon from '../../Assets/Icons/RingIcon';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = ({
  navigation,
  loadingLogin,
  handleSubmitLogin,
  handleOnChange,
  loginData,
  errorEmail,
  errorPassword,
  handleForget,
  refRBSheetForget,
  width,
  height,
  openSheetForget,
  forgetValidationSchema,
  loadingForget,
}) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/*<TouchableOpacity onPress={() => Keyboard.dismiss()}>*/}
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          enabled={true}
          //behavior={'padding'}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          {/* <View style={styles.StatusBar}>
          <StatusBar translucent barStyle="light-content" />
        </View> */}

          <ImageBackground
            source={backImage}
            resizeMode="cover"
            style={{ ...styles.image }}
          >
            <View style={{ height: height, marginTop: '15%' }}>
              <View
                style={{
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignContent: 'center',
                  width: '100%',
                  height: 100,
                }}
              >
                <Image
                  source={notionLogo}
                  style={{
                    width: '74%',
                    height: '100%',
                    resizeMode: 'contain',
                    padding: 20,
                  }}
                />
              </View>

              {/* <View
              style={{
                width: width,
                justifyContent: 'center',
                alignItems: 'center',
               marginTop: '0%',
               flexDirection:'column',
                // backgroundColor: 'red',
              }}>
                <Text style={{color:'#253658', fontSize: 40}}>
                  NOTION
                </Text>
                <Text style={{color:'#253658', fontSize: 22}}>
                Internation School
                </Text>

            </View> */}

              <View
                style={{
                  width: '100%',
                  marginTop: '15%',
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
              >
                {/* <Text
                style={{
                  fontSize: 28,
                  fontFamily: 'Arial',
                  fontWeight: 'bold',
                  color: '#253658',
                  textAlign: 'center',
                }}>
                TESTING PORTAL +923014572648
              </Text> */}

                <View style={{ marginTop: '5%', marginBottom: '5%' }}>
                  <View style={{ padding: 10 }}>
                    <TextInput
                      style={{
                        ...styles.input,
                        backgroundColor: 'white',
                        opacity: 1,
                        padding: 15,
                        borderRadius: 15,
                        color: '#383737',
                        borderWidth: 1,
                        borderColor: '#383737',
                      }}
                      keyboardType="email-address"
                      placeholder={'Enter your Email'}
                      placeholderTextColor={'#ccc'}
                      onChangeText={(e) => handleOnChange(e, 'email')}
                      value={loginData?.email}
                    />
                    <Text
                      style={{ color: 'red', marginTop: 10, marginLeft: 10 }}
                    >
                      {errorEmail ? errorEmail : null}
                    </Text>
                  </View>
                  <View style={{ padding: 10 }}>
                    <TextInput
                      style={{
                        ...styles.input,
                        backgroundColor: 'white',
                        padding: 15,
                        borderRadius: 15,
                        color: '#383737',
                        borderWidth: 1,
                        borderColor: '#383737',
                      }}
                      keyboardType="default"
                      secureTextEntry={true}
                      placeholder={'Enter your Password'}
                      placeholderTextColor={'#ccc'}
                      onChangeText={(e) => handleOnChange(e, 'password')}
                      value={loginData?.password}
                    />
                    <Text
                      style={{ color: 'red', marginTop: 10, marginLeft: 10 }}
                    >
                      {errorPassword ? errorPassword : null}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => openSheetForget()}
                    activeOpacity={0.5}
                    style={{
                      marginRight: 20,
                      alignItems: 'flex-end',
                      justifyContent: 'flex-start',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: '#253658',
                      }}
                    >
                      Forget Password
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      marginTop: '10%',
                      padding: 15,
                      marginHorizontal: 10,
                      backgroundColor: '#253658',
                      borderWidth: 1,
                      borderRadius: 15,
                      borderColor: '#253658',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={handleSubmitLogin}
                    activeOpacity={0.5}
                  >
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 20,
                        fontWeight: 'bold',
                      }}
                    >
                      {loadingLogin ? (
                        <ActivityIndicator color={'#fff'} />
                      ) : (
                        'LOGIN'
                      )}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ImageBackground>

          <RBSheet
            ref={refRBSheetForget}
            closeOnDragDown={true}
            closeOnPressMask={true}
            height={height / 2.5}
            // height={ action === "share" ? Dimensions.get("screen").height / 3 : Dimensions.get("screen").height / 1.5 }
            closeOnPressBack={true}
            openDuration={50}
            customStyles={{
              draggableIcon: {
                backgroundColor: 'grey',
              },
              container: {
                borderRadius: 15,
              },
            }}
          >
            <View>
              <View style={styles.rbsheetMainWrapper}>
                <Text style={styles.rbSheetTicketStyle}>Forget Password</Text>

                <View style={styles.formFieldsWrapper}>
                  <Formik
                    validationSchema={forgetValidationSchema}
                    initialValues={{ email: '' }}
                    onSubmit={(values) => handleForget(values)}
                  >
                    {({
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      values,
                      errors,
                      isValid,
                    }) => (
                      <View style={{ height: '95%' }}>
                        <TextInput
                          name="email"
                          placeholder="Please Enter your Email"
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
                          onChangeText={handleChange('email')}
                          placeholderTextColor={'#ccc'}
                          onBlur={handleBlur('email')}
                          value={values.email}
                        />
                        {errors.email && (
                          <Text
                            style={{
                              fontSize: 14,
                              marginTop: 10,
                              marginLeft: 10,
                              color: 'red',
                            }}
                          >
                            {errors.email}
                          </Text>
                        )}

                        <View style={{ position: 'absolute', bottom: 0 }}>
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
                            activeOpacity={0.5}
                          >
                            <Text
                              style={{
                                color: '#fff',
                                fontSize: 18,
                                fontWeight: 'bold',
                              }}
                            >
                              {loadingForget ? <ActivityIndicator /> : 'Submit'}
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
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>

      {/*</TouchableOpacity>*/}
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  rbsheetMainWrapper: {
    paddingHorizontal: 20,
    paddingBottom: '20%',
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
});

export default LoginScreen;
