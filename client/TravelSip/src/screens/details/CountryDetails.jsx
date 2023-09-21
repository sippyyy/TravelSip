import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {
  AppBar,
  DescriptionText,
  HeightSpacer,
  NetworkImage,
  PopularList,
  ReusableBtn,
  ReusableText,
} from '../../components';
import {country} from '../../mock_api';
import {COLORS, SIZES, TEXT} from '../../constants/theme';
import reusable from '../../components/Reusable/reusable.style';
import Icon from 'react-native-vector-icons/Ionicons';

const CountryDetails = ({navigation}) => {
  const route = useRoute();
  const item = route.params;
  return (
    <ScrollView>
      <View>
        <NetworkImage
          topLeftRadius={0}
          topRightRadius={0}
          source={country.imageUrl}
          width={'100%'}
          height={350}
          radius={30}
        />
        <AppBar
          top={10}
          left={20}
          right={20}
          onPress={() => navigation.goBack()}
          onPress1={() => {}}
          title={country.country}
          color={COLORS.white}
          icon="search-outline"
          color1={COLORS.white}
        />
      </View>
      <View style={styles.description}>
        <ReusableText
          text={country.region}
          family="medium"
          size={TEXT.large}
          color={COLORS.black}
        />
        <DescriptionText text={country.description} />
        <View style={{alignContent: 'center'}}>
          <View style={reusable.rowWithSpace('space-between')}>
            <ReusableText
              text="Popular Destination"
              family="medium"
              size={TEXT.large}
              color={COLORS.black}
            />
            <TouchableOpacity onPress={() => {}}>
              <Icon name="list" size={20} color={COLORS.black} />
            </TouchableOpacity>
          </View>
          <PopularList data={country.popular} />
        </View>
        <ReusableBtn
          onPress={() => navigation.navigate('HotelSearch', country.id)}
          btnText="Find Best Hotels"
          width={SIZES.width - 40}
          backGroundColor={COLORS.green}
          borderColor={COLORS.green}
          borderWidth={0}
          textColor={COLORS.white}
        />
      </View>
      <HeightSpacer height={20} />
    </ScrollView>
  );
};

export default CountryDetails;

const styles = StyleSheet.create({
  description: {
    marginHorizontal: 20,
    paddingTop: 20,
  },
});
