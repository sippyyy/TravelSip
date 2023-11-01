import {View, TextInput, TouchableOpacity, Image, FlatList} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import reusable from '../../components/Reusable/reusable.style';
import styles from './search.style';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/theme';
import {AppBar, HeightSpacer, ReusableTile} from '../../components';
import {useDebounceEffect} from 'ahooks';
import {httpRequest} from '../../api/services';

const Search = ({navigation}) => {
  const [searchKey, setSearchKey] = useState('');
  const [output, setOutput] = useState([]);

  useDebounceEffect(
    () => {
      const search = async () => {
        const result = await httpRequest({
          method: 'get-none-auth',
          endpoint: 'api/v1/search/',
          params: {destination: true, q: searchKey},
        });
        setOutput(result.data);
      };
      search();
    },
    [searchKey],
    {wait: 400},
  );
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
          keyExtractor={item => item.objectID}
          renderItem={({item}) => (
            <View style={styles.tile}>
              <ReusableTile
                onPress={() =>
                  navigation.navigate('PlaceDetails', item.objectID)
                }
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
