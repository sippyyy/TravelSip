import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  AppBar,
  DescriptionText,
  HeightSpacer,
  HotelMap,
  NetworkImage,
  ReusableBtn,
  ReusableText,
  ReviewList,
} from '../../components';
import {COLORS, SIZES, TEXT} from '../../constants/theme';
import styles from './hotelDetails.style';
import reusable from '../../components/Reusable/reusable.style';
import {Rating} from 'react-native-stock-star-rating';
import hotel, {coordinates} from '../../mock_api/hotel';
import Icon from 'react-native-vector-icons/Ionicons';
import {useRoute} from '@react-navigation/native';
import useFetchData from '../../hooks/fetchData';

const HotelDetails = ({navigation}) => {
  const route = useRoute();
  const id = route.params;
  const {output, isLoading, error, refetch} = useFetchData({
    method: 'get',
    endpoint: `api/v1/hotels/${id}/`,
  });
  return (
    <ScrollView>
      <View style={{height: 80}}>
        <AppBar
          top={10}
          left={20}
          right={20}
          onPress={() => navigation.goBack()}
          onPress1={() => {}}
          title={output.title}
          color={COLORS.white}
          icon="search-outline"
          color1={COLORS.white}
        />
      </View>
      <View style={styles.container}>
        <NetworkImage
          source={output.imageUrl}
          width={'100%'}
          height={220}
          radius={25}
        />
        <View style={styles.titleContainer}>
          <View style={styles.titleColumn}>
            <ReusableText
              text={output.title}
              family="medium"
              size={TEXT.xLarge}
              color={COLORS.black}
            />
            <ReusableText
              text={output.location}
              family="medium"
              size={TEXT.medium}
              color={COLORS.black}
            />
            <View style={reusable.rowWithSpace('space-between')}>
              <Rating
                maxStars={5}
                stars={output.rating}
                bordered={false}
                color={'#FD9942'}
              />
              <ReusableText
                text={`(${output.review} Reviews)`}
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
          <DescriptionText text={output.description} />
          <HeightSpacer height={10} />
          <ReusableText
            text="Location"
            family="medium"
            size={SIZES.large}
            color={COLORS.gray}
          />
          <HeightSpacer height={15} />
          <ReusableText
            text={output.location}
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
          <ReviewList reviews={output.reviews} />
        </View>
      </View>
      <View style={[reusable.rowWithSpace('space-between'), styles.bottom]}>
        <View>
          <ReusableText
            text={`\$ ${output.price}`}
            family="medium"
            size={SIZES.large}
            color={COLORS.black}
          />
          <HeightSpacer height={5} />
          <ReusableText
            text="(Per night)"
            family="medium"
            size={SIZES.medium}
            color={COLORS.gray}
          />
        </View>
        <ReusableBtn
          onPress={() => navigation.navigate('SelectRoom', output)}
          btnText="Select Room"
          width={(SIZES.width - 50) / 2.2}
          backGroundColor={COLORS.green}
          borderColor={COLORS.red}
          borderWidth={0}
          textColor={COLORS.white}
        />
      </View>
    </ScrollView>
  );
};

export default HotelDetails;
