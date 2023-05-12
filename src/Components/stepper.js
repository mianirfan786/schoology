import React from 'react';
import {Text, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import TickIcon from '../Assets/Icons/TickIcon';

const StepperComponent = ({
  progressNo,
  step,
  inspectionState,
  isActive,
  isComplete,
}) => {
  return (
    <View
      style={[
        styles.btnContainer,
        {borderColor: isActive ? '#1468BA' : isComplete ? '#20C18D' : 'AFAFAF'},
      ]}>
      <View
        style={
          isActive
            ? styles.activeIconContainer
            : isComplete
            ? styles.completedIconContainer
            : styles.defaultIconContainer
        }>
        {isComplete ? (
          <TickIcon colorCode={'#20C18D'} />
        ) : (
          <Text style={{color: '#fff', fontWeight: 'bold'}}>{progressNo}</Text>
        )}
      </View>
      <View style={{marginLeft: 20}}>
        <Text
          style={
            isActive
              ? styles.activeText
              : isComplete
              ? styles.completedText
              : styles.defaultText
          }>
          {step}
        </Text>
        <Text
          style={[
            isActive
              ? styles.activeText
              : isComplete
              ? styles.completedText
              : styles.defaultText,
            {fontSize: 14},
          ]}>
          {inspectionState}
        </Text>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  btnContainer: {
    height: 50,
    width: '49%',
    borderWidth: 1,
    borderRadius: 25,
    justifyContent: 'center',
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  // defaultContainer: {
  //   height: 50,
  //   width: '49%',
  //   borderWidth: 1,
  //   borderColor: '#AFAFAF',
  //   borderRadius: 25,
  //   justifyContent: 'center',
  //   padding: 5,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  defaultIconContainer: {
    backgroundColor: '#AFAFAF',
    height: 25,
    width: 25,
    borderColor: '#AFAFAF',
    borderRadius: 15,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultText: {
    color: '#AFAFAF',
  },
  activeIconContainer: {
    backgroundColor: '#1468BA',
    height: 25,
    width: 25,
    borderColor: '#1468BA',
    borderRadius: 15,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeText: {
    color: '#1468BA',
  },
  // completedContainer: {
  //   height: 50,
  //   width: '49%',
  //   borderWidth: 1,
  //   borderRadius: 25,
  //   justifyContent: 'center',
  //   padding: 5,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  completedIconContainer: {
    backgroundColor: '#fff',
    height: 25,
    width: 25,
    borderRadius: 15,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedText: {
    color: '#20C18D',
  },
  heading: {
    color: '#FF9900',
    fontSize: '15@s',
    fontWeight: '300',
    textAlign: 'center',
  },
  steppercontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default StepperComponent;
