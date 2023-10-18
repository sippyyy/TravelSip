import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Formik} from 'formik';
import {
  AppBar,
  HeightSpacer,
  InformationTile,
  ReusableBtn,
  ReusableText,
  WidthSpacer,
} from '../../components';
import reusable from '../../components/Reusable/reusable.style';
import {COLORS, TEXT} from '../../constants/theme';
import * as Yup from 'yup';

const BusinessInfo = ({navigation, route}) => {
  return (
    <Formik
      initialValues={{
        bio: '',
        name: '',
        email: '',
        phone: '',
        tax: '',
      }}
      onSubmit={values => {
        console.log(values);
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Provide a valid email').required('Required'),
        name: Yup.string().required('Required'),
        tax: Yup.number()
          .max(12, 'Tax number must less than 12 character')
          .required('Required'),
        phone: Yup.number()
          .max(12, 'Tax number must less than 12 character')
          .required('Required'),
      })}>
      {({
        handleChange,
        touched,
        handleSubmit,
        values,
        errors,
        isValid,
        setFieldTouched,
      }) => (
        <View>
          <AppBar
            title={'Business Information'}
            top={10}
            left={20}
            right={20}
            onPress={() => navigation.goBack()}
          />
          <HeightSpacer height={60} />
          <View style={{paddingHorizontal: 20}}>
            <ReusableText
              text={'BASIC INFO'}
              size={TEXT.medium}
              color={COLORS.black}
              family={'medium'}
            />
          </View>
          <HeightSpacer height={8} />
          <InformationTile
            input={true}
            fieldname={'name'}
            field={'Business Name'}
            handleChange={handleChange}
            setFieldTouched={setFieldTouched}
            inputValue={values.name}
            placeholder="Your official business name..."
          />
          <HeightSpacer height={8} />
          <InformationTile
            input={true}
            fieldname={'email'}
            field={'Email'}
            handleChange={handleChange}
            setFieldTouched={setFieldTouched}
            inputValue={values.email}
            placeholder="Your business email..."
          />
          <HeightSpacer height={8} />
          <InformationTile
            input={true}
            fieldname={'phone'}
            field={'Contact Number'}
            handleChange={handleChange}
            setFieldTouched={setFieldTouched}
            inputValue={values.phone}
            placeholder="Your business contact number..."
          />
          <HeightSpacer height={8} />
          <InformationTile
            input={true}
            fieldname={'tax'}
            field={'Tax Number'}
            handleChange={handleChange}
            setFieldTouched={setFieldTouched}
            inputValue={values.tax}
            placeholder="Your business tax number..."
          />
          <HeightSpacer height={15} />

          <View style={{paddingHorizontal: 20}}>
            <ReusableText
              text={'EXTRA INFO'}
              size={TEXT.medium}
              color={COLORS.black}
              family={'medium'}
            />
          </View>
          <HeightSpacer height={8} />
          <InformationTile
            input={true}
            fieldname={'bio'}
            field={'Business Bio'}
            handleChange={handleChange}
            setFieldTouched={setFieldTouched}
            inputValue={values.name}
            placeholder="Business's bio..."
          />
          <HeightSpacer height={8} />
          <View
            style={[
              reusable.rowWithSpace('space-between'),
              {
                paddingHorizontal: 20,
                paddingVertical: 10,
                backgroundColor: COLORS.white,
              },
            ]}>
            <ReusableBtn
              btnText={'Cancel'}
              backGroundColor={COLORS.red}
              textColor={COLORS.white}
              flex={1}
              onPress={() => navigation.goBack()}
            />
            <WidthSpacer width={5} />
            <ReusableBtn
              btnText={'Submit'}
              backGroundColor={COLORS.green}
              textColor={COLORS.white}
              flex={1}
              onPress={handleSubmit}
            />
          </View>
        </View>
      )}
    </Formik>
  );
};

export default BusinessInfo;

const styles = StyleSheet.create({});
