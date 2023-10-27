import {StyleSheet, View, TextInput} from 'react-native';
import React from 'react';
import {
  AppBar,
  HeightSpacer,
  ImageFieldTile,
  InformationTile,
  ReusableBtn,
  ReusableText,
  WidthSpacer,
} from '../../components';
import {useRoute} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import reusable from '../../components/Reusable/reusable.style';
import {COLORS, SIZES, TEXT} from '../../constants/theme';
import {launchImageLibrary} from 'react-native-image-picker';
import {httpRequest} from '../../api/services';
import {useAuth} from '../../context/AuthContext';

const validationSchemas = Yup.object().shape({
  name: Yup.string().required('Required'),
  person: Yup.number()
    .min(1, 'Invalid number of person(s). Must more or equal 1')
    .required('Required'),
  bed: Yup.number()
    .min(1, 'Invalid number of bed(s). Must more or equal 1')
    .required('Required'),
  price: Yup.number()
    .min(1, 'Invalid price. Must more or equal 1')
    .required('Required'),
  imageUrl: Yup.mixed().required('Required'),
});
const RoomForm = ({navigation}) => {
  const route = useRoute();
  const {id, screen, dataIn} = route.params;
  const {authState, verifyAuthentication} = useAuth();
  return (
    <View>
      <AppBar
        title={`${screen} Room`}
        left={20}
        right={20}
        top={10}
        onPress={() => navigation.goBack()}
      />
      <HeightSpacer height={60} />
      <Formik
        initialValues={{
          name: dataIn?.name ?? '',
          person: dataIn?.person ?? '',
          bed: dataIn?.bed ?? 0,
          price: dataIn?.price ?? 0,
          imageUrl: dataIn?.imageUrl ?? '',
          hotel: id,
        }}
        onSubmit={async values => {
          const formData = new FormData();
          formData.append('name', values.name);
          formData.append('person', values.person);
          formData.append('bed', values.bed);
          formData.append('price', values.price);
          if (values.imageUrl !== dataIn?.imageUrl ?? '') {
            formData.append('imageUrl', values.imageUrl);
          }
          let method;
          let endpoint;
          if (screen === 'Create') {
            formData.append('hotel', id);
            method = 'post-auth';
            endpoint = '';
          } else {
            method = 'put';
            endpoint = id + '/';
          }
          const result = await httpRequest({
            method: method,
            endpoint: `api/v1/rooms/${endpoint}`,
            accessToken: authState.accessToken,
            formData: true,
            dataInput: formData,
          });
          const {status, data} = result;
          if (status === 200 || status === 201) {
            if (screen === 'Create') {
              const roomId = data.id;
              navigation.navigate('AddFacility', {hotelId: id, roomId});
            } else {
              navigation.goBack();
            }
          } else if (status === 403) {
            verifyAuthentication();
            console.log('Please try again');
          }
        }}
        validationSchema={validationSchemas}>
        {props => <Form {...props} navigation={navigation} />}
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
}) => {
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
          source={values?.imageUrl?.uri ?? values?.imageUrl ?? ''}
        />
        <WidthSpacer width={10} />
        <View style={{flex: 1}}>
          <TextInput
            style={styles.input}
            placeholder={`Set your room name/type`}
            value={values.name}
            onChangeText={handleChange('name')}
            onBlur={() => setFieldTouched('name', '')}
          />
          {errors?.name ? (
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
        mode="numeric"
        field={'Person'}
        input={true}
        handleChange={handleChange}
        fieldname={'person'}
        setFieldTouched={setFieldTouched}
        error={errors.person}
        valueInput={values.person.toString()}
        placeholder={`Set number of person allowed`}
      />
      <HeightSpacer height={10} />
      <InformationTile
        mode="numeric"
        field={'Number of bed(s)'}
        input={true}
        handleChange={handleChange}
        fieldname={'bed'}
        setFieldTouched={setFieldTouched}
        error={errors.bed}
        valueInput={values.bed.toString()}
        placeholder={`Set number of bed allowed`}
      />
      <HeightSpacer height={10} />
      <InformationTile
        field={'Price per night'}
        mode="numeric"
        input={true}
        handleChange={handleChange}
        fieldname={'price'}
        setFieldTouched={setFieldTouched}
        error={errors.price}
        valueInput={values.price.toString()}
        placeholder={`Set room's price`}
      />
      <HeightSpacer height={10} />
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

export default RoomForm;

const styles = StyleSheet.create({
  input: {
    fontSize: TEXT.medium,
    fontFamily: 'medium',
    borderBottomWidth: 3,
    // flex: 1,
    borderBottomColor: COLORS.red,
    paddingVertical: 5,
  },
});
