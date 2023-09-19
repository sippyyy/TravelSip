import {StyleSheet, Text, View, VirtualizedList} from 'react-native';
import React from 'react';
import HeightSpacer from '../Reusable/HeightSpacer';
import {countries} from '../../mock_api';
import {SIZES} from '../../constants/theme';
import Country from '../Tiles/Country/Country';

const Places = () => {
  return (
    <View>
      <HeightSpacer height={20} />
      <VirtualizedList
        data={countries}
        horizontal
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
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

const styles = StyleSheet.create({});
