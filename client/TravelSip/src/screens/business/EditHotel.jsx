import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import useFetchData from '../../hooks/fetchData';
import {
  AppBar,
  HeightSpacer,
  InformationTile,
  NetworkImage,
  ReusableBtn,
  ReusableText,
  TileRoom,
  WidthSpacer,
} from '../../components';
import reusable from '../../components/Reusable/reusable.style';
import {COLORS, TEXT} from '../../constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {httpRequest} from '../../api/services';
import {useAuth} from '../../context/AuthContext';

const EditHotel = ({navigation, route}) => {
  const {id} = route.params;
  const {authState} = useAuth();
  const {output, setLoading, error, refetch} = useFetchData({
    method: 'get',
    endpoint: `api/v1/hotels/${id}/`,
  });
  const [data, setData] = useState(null);

  const handleDelete = async id => {
    const result = await httpRequest({
      method: 'del',
      endpoint: `api/v1/rooms/${id}/`,
      accessToken: authState.accessToken,
    });
    if (result.status === 200) {
      console.log(id);
      refetch();
    }
  };

  useEffect(() => {
    setData(output);
  }, [output]);

  return data?.title ? (
    <View style={{flex: 1}}>
      <AppBar
        title={`Edit hotel and rooms`}
        top={10}
        left={20}
        right={20}
        onPress={() => navigation.goBack()}
      />
      <HeightSpacer height={60} />
      <View
        style={[
          reusable.rowWithSpace('space-between'),
          {paddingHorizontal: 20},
        ]}>
        <ReusableText
          text={'BASIC HOTEL INFORMATION'}
          size={TEXT.medium}
          color={COLORS.black}
          family={'medium'}
        />
        <Pressable
          onPress={() =>
            navigation.navigate('EditPlace', {id: id, screen: 'hotel'})
          }>
          <Icon name="edit" size={TEXT.xxLarge} color={COLORS.green} />
        </Pressable>
      </View>
      <HeightSpacer height={10} />
      <View
        style={[
          reusable.rowWithSpace('flex-start'),
          {
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: COLORS.white,
          },
        ]}>
        <NetworkImage
          source={data.imageUrl}
          width={80}
          height={80}
          radius={80}
          border={2}
          borderColor={COLORS.lightRed}
        />
        <WidthSpacer width={10} />
        <View style={styles.input}>
          <ReusableText
            text={data.title}
            size={TEXT.medium}
            color={COLORS.black}
          />
        </View>
      </View>
      <HeightSpacer height={8} />
      <InformationTile field={'Description'} value={data.description} />
      <HeightSpacer height={8} />
      <InformationTile field={'Contact'} value={data.contact} />
      <HeightSpacer height={8} />
      <InformationTile field={'Location'} value={data.location} />
      <HeightSpacer height={20} />
      <View
        style={[
          reusable.rowWithSpace('space-between'),
          {paddingHorizontal: 20},
        ]}>
        <ReusableText
          text={'ROOMS'}
          size={TEXT.medium}
          color={COLORS.black}
          family={'medium'}
        />
        <Pressable
          onPress={() =>
            navigation.navigate('RoomForm', {id: id, screen: 'Create'})
          }>
          <View style={reusable.rowWithSpace('flex-end')}>
            <ReusableText
              text={'Add room'}
              color={COLORS.green}
              size={TEXT.small}
            />
            <WidthSpacer width={5} />
            <Icon name="add" size={TEXT.xxLarge} color={COLORS.green} />
          </View>
        </Pressable>
      </View>
      <HeightSpacer height={10} />
      <FlatList
        data={data.rooms}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.tileColumn}>
            <View style={{justifyContent: 'flex-end', flexDirection: 'row'}}>
              <Pressable
                onPress={() =>
                  navigation.navigate('AddFacility', {
                    roomId: item.id,
                    hotelId: id,
                    faciId: item.facilities,
                  })
                }
                style={[reusable.rowWithSpace('center'), styles.topTab]}>
                <Icon
                  name="all-inbox"
                  color={COLORS.green}
                  size={TEXT.xxLarge}
                />
                <WidthSpacer width={5} />
                <ReusableText text={'Add facility'} color={COLORS.green} />
              </Pressable>
              <Pressable
                onPress={() => handleDelete(item.id)}
                style={[reusable.rowWithSpace('center'), styles.topTab]}>
                <Icon name="delete" color={COLORS.red} size={TEXT.xxLarge} />
              </Pressable>
            </View>
            <View style={styles.tile}>
              <TileRoom item={item} />
              <View
                style={{
                  flex: 1,
                  height: 1,
                  backgroundColor: COLORS.lightGrey,
                }}></View>
              <HeightSpacer height={5} />

              <View style={{alignItems: 'flex-end', marginHorizontal: 10}}>
                <ReusableBtn
                  btnText={'Edit'}
                  onPress={() =>
                    navigation.navigate('RoomForm', {
                      id: item.id,
                      screen: 'Edit',
                      dataIn: item,
                    })
                  }
                  textColor={COLORS.green}
                  borderColor={COLORS.green}
                  borderWidth={1}
                  width={100}
                />
              </View>
              <HeightSpacer height={10} />
            </View>
          </View>
        )}
      />
    </View>
  ) : null;
};

export default EditHotel;

const styles = StyleSheet.create({
  input: {
    fontSize: TEXT.medium,
    fontFamily: 'medium',
    borderBottomWidth: 3,
    flex: 1,
    borderBottomColor: COLORS.red,
    paddingVertical: 5,
  },
  tile: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
  },
  tileColumn: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  topTab: {
    minWidth: 60,
    minHeight: 30,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: COLORS.white,
    marginLeft: 5,
    padding: 5,
  },
});
