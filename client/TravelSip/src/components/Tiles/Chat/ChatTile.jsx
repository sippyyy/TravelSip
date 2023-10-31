import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import reusable from '../../Reusable/reusable.style';
import NetworkImage from '../../Reusable/NetworkImage';
import WidthSpacer from '../../Reusable/WidthSpacer';
import ReusableText from '../../Reusable/ReusableText';
import {COLORS, TEXT} from '../../../constants/theme';

const ChatTile = ({ava, user, msg, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[reusable.rowWithSpace('flex-start'), styles.container]}>
      <NetworkImage source={ava} width={50} height={50} radius={100} />
      <WidthSpacer width={10} />
      <View style={{flex: 1}}>
        <ReusableText
          text={user}
          size={TEXT.small}
          color={COLORS.black}
          family={'bold'}
        />
        <ReusableText text={msg} />
      </View>
    </Pressable>
  );
};

export default ChatTile;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBlockColor: COLORS.lightGrey,
    paddingVertical: 10,
  },
});
