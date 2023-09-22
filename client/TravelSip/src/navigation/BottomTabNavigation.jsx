import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Chat, Home, Location} from '../screens';
import {COLORS} from '../constants/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import TopTab from './TopTab';
const Tab = createBottomTabNavigator();

const tabBarStyles = {
  // padding: 20,
  borderRadius: 20,
  height: 80,
  position: 'absolute',
  bottom: 20,
  left: 20,
  right: 20,
};

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={COLORS.red}
      tabBarHideKeyBoard={true}
      headerShown={false}
      inactiveColor="#3e2465"
      // eslint-disable-next-line react-native/no-inline-styles
      barStyle={{paddingBottom: 48}}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarStyle: tabBarStyles,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <Icon
                name={focused ? 'home' : 'home-outline'}
                color={focused ? COLORS.red : COLORS.gray}
                size={26}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Location"
        component={Location}
        options={{
          tabBarStyle: tabBarStyles,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <Icon
                name={focused ? 'location' : 'location-outline'}
                color={focused ? COLORS.red : COLORS.gray}
                size={26}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarStyle: tabBarStyles,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <Icon
                name={
                  focused
                    ? 'chatbubble-ellipses'
                    : 'chatbubble-ellipses-outline'
                }
                color={focused ? COLORS.red : COLORS.gray}
                size={26}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={TopTab}
        options={{
          tabBarStyle: tabBarStyles,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <Icon
                name={focused ? 'person' : 'person-outline'}
                color={focused ? COLORS.red : COLORS.gray}
                size={26}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
