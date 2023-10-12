import {ScrollView, View} from 'react-native';
import React from 'react';
import {COLORS, TEXT} from '../../constants/theme';
import {
  AppBar,
  HeightSpacer,
  ReusableText,
  SettingTile,
} from '../../components';

const Settings = ({navigation}) => {
  return (
    <ScrollView style={{backgroundColor: COLORS.lightWhite, flex: 1}}>
      <View style={{height: 50}}>
        <AppBar
          top={10}
          left={20}
          right={20}
          color={COLORS.white}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={{marginHorizontal: 20}}>
        <ReusableText
          text={'Account Settings'}
          family="regular"
          size={TEXT.xLarge}
          color={COLORS.black}
        />

        <HeightSpacer height={10} />
        <SettingTile title="Language" />
        <HeightSpacer height={3} />
        <SettingTile title={'Country'} title1={'USA'} />
        <HeightSpacer height={3} />
        <SettingTile title={'Currency'} title1={'USD'} />
        <HeightSpacer height={3} />
        <SettingTile title={'Business account'} title1={'Register Now'} />
        <HeightSpacer height={40} />

        <ReusableText
          text={'Support '}
          family="regular"
          size={TEXT.xLarge}
          color={COLORS.black}
        />
        <HeightSpacer height={10} />

        <HeightSpacer height={3} />
        <SettingTile title={'Get help'} title1={''} />
        <HeightSpacer height={3} />
        <SettingTile title={'Give a feedback'} title1={''} />
        <HeightSpacer height={40} />
        <ReusableText
          text={'Legal'}
          family="regular"
          size={TEXT.xLarge}
          color={COLORS.black}
        />
        <HeightSpacer height={10} />
        <SettingTile title={'Terms Of Service'} title1={''} />
        <HeightSpacer height={3} />
        <SettingTile title={'Privacy Policy'} title1={''} />
        <HeightSpacer height={10} />
      </View>
    </ScrollView>
  );
};

export default Settings;
