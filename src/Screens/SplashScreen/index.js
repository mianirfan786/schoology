import React from 'react';
import { ImageBackground, StatusBar, Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { ScaledSheet } from 'react-native-size-matters';
import backImage from '../../Assets/Images/abstract.jpg';
// import illustrationImage from '../../Assets/Images/illustration-removebg-preview.png'
import illustrationImage from '../../Assets/Images/man-removebg-preview.png';

const SplashScreen = ({ width, height, handleNavigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.StatusBar}>
        <StatusBar translucent barStyle="light-content" />
      </View>

      <View style={{ flex: 1 }}>
        <ImageBackground source={backImage} style={{ flex: 1 }}>
          <View
            style={{ width: width, height: '40%', padding: 40, marginTop: 40 }}
          >
            <Image
              source={illustrationImage}
              style={{ width: '100%', height: '100%' }}
            />
          </View>

          <View
            style={{
              justifyContent: 'center',
              marginTop: 20,
              width: width,
              paddingHorizontal: 30,
            }}
          >
            <Text
              style={{
                fontSize: 30,
                textAlign: 'center',
                color: '#253658',
                fontWeight: 'bold',
              }}
            >
              WELCOME TO NOTION INTERNATION SCHOOL
            </Text>
            {/* <Text style={{marginTop:20, fontSize:18, textAlign:'center', color:'#253658', fontWeight:'400'}}>
            Notion International School aimed to teach children by building on the knowledge they already have – primarily exhibited through play.
            </Text> */}
          </View>

          <View style={{ position: 'absolute', width: width, bottom: 30 }}>
            <TouchableOpacity
              onPress={handleNavigation}
              activeOpacity={0.9}
              style={{
                marginHorizontal: 20,
                padding: 15,
                borderRadius: 10,
                justifyContent: 'center',
                alignContent: 'center',
                backgroundColor: '#253658',
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  textAlign: 'center',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}
              >
                GO TO LOGIN
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    backgroundColor: '#253658',
    flex: 1,
  },
});

export default SplashScreen;
