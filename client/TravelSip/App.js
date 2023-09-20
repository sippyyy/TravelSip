import React from 'react';
import {StyleSheet, Platform} from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  CountryDetails,
  Onboarding,
  PlaceDetails,
  Recommended,
  Search,
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  highlight: {
    fontFamily: 'xtrabold',
    fontSize: 30,
  },
});

export default App;
