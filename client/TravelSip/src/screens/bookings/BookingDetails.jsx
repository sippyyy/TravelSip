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

const get_bg_status = status => {
  let bg;
  switch (status) {
    case 'rejected':
      bg = COLORS.lightRed;
      break;
    case 'approved':
      bg = COLORS.lightGreen;
      break;
    case 'completed':
      bg = COLORS.green;
      break;
    case 'expired':
      bg = COLORS.gray;
      break;
    default:
      bg = COLORS.blue;
      break;
  }
  return bg;
};

const get_status_text_user = status => {
  let text;
  switch (status) {
    case 'rejected':
      text =
        'This booking is rejected by the owner for some reasons! Contact the owner for more details.';
      break;
    case 'approved':
      text = 'Congratulations! Booking is approved, have a nice trip!';
      break;
    case 'completed':
      text = 'Booking completed!, thank you for your support.';
      break;
    case 'expired':
      text = 'This booking request is expired!';
      break;
    default:
      text =
        "You are sending a booking request, please wait the response of hotel's owner";
      break;
  }
  return text;
};

const get_status_text_bzness = status => {
  let text;
  switch (status) {
    case 'rejected':
      text = 'You are rejected this booking';
      break;
    case 'approved':
      text =
        'You are approved this booking request, please prepare to give a warm welcome your client';
      break;
    case 'completed':
      text = 'Booking completed!';
      break;
    case 'expired':
      text = 'This booking request is expired!';
      break;
    default:
      text = 'Client are sending a booking request, please response asap!';
      break;
  }
  return text;
};

const BookingDetails = ({navigation}) => {
  const route = useRoute();
  const {data, screen} = route.params;
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
          borderColor: get_bg_status(data.status),
        }}>
        <View>
          <ReusableText
            size={TEXT.xSmall}
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
            lines={3}
            text={
              screen === 'user'
                ? get_status_text_user(data.status)
                : get_status_text_bzness(data.status)
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
      <View style={reusable.rowWithSpace('space-between')}>
        <ReusableBtn
          onPress={() => navigation.goBack()}
          btnText={'Go back'}
          textColor={get_bg_status(data.status)}
          backGroundColor={COLORS.white}
          borderWidth={1}
          borderColor={get_bg_status(data.status)}
          height={80}
          flex={1}
        />
        {data.status === 'completed' && screen === 'user' ? (
          <>
            <WidthSpacer width={10} />
            <ReusableBtn
              onPress={() => navigation.navigate('Review', data.hotel.id)}
              btnText={'Write review'}
              textColor={COLORS.white}
              backGroundColor={get_bg_status(data.status)}
              height={80}
              flex={1}
            />
          </>
        ) : null}
      </View>
    </View>
  );
};

export default BookingDetails;
