import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const DeleteModal = ({
  modalVisible,
  setModalVisible,
  saveModalId,
  handleRemoveImagePress,
  modalBtnLoading,
}) => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.modalStyle}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.modalText}>Are you sure to delete this</Text>
            <Text style={styles.modalTextThis}>item?</Text>
          </View>
          <View style={styles.btnView}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.cancelbtnstyle} activeOpacity={0.5}>
              <Text style={styles.btntext}>Cancel </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deletebtnStyle}
              onPress={() => handleRemoveImagePress(saveModalId)} activeOpacity={0.5}>
              {modalBtnLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.btntext}>Delete</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  modalStyle: {
    borderColor: '#ddd',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 7.49,
    elevation: 12,
    // padding: 10,
    height: 200,
    width: '80%',
    marginTop: '50%',
    margin: 40,
    borderRadius: 10,
    //  alignItems:'center',
  },
  btnView: {
    //  flexDirection: 'row',
    justifyContent: 'center',
    //  marginVertical: 20,
    //  marginRihgt: 20,
    aliginItems: 'center',
  },
  cancelbtnstyle: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FF9900',
    backgroundColor: '#FF9900',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 20,
  },
  deletebtnStyle: {
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: '#1876CC',
    borderColor: '#1876CC',
    height: 40,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btntext: {
    color: 'white',
    fontSize: 20,
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  modalTextThis: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});

export default DeleteModal;
