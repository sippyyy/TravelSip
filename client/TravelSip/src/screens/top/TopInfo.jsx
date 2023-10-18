import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {ProfileTile} from '../../components';
import useFetchData from '../../hooks/fetchData';
import {useAuth} from '../../context/AuthContext';

const TopInfo = ({navigation, route}) => {
  const {output} = route.params;

  return (
    <View style={{margin: 20}}>
      <ProfileTile
        title={'Personal Information'}
        icon={'person'}
        onPress={() => navigation.navigate('Information', output)}
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
