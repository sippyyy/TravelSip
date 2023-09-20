import {View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import reusable from '../Reusable/reusable.style';
import ReusableText from '../Reusable/ReusableText';
import {COLORS, SIZES, TEXT} from '../../constants/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {recommendations} from '../../mock_api';
import ReusableTile from '../Reusable/ReusableTile';

const Recommendation = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View
        style={[reusable.rowWithSpace('space-between'), {paddingBottom: 20}]}>
        <ReusableText
          text="Recommendations"
          family="medium"
          size={TEXT.large}
          color={COLORS.black}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Recommended')}>
          <Icon name="list" size={20} color={COLORS.black}/>
        </TouchableOpacity>
      </View>
      <FlatList
        data={recommendations}
        horizontal
        keyExtractor={item => item.id}
        contentContainerStyle={{columnGap: SIZES.medium}}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => <ReusableTile item={item} onPress={() => {}} />}
      />
    </View>
  );
};

export default Recommendation;

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
  },
});
