import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {TopDestination, TopHotel} from '../screens';
import {COLORS, SIZES, TEXT} from '../constants/theme';
import {useAuth} from '../context/AuthContext';

const Tab = createMaterialTopTabNavigator();

function CustomTabBar({state, descriptors, navigation, position}) {
  return (
    <View style={{flexDirection: 'row', margin: 10}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            onPress={onPress}
            style={{
              flex: 1,
              alignItems: 'center',
              marginHorizontal: 5,
              borderRadius: 10,
              backgroundColor: isFocused ? COLORS.green : 'transparent',
              padding: 5,
              borderWidth: 1,
              borderColor: COLORS.lightGreen,
            }}>
            <Text
              style={{
                color: isFocused ? COLORS.white : COLORS.lightGreen,
                fontSize: TEXT.xSmall,
              }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function TopSmallTab() {
  const {authState} = useAuth();
  return (
    <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen
        name="Accommodations"
        component={TopHotel}
        initialParams={{id: authState.id}}
      />
      <Tab.Screen
        name="Destinations"
        component={TopDestination}
        initialParams={{id: authState.id}}
      />
    </Tab.Navigator>
  );
}

export default TopSmallTab;
