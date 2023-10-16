import React from 'react';
import {Platform} from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  AuthTopTab,
  CountryDetails,
  Failed,
  HotelDetails,
  HotelList,
  HotelSearch,
  Info,
  Onboarding,
  Payment,
  PlaceDetails,
  Recommended,
  Search,
  SelectRoom,
  SelectedRoom,
  Settings,
  Successful,
} from './src/screens';
import BottomTabNavigation from './src/navigation/BottomTabNavigation';
import {AuthProvider, useAuth} from './src/context/AuthContext';

const Stack = createNativeStackNavigator();

function App() {
  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
  }, []);

  return (
    <AuthProvider>
      <Layout></Layout>
    </AuthProvider>
  );
}

export default App;

export const Layout = () => {
  const {authState} = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authState?.accessToken ? (
          <>
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
              name="Information"
              component={Info}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SelectedRoom"
              component={SelectedRoom}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Successful"
              component={Successful}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Failed"
              component={Failed}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <Stack.Screen
            name="AuthTop"
            component={AuthTopTab}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
