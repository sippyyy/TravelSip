import {View, TextInput, TouchableOpacity, Image, FlatList} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import reusable from '../../components/Reusable/reusable.style';
import styles from './search.style';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/theme';
import {hotels} from '../../mock_api';
import {AppBar, HeightSpacer, HotelCard} from '../../components';

const HotelSearch = ({navigation}) => {
  const [searchKey, setSearchKey] = useState('');
  const [searchResults, setSearchResults] = useState('');
  return (
    <SafeAreaView style={reusable.container}>
      <AppBar
        top={10}
        left={0}
        right={0}
        onPress={() => navigation.goBack()}
        onPress1={() => {}}
        title="Search hotels"
        color={COLORS.white}
        icon="funnel"
        color1={COLORS.white}
      />
      <HeightSpacer height={40} />
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.input}
            value={searchKey}
            onChangeText={setSearchKey}
            placeholder="Where do you want to stay?"
          />
        </View>
        <TouchableOpacity style={styles.searchBtn}>
          <Icon name="search" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      {hotels.length > 0 ? (
        <FlatList
          numColumns={2}
          data={hotels}
          ItemSeparatorComponent={<HeightSpacer height={10} />}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <HotelCard
              margin={5}
              onPress={() => navigation.navigate('PlaceDetails', item.id)}
              item={item}
            />
          )}
        />
      ) : (
        <Image
          style={styles.searchImage}
          source={require('../../assets/images/empty.png')}
        />
      )}
    </SafeAreaView>
  );
};

export default HotelSearch;
