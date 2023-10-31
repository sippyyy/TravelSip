import {View, ImageBackground, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {ChatTile, HeightSpacer} from '../../components';

const Conversation = () => {
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        style={styles.background}
        source={require('../../assets/images/chatbg.jpg')}
        resizeMode="cover">
        <ScrollView
          showsHorizontalScrollIndicator={false}
          style={{marginHorizontal: 20}}>
          <ChatTile
            msg={'?????'}
            right={true}
            ava={
              'https://nypost.com/wp-content/uploads/sites/2/2023/08/NYPICHPDPICT000025178257.jpg?w=960'
            }
          />
          <ChatTile
            msg={
              'The Nowhere Place - một chiếc nhà cho những ngày thảnh thơi, vơi hết muộn phiền.'
            }
            ava={
              'https://nypost.com/wp-content/uploads/sites/2/2023/08/NYPICHPDPICT000025178257.jpg?w=960'
            }
          />
        </ScrollView>
        <HeightSpacer height={100} />
      </ImageBackground>
    </View>
  );
};

export default Conversation;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
