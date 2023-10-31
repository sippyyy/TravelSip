import {
  View,
  ImageBackground,
  StyleSheet,
  TextInput,
  Pressable,
  FlatList,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {AppBar, HeightSpacer, MessageTile} from '../../components';
import {useRoute} from '@react-navigation/native';
import reusable from '../../components/Reusable/reusable.style';
import {COLORS, TEXT} from '../../constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {conversation} from '../../mock_api/conversation';
import {useAuth} from '../../context/AuthContext';

const Conversation = ({navigation}) => {
  const route = useRoute();
  const {conversation_id, user} = route.params;
  const {authState} = useAuth();
  const listRef = useRef({});
  return (
    <View style={{flex: 1}}>
      <AppBar
        title={`Chat with ${user}`}
        onPress={() => navigation.goBack()}
        top={10}
        left={20}
        right={20}
      />
      <HeightSpacer height={55} />
      <ImageBackground
        style={styles.background}
        source={require('../../assets/images/chatbg.png')}
        resizeMode="cover">
        <FlatList
          ref={listRef}
          data={conversation.message}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <View>
              <MessageTile
                right={authState.id === item.user.id}
                msg={item.message}
                ava={item.user.imageUrl}
              />
              <HeightSpacer height={8} />
            </View>
          )}
        />
        <View
          style={[reusable.rowWithSpace('flex-start'), styles.textingPlace]}>
          <TextInput
            placeholder="Text something..."
            style={{flex: 1, padding: 10}}
          />
          <Pressable>
            <Icon name="send" color={COLORS.blue} size={TEXT.xLarge} />
          </Pressable>
        </View>
        <HeightSpacer height={50} />
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
  textingPlace: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
});
