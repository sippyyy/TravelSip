import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {
  AppBar,
  HeightSpacer,
  ReusableBtn,
  ReusableText,
  WidthSpacer,
} from '../../components';
import reusable from '../../components/Reusable/reusable.style';
import {COLORS, SIZES, TEXT} from '../../constants/theme';
import {Rating} from 'react-native-stock-star-rating';
import Icon from 'react-native-vector-icons/Ionicons';

const BookingDetails = ({navigation}) => {
  const route = useRoute();
  const data = route.params;
  return (
    <View style={reusable.container}>
      <AppBar
        left={0}
        right={0}
        top={10}
        title={'Booking Details'}
        onPress={() => navigation.goBack()}
      />
      <HeightSpacer height={60} />
      <View
        style={{
          backgroundColor: COLORS.white,
          padding: 10,
          borderRadius: SIZES.small,
          borderTopWidth: SIZES.medium,
          borderColor: COLORS.lightRed,
        }}>
        <View>
          <ReusableText
            size={TEXT.xSmall}
            family={'light'}
            color={COLORS.black}
            text="Booking status: "
          />
          <ReusableText
            align={'left'}
            family={'regular'}
            size={TEXT.medium}
            color={COLORS.black}
            text={data.status}
          />
        </View>
        <HeightSpacer height={20} />
        <View>
          <ReusableText
            family={'bold'}
            size={TEXT.medium}
            color={COLORS.black}
            text={data.hotel.title}
          />
          <Rating
            maxStars={5}
            stars={data.hotel.rating}
            bordered={false}
            color={'#FD9942'}
          />
          <HeightSpacer height={15} />
          <View style={reusable.rowWithSpace('flex-start')}>
            <Icon
              name="calendar-number-outline"
              size={TEXT.medium}
              color={COLORS.black}
            />
            <WidthSpacer width={15} />
            <View style={{flex: 1}}>
              <ReusableText
                family={'bold'}
                size={TEXT.small}
                color={COLORS.black}
                text={`${data.check_in} - ${data.check_out}`}
              />
              <ReusableText
                family={'light'}
                size={TEXT.small}
                color={COLORS.black}
                text={'Check in: from 14:00'}
              />
              <ReusableText
                family={'light'}
                size={TEXT.small}
                color={COLORS.black}
                text={'Check out: until 12:00'}
              />
            </View>
          </View>
          <HeightSpacer height={10} />
          <View style={reusable.rowWithSpace('flex-start')}>
            <Icon
              name="location-outline"
              size={TEXT.medium}
              color={COLORS.black}
            />
            <WidthSpacer width={15} />
            <View style={{flex: 1}}>
              <ReusableText
                family={'bold'}
                size={TEXT.small}
                color={COLORS.black}
                text={'Property address'}
              />
              <ReusableText
                family={'light'}
                size={TEXT.small}
                color={COLORS.black}
                text={data.hotel.location}
              />
            </View>
          </View>
        </View>
        <HeightSpacer height={20} />
        <View>
          <ReusableText
            family={'bold'}
            size={TEXT.medium}
            color={COLORS.black}
            text={
              data.status === 'pending'
                ? `You are sending a request to book room`
                : `You booked room successfully`
            }
          />
          <ReusableText
            family={'regular'}
            size={TEXT.small}
            color={COLORS.black}
            text={data.room.name}
          />
        </View>
        <HeightSpacer height={30} />
        <View style={reusable.rowWithSpace('space-between')}>
          <ReusableText
            family={'bold'}
            size={TEXT.large}
            color={COLORS.black}
            text={'Total'}
          />
          <ReusableText
            family={'bold'}
            size={TEXT.large}
            color={COLORS.black}
            text={`$${data.booking_duration * data.room.price}`}
          />
        </View>
      </View>
      <HeightSpacer height={20} />
      <ReusableBtn
        onPress={() => navigation.goBack()}
        btnText={'Go back'}
        textColor={COLORS.white}
        backGroundColor={COLORS.red}
        height={80}
      />
    </View>
  );
};

export default BookingDetails;

const styles = StyleSheet.create({});
