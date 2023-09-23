import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import hotels from '../../mock_api/hotels.list';
import {HeightSpacer, ReusableBtn, ReusableTile} from '../../components';
import {COLORS} from '../../constants/theme';
import reusable from '../../components/Reusable/reusable.style';

const TopBookings = ({navigation}) => {
  return (
    <View style={{margin: 20}}>
      <FlatList
        data={hotels}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <>
            <View style={styles.bookingContainer}>
              <ReusableTile
                item={item}
                onPress={() => navigation.navigate('HotelDetails', item.id)}
              />
              <View
                style={[
                  reusable.rowWithSpace('space-between'),
                  {marginHorizontal: 10},
                ]}>
                <ReusableBtn
                  width={170}
                  onPress={() => navigation.navigate('')}
                  textColor={COLORS.lightBlue}
                  borderWidth={1}
                  btnText={'Details'}
                  borderColor={COLORS.lightBlue}
                />
                <ReusableBtn
                  width={170}
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
            {index + 1 === hotels.length ? <HeightSpacer height={80} /> : null}
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
