import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import reusable from './reusable.style';
import {COLORS, SIZES} from '../../constants/theme';
import NetworkImage from './NetworkImage';
import WidthSpacer from './WidthSpacer';
import ReusableText from './ReusableText';
import HeightSpacer from './HeightSpacer';
import Rating from './Rating';

const ReusableTile = ({item, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={reusable.rowWithSpace('flex-start')}>
        <NetworkImage
          source={item.imageUrl}
          width={80}
          height={80}
          radius={12}
        />
        <WidthSpacer width={15} />
        <View style={{flex: 1}}>
          <ReusableText
            text={item.title}
            family="medium"
            size={SIZES.medium}
            color={COLORS.black}
          />
          <HeightSpacer height={8} />
          <ReusableText
            text={item?.location ?? `${item.address},${item.city}`}
            family="medium"
            size={14}
            color={COLORS.gray}
          />
          <HeightSpacer height={8} />
          {item?.rating ? (
            <View style={reusable.rowWithSpace('flex-start')}>
              <Rating rating={item.rating.toFixed(1)} />
              <WidthSpacer width={5} />
              <ReusableText
                text={`(${item.reviews})`}
                family="medium"
                size={14}
                color={COLORS.gray}
              />
            </View>
          ) : (
            <View style={reusable.rowWithSpace('flex-start')}>
              <ReusableText
                text={`Details: ${item.description}`}
                family="medium"
                size={14}
                color={COLORS.gray}
              />
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ReusableTile;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 12,
    overflow: 'hidden',
  },
});
