import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import HeightSpacer from '../Reusable/HeightSpacer';
import ReusableText from '../Reusable/ReusableText';
import {COLORS, SIZES, TEXT} from '../../constants/theme';
import reusable from '../Reusable/reusable.style';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import HotelCard from '../Tiles/Hotels/HotelCard';
import useFetchData from '../../hooks/fetchData';

const BestHotel = () => {
  const navigation = useNavigation();
  const {output, isLoading, error, refetch} = useFetchData({
    method: 'get',
    endpoint: 'api/v1/hotels/',
  });

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
        <TouchableOpacity onPress={() => navigation.navigate('HotelList')}>
          <Icon name="list" size={20} color={COLORS.black} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={output}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        contentContainerStyle={{columnGap: SIZES.medium}}
        renderItem={({item}) => (
          <HotelCard
            margin={10}
            item={item}
            onPress={() => navigation.navigate('HotelDetails', item.id)}
          />
        )}
      />
    </View>
  );
};

export default BestHotel;

const styles = StyleSheet.create({});
