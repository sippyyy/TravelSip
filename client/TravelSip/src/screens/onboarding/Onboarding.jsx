import {StyleSheet, Text, FlatList} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Slides} from '../../components';

const Onboarding = () => {
  const slides = [
    {
      id: 1,
      image: require('../../assets/images/1.jpg'),
      title: 'Find a perfect place to stay',
    },
    {
      id: 2,
      image: require('../../assets/images/2.jpg'),
      title: 'Discover the world',
    },
    {
      id: 3,
      image: require('../../assets/images/4.jpg'),
      title: 'Find the best Hotels in the world',
    },
  ];

  return (
    <SafeAreaView>
      <FlatList
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        data={slides}
        keyExtractor={(item, index) => item.id}
        renderItem={({item}) => <Slides item={item} />}
      />
    </SafeAreaView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({});
