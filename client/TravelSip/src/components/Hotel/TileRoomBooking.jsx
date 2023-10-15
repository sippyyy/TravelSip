import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import reusable from '../Reusable/reusable.style';
import NetworkImage from '../Reusable/NetworkImage';
import {COLORS, SIZES, TEXT} from '../../constants/theme';
import ReusableText from '../Reusable/ReusableText';
import WidthSpacer from '../Reusable/WidthSpacer';
import HeightSpacer from '../Reusable/HeightSpacer';

const TileRoomBooking = ({room}) => {
  console.log(room);
  return (
    <View style={{backgroundColor: COLORS.white, borderRadius: SIZES.medium}}>
      <View style={[reusable.rowWithSpace('flex-start'), {padding: 10}]}>
        <NetworkImage
          source={room.room.imageUrl}
          width={80}
          height={80}
          radius={SIZES.regular}
        />
        <WidthSpacer width={10} />
        <View>
          <ReusableText
            text={room.room.name}
            size={TEXT.medium}
            family={'regular'}
            color={COLORS.black}
          />
          <HeightSpacer height={5} />
          <View style={reusable.rowWithSpace('flex-start')}>
            <ReusableText
              text="Check in: "
              color={COLORS.gray}
              size={TEXT.small}
              family={'regular'}
            />
            <ReusableText
              text={room.check_in}
              color={COLORS.black}
              size={TEXT.small}
              family={'regular'}
            />
          </View>
          <HeightSpacer height={5} />

          <View style={reusable.rowWithSpace('flex-start')}>
            <ReusableText
              text="Check out: "
              color={COLORS.gray}
              size={TEXT.small}
              family={'regular'}
            />
            <ReusableText
              text={room.check_out}
              color={COLORS.black}
              size={TEXT.small}
              family={'regular'}
            />
          </View>
          <HeightSpacer height={5} />

          <ReusableText
            text={`${room.booking_duration} night(s)`}
            color={COLORS.black}
            size={TEXT.small}
            family={'regular'}
          />
        </View>
      </View>
    </View>
  );
};

export default TileRoomBooking;

const styles = StyleSheet.create({});
