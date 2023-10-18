import {View, Image} from 'react-native';
import React, {useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {TopBookingRequests, TopBusiness, TopInfoBusiness} from '../screens';
import {COLORS, SIZES, TEXT} from '../constants/theme';
import {
  AppBar,
  HeightSpacer,
  NetworkImage,
  ReusableText,
  WidthSpacer,
} from '../components';
import styles from './topTab.style';
import useFetchData from '../hooks/fetchData';
import {useAuth} from '../context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createMaterialTopTabNavigator();

const TopTabBusiness = ({navigation}) => {
  const {authState} = useAuth();
  const {output, isLoading, error, refetch} = useFetchData({
    method: 'get',
    endpoint: `api/v1/user_organizations/${authState.id}/`,
  });
  useEffect(() => {
    if (error?.status === 404) {
      navigation.navigate('BusinessInformation');
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
            // icon={'log-out-outline'}
            // onPress1={()=>{}}
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
                text={output?.name ?? ''}
                family="medium"
                size={SIZES.medium}
                color={COLORS.black}
              />
              {output?.is_verified ? (
                <>
                  <WidthSpacer width={5} />
                  <Icon
                    name="verified"
                    size={TEXT.medium}
                    color={COLORS.green}
                  />
                </>
              ) : null}
            </View>
            <HeightSpacer height={5} />
            <View style={{alignItems: 'center'}}>
              <ReusableText
                text={output?.bio ?? ''}
                family="medium"
                size={SIZES.medium}
                color={COLORS.white}
              />
            </View>
          </View>
        </View>
      </View>
      <Tab.Navigator>
        <Tab.Screen
          name="Booking Requests"
          component={TopBookingRequests}
          initialParams={{output}}
        />
        <Tab.Screen
          name="My Business"
          component={TopBusiness}
          initialParams={{output}}
        />
        <Tab.Screen
          name="Info"
          component={TopInfoBusiness}
          initialParams={{output}}
        />
      </Tab.Navigator>
    </View>
  ) : null;
};

export default TopTabBusiness;
