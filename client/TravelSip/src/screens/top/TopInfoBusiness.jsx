import {View} from 'react-native';
import React, {useEffect} from 'react';
import {ProfileTile} from '../../components';
import {useAuth} from '../../context/AuthContext';
import {useIsFocused} from '@react-navigation/native';
import useFetchData from '../../hooks/fetchData';

const TopInfoBusiness = ({navigation}) => {
  const {authState} = useAuth();
  const isFocused = useIsFocused();
  const {output, isLoading, error, refetch} = useFetchData({
    method: 'get',
    endpoint: `api/v1/user_organizations/${authState.id}/`,
  });

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);
  return (
    <View style={{margin: 20}}>
      <ProfileTile
        title={'Business Information'}
        icon={'person'}
        onPress={() => navigation.navigate('BusinessInformation', output)}
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
        title={'Switch to user'}
        icon={'switch-account'}
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
};

export default TopInfoBusiness;
