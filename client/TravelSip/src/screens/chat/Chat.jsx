import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useRef} from 'react';
import {HeightSpacer} from '../../components';

const Chat = () => {
  const scrollViewRef = useRef();
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        style={styles.background}
        source={require('../../assets/images/chatbg.jpg')}
        resizeMode="cover">
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({animated: true})
          }>
          <Text>dsad</Text>
        </ScrollView>
        <HeightSpacer height={100} />
      </ImageBackground>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
