import React from 'react';
import {Platform} from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  CountryDetails,
  HotelDetails,
  HotelList,
  HotelSearch,
  Onboarding,
  Payment,
  PlaceDetails,
  Recommended,
  Search,
  SelectRoom,
  SelectedRoom,
  Settings,
} from './src/screens';
import BottomTabNavigation from './src/navigation/BottomTabNavigation';

const Stack = createNativeStackNavigator();

function App() {
  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Onboard"
          component={Onboarding}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Bottom"
          component={BottomTabNavigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CountryDetails"
          component={CountryDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Recommended"
          component={Recommended}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PlaceDetails"
          component={PlaceDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HotelDetails"
          component={HotelDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HotelList"
          component={HotelList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HotelSearch"
          component={HotelSearch}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SelectRoom"
          component={SelectRoom}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Payment"
          component={Payment}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SelectedRoom"
          component={SelectedRoom}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
