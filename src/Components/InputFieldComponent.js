import React from 'react';
import {TextInput, Text, View, Platform, TouchableOpacity} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import DateTimePicker from 'react-native-modal-datetime-picker';
import CalanderIcon from '../Assets/Icons/Calander';

const InputFieldComponent = ({
  secureTextEntry,
  keyboardType,
  placeholder,
  label,
  mandatory,
  value,
  commentBox,
  handleChange,
  name,
  isDatePickerVisible,
  setIsDatePickerVisible,
  pickerDate,
  handleConfirm,
  hideDatePicker,
  isIcon,
  calanderIcon,
  handleTouchOut,
  minLength,
  maxLength,
  modelyear,
  EmailValidator,
}) => {
  return (
    <View style={styles.labelTextFieldContainer}>
      <View style={{flexDirection: 'row'}}>
        <Text style={[styles.inputlabel, {fontWeight: commentBox && 'bold'}]}>
          {label}
        </Text>
        <Text style={styles.mandatory}>{mandatory}</Text>
      </View>

      <View
        style={[
          styles.textInputContainer,
          commentBox ? styles.largeHeight : styles.smallHeight,
        ]}>
        <TextInput
          onBlur={handleTouchOut}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          placeholder={placeholder}
          style={styles.textInput}
          value={value}
          minLength={minLength}
          maxLength={maxLength}
          // clearButtonMode="always"
          multiline={commentBox ? true : false}
          onChangeText={e => handleChange(name, e)}
        />
        <TouchableOpacity
          onPress={() => setIsDatePickerVisible(!isDatePickerVisible)}>
          {isIcon && calanderIcon} activeOpacity={0.5}
        </TouchableOpacity>
        {isDatePickerVisible && (
          <DateTimePicker
            mode="date"
            textColor="blue"
            maximumDate={new Date()}
            value={pickerDate}
            cancelTextIOS={'Cancel'}
            confirmTextIOS={'Confirm'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            isVisible={isDatePickerVisible}
          />
        )}
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  textInputContainer: {
    backgroundColor: '#F1F1F1',
    borderColor: '#F1F1F1',
    borderRadius: '6@s',
    // height: '45@s',
    // paddingBottom: '15@s',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  smallHeight: {
    height: '45@s',
  },
  largeHeight: {
    height: '100@s',
  },
  // commentboxContainer: {
  //   backgroundColor: '#e6e6e6',
  //   borderColor: '#F1F1F1',
  //   borderRadius: '6@s',
  //   height: '100@s',
  //   marginTop: 10,
  //   // paddingBottom: '15@s',
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  // },
  textInput: {
    paddingLeft: '10@s',
    fontSize: '14@s',
    color: '#000',
    width: '90%',
  },
  inputlabel: {
    color: 'Black',
    // fontWeight: 'bold',
    lineHeight: '20@s',
    fontSize: '14@s',
    paddingBottom: 5,
  },
  mandatory: {
    color: 'red',
    fontSize: 20,
    paddingLeft: 5,
  },
  labelTextFieldContainer: {
    marginTop: '10@s',
  },
  pencilIcon: {
    marginRight: '15@s',
  },
});

export default InputFieldComponent;
