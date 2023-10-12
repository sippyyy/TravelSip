import {FlatList, View} from 'react-native';
import React from 'react';
import ReusableTile from '../Reusable/ReusableTile';
import {useNavigation} from '@react-navigation/native';

const PopularList = ({data, navigate}) => {
  const navigation = useNavigation();
  const renderItem = ({item}) => (
    <View style={{marginBottom: 10}}>
      <ReusableTile
        item={item}
        onPress={() => navigation.navigate(navigate, item.id)}
      />
    </View>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
    />
  );
};

export default PopularList;
