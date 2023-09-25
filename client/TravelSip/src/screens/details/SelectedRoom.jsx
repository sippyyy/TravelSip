import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  AppBar,
  AssetImage,
  Counter,
  HeightSpacer,
  NetworkImage,
  Rating,
  ReusableBtn,
  ReusableText,
  WidthSpacer,
} from '../../components';
import {COLORS, SIZES} from '../../constants/theme';
import {useRoute} from '@react-navigation/native';
import reusable from '../../components/Reusable/reusable.style';
import {MapView} from 'react-native-maps';

const SelectedRoom = ({navigation}) => {
  const route = useRoute();
  const {item} = route.params;
  return (
    <View>
      <AppBar
        top={10}
        left={20}
        right={20}
        title={item.title}
        color={COLORS.white}
        onPress={() => navigation.goBack()}
      />
      <HeightSpacer height={60} />
      <View style={{marginHorizontal: 10}}>
        <View style={{backgroundColor: COLORS.lightWhite, borderRadius: 16}}>
          <NetworkImage
            source={item.imageUrl}
            width={'100%'}
            height={250}
            radius={16}
          />

          <HeightSpacer height={20} />
          <View style={{marginHorizontal: 10}}>
            <View style={reusable.rowWithSpace('space-between')}>
              <ReusableText
                text={item.title}
                family="medium"
                size={SIZES.medium}
                color={COLORS.black}
              />
              <View style={reusable.rowWithSpace('flex-start')}>
                <Rating rating={item.rating} />
                <WidthSpacer width={10} />
                <ReusableText
                  text={`(${item.review})`}
                  family="regular"
                  size={SIZES.medium}
                  color={COLORS.gray}
                />
              </View>
            </View>
            <HeightSpacer height={10} />
            <ReusableText
              text={item.location}
              family="medium"
              size={SIZES.medium}
              color={COLORS.gray}
            />
            <View
              style={{
                borderWidth: 0.5,
                borderColor: COLORS.lightGrey,
                marginVertical: 15,
              }}></View>
            <ReusableText
              text={'Room Requirements'}
              family="regular"
              size={SIZES.medium}
              color={COLORS.black}
            />
            <HeightSpacer height={30} />
            <View style={reusable.rowWithSpace('space-between')}>
              <ReusableText
                text={'Price per night'}
                family="regular"
                size={SIZES.medium}
                color={COLORS.black}
              />
              <ReusableText
                text={'$ 400'}
                family="regular"
                size={SIZES.medium}
                color={COLORS.black}
              />
            </View>
            <HeightSpacer height={15} />
            <View style={reusable.rowWithSpace('space-between')}>
              <ReusableText
                text={'Payment Method'}
                family="regular"
                size={SIZES.medium}
                color={COLORS.black}
              />
              <View style={reusable.rowWithSpace('flex-start')}>
                <AssetImage
                  width={30}
                  height={20}
                  mode={'contain'}
                  data={require('../../assets/images/visa.webp')}
                />
                <ReusableText
                  text={'Visa'}
                  family="regular"
                  size={SIZES.medium}
                  color={COLORS.black}
                />
              </View>
            </View>

            <View style={reusable.rowWithSpace('space-between')}>
              <ReusableText
                text={'4 Guest'}
                family="regular"
                size={SIZES.medium}
                color={COLORS.black}
              />
              <Counter />
            </View>
            <HeightSpacer height={30} />
            <ReusableBtn
              onPress={() => navigation.navigate('Successful')}
              btnText="Select Room"
              width={SIZES.width - 40}
              backGroundColor={COLORS.green}
              borderColor={COLORS.green}
              borderWidth={0}
              textColor={COLORS.white}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default SelectedRoom;

const styles = StyleSheet.create({});
