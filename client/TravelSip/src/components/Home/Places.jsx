import {ActivityIndicator, View, VirtualizedList} from 'react-native';
import React from 'react';
import HeightSpacer from '../Reusable/HeightSpacer';
// import {countries} from '../../mock_api';
import {COLORS, SIZES} from '../../constants/theme';
import Country from '../Tiles/Country/Country';
import useFetchCountries from '../../hooks/fetchCountries';

const Places = () => {
  const {countries, isLoading, error, refetch} = useFetchCountries();
  if (isLoading) {
    return <ActivityIndicator size={SIZES.xxLarge} color={COLORS.lightBlue} />;
  }

  return (
    <View>
      <HeightSpacer height={20} />
      <VirtualizedList
        data={countries}
        horizontal
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        getItemCount={data => data.length}
        getItem={(data, index) => data[index]}
        renderItem={({item, index}) => (
          <View style={{marginRight: SIZES.medium}}>
            <Country item={item} />
          </View>
        )}
      />
    </View>
  );
};

export default Places;
