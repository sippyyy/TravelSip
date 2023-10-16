import React from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import reusable from '../../components/Reusable/reusable.style';
import {
  BestHotel,
  HeightSpacer,
  Places,
  Recommendation,
  ReusableBtn,
  ReusableText,
} from '../../components';
import {COLORS, SIZES, TEXT} from '../../constants/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './home.style';
import useFetchData from '../../hooks/fetchData';
import {useAuth} from '../../context/AuthContext';

const Home = ({navigation}) => {
  const {authState} = useAuth();
  const {output, isLoading, error, refetch} = useFetchData({
    method: 'get',
    endpoint: `api/v1/user/${authState.id}/`,
  });
  return (
    <SafeAreaView style={reusable.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={reusable.rowWithSpace('space-between')}>
          <ReusableText
            text={`Hello ${output.username}!`}
            family="regular"
            size={TEXT.large}
            color={COLORS.black}
          />
          <TouchableOpacity
            style={styles.box}
            onPress={() => navigation.navigate('Search')}>
            <Icon name="search-outline" size={26} />
          </TouchableOpacity>
        </View>
        <HeightSpacer height={SIZES.xLarge} />

        <ReusableText
          text="Places"
          family="medium"
          size={TEXT.large}
          color={COLORS.black}
        />
        <Places />

        <HeightSpacer height={15} />
        <Recommendation />
        <HeightSpacer height={15} />
        <BestHotel />
        <HeightSpacer height={120} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
