import React from 'react';
import { ScrollView, StatusBar, Text, View } from 'react-native';

import { ScaledSheet } from 'react-native-size-matters';

const DocumentScreen = ({ width, height, loadingFullScreen }) => {
  return (
    <View style={styles.container}>
      <View style={styles.StatusBar}>
        <StatusBar translucent barStyle="light-content" />
      </View>
      <ScrollView>
        <View style={styles.cardBox}>
          <View
            style={{ width: '100%', position: 'relative', marginBottom: 0 }}
          >
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 20,
                color: '#253658',
              }}
            >
              Documents
            </Text>
          </View>
          <View style={styles.hrWrapper} />
          <View>
            <Text style={{ textAlign: 'center', color: '#ccc' }}>
              No Data Found{' '}
            </Text>
            <Text style={{ textAlign: 'center', color: '#000' }}>
              For more update +923014572648{' '}
            </Text>
          </View>
        </View>
      </ScrollView>
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

export default DocumentScreen;
