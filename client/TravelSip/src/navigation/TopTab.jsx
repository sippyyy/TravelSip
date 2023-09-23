import {View, Image} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {TopBookings, TopInfo, TopTrips} from '../screens';
import {COLORS, SIZES} from '../constants/theme';
import {AppBar, HeightSpacer, NetworkImage, ReusableText} from '../components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './topTab.style';

const Tab = createMaterialTopTabNavigator();

const TopTab = () => {
  return (
    <View style={{flex: 1}}>
      <View style={{backgroundColor: COLORS.lightWhite}}>
        <View>
          <NetworkImage
            source="https://images.unsplash.com/photo-1559333086-b0a56225a93c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
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
            icon={'log-out-outline'}
            // onPress1={()=>{}}
          />
          <View style={styles.profile}>
            <Image
              style={styles.image}
              source={{
                uri: 'https://cdn2.psychologytoday.com/assets/styles/manual_crop_1_91_1_1528x800/public/field_blog_entry_images/2018-09/shutterstock_648907024.jpg?itok=7lrLYx-B',
              }}
            />
            <HeightSpacer height={5} />
            <View style={{alignItems: 'center'}}>
              <ReusableText
                text={'Nguyen Thuy'}
                family="medium"
                size={SIZES.medium}
                color={COLORS.black}
              />
            </View>
            <HeightSpacer height={5} />
            <View style={styles.name}>
              <View style={{alignItems: 'center'}}>
                <ReusableText
                  text={'loremipsum@gmail.com'}
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
        <Tab.Screen name="Bookings" component={TopBookings} />
        <Tab.Screen name="Trips" component={TopTrips} />
        <Tab.Screen name="Info" component={TopInfo} />
      </Tab.Navigator>
    </View>
  );
};

export default TopTab;
