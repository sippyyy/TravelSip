import {View, Image} from 'react-native';
import React, {useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {TopBookingRequests, TopInfoBusiness} from '../screens';
import {COLORS, SIZES, TEXT} from '../constants/theme';
import {
  HeightSpacer,
  NetworkImage,
  ReusableText,
  WidthSpacer,
} from '../components';
import styles from './topTab.style';
import useFetchData from '../hooks/fetchData';
import {useAuth} from '../context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useIsFocused} from '@react-navigation/native';
import reusable from '../components/Reusable/reusable.style';
import TopSmallTab from './TopSmallTab';

const Tab = createMaterialTopTabNavigator();

const TopTabBusiness = ({navigation}) => {
  const {authState} = useAuth();
  const isFocused = useIsFocused();
  const {output, isLoading, error, refetch} = useFetchData({
    method: 'get',
    endpoint: `api/v1/user_organizations/${authState.id}/`,
  });
  useEffect(() => {
    if (error?.status === 404) {
      navigation.navigate('BusinessInformation');
    }
  }, [error]);

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

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

          <View style={styles.profile}>
            <Image
              style={styles.image}
              source={{
                uri: output?.imageUrl,
              }}
            />
            <HeightSpacer height={5} />
            <View style={reusable.rowWithSpace('center')}>
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
          initialParams={output}
        />
        <Tab.Screen name="My Business" component={TopSmallTab} />
        <Tab.Screen
          name="Info"
          component={TopInfoBusiness}
          initialParams={output}
        />
      </Tab.Navigator>
    </View>
  ) : null;
};

export default TopTabBusiness;
