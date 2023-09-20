import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import HeightSpacer from '../Reusable/HeightSpacer';
import ReusableText from '../Reusable/ReusableText';
import {COLORS, SIZES, TEXT} from '../../constants/theme';
import reusable from '../Reusable/reusable.style';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {hotels} from '../../mock_api';
import HotelCard from '../Tiles/Hotels/HotelCard';

const BestHotel = () => {
  const navigation = useNavigation();
  return (
    <View>
      <HeightSpacer height={30} />
      <View
        style={[reusable.rowWithSpace('space-between'), {paddingBottom: 20}]}>
        <ReusableText
          text="Nearby hotels"
          family="medium"
          size={TEXT.large}
          color={COLORS.black}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Recommended')}>
          <Icon name="list" size={20} color={COLORS.black} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={hotels}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        contentContainerStyle={{columnGap: SIZES.medium}}
        renderItem={({item}) => (
          <HotelCard
            item={item}
            onPress={() => navigation.navigate('HotelDetails')}
          />
        )}
      />
    </View>
  );
};

export default BestHotel;

const styles = StyleSheet.create({});
