import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../../../constants/theme';
import {
  HeightSpacer,
  NetworkImage,
  Rating,
  ReusableText,
} from '../../../components';
import reusable from '../../Reusable/reusable.style';

const HotelCard = ({item, margin, onPress}) => {
  return (
    <TouchableOpacity style={styles.card(margin)} onPress={onPress}>
      <View>
        <View style={styles.imageContainer}>
          <NetworkImage
            source={item.imageUrl}
            width={'90%'}
            height={'100%'}
            radius={16}
          />
        </View>
        <HeightSpacer height={5} />
        <View style={{padding: 10}}>
          <ReusableText
            text={item.title}
            family="medium"
            size={SIZES.medium}
            color={COLORS.black}
          />
          <ReusableText
            text={item?.location ?? `${item.address},${item.city}`}
            family="medium"
            size={SIZES.medium}
            color={COLORS.gray}
          />
          <HeightSpacer height={5} />
          {item?.rating ? (
            <Rating rating={item?.rating?.toFixed?.(1)} />
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

export default HotelCard;

const styles = StyleSheet.create({
  card: margin => ({
    width: SIZES.width / 2.2,
    height: 250,
    borderRadius: 16,
    backgroundColor: COLORS.lightWhite,
    marginRight: margin,
  }),
  imageContainer: {
    alignItems: 'center',
    marginTop: 10,
    height: 150,
  },
});
