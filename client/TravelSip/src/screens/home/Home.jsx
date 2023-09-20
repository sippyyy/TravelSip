import {View, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import reusable from '../../components/Reusable/reusable.style';
import {
  BestHotel,
  HeightSpacer,
  Places,
  Recommendation,
  ReusableText,
} from '../../components';
import {COLORS, SIZES, TEXT} from '../../constants/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './home.style';

const Home = ({navigation}) => {
  return (
    <SafeAreaView style={reusable.container}>
      <ScrollView>
        <View style={reusable.rowWithSpace('space-between')}>
          <ReusableText
            text="Hello User!"
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
