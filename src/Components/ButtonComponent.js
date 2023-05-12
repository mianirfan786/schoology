import React from 'react';
import {View, TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

const ButtonComponent = ({
  isLoading,
  inspectionloading,
  goodbtnloading,
  title,
  smallButton,
  buttonBGColor,
  primary,
  isBorder,
  onPress,
  disabledData,
  btnLoader,
}) => {
  return disabledData ? (
    <View
      style={[
        styles.buttonContainer,
        {
          width: smallButton ? '33%' : '90%',
          backgroundColor: '#94938f',
          borderColor: isBorder && '#94938f',
          borderWidth: isBorder && 1,
        },
      ]}>
      <Text style={[styles.btnText, {color: primary ? '#fff' : '#1468BA'}]}>
        {title}
      </Text>
    </View>
  ) : (

    <TouchableOpacity
      style={[
        styles.buttonContainer,
        {
          width: smallButton ? '33%' : '90%',
          backgroundColor: buttonBGColor ? buttonBGColor : '#94938f',
          borderColor: isBorder && '#94938f',
          borderWidth: isBorder && 1,
        },
      ]}
      onPress={onPress} activeOpacity={0.5}>
      {isLoading || inspectionloading || goodbtnloading || btnLoader ? (
        <ActivityIndicator size="small" color="#FFFFFF" />
      ) : (
        <Text style={[styles.btnText, {color: primary ? '#fff' : '#1468BA'}]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  buttonContainer: {
    padding: '12@s',
    borderRadius: '24@s',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF7A00',
  },
  contentContainer: {
    paddingTop: '10@s',
    paddingLeft: '10@s',
    paddingRight: '10@s',
  },
  getStarted: {
    color: 'white',
    fontSize: '22@s',
    fontWeight: '300',
    paddingTop: '20@s',
  },
  connectingDropsHeading: {
    color: '#000',
    fontSize: '43@s',
    fontWeight: '700',
    marginVertical: '5@s',
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
});

export default ButtonComponent;
