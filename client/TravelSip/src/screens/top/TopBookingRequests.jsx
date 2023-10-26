import {FlatList, Pressable, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  AssetImage,
  HeightSpacer,
  NetworkImage,
  ReusableBtn,
  ReusableText,
  ReusableTile,
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
      image = require('../../assets/images/rejected.png');
      break;
    case 'approved':
      image = require('../../assets/images/approve.png');
      break;
    default:
      break;
  }
  return image;
};

const TopBookingRequest = ({navigation}) => {
  const {authState} = useAuth();
  const {output, isLoading, error, refetch} = useFetchData({
    method: 'get-auth',
    endpoint: 'api/v1/bookings/',
    params: {my_booking_request: true},
    accessToken: authState.accessToken,
  });
  const [data, setData] = useState(null);
  useEffect(() => {
    // console.log({error});
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
      refetch()
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
              {item.status !== 'pending' ? (
                <View
                  style={{position: 'absolute', right: 0, top: 0, zIndex: 1}}>
                  <AssetImage
                    width={60}
                    height={60}
                    mode={'contain'}
                    data={get_status_img(item.status)}
                  />
                </View>
              ) : null}
              <Pressable
                onPress={() => navigation.navigate('BookingDetails', item)}
                style={[reusable.rowWithSpace('flex-start'), {padding: 15}]}>
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
                      <ReusableText text={item.check_in} color={COLORS.green} />
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
  },
});
