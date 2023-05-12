import React from 'react';
import {FlatList, StatusBar, Text, View, RefreshControl} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {ScaledSheet} from 'react-native-size-matters';
import RenderHtml from 'react-native-render-html';
import moment from 'moment';
import {NAVIGATION_ROUTES} from '../../Utils/Navigation/NavigationRoutes';

const NotificationScreen = ({
  navigation,
  width,
  height,
  loadingFullScreen,
  handleViewMore,
  notificationArray,
  notificationSelection,
  refreshing,
  onRefresh,
  handleJson,
}) => {
  const navigateToSpec = module => {
    switch (module) {
      case 'Discipline':
        return navigation.navigate('Discipline');
      case 'Announcement':
        return navigation.navigate('Announcement');
      case 'HelpDesk':
        return navigation.navigate('Ticket');
      case 'GradeBook':
        return navigation.navigate('Report');
      case 'MYPReport':
        return navigation.navigate('Report');
      default:
        return navigation.navigate('Documents');
    }
  };
  const renderItem = ({item}) => (
    <View
      style={{
        width: '100%',
        borderRadius: 10,
        backgroundColor: '#253658',
        padding: 10,
        marginBottom: 20,
      }}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          navigateToSpec(item?.module);
        }}>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <Text
            style={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 14,
              marginRight: 10,
            }}>
            {item?.notejson?.modifiedBy}
          </Text>
          <Text style={{color: '#fff', marginRight: 10, fontSize: 14}}>
            {item?.notejson?.recordStatus}
          </Text>
          <Text
            style={{
              color: '#fff',
              fontWeight: 'bold',
              marginRight: 10,
              fontSize: 14,
            }}>
            {item?.module === 'GradeBook'
              ? 'Report'
              : item?.module === 'HelpDesk'
              ? 'Ticket'
              : item?.module}
          </Text>
        </View>
        <View>
          <Text style={{color: '#fff', marginRight: 10, fontSize: 12}}>
            {/*{item?.datetime}*/}
            {moment(item?.datetime).fromNow()}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.container}>
      <View style={styles.StatusBar}>
        <StatusBar translucent barStyle="light-content" />
      </View>

      <View style={styles.cardBox}>
        <View
          style={{
            width: '100%',
            position: 'relative',
            marginBottom: 0,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{textAlign: 'center', fontSize: 20, color: '#253658'}}>
            Notification [Testing]
          </Text>
          {/* <View style={{marginLeft:10, backgroundColor:'blue', justifyContent:'center', alignContent:'center', borderRadius:50}}>
              <Text style={{color:'#fff', justifyContent:'center',width:'70%', height:'70%', backgroundColor:'purple', borderRadius:20, padding:10,   alignItems:'center', fontSize: 12}}>
                911
              </Text>
            </View> */}
        </View>
        <View style={styles.hrWrapper} />
        {false ? (
          <View>
            <Text style={{textAlign: 'center', color: '#ccc'}}>
              No Data Found
            </Text>
          </View>
        ) : (
          <View style={{marginBottom: '40%'}}>
            <FlatList
              data={notificationArray}
              showsVerticalScrollIndicator={false}
              renderItem={renderItem}
              keyExtractor={item => item?.relatedid}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          </View>
        )}
      </View>
    </View>
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
    marginHorizontal: 20,
    color: '#3d3c3c',
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
});

export default NotificationScreen;
