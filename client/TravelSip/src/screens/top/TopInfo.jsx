import {View} from 'react-native';
import React, {useEffect} from 'react';
import {ProfileTile} from '../../components';
import {useAuth} from '../../context/AuthContext';

const TopInfo = ({navigation, route}) => {
  const {output} = route.params;
  const {logOut} = useAuth();
  const {authState} = useAuth();

  useEffect(() => {
    if (!authState?.accessToken) {
      navigation.navigate('AuthTop');
    }
  });

  const handleLogout = () => {
    logOut();
  };

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
        onPress={() => navigation.navigate('TopBusiness')}
      />
      <ProfileTile
        title={'Log out'}
        icon={'logout'}
        onPress={() => handleLogout()}
      />
    </View>
  );
};

export default TopInfo;
