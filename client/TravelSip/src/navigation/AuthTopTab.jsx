import {ScrollView, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Registration, Signin} from '../screens';
import {COLORS} from '../constants/theme';
import {AssetImage, HeightSpacer} from '../components';
const Tab = createMaterialTopTabNavigator();

const AuthTopTab = () => {
  return (
    <View style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
      <ScrollView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
        <HeightSpacer height={10} />
        <AssetImage
          data={require('../assets/images/bg1.png')}
          mode="cover"
          width={'100%'}
          height={250}
        />
        <View style={{height: 600}}>
          <Tab.Navigator>
            <Tab.Screen name="Signin" component={Signin} />
            <Tab.Screen name="Registration" component={Registration} />
          </Tab.Navigator>
        </View>
      </ScrollView>
    </View>
  );
};

export default AuthTopTab;
