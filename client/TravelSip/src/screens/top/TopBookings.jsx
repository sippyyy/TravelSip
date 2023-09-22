import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import hotels from '../../mock_api/hotels.list';
import {HeightSpacer, ReusableTile} from '../../components';
import {COLORS} from '../../constants/theme';
import reusable from '../../components/Reusable/reusable.style';

const TopBookings = ({navigation}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{margin: 20}}>
      <FlatList
        data={hotels}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={{marginBottom: 5, backgroundColor: COLORS.lightWhite}}>
            <ReusableTile
              item={item}
              onPress={() => navigation.navigate('HotelDetails', item.id)}
            />
            <View style={reusable.rowWithSpace('space-between')}></View>
          </View>
        )}
      />
      <HeightSpacer height={80} />
    </ScrollView>
  );
};

export default TopBookings;

const styles = StyleSheet.create({});
