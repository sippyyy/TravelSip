import {View} from 'react-native';
import React from 'react';
import reusable from './reusable.style';
import ReusableText from './ReusableText';
import {COLORS, SIZES} from '../../constants/theme';
import AssetImage from './AssetImage';

const ReusableSpaceText = ({textRight, textLeft, image, size}) => {
  return (
    <View style={reusable.rowWithSpace('space-between')}>
      <ReusableText
        text={textLeft}
        family="regular"
        size={size ? size : SIZES.medium}
        color={COLORS.black}
      />
      <View style={reusable.rowWithSpace('flex-start')}>
        {image ? (
          <AssetImage width={30} height={20} mode={'contain'} data={image} />
        ) : null}
        <ReusableText
          text={textRight}
          family="regular"
          size={size ? size : SIZES.medium}
          color={COLORS.black}
        />
      </View>
    </View>
  );
};

export default ReusableSpaceText;
