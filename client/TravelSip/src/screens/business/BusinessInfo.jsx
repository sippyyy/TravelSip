import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {httpRequest} from '../../api/services';
import {useAuth} from '../../context/AuthContext';

const BusinessInfo = ({navigation, route}) => {
  const [info, setInfo] = useState(null);
  const {authState} = useAuth();
  const dataIn = route.params;
  useEffect(() => {
    if (dataIn) {
      setInfo(dataIn);
    } else {
      setInfo([]);
    }
  }, [dataIn]);

  return info ? (
    <Formik
      initialValues={{
        bio: info?.bio ?? '',
        name: info?.name ?? '',
        email: info?.email ?? '',
        phone: info?.phone ?? '',
        tax: info?.tax ?? '',
      }}
      onSubmit={async values => {
        let method = '';
        let endpoint = '';
        if (dataIn) {
          method = 'put';
          endpoint = `api/v1/user_organizations/${authState.id}/`;
        } else {
          method = 'post-auth';
          endpoint = `api/v1/user_organizations/`;
        }
        const result = await httpRequest({
          method,
          endpoint,
          dataInput: values,
          accessToken: authState.accessToken,
        });
        if (result.status === 200) {
          if (dataIn) {
            navigation.goBack();
          } else {
            navigation.navigate('TopBusiness');
          }
        }
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Provide a valid email').required('Required'),
        name: Yup.string().required('Required'),
        tax: Yup.string()
          .max(12, 'Tax number must less than 12 character')
          .required('Required'),
        phone: Yup.string()
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
            onPress={() => navigation.navigate('Profile')}
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
            valueInput={values.name}
            placeholder="Your official business name..."
            error={errors.name}
          />
          <HeightSpacer height={8} />
          <InformationTile
            input={true}
            fieldname={'email'}
            field={'Email'}
            handleChange={handleChange}
            setFieldTouched={setFieldTouched}
            valueInput={values.email}
            placeholder="Your business email..."
            error={errors.email}
          />
          <HeightSpacer height={8} />
          <InformationTile
            input={true}
            fieldname={'phone'}
            field={'Contact Number'}
            handleChange={handleChange}
            setFieldTouched={setFieldTouched}
            valueInput={values.phone}
            placeholder="Your business contact number..."
            error={errors.phone}
          />
          <HeightSpacer height={8} />
          <InformationTile
            input={true}
            fieldname={'tax'}
            field={'Tax Number'}
            handleChange={handleChange}
            setFieldTouched={setFieldTouched}
            valueInput={values.tax}
            placeholder="Your business tax number..."
            error={errors.tax}
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
            valueInput={values.bio}
            placeholder="Business's bio..."
            error={errors.bio}
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
  ) : null;
};

export default BusinessInfo;

const styles = StyleSheet.create({});
