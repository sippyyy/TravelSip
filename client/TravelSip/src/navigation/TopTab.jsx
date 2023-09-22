import {View, Text} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {TopBookings, TopInfo, TopTrips} from '../screens';
import {COLORS} from '../constants/theme';
import {AppBar, NetworkImage} from '../components';

const Tab = createMaterialTopTabNavigator();

const TopTab = () => {
  return (
    <View style={{flex: 1}}>
      <View style={{borderColor: COLORS.lightWhite}}>
        <View>
          <NetworkImage
            source="https://images.unsplash.com/photo-1559333086-b0a56225a93c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
            width="100%"
            height={300}
            radius={0}
          />

          <AppBar 
          top={40}
          left={20}
          right={20}
          color={COLORS.white}
          color1 ={COLORS.white}
          icon={"logout"}
          />
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
