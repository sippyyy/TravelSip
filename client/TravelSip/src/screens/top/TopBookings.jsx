import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  HeightSpacer,
  ReusableBtn,
  ReusableTile,
  WidthSpacer,
} from '../../components';
import {COLORS} from '../../constants/theme';
import reusable from '../../components/Reusable/reusable.style';
import useFetchData from '../../hooks/fetchData';
import {useAuth} from '../../context/AuthContext';
import {httpRequest} from '../../api/services';

const TopBookings = ({navigation}) => {
  const {authState} = useAuth();
  const {output, isLoading, error, refetch} = useFetchData({
    method: 'get-auth',
    endpoint: 'api/v1/bookings/',
    params: {my_booking: true},
    accessToken: authState.accessToken,
  });
  const [data, setData] = useState(null);
  useEffect(() => {
    // console.log({error});
  }, [error]);

  useEffect(() => {
    setData(output);
  }, [output]);

  const handleCancelBooking = async id => {
    const result = await httpRequest({
      method: 'del',
      endpoint: `api/v1/bookings/${id}/`,
      accessToken: authState.accessToken,
    });
    if (result.status === 200) {
      const new_data = data.filter(item => item.id === id);
      setData(new_data);
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
              <ReusableTile
                item={item.hotel}
                onPress={() =>
                  navigation.navigate('HotelDetails', item.hotel.id)
                }
              />
              <View
                style={[
                  reusable.rowWithSpace('space-between'),
                  {marginHorizontal: 10},
                ]}>
                <ReusableBtn
                  onPress={() => navigation.navigate('BookingDetails', item)}
                  textColor={COLORS.lightBlue}
                  borderWidth={1}
                  btnText={'Details'}
                  borderColor={COLORS.lightBlue}
                  flex={1}
                />
                <WidthSpacer width={5} />
                <ReusableBtn
                  flex={1}
                  onPress={() => handleCancelBooking(item.id)}
                  textColor={COLORS.white}
                  borderWidth={1}
                  btnText={'Cancel'}
                  borderColor={COLORS.red}
                  backGroundColor={COLORS.red}
                />
              </View>
              <HeightSpacer height={10} />
            </View>
            {index + 1 === data.length ? <HeightSpacer height={80} /> : null}
          </>
        )}
      />
    </View>
  );
};

export default TopBookings;

const styles = StyleSheet.create({
  bookingContainer: {
    marginBottom: 10,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 12,
  },
});
