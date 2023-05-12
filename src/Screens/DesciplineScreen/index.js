import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';

import {ScaledSheet} from 'react-native-size-matters';
import PlusIcon from '../../Assets/Icons/PlusIcon';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Dropdown} from 'react-native-element-dropdown';
import TicketIcon from '../../Assets/Icons/TicketIcon';

const DesciplineScreen = ({
  studentArray,
  value,
  setValue,
  height,
  navigation,
  handleViewMore,
  width,
  isFocus,
  setIsFocus,
  loadingFullScreen,
  desciptionDataSelection,
  recordsDescipline,
  handleSelectStudent,
  refreshing,
  onRefresh,
}) => {
  const renderItem = ({item}) => (
    <View style={styles.cardBox}>
      <View style={styles.cardBoxInner}>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.boldText}>School Year</Text>
          <Text style={styles.subText}>{item?.cf_3455}</Text>
        </View>
      </View>

      <View style={styles.cardBoxInner}>
        {/*<View style={{flexDirection: 'column'}}>*/}
        {/*  <Text style={styles.boldText}>Assigned To</Text>*/}
        {/*  <Text style={styles.subText}>*/}
        {/*    {item?.assigned_user_id?.label}*/}
        {/*  </Text>*/}
        {/*</View>*/}
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.boldText}>Duration by days</Text>
          <Text style={styles.subText}>{item?.cf_3461}</Text>
        </View>
      </View>
      <View style={styles.cardBoxInner}>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.boldText}>Date</Text>
          <Text style={styles.subText}>{item?.cf_3457}</Text>
        </View>
      </View>

      <View style={styles.cardBoxInner}>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.boldText}>Behavior consequence</Text>
          <Text style={styles.subText}>{item?.cf_3459}</Text>
        </View>
      </View>

      <View style={styles.hrWrapper} />
      <View style={styles.descWrapper}>
        <Text style={styles.boldText}>Reason:</Text>
        <Text style={styles.textTitle}>{item?.cf_3463}</Text>
      </View>
      <View style={styles.hrWrapper} />
      <View style={styles.viewBtnWrapper}>
        <TouchableOpacity
          style={styles.viewBtnTouchWrapper}
          activeOpacity={0.5}
          onPress={() => handleViewMore(item?.id, item?.cf_contacts_id?.value)}>
          <Text style={styles.viewBtnTextStyle}>Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
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
        <StatusBar translucent barStyle="light-content" />
      </View>
      <View style={styles.innerContainer}>
        <View style={styles.dropdownStudentWrapper}>
          <Text style={styles.headingDropDownWrapper}>Select a Student</Text>

          <Dropdown
            style={[
              styles.dropdown,
              {color: '#253658'},
              isFocus && {borderColor: '#253658', color: '#253658'},
            ]}
            placeholderStyle={[styles.placeholderStyle, {color: '#253658'}]}
            selectedTextStyle={[styles.selectedTextStyle, {color: '#253658'}]}
            inputSearchStyle={[styles.inputSearchStyle, {color: '#253658'}]}
            itemTextStyle={{color: '#253658'}}
            iconStyle={styles.iconStyle}
            data={studentArray}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select Student' : '...'}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
              handleSelectStudent(item?.value);
            }}
            renderLeftIcon={() => (
              <View style={{marginRight: 10}}>
                <TicketIcon color={'#253658'} width={23} height={23} />
              </View>
            )}
          />
        </View>

        <FlatList
          data={recordsDescipline}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={item => item}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
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
    paddingBottom: '40%',
    position: 'relative',
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
    marginTop: 20,
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
    marginTop: 10,
    marginHorizontal: 0,
    color: '#3d3c3c',
    fontSize: 16,
    fontWeight: 'bold',
  },
  hrWrapper: {
    marginVertical: 20,
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5,
  },
  descWrapper: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginRight: 30,
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

  dropdownStudentWrapper: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 10,

    margin: 10,

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
  headingDropDownWrapper: {
    fontSize: 22,
    color: '#253658',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default DesciplineScreen;
