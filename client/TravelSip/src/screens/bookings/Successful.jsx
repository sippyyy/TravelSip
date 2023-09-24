import {View} from 'react-native';
import React from 'react';
import {
  AssetImage,
  HeightSpacer,
  ReusableBtn,
  ReusableText,
  ReusableTile,
} from '../../components';
import {COLORS, SIZES, TEXT} from '../../constants/theme';
import {hotels} from '../../mock_api';

const Successful = ({navigation}) => {
  return (
    <View>
      <View style={{marginTop: '20%'}}>
        <AssetImage
          data={require('../../assets/images/checked.png')}
          width={'100%'}
          mode="contain"
          height={200}
        />
        <HeightSpacer height={20} />

        <View style={{alignItems: 'center'}}>
          <ReusableText
            text={'Booking Successful'}
            family={'medium'}
            size={TEXT.xLarge}
            color={COLORS.black}
          />
          <HeightSpacer height={20} />
          <ReusableText
            text={'You can find your booking details below'}
            family={'regular'}
            size={TEXT.medium}
            color={COLORS.gray}
          />
          <HeightSpacer height={20} />
        </View>
        <View style={{margin: 20}}>
          <ReusableText
            text={'Room details'}
            family={'bold'}
            size={TEXT.medium}
            color={COLORS.dark}
          />
          <HeightSpacer height={20} />
          <ReusableTile item={hotels[0]} />
          <HeightSpacer height={50} />
          <ReusableBtn
            onPress={() => navigation.navigate('Bottom')}
            btnText={'Done'}
            width={SIZES.width - 50}
            backGroundColor={COLORS.green}
            borderColor={COLORS.green}
            borderWidth={0}
            textColor={COLORS.white}
          />
        </View>
      </View>
    </View>
  );
};

export default Successful;
