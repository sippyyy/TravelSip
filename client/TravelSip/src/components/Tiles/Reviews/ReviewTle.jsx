import {View} from 'react-native';
import React from 'react';
import styles from './review.style';
import reusable from '../../Reusable/reusable.style';
import NetworkImage from '../../Reusable/NetworkImage';
import WidthSpacer from '../../Reusable/WidthSpacer';
import {COLORS, SIZES} from '../../../constants/theme';
import ReusableText from '../../Reusable/ReusableText';
import Rating from '../../Reusable/Rating';
import DescriptionText from '../../Reusable/DescriptionText';

const ReviewTle = ({review}) => {
  return (
    <View style={styles.reviewBorder}>
      <View style={reusable.rowWithSpace('space-between')}>
        <View style={reusable.rowWithSpace('flex-start')}>
          <NetworkImage
            source={review.user.profile}
            width={54}
            height={54}
            radius={10}
          />
          <WidthSpacer width={20} />
          <View>
            <View style={reusable.rowWithSpace('space-between')}>
              <ReusableText
                text={review.user.username}
                family="medium"
                size={SIZES.small + 2}
                color={COLORS.gray}
              />
              <WidthSpacer width="30%" />
              <View style={reusable.rowWithSpace('space-between')}>
                <Rating rating={review.rating} />
                <WidthSpacer width={10} />
                <ReusableText
                  text={review.updateAt}
                  family="medium"
                  size={SIZES.small + 2}
                  color={COLORS.gray}
                />
              </View>
            </View>
            <DescriptionText lines={2} text={review.review} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ReviewTle;
