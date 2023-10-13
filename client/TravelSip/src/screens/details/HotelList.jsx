import {View, FlatList} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppBar, ReusableTile} from '../../components';
import {COLORS} from '../../constants/theme';
import useFetchData from '../../hooks/fetchData';

const HotelList = ({navigation}) => {
  const {output, isLoading, error, refetch} = useFetchData({
    method: 'get',
    endpoint: 'api/v1/hotels/',
  });
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <SafeAreaView style={{marginHorizontal: 20}}>
      <View style={{height: 50}}>
        <AppBar
          top={10}
          left={0}
          right={0}
          onPress={() => navigation.goBack()}
          onPress1={() => navigation.navigate('HotelSearch')}
          title={'Nearby hotels'}
          color={COLORS.white}
          icon="search-outline"
          color1={COLORS.white}
        />
      </View>
      <View style={{paddingTop: 20}}>
        <FlatList
          data={output}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <View style={{marginBottom: 10}}>
              <ReusableTile
                item={item}
                onPress={() => navigation.navigate('HotelDetails', item.id)}
              />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default HotelList;
