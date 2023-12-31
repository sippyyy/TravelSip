import {View, Image} from 'react-native';
import React, {useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {TopBookings, TopInfo, TopTrips} from '../screens';
import {COLORS, SIZES} from '../constants/theme';
import {AppBar, HeightSpacer, NetworkImage, ReusableText} from '../components';
import styles from './topTab.style';
import useFetchData from '../hooks/fetchData';
import {useAuth} from '../context/AuthContext';

const Tab = createMaterialTopTabNavigator();

const TopTab = ({navigation}) => {
  const {authState} = useAuth();
  const {output, isLoading, error, refetch} = useFetchData({
    method: 'get',
    endpoint: `api/v1/user_profiles/${authState.id}/`,
  });
  useEffect(() => {
    if (error?.status === 404) {
      navigation.navigate('Information');
    }
  }, [error]);
  return output?.user ? (
    <View style={{flex: 1}}>
      <View style={{backgroundColor: COLORS.lightWhite}}>
        <View>
          <NetworkImage
            source={output?.backgroundUrl}
            width="100%"
            height={300}
            radius={0}
          />

          <AppBar
            top={10}
            left={20}
            right={20}
            color={COLORS.white}
            color1={COLORS.white}
            onPress={() => navigation.goBack()}
          />
          <View style={styles.profile}>
            <Image
              style={styles.image}
              source={{
                uri: output?.imageUrl,
              }}
            />
            <HeightSpacer height={5} />
            <View style={{alignItems: 'center'}}>
              <ReusableText
                text={output?.nickname ?? output?.user?.username ?? ''}
                family="medium"
                size={SIZES.medium}
                color={COLORS.black}
              />
            </View>
            <HeightSpacer height={5} />
            <View style={styles.name}>
              <View style={{alignItems: 'center'}}>
                <ReusableText
                  text={output?.user?.email ?? ''}
                  family="medium"
                  size={SIZES.medium}
                  color={COLORS.white}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
      <Tab.Navigator>
        <Tab.Screen
          name="Bookings"
          component={TopBookings}
          initialParams={{output}}
        />
        <Tab.Screen
          name="Trips"
          component={TopTrips}
          initialParams={{output}}
        />
        <Tab.Screen name="Info" component={TopInfo} initialParams={{output}} />
      </Tab.Navigator>
    </View>
  ) : null;
};

export default TopTab;

