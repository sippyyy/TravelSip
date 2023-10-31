import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import reusable from '../../components/Reusable/reusable.style';
import {NetworkImage, ReusableText, WidthSpacer} from '../../components';
import {COLORS, TEXT} from '../../constants/theme';

const Chat = () => {
  return (
    <View
      style={[
        reusable.rowWithSpace('flex-start'),
        {
          borderBottomWidth: 1,
          borderBlockColor: COLORS.lightGrey,
          paddingVertical: 10,
        },
      ]}>
      <NetworkImage
        source={
          'https://cf.bstatic.com/xdata/images/hotel/max1024x768/271214561.jpg?k=9e71b4650d27ab32b310dec6a0ddfb7c40204f8bbfed0c8633062207d81c3f3d&o=&hp=1'
        }
        width={50}
        height={50}
        radius={100}
      />
      <WidthSpacer width={10} />
      <View style={{flex: 1}}>
        <ReusableText
          text="User1"
          size={TEXT.small}
          color={COLORS.black}
          family={'bold'}
        />
        <ReusableText text={'Hello'} />
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({});
