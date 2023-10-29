import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  AssetImage,
  HeightSpacer,
  NetworkImage,
  ReusableBtn,
  ReusableText,
  WidthSpacer,
} from '../../components';
import {COLORS, TEXT} from '../../constants/theme';
import reusable from '../../components/Reusable/reusable.style';
import useFetchData from '../../hooks/fetchData';
import {useAuth} from '../../context/AuthContext';
import {httpRequest} from '../../api/services';

const get_status_img = status => {
  let image;
  switch (status) {
    case 'rejected':
      image = require('../../assets/images/test.png');
      break;
    case 'approved':
      image = require('../../assets/images/approved.png');
      break;
    case 'completed':
      image = require('../../assets/images/completed.png');
      break;
    case 'expired':
      image = require('../../assets/images/expired.png');
      break;
    default:
      image = require('../../assets/images/pending.png');
      break;
  }
  return image;
};

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

const TopBookingRequest = ({navigation}) => {
  const {authState, verifyAuthentication} = useAuth();
  const {output, isLoading, error, refetch} = useFetchData({
    method: 'get-auth',
    endpoint: 'api/v1/bookings/',
    params: {my_booking_request: true},
    accessToken: authState.accessToken,
  });

  const [data, setData] = useState(null);
  useEffect(() => {
    if (error?.status === 403) {
      const reset = async () => {
        await verifyAuthentication();
        refetch();
      };
      reset();
    }
  }, [error]);

  useEffect(() => {
    setData(output);
  }, [output]);

  const handleAnswerBooking = async (id, type) => {
    const formData = new FormData();
    formData.append('status', type);
    const result = await httpRequest({
      method: 'put',
      endpoint: `api/v1/booking_approve/${id}/`,
      accessToken: authState.accessToken,
      dataInput: formData,
    });
    if (result.status === 200) {
      refetch();
    } else if (result.status === 403) {
      verifyAuthentication();
    }
  };

  return (
    <View style={{margin: 20}}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <>
            <View style={styles.bookingContainer}>
              <Pressable
                onPress={() =>
                  navigation.navigate('BookingDetails', {
                    data: item,
                    screen: 'owner',
                  })
                }>
                <View
                  style={[
                    reusable.rowWithSpace('space-between'),
                    {
                      backgroundColor: get_bg_status(item.status),
                      paddingHorizontal: 15,
                    },
                  ]}>
                  <AssetImage
                    data={get_status_img(item.status)}
                    width={30}
                    height={30}
                  />
                  <ReusableText
                    text={item.status.toUpperCase()}
                    color={COLORS.white}
                    family={'bold'}
                  />
                </View>
                <View
                  style={[
                    reusable.rowWithSpace('flex-start'),
                    {paddingHorizontal: 15},
                  ]}>
                  <NetworkImage
                    source={item.room.imageUrl}
                    width={80}
                    height={80}
                    radius={10}
                  />
                  <WidthSpacer width={10} />
                  <View style={{flex: 1}}>
                    <ReusableText
                      text={`${item.hotel.title} | ${item.room.name}`}
                      size={TEXT.medium}
                      color={COLORS.black}
                    />
                    <HeightSpacer height={5} />
                    <View style={reusable.rowWithSpace('flex-start')}>
                      <View style={reusable.rowWithSpace('flex-start')}>
                        <ReusableText text={'From:'} family={'regular'} />
                        <WidthSpacer width={5} />
                        <ReusableText
                          text={item.check_in}
                          color={COLORS.green}
                        />
                      </View>
                      <WidthSpacer width={10} />
                      <View style={reusable.rowWithSpace('flex-start')}>
                        <ReusableText text={'To:'} family={'regular'} />
                        <WidthSpacer width={5} />
                        <ReusableText
                          text={item.check_out}
                          color={COLORS.green}
                        />
                      </View>
                    </View>
                    <HeightSpacer height={5} />
                    <View style={reusable.rowWithSpace('flex-start')}>
                      <ReusableText
                        text={'Total:'}
                        size={TEXT.small}
                        family={'regular'}
                      />
                      <WidthSpacer width={5} />

                      <ReusableText
                        text={`$${item.room.price * item.booking_duration}`}
                        size={TEXT.small}
                        family={'regular'}
                      />
                    </View>
                  </View>
                </View>
                <HeightSpacer height={10} />
              </Pressable>
              {item.status === 'pending' ? (
                <View
                  style={[
                    reusable.rowWithSpace('space-between'),
                    {marginHorizontal: 10},
                  ]}>
                  <ReusableBtn
                    onPress={() => handleAnswerBooking(item.id, 'rejected')}
                    textColor={COLORS.white}
                    btnText={'Reject'}
                    borderColor={COLORS.red}
                    backGroundColor={COLORS.red}
                    flex={1}
                  />
                  <WidthSpacer width={5} />
                  <ReusableBtn
                    flex={1}
                    onPress={() => handleAnswerBooking(item.id, 'approved')}
                    textColor={COLORS.white}
                    borderWidth={1}
                    btnText={'Approve'}
                    borderColor={COLORS.green}
                    backGroundColor={COLORS.green}
                  />
                </View>
              ) : null}
              <HeightSpacer height={10} />
            </View>
          </>
        )}
      />
    </View>
  );
};

export default TopBookingRequest;

const styles = StyleSheet.create({
  bookingContainer: {
    marginBottom: 10,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 12,
    overflow: 'hidden',
  },
});
