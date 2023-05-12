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
import moment from 'moment';
import {ScaledSheet} from 'react-native-size-matters';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackArrow from '../../Assets/Icons/BackArrow';
import HTML from 'react-native-render-html';

const AnnouncementDetailScreen = ({
  handleBack,
  itemData,
  loadingFullScreen,
  width,
  height,
  announcementDetail,
}) => {
//   const htmlData = {html:`
//   <!DOCTYPE html>
//  <html>
//  <head>
// </head>
//  <body>
// <div>
// <center>
// <p>dafs</p>
// </center>
// </div>
// </body>
//  </html>
// `
// }

const dataHtml = `<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01//EN\" \"http://www.w3.org/TR/html4/strict.dtd\">
<html>
<head>
	<title></title>
</head>
<body class=\"scayt-enabled\">
<center style="">
<div>

<div>
<div>Dear Parents,</div>

<div></div>

<div>Hope this email finds you well<br />
&nbsp;</div>

<div></div>

<div>We would like to remind you that the MYP students will have their Science Fair on Wednesday 15/3/2023.</div>

<div></div>

<div>Parents are all invited to attend this event from 9:00 to 10:00 AM on the school premises.</div>

<div>
<div></div>

<div><br />
<span class=\"gmail-im\" style=\"font-family: Arial, Helvetica, sans-serif; font-size: small;\"><b><u>Please note the following points</u>:</b></span></div>

<div>- Students should attend from the early morning dressed in a formal Black and White dress code.&nbsp;</div>
</div>

<div>- Students&nbsp;will have a&nbsp;<u>normal school day</u>&nbsp;after their Science Fair event tomorrow Wednesday 15/3/2023.</div>

<div></div>

<div><br />
Your attendance is highly appreciated.</div>

<div></div>

<div><br />
Thanks</div>
</div>

<div></div>

</div>
</center>
</body>
</html>`;

const originalitem = announcementDetail?.description;

const testing = {testing: originalitem}

var regex = /<(\/?|\!?)(center)>/g;
// const testingData = testing?.testing?.replace(/<(\/?|\!?)(center)>/g, ""); 
const testingData = testing?.testing?.replace(/<(\/?|\!?)center(\s+[^>]*?)?(style\s*=\s*"[^"]*")?\s*>/gi, ""); 

// const testingData = testingDataNew?.replace(/(http:\/\/)?(https:\/\/\S+)/g, '<a href="$2">$2</a'); 



//   const htmlData = {
//     html: `
//     <!DOCTYPE html>
// <html>
// <head>
// </head>
// <body>
// <p>asfasfd</p>
//  <div>
 
//  <p>dafs</p>
 
//  </div>
    
//     </body>
// </html>
//   `,
//   };


  const regexd = /(<([^>]+)>)/ig;
  const result = announcementDetail?.description?.replace(regexd, '');

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

            <Text style={{textAlign: 'center', fontWeight:'bold', fontSize: 20, color:'#253658'}}>
              Announcement
            </Text>
          </View>
          <View style={styles.hrWrapper} />

          <View style={styles.cardBoxInner}>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.boldText}>Subject</Text>
              <Text style={styles.subText}>{announcementDetail?.subject}</Text>
            </View>
          </View>

          <View style={styles.cardBoxInner}>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.boldText}>Date</Text>
              <Text style={styles.subText}>
              {moment(announcementDetail?.date_start)?.format('DD-MM-YYYY')}
              </Text>
            </View>
          </View>

          <View style={styles.hrWrapper} />
          <ScrollView>
            <View style={styles.descWrapperFlex}>
              <Text style={styles.boldText}>Message:</Text>
              <View style={{marginTop:20}}></View>
            
               <HTML source={{html:testingData}} />

               {/* <Text>{announcementDetail?.description}</Text> */}
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
    height: '95%',
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
    marginTop: 0,
    color: '#3d3c3c',
    fontSize: 16,
    fontWeight: '500',
  },
  hrWrapper: {
    marginVertical: 20,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  descWrapperFlex: {
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

export default AnnouncementDetailScreen;
