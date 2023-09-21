import {FlatList, View} from 'react-native';
import React from 'react';
import ReviewTle from '../Tiles/Reviews/ReviewTle';

const ReviewList = ({reviews}) => {
  return (
    <FlatList
      data={reviews}
      keyExtractor={item => item.id}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => (
        <View style={{paddingBottom: 10}}>
          <ReviewTle review={item} />
        </View>
      )}
    />
  );
};

export default ReviewList;
