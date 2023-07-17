import React, {useState} from 'react';
import {Dimensions, View} from 'react-native';
import {WebView} from 'react-native-webview';
import Lottie from 'lottie-react-native';

// Style
import EStyleSheet from 'react-native-extended-stylesheet';
import {ScreenContainer} from '../../components/Reusable/Containers';

const WebViewPage = ({route}) => {
  const uri = route.params?.uri;
  const [isLoading, setIsLoading] = useState(true);
  const path =
    (uri.includes('pdf')
      ? 'https://drive.google.com/viewerng/viewer?embedded=true&url='
      : '') + uri;
  return (
    <ScreenContainer>
      <WebView
        androidLayerType="software"
        containerStyle={{width: '100%'}}
        source={{
          uri: path,
        }}
        onLoadEnd={() => setIsLoading(false)}
      />
      {isLoading && (
        <View style={styles.loadingContainer}>
          <Lottie
            source={require('../../assets/animations/loader-3dots.json')}
            style={{width: Dimensions.get('window').width * 0.5}}
            autoPlay={true}
            loop
          />
        </View>
      )}
    </ScreenContainer>
  );
};

const styles = EStyleSheet.create({
  screen: {
    flex: 1,
  },
  loadingContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WebViewPage;
