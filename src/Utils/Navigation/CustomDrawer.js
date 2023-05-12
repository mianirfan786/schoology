import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useDispatch, useSelector } from "react-redux";
import {NAVIGATION_ROUTES} from './NavigationRoutes';
import { actionTypes } from "../../Store/Actions/actionsTypes";
import { ScrollView } from 'react-native-gesture-handler';


const {width} = Dimensions.get('screen');

const CustomDrawer = props => {
  const dispatch = useDispatch();
  // const stateSelection = useSelector(state => state?.profileDataReducer);

  const handleLogout = () => {
    dispatch({
      type: actionTypes.LOGIN_DATA,
      payload: {
        loginData: {
          userEmail: null,
          userPassword: null,
          Authentication: null,
        },
      },
    });
  };
  const profileSelection = useSelector(state => state?.profileDataReducer);
  // console.log(stateSelection, "state selction");

  const [profileData, setProfileData] = useState();
  // console.log(profileData, 'dfasf');
  //
  useEffect(() => {
    setProfileData(profileSelection?.profileData);
  }, [profileSelection]);
  // console.log(profileData?.company_details?.accountname, 'dsfasd');

  return (
    <View style={{position: 'relative', flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            position: 'relative',
            flex: 1,
            height: '100%',
          }}>
          <ImageBackground
            source={require('../../Assets/Images/sidebarBackground.jpg')}
            style={{height: 140}}
          />
          <View style={styles.userImgwrapper}>
            <Image
              source={require('../../Assets/Images/avatar.png')}
              style={styles.userImgStyle}
            />
            <Text style={styles.profileName}>
              {profileData
                ? profileData?.company_details?.accountname
                : 'Annonymous'}
            </Text>
          </View>


          <View style={styles.drawerListWrapper}>
          <ScrollView>
          <View style={{marginBottom:'30%'}}>
            <DrawerItemList {...props} />
            </View>
            </ScrollView>
           
          </View>
         
        </View>
      </DrawerContentScrollView>
      <TouchableOpacity style={styles.logoutFooter} onPress={handleLogout} activeOpacity={0.5}>
        <Text style={styles.textLogoutStyle}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  userImgwrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '-25%',
  },
  userImgStyle: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
  },
  profileName: {
    fontSize: 16,
    color:'#253658',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
    paddingHorizontal: 20,
  },

  drawerListWrapper: {
    marginTop: 65,
  },
  imageBackground: {
    height: 70,
  },
  logoutFooter: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#253658',
    left: '0%',
    width: '100%',
    padding: 10,
    paddingVertical:20,
  },
  textLogoutStyle: {
    textAlign: 'center',
    fontSize: 18,
    color: '#fff',
    fontWeight:'bold',
  },
});
