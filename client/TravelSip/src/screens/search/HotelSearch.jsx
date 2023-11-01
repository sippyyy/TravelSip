import {View, TextInput, TouchableOpacity, Image, FlatList} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import reusable from '../../components/Reusable/reusable.style';
import styles from './search.style';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/theme';
import {AppBar, HeightSpacer, HotelCard} from '../../components';
import {useDebounceEffect} from 'ahooks';
import {httpRequest} from '../../api/services';

const HotelSearch = ({navigation}) => {
  const [searchKey, setSearchKey] = useState('');
  const [output, setOutput] = useState([]);

  useDebounceEffect(
    () => {
      const search = async () => {
        const result = await httpRequest({
          method: 'get-none-auth',
          endpoint: 'api/v1/search/',
          params: {hotel: true, q: searchKey},
        });
        setOutput(result.data);
      };
      search();
    },
    [searchKey],
    {wait: 400},
  );
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
      {output.length > 0 ? (
        <FlatList
          numColumns={2}
          data={output}
          ItemSeparatorComponent={<HeightSpacer height={10} />}
          keyExtractor={item => item.objectID}
          renderItem={({item}) => (
            <HotelCard
              margin={5}
              onPress={() => navigation.navigate('HotelDetails', item.objectID)}
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
