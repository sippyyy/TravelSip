import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import reusable from '../../components/Reusable/reusable.style';
import {
  HeightSpacer,
  ReusableBtn,
  ReusableTile,
  WidthSpacer,
} from '../../components';
import {COLORS, SIZES} from '../../constants/theme';
import {httpRequest} from '../../api/services';
import {useAuth} from '../../context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useFetchData from '../../hooks/fetchData';
import {useIsFocused} from '@react-navigation/native';

const TopHotel = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const id = route.params.id;
  const {output, isLoading, error, refetch} = useFetchData({
    method: 'get',
    endpoint: `api/v1/user_organizations/${id}/`,
  });
  const [data, setData] = useState(output?.user_hotel ?? '');
  const {authState} = useAuth();

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  const handleDelete = async id => {
    const result = await httpRequest({
      method: 'del',
      endpoint: `api/v1/hotels/${id}/`,
      accessToken: authState.accessToken,
    });
    if (result.status === 200) {
      console.log(id);
      const new_data = data.filter(item => item.id !== id);
      setData(new_data);
    }
  };

  useEffect(() => {
    setData(output.user_hotel);
  }, [output]);

  return (
    <View style={reusable.container}>
      {/* <HeightSpacer height={10} /> */}
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
                  onPress={() =>
                    navigation.navigate('HotelDetails', item.item.id)
                  }
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
                      navigation.navigate('EditHotel', {
                        id: item.item.id,
                      })
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
      <Pressable
        onPress={() => {
          navigation.navigate('CreatePlace', 'hotels');
        }}
        style={styles.addBtn}>
        <Icon name="add" color={COLORS.white} size={SIZES.xxLarge} />
      </Pressable>
    </View>
  );
};

export default TopHotel;

const styles = StyleSheet.create({
  bookingContainer: {
    marginBottom: 10,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 12,
  },
  addBtn: {
    position: 'absolute',
    bottom: 40,
    right: 0,
    width: 50,
    height: 50,
    borderRadius: 80,
    backgroundColor: COLORS.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
