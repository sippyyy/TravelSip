import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import reusable from '../../Reusable/reusable.style';
import WidthSpacer from '../../Reusable/WidthSpacer';
import NetworkImage from '../../Reusable/NetworkImage';
import {COLORS, TEXT} from '../../../constants/theme';

const MessageTile = ({right, msg, ava}) => {
  return (
    <View
      style={[
        reusable.rowWithSpace(
          'flex-end',
          right ? '' : 'row-reverse',
          'flex-end',
        ),
      ]}>
      <Text
        numberOfLines={100}
        style={[styles.chatbuble(right), {maxWidth: '50%'}]}>
        {msg}
      </Text>
      <WidthSpacer width={10} />
      <NetworkImage source={ava} height={40} width={40} radius={100} />
    </View>
  );
};

export default MessageTile;

const styles = StyleSheet.create({
  chatbuble: right => ({
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: right ? COLORS.lightBlue : COLORS.white,
    color: right ? COLORS.white : COLORS.black,
    borderWidth: 1,
    borderColor: COLORS.lightBlue,
    fontSize: TEXT.xSmall,
  }),
});
