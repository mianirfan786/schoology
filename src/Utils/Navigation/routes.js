import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NAVIGATION_ROUTES } from './NavigationRoutes';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {
  AnnouncementContainer,
  AnnouncementDetailContainer,
  CalendarContainer,
  DesciplineContainer,
  DesciplineDetailContainer,
  DocumentsContainer,
  LoginContainer,
  NotificationContainer,
  ReportContainer,
  ReportDetailContainer,
  SplashContainer,
  TicketContainer,
  TicketDetailContainer,
} from '../../Container';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TicketIcon from '../../Assets/Icons/TicketIcon';
import ReportIcon from '../../Assets/Icons/ReportIcon';
import EnvelopIcon from '../../Assets/Icons/EnvelopIcon';
import DocumentIcons from '../../Assets/Icons/DocumentIcons';
import RingIcon from '../../Assets/Icons/RingIcon';
import CustomDrawer from './CustomDrawer';

import { useSelector } from 'react-redux';
import CalendarIcon from '../../Assets/Icons/CalendarIcon';
import Notification from '../../Assets/Icons/Notification';
import { TouchableOpacity } from 'react-native';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function Root() {
  const notificationSelection = useSelector(
    (state) => state?.notificationDataReducer?.notificationData
  );
  const navigation = useNavigation();
  const headerRight = () => (
    <View style={styles.notificationIconContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
        <Notification />
        {notificationSelection.length > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{notificationSelection.length}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      initialRouteName="Documents"
      screenOptions={{ headerTransparent: false, drawerPosition: 'left' }}
    >
      <Drawer.Screen
        name="Documents"
        options={{
          //headerRight: headerRight,
          drawerStyle: {
            backgroundColor: '#fff',
            width: 260,
          },

          headerShown: true,
          headerTitle: false,

          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#253658',
          },
          title: 'Documents',
          drawerIcon: ({ focused, size }) => (
            <DocumentIcons width={21} height={23} color={'#253658'} />
          ),
        }}
        component={DocumentsContainer}
      />
      {/* <Drawer.Screen
        name="Notification"
        options={{
          headerRight: headerRight,
          drawerStyle: {
            backgroundColor: '#fff',
            width: 260,
          },

          headerShown: true,
          headerTitle: false,

          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#253658',
          },
          title: 'Notification',
          drawerIcon: ({ focused, size }) => (
            <RingIcon width={21} height={23} color={'#253658'} />
          ),
        }}
        component={NotificationContainer}
      /> */}

      <Drawer.Screen
        name="Calendar"
        options={{
          //   headerRight: headerRight,
          drawerStyle: {
            backgroundColor: '#fff',
            width: 260,
          },

          headerShown: true,
          headerTitle: false,

          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#253658',
          },
          title: 'Calendar',
          drawerIcon: ({ focused, size }) => (
            <CalendarIcon width={21} height={23} color={'#253658'} />
          ),
        }}
        component={CalendarContainer}
      />

      <Drawer.Screen
        name="Ticket"
        options={{
          // headerRight: headerRight,
          drawerStyle: {
            backgroundColor: '#fff',
            width: 260,
          },

          headerShown: true,
          headerTitle: false,

          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#253658',
          },
          title: 'Ticket',
          drawerIcon: ({ focused, size }) => (
            <TicketIcon width={21} height={23} color={'#253658'} />
          ),
        }}
        component={TicketContainer}
      />

      <Drawer.Screen
        name="Discipline"
        options={{
          // headerRight: headerRight,
          drawerStyle: {
            backgroundColor: '#fff',
            width: 260,
          },

          headerShown: true,
          headerTitle: false,

          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#253658',
          },
          title: 'Discipline',
          drawerIcon: ({ focused, size }) => (
            <ReportIcon width={21} height={23} color={'#253658'} />
          ),
        }}
        component={DesciplineContainer}
      />

      <Drawer.Screen
        name="Announcement"
        options={{
          // headerRight: headerRight,
          drawerStyle: {
            backgroundColor: '#fff',
            width: 260,
          },

          headerShown: true,
          headerTitle: false,

          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#253658',
          },
          title: 'Announcement',
          drawerIcon: ({ focused, size }) => (
            <EnvelopIcon width={21} height={23} color={'#253658'} />
          ),
        }}
        component={AnnouncementContainer}
      />

      <Drawer.Screen
        name="Report"
        options={{
          //  headerRight: headerRight,
          drawerStyle: {
            backgroundColor: '#fff',
            width: 260,
          },

          headerShown: true,
          headerTitle: false,

          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#253658',
          },
          title: 'Report',
          drawerIcon: ({ focused, size }) => (
            <ReportIcon width={21} height={23} color={'#253658'} />
          ),
        }}
        component={ReportContainer}
      />
    </Drawer.Navigator>
  );
}

const AuthNavigator = () => {
  const loginSelection = useSelector(
    (state) => state?.loginDataReducer?.loginData
  );
  //
  // const profileSelection = useSelector(state => state?.profileDataReducer);

  useEffect(() => {
    // console.log(loginSelection, 'login action');
  }, [loginSelection]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {loginSelection?.Authentication ? (
          <>
            <Stack.Screen
              component={Root}
              name={NAVIGATION_ROUTES.DRAWER}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              component={TicketDetailContainer}
              name={NAVIGATION_ROUTES.TICKET_DETAIL}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              component={DesciplineDetailContainer}
              name={NAVIGATION_ROUTES.DESCIPLINE_DETAIL}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              component={AnnouncementDetailContainer}
              name={NAVIGATION_ROUTES.ANNOUNCEMENT_DETAIL}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              component={ReportDetailContainer}
              name={NAVIGATION_ROUTES.REPORT_DETAIL}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              component={SplashContainer}
              name={NAVIGATION_ROUTES.SPLASH_SCREEN}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              component={LoginContainer}
              name={NAVIGATION_ROUTES.LOGIN_SCREEN_ROUTE}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  notificationIconContainer: {
    marginRight: 10,
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
export default AuthNavigator;
