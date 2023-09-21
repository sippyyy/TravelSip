import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  AppBar,
  DescriptionText,
  HeightSpacer,
  HotelMap,
  NetworkImage,
  ReusableText,
  ReviewList,
} from '../../components';
import {COLORS, SIZES, TEXT} from '../../constants/theme';
import styles from './hotelDetails.style';
import reusable from '../../components/Reusable/reusable.style';
import {Rating} from 'react-native-stock-star-rating';
import hotel, {coordinates} from '../../mock_api/hotel';
import Icon from 'react-native-vector-icons/Ionicons';

const HotelDetails = ({navigation}) => {
  return (
    <ScrollView>
      <View style={{height: 80}}>
        <AppBar
          top={10}
          left={20}
          right={20}
          onPress={() => navigation.goBack()}
          onPress1={() => {}}
          title={hotel.title}
          color={COLORS.white}
          icon="search-outline"
          color1={COLORS.white}
        />
      </View>
      <View style={styles.container}>
        <NetworkImage
          source={hotel.imageUrl}
          width={'100%'}
          height={220}
          radius={25}
        />
        <View style={styles.titleContainer}>
          <View style={styles.titleColumn}>
            <ReusableText
              text={hotel.title}
              family="medium"
              size={TEXT.xLarge}
              color={COLORS.black}
            />
            <ReusableText
              text={hotel.location}
              family="medium"
              size={TEXT.medium}
              color={COLORS.black}
            />
            <View style={reusable.rowWithSpace('space-between')}>
              <Rating
                maxStars={5}
                stars={hotel.rating}
                bordered={false}
                color={'#FD9942'}
              />
              <ReusableText
                text={`(${hotel.review})`}
                family="medium"
                size={SIZES.medium}
                color={COLORS.gray}
              />
            </View>
          </View>
        </View>
        <View>
          <ReusableText
            text="Description"
            family="medium"
            size={SIZES.large}
            color={COLORS.gray}
          />
          <HeightSpacer height={10} />
          <DescriptionText text={hotel.description} />
          <HeightSpacer height={10} />
          <ReusableText
            text="Location"
            family="medium"
            size={SIZES.large}
            color={COLORS.gray}
          />
          <HeightSpacer height={15} />
          <ReusableText
            text={hotel.location}
            family="regular"
            size={SIZES.small + 2}
            color={COLORS.gray}
          />
          <HotelMap coordinates={coordinates} />
          <View style={reusable.rowWithSpace('space-between')}>
            <ReusableText
              text={'Reviews'}
              family="medium"
              size={SIZES.large}
              color={COLORS.black}
            />
            <TouchableOpacity>
              <Icon name="list" size={20} />
            </TouchableOpacity>
          </View>
          <HeightSpacer height={10} />
          <ReviewList reviews={hotel.reviews} />
        </View>
      </View>
    </ScrollView>
  );
};

export default HotelDetails;
