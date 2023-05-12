import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

const DownloadFile = ({fileUrl}) => {
  const handleDownloadPDF = () => {
    console.log(RNFetchBlob.fs);
    const {dirs} = RNFetchBlob.fs;
    const path = `${dirs.DownloadDir}/file.pdf`;
    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: path,
        description: 'PDF downloaded from DownloadFile.js',
      },
    })
      .fetch(
        'GET',
        'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      )
      .then(res => console.log('PDF downloaded: ', res));
  };

  const handleDownloadImage = () => {
    console.log(RNFetchBlob.fs);
    const {dirs} = RNFetchBlob.fs;
    const path = `${dirs.DownloadDir}/image.png`;
    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: path,
        description: 'Image downloaded from DownloadFile.js',
      },
    })
      .fetch(
        'GET',
        'http://156.200.117.187/storage//2023//March//week3//387625_fee9b106fd784e91b28c30bac1be3f9e.png',
      )
      // .fetch('GET', 'https://picsum.photos/200/300.jpg')
      .then(res => console.log('Image downloaded: ', res));
  };
  const handleDownloadMP3 = () => {
    console.log(RNFetchBlob.fs);
    const {dirs} = RNFetchBlob.fs;
    const path = `${dirs.DownloadDir}/file.mp3`;
    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: path,
        description: 'MP3 downloaded from DownloadFile.js',
      },
    })
      .fetch(
        'GET',
        'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3',
      )
      .then(res => console.log('MP3 downloaded: ', res));
  };
  const handleDownloadFile = () => {
    console.log(RNFetchBlob.fs);
    const {dirs} = RNFetchBlob.fs;
    const fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
    const path = `${dirs.DownloadDir}/${fileName}`;
    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: path,
        description: `${fileName} downloaded from DownloadFile.js`,
      },
    })
      .fetch('GET', fileUrl)
      .then(res => console.log(`${fileName} downloaded: `, res));
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleDownloadImage}>
        <Text>Download File</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DownloadFile;


// import React from 'react';
// import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
// import RNFetchBlob from 'rn-fetch-blob';
//
// const DownloadFile = () => {
//   const handleDownloadImage = () => {
//     console.log(RNFetchBlob.fs);
//     const {dirs} = RNFetchBlob.fs;
//     const path = `${dirs.DownloadDir}/image.png`;
//     RNFetchBlob.config({
//       fileCache: true,
//       addAndroidDownloads: {
//         useDownloadManager: true,
//         notification: true,
//         path: path,
//         description: 'Image downloaded from DownloadFile.js',
//       },
//     })
//       .fetch(
//         'GET',
//         'http://156.200.117.187/storage//2023//March//week3//387625_fee9b106fd784e91b28c30bac1be3f9e.png',
//       )
//       // .fetch('GET', 'https://picsum.photos/200/300.jpg')
//       .then(res => console.log('Image downloaded: ', res));
//   };
//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={handleDownloadImage}>
//         <Text>Download Image</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
//
// export default DownloadFile;
