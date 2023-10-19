import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import reusable from '../../components/Reusable/reusable.style';
import {
  HeightSpacer,
  ReusableBtn,
  ReusableTile,
  WidthSpacer,
} from '../../components';
import {COLORS} from '../../constants/theme';

const TopBookingRequests = ({navigation, route}) => {
  const output = route.params;

  return (
    <View style={reusable.container}>
      <HeightSpacer height={10} />
      {/* {output?.user_hotel?.length > 0 ? (
        <FlatList
          data={output?.user_hotel}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={(item, index) => (
            <>
              <View style={styles.bookingContainer}>
                <ReusableTile
                  item={item.hotel}
                  onPress={() =>
                    navigation.navigate('BookingDetails', item.hotel)
                  }
                />
                <View
                  style={[
                    reusable.rowWithSpace('space-between'),
                    {marginHorizontal: 10},
                  ]}>
                  <ReusableBtn
                    onPress={() => navigation.navigate('BookingDetails', item)}
                    textColor={COLORS.white}
                    btnText={'Reject'}
                    borderColor={COLORS.red}
                    backGroundColor={COLORS.red}
                    flex={1}
                  />
                  <WidthSpacer width={5} />
                  <ReusableBtn
                    flex={1}
                    onPress={() => navigation.navigate('')}
                    textColor={COLORS.white}
                    borderWidth={1}
                    btnText={'Approve'}
                    borderColor={COLORS.green}
                    backGroundColor={COLORS.green}
                  />
                </View>
                <HeightSpacer height={10} />
              </View>
              {index + 1 === output.length ? (
                <HeightSpacer height={80} />
              ) : null}
            </>
          )}
        />
      ) : null} */}
    </View>
  );
};

export default TopBookingRequests;

const styles = StyleSheet.create({
  bookingContainer: {
    marginBottom: 10,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 12,
  },
});
