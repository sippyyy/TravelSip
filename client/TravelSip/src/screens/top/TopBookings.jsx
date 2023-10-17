import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
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

const TopBookings = ({navigation}) => {
  const {authState} = useAuth();
  const {output, isLoading, error, refetch} = useFetchData({
    method: 'get-auth',
    endpoint: 'api/v1/bookings/',
    params: {my_booking: true},
    accessToken: authState.accessToken,
  });
  useEffect(() => {
    console.log({error});
  }, [error]);
  return (
    <View style={{margin: 20}}>
      <FlatList
        data={output}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <>
            <View style={styles.bookingContainer}>
              <ReusableTile
                item={item.hotel}
                onPress={() => navigation.navigate('HotelDetails', item.hotel)}
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
                  onPress={() => navigation.navigate('')}
                  textColor={COLORS.white}
                  borderWidth={1}
                  btnText={'Cancel'}
                  borderColor={COLORS.red}
                  backGroundColor={COLORS.red}
                />
              </View>
              <HeightSpacer height={10} />
            </View>
            {index + 1 === output.length ? <HeightSpacer height={80} /> : null}
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
