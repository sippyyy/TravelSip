import {StyleSheet, View} from 'react-native';
import React from 'react';
import reusable from '../Reusable/reusable.style';
import NetworkImage from '../Reusable/NetworkImage';
import {COLORS, SIZES, TEXT} from '../../constants/theme';
import ReusableText from '../Reusable/ReusableText';
import WidthSpacer from '../Reusable/WidthSpacer';
import Icon from 'react-native-vector-icons/Ionicons';
import HeightSpacer from '../Reusable/HeightSpacer';

const TileRoom = ({item}) => {
  return (
    <View style={styles.container}>
      <View style={reusable.rowWithSpace('flex-start')}>
        <NetworkImage
          source={item.imageUrl}
          width={80}
          height={80}
          radius={SIZES.small}
        />
        <WidthSpacer width={10} />
        <View style={{flex: 1}}>
          <ReusableText
            text={item.name}
            size={TEXT.medium}
            family={'medium'}
            color={COLORS.black}
          />
          <HeightSpacer height={10} />
          <View style={reusable.rowWithSpace('flex-start')}>
            <View style={reusable.rowWithSpace('flex-start')}>
              <Icon name="bed" size={TEXT.small} />
              <WidthSpacer width={10} />
              <ReusableText
                text={`x ${item.bed}`}
                size={TEXT.small}
                color={COLORS.gray}
                family={'regular'}
              />
            </View>
            <WidthSpacer width={20} />

            <View style={reusable.rowWithSpace('flex-start')}>
              <Icon name="body" size={TEXT.small} />
              <WidthSpacer width={10} />
              <ReusableText
                text={`x ${item.person}`}
                size={TEXT.small}
                color={COLORS.gray}
                family={'regular'}
              />
            </View>
          </View>
          <HeightSpacer height={10} />
          <View style={reusable.rowWithSpace('flex-end')}>
            <ReusableText
              text={`$${item.price}`}
              size={TEXT.large}
              family={'bold'}
              color={COLORS.dark}
            />
            <WidthSpacer width={5} />
            <ReusableText
              text={'/ per night'}
              size={SIZES.small}
              family={'regular'}
              color={COLORS.gray}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default TileRoom;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
