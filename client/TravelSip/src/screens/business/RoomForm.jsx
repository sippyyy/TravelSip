import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  AppBar,
  HeightSpacer,
  ImageFieldTile,
  InformationTile,
  ReusableText,
  WidthSpacer,
} from '../../components';
import {useRoute} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import reusable from '../../components/Reusable/reusable.style';
import {TextInput} from 'react-native-paper';
import {COLORS, SIZES, TEXT} from '../../constants/theme';

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
          person: dataIn?.person ?? 0,
          bed: dataIn?.bed ?? 0,
          price: dataIn?.price ?? 0,
          imageUrl: dataIn?.price ?? '',
          hotel: id,
        }}
        onSubmit={async values => {
          console.log(values);
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
