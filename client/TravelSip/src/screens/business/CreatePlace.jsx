import {StyleSheet, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  AppBar,
  Dropdown,
  HeightSpacer,
  ImageFieldTile,
  InformationTile,
  ReusableBtn,
  ReusableText,
  WidthSpacer,
} from '../../components';
import reusable from '../../components/Reusable/reusable.style';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {COLORS, SIZES, TEXT} from '../../constants/theme';
import {launchImageLibrary} from 'react-native-image-picker';
import useFetchData from '../../hooks/fetchData';
import {httpRequest} from '../../api/services';
import {useAuth} from '../../context/AuthContext';
import {useRoute} from '@react-navigation/native';

const type = data => {
  if (data === 'hotels') {
    return 'hotel';
  } else {
    return 'destination';
  }
};

const validationSchemas = Yup.object().shape({
  title: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  contact: Yup.string().max(12, 'Less than 12 characters').required('Required'),
  imageUrl: Yup.mixed().required('Required'),
  address: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
});

const CreatePlace = ({navigation}) => {
  const {authState, verifyAuthentication} = useAuth();
  const route = useRoute();
  const screen = route.params;
  return (
    <View>
      <AppBar
        title={`Create ${type(screen)}`}
        top={10}
        left={20}
        right={20}
        onPress={() => navigation.goBack()}
      />
      <HeightSpacer height={60} />
      <Formik
        initialValues={{
          title: '',
          description: '',
          contact: '',
          imageUrl: '',
          address: '',
          city: '',
        }}
        onSubmit={async values => {
          const formData = new FormData();
          formData.append('title', values.title);
          formData.append('description', values.description);
          formData.append('contact', values.contact);
          formData.append('imageUrl', values.imageUrl);
          formData.append('address', values.address);
          formData.append('city', values.city);
          const result = await httpRequest({
            method: 'post-auth',
            endpoint: `api/v1/${screen}/`,
            accessToken: authState.accessToken,
            dataInput: formData,
            formData: true,
          });
          if (result.status === 200) {
            navigation.goBack();
          } else if (result.status === 403) {
            verifyAuthentication();
            console.log('Please try again');
          }
        }}
        validationSchema={validationSchemas}>
        {props => <Form {...props} navigation={navigation} screen={screen} />}
      </Formik>
    </View>
  );
};

const Form = ({
  values,
  errors,
  setFieldTouched,
  handleChange,
  handleSubmit,
  setFieldValue,
  navigation,
  screen,
}) => {
  const {output, isLoading, error, refetch} = useFetchData({
    method: 'get',
    endpoint: 'api/v1/city/',
  });
  const [city, setCity] = useState(null);

  const handleChooseImage = async () => {
    const options = {
      mediaType: 'photo',
    };
    const result = await launchImageLibrary(options);
    const data = result.assets[0];
    const image = {
      uri: data?.uri,
      type: data?.type,
      name: data?.fileName,
    };
    setFieldValue('imageUrl', image);
  };

  useEffect(() => {
    if (city) {
      setFieldValue('city', city);
    }
  }, [city]);

  return (
    <View>
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
          onPress={() => handleChooseImage()}
          source={values?.imageUrl?.uri ?? ''}
        />
        <WidthSpacer width={10} />
        <View style={{flex: 1}}>
          <TextInput
            style={styles.input}
            placeholder={`Your ${type(screen)} name`}
            value={values.title}
            onChangeText={handleChange('title')}
            onBlur={() => setFieldTouched('title', '')}
          />
          {errors?.title ? (
            <View style={{paddingHorizontal: 10}}>
              <ReusableText
                text={errors.title}
                size={SIZES.small}
                color={COLORS.red}
              />
            </View>
          ) : null}
        </View>
      </View>
      <HeightSpacer height={10} />
      <InformationTile
        field={'Description'}
        input={true}
        handleChange={handleChange}
        fieldname={'description'}
        setFieldTouched={setFieldTouched}
        error={errors.description}
        valueInput={values.description}
        placeholder={`Your ${type(screen)} description`}
      />
      <HeightSpacer height={10} />
      <InformationTile
        field={'Reception Number'}
        input={true}
        handleChange={handleChange}
        fieldname={'contact'}
        setFieldTouched={setFieldTouched}
        error={errors.contact}
        valueInput={values.contact}
        placeholder={`Your ${type(screen)} contact number`}
      />
      <HeightSpacer height={10} />
      <InformationTile
        field={"Hotel's address"}
        input={true}
        handleChange={handleChange}
        fieldname={'address'}
        setFieldTouched={setFieldTouched}
        error={errors.address}
        valueInput={values.address}
        placeholder={'Fill address/location'}
      />
      <HeightSpacer height={10} />
      <View
        style={{
          backgroundColor: COLORS.white,
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}>
        <View style={{paddingHorizontal: 10}}>
          <ReusableText
            text={'City'}
            size={SIZES.small}
            color={COLORS.gray}
            family={'medium'}
          />
        </View>
        <HeightSpacer height={5} />
        <Dropdown
          data={output}
          schema={{label: 'name', value: 'id'}}
          setValue={setCity}
          value={city}
        />
        {errors?.city ? (
          <View style={{paddingHorizontal: 10}}>
            <ReusableText
              text={errors.city}
              size={SIZES.small}
              color={COLORS.red}
            />
          </View>
        ) : null}
      </View>
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

export default CreatePlace;

const styles = StyleSheet.create({
  input: {
    fontSize: TEXT.medium,
    fontFamily: 'medium',
    borderBottomWidth: 3,
    borderBottomColor: COLORS.red,
    paddingVertical: 5,
  },
});
