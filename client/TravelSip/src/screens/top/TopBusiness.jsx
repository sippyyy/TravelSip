import {FlatList, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import reusable from '../../components/Reusable/reusable.style';
import {
  HeightSpacer,
  ReusableBtn,
  ReusableTile,
  WidthSpacer,
} from '../../components';
import {COLORS} from '../../constants/theme';
import {httpRequest} from '../../api/services';
import {useAuth} from '../../context/AuthContext';

const TopBusiness = ({navigation, route}) => {
  const {user_hotel} = route.params.output;
  const [data, setData] = useState(user_hotel);
  const {authState} = useAuth();

  const handleDelete = async id => {
    const result = await httpRequest({
      method: 'del',
      endpoint: `api/v1/hotels/${id}/`,
      accessToken: authState.accessToken,
    });
    if (result.status === 200) {
      const new_data = data.filter(item => item.id !== id);
      setData(new_data);
    }
  };

  return (
    <View style={reusable.container}>
      <HeightSpacer height={10} />
      {data?.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={(item, index) => (
            <>
              <View style={styles.bookingContainer}>
                <ReusableTile
                  item={item.item}
                  onPress={() => navigation.navigate('BookingDetails', item)}
                />
                <View
                  style={[
                    reusable.rowWithSpace('space-between'),
                    {marginHorizontal: 10},
                  ]}>
                  <ReusableBtn
                    onPress={() => handleDelete(item.item.id)}
                    textColor={COLORS.white}
                    btnText={'Delete'}
                    borderColor={COLORS.red}
                    backGroundColor={COLORS.red}
                    flex={1}
                  />
                  <WidthSpacer width={5} />
                  <ReusableBtn
                    flex={1}
                    onPress={() =>
                      navigation.navigate('EditHotel', item.item.id)
                    }
                    textColor={COLORS.white}
                    borderWidth={1}
                    btnText={'Edit'}
                    borderColor={COLORS.green}
                    backGroundColor={COLORS.green}
                  />
                </View>
                <HeightSpacer height={10} />
              </View>
              {index + 1 === data.length ? <HeightSpacer height={80} /> : null}
            </>
          )}
        />
      ) : null}
    </View>
  );
};

export default TopBusiness;

const styles = StyleSheet.create({
  bookingContainer: {
    marginBottom: 10,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 12,
  },
});
