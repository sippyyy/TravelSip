import {View, TextInput, TouchableOpacity, Image, FlatList} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import reusable from '../../components/Reusable/reusable.style';
import styles from './search.style';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/theme';
import {AppBar, HeightSpacer, ReusableTile} from '../../components';
import useFetchData from '../../hooks/fetchData';

const Search = ({navigation}) => {
  const [searchKey, setSearchKey] = useState('');
  const [searchResults, setSearchResults] = useState('');
  const {output, isLoading, error, refetch} = useFetchData({
    method: 'get',
    endpoint: 'api/v1/destinations/',
  });
  return (
    <SafeAreaView>
      <View style={reusable.container}>
        <AppBar
          top={10}
          left={0}
          right={0}
          onPress={() => navigation.goBack()}
          onPress1={() => {}}
          title="Search places"
          color={COLORS.white}
          icon="funnel"
          color1={COLORS.white}
        />
      </View>
      <HeightSpacer height={40} />

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.input}
            value={searchKey}
            onChangeText={setSearchKey}
            placeholder="Where do you want to visit?"
          />
        </View>
        <TouchableOpacity style={styles.searchBtn}>
          <Icon name="search" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      {output.length > 0 ? (
        <FlatList
          data={output}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.tile}>
              <ReusableTile
                onPress={() => navigation.navigate('PlaceDetails', item.id)}
                item={item}
              />
            </View>
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

export default Search;
