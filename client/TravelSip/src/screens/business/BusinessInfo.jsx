import {StyleSheet, View, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Formik} from 'formik';
import {
  AppBar,
  HeightSpacer,
  ImageFieldTile,
  InformationTile,
  ReusableBtn,
  ReusableText,
  WidthSpacer,
} from '../../components';
import reusable from '../../components/Reusable/reusable.style';
import {COLORS, SIZES, TEXT} from '../../constants/theme';
import * as Yup from 'yup';
import {httpRequest} from '../../api/services';
import {useAuth} from '../../context/AuthContext';
import {launchImageLibrary} from 'react-native-image-picker';
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
        imageUrl: info?.imageUrl ?? '',
        backgroundUrl: info?.backgroundUrl ?? '',
      }}
      onSubmit={async values => {
        let method = '';
        let endpoint = '';
        if (dataIn) {
          method = 'put';
          endpoint = `api/v1/user_organizations/${dataIn.id}/`;
        } else {
          method = 'post-auth';
          endpoint = `api/v1/user_organizations/`;
        }

        const formData = new FormData();
        formData.append('bio', values.bio);
        formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('phone', values.phone);
        formData.append('tax', values.tax);
        if (values.imageUrl?.uri) {
          formData.append('imageUrl', values.imageUrl);
        }
        if (values.backgroundUrl?.uri) {
          formData.append('backgroundUrl', values.backgroundUrl);
        }

        const result = await httpRequest({
          method,
          endpoint,
          dataInput: formData,
          accessToken: authState.accessToken,
          formData: true,
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
      {props => <Form {...props} navigation={navigation} />}
    </Formik>
  ) : null;
};

const Form = ({
  handleChange,
  handleSubmit,
  values,
  errors,
  setFieldTouched,
  navigation,
  setFieldValue,
}) => {
  const handleChooseImage = async type => {
    const options = {
      mediaType: 'photo',
    };
    const result = await launchImageLibrary(options);
    if (!result.didCancel) {
      const data = result.assets[0];
      const image = {
        uri: data?.uri,
        type: data?.type,
        name: data?.fileName,
      };
      if (type === 'bg') {
        setFieldValue('backgroundUrl', image);
      } else if (type === 'img') {
        setFieldValue('imageUrl', image);
      }
    }
  };
  return (
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
      <View style={{marginHorizontal: 20}}>
        <ImageFieldTile
          source={values?.backgroundUrl?.uri ?? values?.backgroundUrl ?? ''}
          onPress={() => handleChooseImage('bg')}
          width={'100%'}
          height={140}
          radius={10}
        />
      </View>
      <HeightSpacer height={8} />

      <View
        style={[
          reusable.rowWithSpace('flex-start'),
          {
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: COLORS.white,
          },
        ]}>
        <ImageFieldTile
          onPress={() => handleChooseImage('img')}
          source={values?.imageUrl?.uri ?? values?.imageUrl ?? ''}
        />
        <WidthSpacer width={10} />
        <View style={{flex: 1}}>
          <TextInput
            style={styles.input}
            placeholder="Your official business name..."
            value={values.name}
            onChangeText={handleChange('name')}
            onBlur={() => setFieldTouched('name', '')}
          />
          {errors?.name ? (
            <View style={{paddingHorizontal: 10}}>
              <ReusableText
                text={errors.name}
                size={SIZES.small}
                color={COLORS.red}
              />
            </View>
          ) : null}
        </View>
      </View>

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
  );
};

export default BusinessInfo;

const styles = StyleSheet.create({
  input: {
    fontSize: TEXT.medium,
    fontFamily: 'medium',
    borderBottomWidth: 3,
    borderBottomColor: COLORS.red,
    paddingVertical: 5,
  },
});
