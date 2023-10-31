import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import reusable from '../../components/Reusable/reusable.style';
import {
  AppBar,
  ChatTile,
  HeightSpacer,
  NetworkImage,
  ReusableText,
  WidthSpacer,
} from '../../components';
import {chat} from '../../mock_api/chats';
import {COLORS} from '../../constants/theme';
const Chat = ({navigation}) => {
  return (
    <View style={{flex:1}}>
      <AppBar noBack={true} title={'Chats'} top={10} left={20} right={20} />
      <HeightSpacer height={50} />
      <View
        style={{flex: 1, backgroundColor: COLORS.white, paddingHorizontal: 20}}>
        <FlatList
          data={chat}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <ChatTile
              msg={item.newest_msg}
              ava={item.chat_user.imageUrl}
              user={item.chat_user.username}
              onPress={() =>
                navigation.navigate('Conversation', {
                  conversation_id: item.id,
                  user: item.chat_user.username,
                })
              }
            />
          )}
        />
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({});
