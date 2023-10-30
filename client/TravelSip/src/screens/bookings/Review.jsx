import {StyleSheet, TextInput, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {
  AppBar,
  HeightSpacer,
  ReusableBtn,
  ReusableText,
} from '../../components';
import reusable from '../../components/Reusable/reusable.style';
import {COLORS, SIZES} from '../../constants/theme';
import {RatingInput} from 'react-native-stock-star-rating';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useRoute} from '@react-navigation/native';
import {httpRequest} from '../../api/services';
import {useAuth} from '../../context/AuthContext';

const Review = ({navigation}) => {
  const route = useRoute();
  const {authState, verifyAuthentication} = useAuth();
  const id = route.params;
  return (
    <View style={reusable.container}>
      <AppBar
        title={'Review'}
        onPress={() => navigation.goBack()}
        left={0}
        right={0}
        top={10}
      />
      <HeightSpacer height={60} />
      <Formik
        initialValues={{
          review: '',
          rating: '',
        }}
        onSubmit={async values => {
          const formData = new FormData();
          formData.append('review', values.review);
          formData.append('rating', values.rating);
          formData.append('hotel', id);
          const result = await httpRequest({
            method: 'post-auth',
            endpoint: '/api/v1/hotel_reviews/',
            formData: true,
            dataInput: formData,
            accessToken: authState.accessToken,
          });
          if (result.status === 200) {
            navigation.goBack();
          } else if (result.status === 403) {
            verifyAuthentication();
          }
        }}
        validationSchema={Yup.object().shape({
          review: Yup.string().required('Required!'),
          rating: Yup.string().required('Required'),
        })}>
        {props => <Form {...props} />}
      </Formik>
    </View>
  );
};

const Form = ({
  values,
  setFieldTouched,
  output,
  handleChange,
  handleSubmit,
  setFieldValue,
  errors,
}) => {
  const [rating, setRating] = useState('');

  const length = useMemo(() => {
    return 150 - values.review.length;
  }, [values.review]);

  useEffect(() => {
    setFieldValue('rating', rating);
  }, [rating]);

  return (
    <View>
      <View style={reusable.rowWithSpace('space-between')}>
        <ReusableText text={'Review'} />
        <ReusableText
          text={length}
          color={length < 11 ? COLORS.red : COLORS.black}
        />
      </View>

      <HeightSpacer height={10} />
      <TextInput
        onBlur={() => setFieldTouched('review', '')}
        autoCapitalize="none"
        onChangeText={handleChange('review')}
        numberOfLines={4}
        multiline={true}
        placeholder="Write review"
        value={values.review}
        style={{
          borderWidth: 1,
          borderColor: COLORS.gray,
          borderRadius: 10,
          textAlignVertical: 'top',
        }}
      />
      {errors.review ? (
        <ReusableText
          text={errors.review}
          size={SIZES.small}
          color={COLORS.red}
        />
      ) : null}
      <RatingInput
        rating={rating}
        setRating={setRating}
        size={40}
        maxStars={5}
        bordered={false}
      />
      {errors?.rating ? (
        <ReusableText
          text={errors.rating}
          size={SIZES.small}
          color={COLORS.red}
        />
      ) : null}
      <HeightSpacer height={10} />
      <ReusableBtn
        onPress={handleSubmit}
        btnText={'Submit'}
        backGroundColor={COLORS.green}
        textColor={COLORS.white}
      />
    </View>
  );
};

export default Review;

const styles = StyleSheet.create({});
