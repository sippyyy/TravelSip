import {StyleSheet, View} from 'react-native';
import React from 'react';
import {ProfileTile} from '../../components';

const TopInfo = ({navigation}) => {
  return (
    <View style={{margin: 20}}>
      <ProfileTile
        title={'Personal Infomation'}
        icon={'person'}
        onPress={() => navigation.navigate('')}
      />
      <ProfileTile
        title={'Payment'}
        icon={'credit-card'}
        onPress={() => navigation.navigate('Payment')}
      />
      <ProfileTile
        title={'Settings'}
        icon={'settings'}
        onPress={() => navigation.navigate('Settings')}
      />
      <ProfileTile
        title={'My business'}
        icon={'switch-account'}
        onPress={() => navigation.navigate('Settings')}
      />
    </View>
  );
};

export default TopInfo;

const styles = StyleSheet.create({});
