import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {AppBar, HeightSpacer, ReusableBtn, TileRoom} from '../../components';
import {COLORS, SIZES} from '../../constants/theme';
import {useRoute} from '@react-navigation/native';

const SelectRoom = ({navigation}) => {
  const route = useRoute();
  const data = route.params;
  return (
    <View>
      <View style={{height: 80}}>
        <AppBar
          top={10}
          left={20}
          right={20}
          title={'Select Room'}
          color={COLORS.white}
          onPress={() => navigation.goBack()}
        />
      </View>
      <FlatList
        data={data.rooms}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.tileColumn}>
            <View style={styles.tile}>
              <TileRoom item={item} />
              <HeightSpacer height={10} />
              <View style={{marginHorizontal: 10}}>
                <ReusableBtn
                  onPress={() => navigation.navigate('SelectedRoom', item.id)}
                  btnText="Choose"
                  width={SIZES.width - 60}
                  backGroundColor={COLORS.green}
                  borderColor={COLORS.green}
                  borderWidth={0}
                  textColor={COLORS.white}
                />
                <HeightSpacer height={10} />
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default SelectRoom;

const styles = StyleSheet.create({
  tileColumn: {marginHorizontal: 20, marginVertical: 10},
  tile: {backgroundColor: COLORS.lightWhite, borderRadius: 12},
});
