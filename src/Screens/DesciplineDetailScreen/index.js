import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {ScaledSheet} from 'react-native-size-matters';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackArrow from '../../Assets/Icons/BackArrow';

const DesciplineDetailScreen = ({
  handleBack,
  itemData,
  loadingFullScreen,
  width,
  height,
  desciplineDetailData,
}) => {
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

            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                fontWeight: 'bold',
                color: '#253658',
              }}>
              Discipline
            </Text>
          </View>
          <View style={styles.hrWrapper} />
          <ScrollView style={{marginBottom: '20%'}}>
            <View style={styles.cardBoxInner}>
              <View style={{flexDirection: 'column'}}>
                <Text style={styles.boldText}>Student Name</Text>
                <Text style={styles.subText}>
                  {desciplineDetailData?.cf_contacts_id?.label}
                </Text>
              </View>
            </View>

            <View style={styles.cardBoxInner}>
              <View style={{flexDirection: 'column'}}>
                <Text style={styles.boldText}>School year</Text>
                <Text style={styles.subText}>
                  {desciplineDetailData?.cf_3455}
                </Text>
              </View>
            </View>

            {/*<View style={styles.cardBoxInner}>*/}
            {/*  <View style={{flexDirection: 'column'}}>*/}
            {/*    <Text style={styles.boldText}>Assigned To</Text>*/}
            {/*    <Text style={styles.subText}>*/}
            {/*      {desciplineDetailData?.assigned_user_id?.label}*/}
            {/*    </Text>*/}
            {/*  </View>*/}
            {/*</View>*/}

            <View style={styles.cardBoxInner}>
              <View style={{flexDirection: 'column'}}>
                <Text style={styles.boldText}>Date</Text>
                <Text style={styles.subText}>
                  {desciplineDetailData?.cf_3457}
                </Text>
              </View>
            </View>

            <View style={styles.cardBoxInner}>
              <View style={{flexDirection: 'column'}}>
                <Text style={styles.boldText}>Behavior consequence</Text>
                <Text style={styles.subText}>
                  {desciplineDetailData?.cf_3459}
                </Text>
              </View>
            </View>

            <View style={styles.cardBoxInner}>
              <View style={{flexDirection: 'column'}}>
                <Text style={styles.boldText}>Duration by days</Text>
                <Text style={styles.subText}>
                  {desciplineDetailData?.cf_3461}
                </Text>
              </View>
            </View>

            <View style={styles.hrWrapper} />
            <View style={styles.descWrapper}>
              <Text style={styles.boldText}>Reason:</Text>
              <Text style={{...styles.textTitle, marginBottom: 20}}>
                {desciplineDetailData?.cf_3463}
              </Text>
            </View>
          </ScrollView>
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
    flexDirection: 'column',
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

export default DesciplineDetailScreen;
