import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import reusable from '../../components/Reusable/reusable.style';
import {
  Empty,
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

const TopDestination = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const id = route.params.id;
  const {output, isLoading, error, refetch} = useFetchData({
    method: 'get',
    endpoint: `api/v1/user_organizations/${id}/`,
  });
  const [data, setData] = useState(output?.user_destination ?? '');
  const {authState, verifyAuthentication} = useAuth();

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  const handleDelete = async id => {
    const result = await httpRequest({
      method: 'del',
      endpoint: `api/v1/destinations/${id}/`,
      accessToken: authState.accessToken,
    });
    const {status} = result;
    if (status === 200) {
      console.log(id);
      const new_data = data.filter(item => item.id !== id);
      console.log(new_data);
      setData(new_data);
    } else if (status === 403) {
      verifyAuthentication();
      console.log('Please try again');
    }
  };

  useEffect(() => {
    setData(output.user_destination);
  }, [output]);

  return data?.length > 0 ? (
    <View style={reusable.container}>
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
                      navigation.navigate('EditPlace', {
                        id: item.item.id,
                        screen: 'destination',
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
          navigation.navigate('CreatePlace', 'destinations');
        }}
        style={styles.addBtn}>
        <Icon name="add" color={COLORS.white} size={SIZES.xxLarge} />
      </Pressable>
    </View>
  ) : (
    <Empty />
  );
};

export default TopDestination;

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
