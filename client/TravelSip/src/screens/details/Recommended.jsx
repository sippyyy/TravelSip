import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppBar, ReusableTile} from '../../components';
import {COLORS} from '../../constants/theme';
import {recommendations} from '../../mock_api';

const Recommended = ({navigation}) => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <SafeAreaView style={{marginHorizontal: 20}}>
      <View style={{height: 50}}>
        <AppBar
          top={10}
          left={0}
          right={0}
          onPress={() => navigation.goBack()}
          onPress1={() => navigation.navigate('Search')}
          title={'Recommendation'}
          color={COLORS.white}
          icon="search-outline"
          color1={COLORS.white}
        />
      </View>
      <View style={{paddingTop: 20}}>
        <FlatList
          data={recommendations}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <View style={{marginBottom: 10}}>
              <ReusableTile
                item={item}
                onPress={() => navigation.navigate('PlaceDetails', item.id)}
              />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Recommended;